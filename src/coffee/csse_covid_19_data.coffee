#!/usr/bin/env coffee
#

fetch = require('node-fetch')
csv = require('csvtojson')


class CSSE_Covid_19_Data_Source

  constructor: ->
    @path =  "/csse_covid_19_data/csse_covid_19_daily_reports"
    @repo_root = "raw.githubusercontent.com/CSSEGISandData/COVID-19/master"
    @date = new Date()
    @url = @date_to_url(@date)
  
  init: =>
    csse_data = await @fetch_csse_data()
    @world = new CSSE_Data_World(csse_data)
    @countries = @world.countries
    @states = @countries.US.states
    return this
    
  date_to_url: (date) =>
    month = "0#{date.getMonth()+1}"[-2..]
    day = "0#{date.getDate()}"[-2..]
    year = date.getFullYear()
    csv_file = "#{month}-#{day}-#{year}.csv"
    url = "https://#{@repo_root}/#{@path}/#{csv_file}"
    return url

  fetch_url: (url) =>
    try
      return fetch(@url)
    catch e
      
  # async
  fetch_csse_data: =>
    @url = @date_to_url(@date)
    res = await @fetch_url(@url)
    while res.status != 200
      @date.setDate(@date.getDate()-1)
      @url = @date_to_url(@date)
      res = await @fetch_url(@url)
    csv_str = await res.text()
    csse_data = csv().fromString(csv_str)
    return csse_data

  

class CSSE_Data_World

  constructor: (@data) ->
    @countries = {}
    @cases = 0
    @deaths = 0
    @init()

  init: =>
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x.Country_Region
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      @countries[key] = new CSSE_Data_Country_Region(this, val)

      
class CSSE_Data_Country_Region

  constructor: (@parent, @data) ->
    @states = {}
    @cases = 0
    @deaths = 0
    @init()

  init: =>
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x['Province_State']
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      @states[key] = new CSSE_Data_Province_State(this, val)


class CSSE_Data_Province_State
  
  constructor: (@parent, @data) ->
    @counties = {}
    @cases = 0
    @deaths = 0
    @init()
    
  init: =>
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x['Admin2']
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      county = new CSSE_Data_Admin2(this, val)
      @counties[key] = county


class CSSE_Data_Admin2

  constructor: (@parent, @data) ->
    @cases = 0
    @deaths = 0
    @init()
    
  init: =>
    for d in @data
      @cases += Number(d.Confirmed)
      @deaths += Number(d.Deaths)
    
# async
create_CSSE_Covid_19_Data = ->
  csse_Covid_19_Data  = new CSSE_Covid_19_Data_Source()
  return csse_Covid_19_Data.init()

   
exports.CSSE_Covid_19_Data_Source = CSSE_Covid_19_Data_Source
exports.create = create_CSSE_Covid_19_Data

