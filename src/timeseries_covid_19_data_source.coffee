#!/usr/bin/env coffee
#

if window?
  fetch = window.fetch
else
  fetch = require('node-fetch')
  csv = require('csvtojson')

class Timeseries_Covid_19_Data_Source

  constructor: ->
    @url = "https://pomber.github.io/covid19/timeseries.json"

  # async
  fetch_data: =>
    fetch(@url)
    .then((res) -> res.json())
    .then((timeseries) =>
      # most recent is last in list
      last = timeseries.US.length-1
      @date = timeseries.US[last].date
      data = []
      for country, obj of timeseries
        latest = obj[last]
        data.push
          country: country
          cases: latest.confirmed
          deaths: latest.deaths
      return data)

if window?
  window.Timeseries_Covid_19_Data_Source = Timeseries_Covid_19_Data_Source
else
  if module.parent?
    if module.parent.id == '<repl>'
      module.exports = new Timeseries_Covid_19_Data_Source()
    else
      exports.Timeseries_Covid_19_Data_Source = Timeseries_Covid_19_Data_Source
  else
    exports.Timeseries_Covid_19_Data_Source = Timeseries_Covid_19_Data_Source
      
