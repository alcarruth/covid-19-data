#!/usr/bin/env coffee
#

csv = require('csvtojson')
sortable_table = require('sortable-table')
population_data = require('./population_data')
csse_covid_19_data = require('./csse_covid_19_data')

console.log("covid_19_data: document: #{document}")
if window?
  document = window.document
console.log("covid_19_data: document: #{document}")
  
per_million = (x,y) ->
  if y != 0
    return Number((1000000 * x / y).toFixed())


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


class Covid_19_Data

  constructor: (spec) ->
    @id = spec.id
    @date = spec.date
    @main_column = spec.main_column
    @covid_19_data = spec.covid_19_data
    @population_data = spec.population_data

    @data = @merge_data()
    @views = []

  # call after document loaded
  init: =>
    @add_view(@data)

  merge_data: =>
    data = []
    rank = 1
    for name, obj of @covid_19_data
      population = @population_data[name]
      if population && population > 1000000
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
        row[@main_column.key] = name
        data.push(row)
    return data
    
  add_view: (parent_elt) =>
    view_id = "view_#{@views.length}"
    view = new Covid_19_Data_View(this, view_id)
    parent_elt.appendChild(view.elt)
    @views.push(view)


class Covid_19_Data_View

  constructor: (@parent, @id) ->
    @elt_id = "#{@id}-iew_#{}"
    @elt = document.createElement('div')
    @elt.setAttribute('id', @elt_id)
    @elt.setAttribute('class', 'covid-19-data-view')

    @style_manager = new Style_Manager()

    @h1_elt = document.createElement('h1')
    @h1_elt.innerText = "Covid_19_Data_View - #{@parent.main_column.name}"
    @elt.appendChild(@h1_elt)
    
    @date_elt = document.createElement('p')
    @date_elt.innerText = "#{@parent.date}"
    @elt.appendChild(@date_elt)

    @toggle_button = document.createElement('button')
    @toggle_button.setAttribute('id', 'toggle-button')
    @toggle_button.innerText = "Toggle Style"
    @toggle_button.onclick = @style_manager.toggle_style
    @elt.appendChild(@toggle_button)

    columns = [
      {
        key: 'rank'
        sort_order: 'none'
        heading_text: '#'
        classes: ['rank']
        }
      {
        key: @parent.main_column.key
        sort_order: 'ascending'
        heading_text: @parent.main_column.name
        classes: [@parent.main_column.key.replace(/_/g,'-'), 'main-column']
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

    @table = new sortable_table.Sortable_Table(@parent.data, columns)
    @elt.appendChild(@table.elt)


create_country_data = (csse_covid_19_data, population_data) ->
  country_data = new Covid_19_Data({
    id: 'country-data'
    date: csse_covid_19_data.date
    main_column:
       key: 'country'
       name: 'Country'
    covid_19_data: csse_covid_19_data.world.countries
    population_data: population_data.countries
  })
  return country_data


create_state_data = (csse_covid_19_data, population_data) ->
  state_data = new Covid_19_Data({
    id: 'state-data'
    date: csse_covid_19_data.date
    main_column:
      key: 'state'
      name: 'State'
    covid_19_data: csse_covid_19_data.world.countries.US.states
    population_data: population_data.states
    })
  return state_data


init_covid_19_data = ->

  if window?

    covid_19_data = await csse_covid_19_data.create()
    country_data = create_country_data(covid_19_data, population_data);
    state_data = create_state_data(covid_19_data, population_data);
    
    covid_19_div = document.getElementById("corona-virus-data");
    country_data.add_view(covid_19_div);
    state_data.add_view(covid_19_div);
  
    window.country_data = country_data;
    window.state_data = state_data;

    return covid_19_data

  else
    
    covid_19_data = await csse_covid_19_data.create()
    country_data = create_country_data(covid_19_data, population_data);
    state_data = create_state_data(covid_19_data, population_data);


if window?
  window.init_covid_19_data = init_covid_19_data

else
  exports.init = init_covid_19_data

  
