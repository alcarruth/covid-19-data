#!/usr/bin/env coffee
#
# CSSE_daily_reports/csse_daily_reports.coffee
#

csv_file = "04-11-2020.csv"

fs = require('fs')
csv_parse = require('csv-parse/lib/sync')
csv_to_json = require('csvtojson')


if window?
  fetch = window.fetch
else
  fetch = require('node-fetch')


class Covid_19_CSV_Data

  constructor: ->
    #@csv = fs.readFileSync(csv_file, 'utf8')

  fetch_latest: =>
    date = new Date()
    month = "0#{date.getMonth()+1}"[-2..]
    day = "0#{date.getDate()}"[-2..]
    year = date.getFullYear()
    csv_file = "#{month}-#{day}-#{year}.csv"
    path =  "/csse_covid_19_data/csse_covid_19_daily_reports/#{csv_file}"
    repo_root = "raw.githubusercontent.com/CSSEGISandData/COVID-19/master"
    url = "https://#{repo_root}/#{path}/#{csv_file}"
    @csv = await fetch(url)
    
  csv_parse: =>
    @records = csv_parse @csv,
      columns: true
      skip_empty_lines: true
      quote: '"'
      skip_lines_with_error: false

  csv_to_json: =>
    @data = csv_to_json().fromString(@csv)
    @world = new Covid_19_World(await @data)
    @us = await @world.filter_country_region('US')
    @texas = await @us.filter_province_state('Texas')
    return true

class Covid_19_Group

  constructor: (@data, @name) ->

  filter: (spec) =>
    filter_fun = (x) ->
      result = true
      for k,v of spec
        result = result && x[k] == v
      return result
    return @data.filter(filter_fun)

  col_total: (col_name) =>
    xs = @data.map((x)->Number(x[col_name]))
    xs.reduce((a,b)->a+b)

  get_list: (col_name) =>
    obj = {}
    for d in @data
      obj[d[col_name]] = true
    return (k for k,v of obj)
    
  deaths: => @col_total('Deaths')
  cases: => @col_total('Confirmed')



class Covid_19_World extends Covid_19_Group

  filter_country_region: (name) =>
    data = @filter(Country_Region: name)
    return new Covid_19_Country_Region(data, name)

  get_country_region_list: =>
    @get_list('Country_Region')

  get_countries: @get_country_region_list
  

class Covid_19_Country_Region extends Covid_19_Group

  filter_province_state: (name) =>
    data = @filter(Province_State: name)
    return new Covid_19_Province_State(data, name)
   
  get_province_state_list: =>
    @get_list('Province_State')

  get_states: @get_province_state_list


class Covid_19_Province_State extends Covid_19_Group

  filter_admin2: (name) =>
    data = @filter(Admin2: name)
    return new Covid_19_Admin2(data)

  get_admin2_list: =>
    @get_list('Admin2')

  get_counties: @get_admin2_list


class Covid_19_Admin2 extends Covid_19_Group



covid_19_data = new Covid_19_CSV_Data(csv_file)
covid_19_data.csv_to_json()

module.exports = covid_19_data
