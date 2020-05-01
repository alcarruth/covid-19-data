#!/usr/bin/env coffee
#

csv = require('csvtojson')
sortable_table = require('sortable-table')
population_data = require('./population_data')
csse_covid_19_data = require('./csse_covid_19_data')

if window?
  document = window.document
  
per_million = (x,y) ->
  if y != 0
    return Number((1000000 * x / y).toFixed())


class Covid_19_Data

  constructor: (@csse_covid_19_data, @population_data) ->
    @date = @csse_covid_19_data.date
    @country_data = @merge_data('countries', 'country', 10000000)
    @state_data = @merge_data('states', 'state', 1)
    @view = null
    
  merge_data: (key, main_column_key, min_population) =>
    covid_19_data = @csse_covid_19_data[key]
    population_data = @population_data[key]
    data = []
    rank = 1
    for name, obj of covid_19_data
      population = population_data[name]
      if population && population > min_population
        cases = obj.cases
        cases_per_million = per_million(cases,population)
        deaths = obj.deaths
        deaths_per_million = per_million(deaths,population)
        deaths_per_cent = (100*deaths/cases).toFixed()
        row = {
          rank: rank++
          population: population
          cases: cases
          cases_per_million: cases_per_million
          deaths: deaths
          deaths_per_million: deaths_per_million 
          deaths_per_cent: deaths_per_cent
        }
        row[main_column_key] = name
        data.push(row)
    return data

  create_view: (id) =>
    @view = new Covid_19_Data_View(this, id)
    @view.init()
    @view.show_table('states')


class Style_Manager

  constructor: ->
    @current_style = 'dark'
    @styles =
      light: document.getElementById('light-style')
      dark: document.getElementById('dark-style')

  set_style: (name) =>
    style = @styles[name]
    document.head.appendChild(style)
    @current_style = name

  toggle_style: =>
    name = { light: 'dark', dark: 'light' }[@current_style]
    @set_style(name)



class Style_Manager

  constructor: ->
    @current_style = 'dark'
    @styles =
      light: document.getElementById('light-style')
      dark: document.getElementById('dark-style')

  set_style: (name) =>
    style = @styles[name]
    document.head.appendChild(style)
    @current_style = name

  toggle_style: =>
    name = { light: 'dark', dark: 'light' }[@current_style]
    @set_style(name)



    
class Covid_19_Data_View

  constructor: (@parent, @id) ->
    @date = @parent.date
    @tables =
      states: null
      countries: null
    @current_view = null

  # call after document loaded
  init: =>
    @elt = document.getElementById(@id)
    @elt.setAttribute('class', 'covid-19-data-view')
    
    @style_manager = new Style_Manager()
    @current_view = null

    @header = new Covid_19_Data_View_Header(this)
    @elt.appendChild(@header.elt)

    table = new Covid_19_Data_Table(this, 'country-data',
      data: @parent.country_data
      main_column:
        key: 'country'
        name: 'Country'
      min_population: 10000000)
    @tables['countries'] = table
    
    @elt.appendChild(table.elt)
    @current_view = 'countries'
    
    table = new Covid_19_Data_Table(this, 'state-data',
      data: @parent.state_data
      main_column:
        key: 'state'
        name: 'State'
      min_population: 1)
    @tables['states'] = table

  show_table: (type) =>
    other_type = if type == 'countries' then 'states' else 'countries'
    table_elt = @tables[type].elt
    old_table_elt = @tables[other_type].elt
    @elt.replaceChild(table_elt, old_table_elt)
    @header.set_table_type(type, other_type)
    @current_view = type
    
  toggle_view: =>
    if @current_view == 'countries'
      @show_table('states')
    else
      @show_table('countries')



class Covid_19_Data_View_Header

  constructor: (@parent) ->
    @elt = document.createElement('div')
    @elt.setAttribute('id', 'covid-19-data-view-header')
    
    @h1_elt = document.createElement('h1')
    @elt.appendChild(@h1_elt)

    @date_elt = document.createElement('p')
    @date_elt.setAttribute('id', 'cv-data-date')
    @date_elt.innerText = "#{@parent.date}"

    @header_left = document.createElement('div')
    @header_left.setAttribute('id', 'header-left')
    @header_left.appendChild(@date_elt)
    @elt.appendChild(@header_left)

    @toggle_style_button = document.createElement('button')
    @toggle_style_button.setAttribute('id', 'toggle-style-button')
    @toggle_style_button.innerText = "Toggle Style"
    @toggle_style_button.onclick = @parent.style_manager.toggle_style

    @toggle_view_button = document.createElement('button')
    @toggle_view_button.setAttribute('id', 'toggle-view-button')
    @toggle_view_button.innerText = "view by states"
    @toggle_view_button.onclick = @parent.toggle_view

    @header_right = document.createElement('div')
    @header_right.setAttribute('id', 'header-right')
    @header_right.appendChild(@toggle_style_button)
    @header_right.appendChild(@toggle_view_button)
    @elt.appendChild(@header_right)

  set_table_type: (type, other_type) =>
    @h1_elt.innerText = "Covid_19_Data_View - #{type}"
    @toggle_view_button.innerText = "View #{other_type}"



class Covid_19_Data_Table

  constructor: (@parent, @id, spec) ->
    @date = @parent.date
    @data = spec.data
    @columns = @init_columns(spec.main_column)
    @min_population = spec.min_population || 1
    @table = new sortable_table.Sortable_Table(@data, @columns)
    @elt = @table.elt

  init_columns: (main_column) =>

    return [
      {
        key: 'rank'
        sort_order: 'none'
        heading_text: '#'
        classes: ['rank']
        }
      {
        key: main_column.key
        sort_order: 'ascending'
        heading_text: main_column.name
        classes: [main_column.key.replace(/_/g,'-'), 'main-column']
        }
      {
        key: 'population'
        sort_order: 'descending'
        heading_text: 'Population'
        classes: ['population']
        }
      {
        key: 'cases'
        sort_order: 'descending'
        heading_text: 'Cases'
        classes: ['cases']
        }
      {
        key: 'cases_per_million'
        sort_order: 'descending'
        heading_text: 'Cases / Million'
        classes: ['cases-per-million']
        }
      {
        key: 'deaths'
        sort_order: 'descending'
        heading_text: 'Deaths'
        classes: ['deaths']
        }
      {
        key: 'deaths_per_million'
        sort_order: 'descending'
        heading_text: 'Deaths / Million'
        classes: ['deaths-per-million']
        }
      {
        key: 'deaths_per_cent'
        sort_order: 'descending'
        heading_text: 'Deaths %'
        classes: ['deaths-per-cent']
        }
    ]







init_covid_19_data = ->

  csse_covid_19_data = await csse_covid_19_data.create()
  covid_19_data = new Covid_19_Data(csse_covid_19_data, population_data)

  if window?
    covid_19_data.create_view('corona-virus-data')
    window.covid_19_data = covid_19_data



if window?
  window.init_covid_19_data = init_covid_19_data

else
  exports.init = init_covid_19_data

  
