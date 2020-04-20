#!/usr/bin/env coffee
#

if window?
  fetch = window.fetch

else
  fetch = require('node-fetch')
  csv = require('csvtojson')
  { Population_Data_Source } = require('./population_data_source')
  { CSSE_Covid_19_Data_Source } = require('./csse_covid_19_data_source')


per_million = (x,y) ->
  if y != 0
    return Number((1000000 * x / y).toFixed())

normal_sort = (spec) ->
  {column, direction} = spec
  (a,b) ->
    [a,b] = [b,a] if direction == 'ascending'
    return 1 if a[column] < b[column]
    return -1 if a[column] > b[column] 
    return 0 


class Covid_Data

  constructor: (@id) ->
    @views = []
    @current_sort =
      column: null
      direction: null

  # call after document loaded
  init: =>
    @init_data()
    .then (csse_data) =>
      @world = csse_data
      @data = @merge_data()
      @add_view(@data)

  # async
  init_data: =>
    Population_Data_Source = window.Population_Data_Source
    CSSE_Covid_19_Data_Source = window.CSSE_Covid_19_Data_Source
    @population_data_source = new Population_Data_Source()
    @covid_data_source = new CSSE_Covid_19_Data_Source()
    return @covid_data_source.fetch_data()

  merge_data: =>
    data = []
    for country, obj of @world.countries
      population = @population_data_source.get(country)
      if population && population > 1000000
        cases = obj.cases
        cases_per_million = per_million(cases,population)
        deaths = obj.deaths
        deaths_per_million = per_million(deaths,population)
        deaths_per_cent = (100*deaths/cases).toFixed()
        data.push {
          country,
          population,
          cases,
          cases_per_million,
          deaths,
          deaths_per_million,
          deaths_per_cent
        }
    return data
    
  update_views: =>
    for view in @views
      view.update()

  add_view: =>
    view_id = @views.length
    parent_elt_id = "#{@id}_div"
    view = new Table_View(this, view_id, parent_elt_id)
    view.update()
    @views.push(view)

  sort_data: (spec) =>
    console.log("sort_data(#{spec})")
    data = await @data
    data.sort(normal_sort(spec))
    @current_sort = spec
    @update_views()


class Table_View

  constructor: (@table, @id, @parent_elt_id) ->
    console.log @parent_elt_id
    @elt_id = "#{@id}_view_#{}"
    @elt = document.createElement('table')
    @elt.setAttribute('id', @elt_id)
    @elt.setAttribute('class', 'table-view')
    @parent_elt = document.getElementById(@parent_elt_id)
    @parent_elt.appendChild(@elt)
    
    @thead = new Table_Header(@table)
    @tbody = new Table_Body(@table)
    @elt.appendChild(@thead.elt)
    @elt.appendChild(@tbody.elt)

    @covid_src_elt = document.getElementById('covid-data-src')
    covid_data_url = @table.covid_data_source.url
    link = "<a src=\"#{covid_data_url}\"> #{covid_data_url} </a>"
    @covid_src_elt.innerHTML = "covid-19 data source: #{link}: (fetched #{@date})}"

    @pop_src_elt = document.getElementById('un-data-src')
    population_url = @table.population_data_source.url 
    link = "<a src=\"#{population_url}\"> https://data.un.org/ </a>"
    @pop_src_elt.innerHTML = "Population data source: #{link}"

  # creates and installs new table element
  update: (data) =>
    # create new <tbody> element from current data
    tbody = new Table_Body(@table)
    @tbody.elt.replaceWith(tbody.elt)
    @tbody = tbody
    @highlight(@table.current_sort.column)

  highlight: (column=null) =>
    if column != null
      for th_elt in  @elt.getElementsByClassName('column-header')
        th_elt.classList.remove('highlight')
      for td_elt in @elt.getElementsByClassName(column.replace(/_/g,'-'))
        td_elt.classList.add('highlight')


class Table_Header

  constructor: (@table) ->
    @elt = document.createElement('thead')
    @elt.setAttribute('id', 'table-header')
    @tr_elt = document.createElement('tr')
    @elt.appendChild(@tr_elt)
    @defaults = {}

    @add_column('rank', {
       innerHTML: '#'
       classes: ['rank', 'highlight']
       })

    @add_column('country', {
      sort_order: 'ascending'
      innerHTML: 'Country'
      classes: ['country', 'column-header']
      })

    @add_column('population', {
      sort_order: 'descending'
      innerHTML: 'Population'
      classes: ['population', 'column-header']
      })
      
    @add_column('cases', {
      sort_order: 'descending'
      innerHTML: 'Cases'
      classes: ['cases', 'column-header']
      })
      
    @add_column('cases_per_million', {
      innerHTML: 'Cases / Million',
      sort_order: 'descending'
      classes: ['cases-per-million', 'column-header']
      })

    @add_column('deaths', {
      sort_order: 'descending'
      innerHTML: 'Deaths'
      classes: ['deaths', 'column-header']
      })

    @add_column('deaths_per_million', {
      innerHTML: 'Deaths / Million',
      sort_order: 'descending'
      classes: ['deaths-per-million', 'column-header']
      })

    @add_column('deaths_per_cent', {
      innerHTML: 'Deaths %',
      sort_order: 'descending'
      classes: ['deaths-per-cent', 'column-header']
      })

  handle_click: (column) =>
    if @table.current_sort.column == column
      if @table.current_sort.direction == 'ascending'
        direction = 'descending'
      else
        direction = 'ascending'
    else
      direction = @defaults[column].sort_order
    @table.sort_data({column, direction})
    
  add_column: (column, spec={}) =>
    if not column?
      return new Error()
    id = spec.id || column.replace(/_/g,'-')
    innerHTML = spec.innerHTML || column.replace(/_/g, ' ')
    sort_order = spec.sort_order || 'ascending'
    @defaults[column] = { sort_order: sort_order }
    classes = spec.classes || []
    classes.push(id)
    th_elt = document.createElement('th')
    th_elt.setAttribute('id', id)
    th_elt.setAttribute('class', classes.join(' '))
    th_elt.innerHTML = innerHTML
    if sort_order != null
      th_elt.onclick = =>
        @handle_click(column)
      th_elt.onmouseover = =>
        th_elt.classList.add('mouseover')
      th_elt.onmouseout = =>
        th_elt.classList.remove('mouseover')
    @tr_elt.appendChild(th_elt)


class Table_Body

  constructor: (@table) ->
    @elt = document.createElement('tbody')
    rows = ""
    row_num = 1
    # @data is initialized asynchronously by @fetch_data()
    for obj in @table.data
      rows += """
        <tr>
          <td class="rank highlight"> #{row_num++} </td>
          <td class="country"> #{obj.country} </td>
          <td class="population"> #{obj.population} </td>
          <td class="cases"> #{obj.cases} </td>
          <td class="cases-per-million"> #{obj.cases_per_million} </td>
          <td class="deaths"> #{obj.deaths} </td>
          <td class="deaths-per-million"> #{obj.deaths_per_million} </td>
          <td class="deaths-per-cent"> #{obj.deaths_per_cent}% </td>
        </tr>
      """
    @elt.innerHTML = rows


if window?
  window.Covid_Data = Covid_Data

else
  exports.Covid_Data = Covid_Data


