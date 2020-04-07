#!/usr/bin/env coffee
#

if !window? 
  fetch = require('node-fetch')

covid_data_url = "https://pomber.github.io/covid19/timeseries.json"


class Covid_Data

  constructor: (@id, url) ->
    @url = url || covid_data_url
    #@install()
    
  get_data: =>
    res = await window.fetch(@url)
    data = await res.json()

  get_latest: =>
    data = await @get_data()
    i = data.US.length-1
    latest = {}
    for k,v of data
      latest[k] = data[k][i]
    return latest

  create_table_elt: =>
    elt = document.createElement('table')
    elt.setAttribute('id', 'cv-data-table')
    elt.setAttribute('class', 'sort')
    latest = await @get_latest()
    rows = ""
    row_num = 1
    for country,obj of latest
      rows += """
        <tr>
          <td class="cv-data-rank"> #{row_num++} </td>
          <td class="cv-data-country"> #{country} </td>
          <td class="cv-data-number"> #{obj.confirmed} </td>
          <td class="cv-data-number"> #{obj.deaths} </td>
          <td class="cv-data-number"> #{obj.recovered} </td>
        </tr>

      """
    elt.innerHTML = """
        <thead>
          <tr>
            <th data-sort-method='none' class='no-sort cv-data-rank'>#</th>
            <th class="cv-data-country">Country</th>
            <th class="cv-data-number">Cases</th>
            <th class="cv-data-number">Deaths</th>
            <th class="cv-data-number">Recovered</th>
          </tr>
        </thead>
        <tbody>
          #{rows}
        </tbody>
    """
    return elt

  install: =>
    @parent_elt = document.getElementById(@id)
    @elt = await @create_table_elt()
    new Tablesort(@elt)
    @parent_elt.appendChild(@elt)
        
if !window? 
  exports.Covid_Data = Covid_Data
  exports.covid_data = new Covid_Data()
else
  window.covid_data = new Covid_Data('corona-virus-data')
