#!/usr/bin/env coffee
#

fs = require('fs')
fetch = require('node-fetch')

timeseries_json_url = "https://pomber.github.io/covid19/timeseries.json"

class Covid_Data

  constructor: (@url) ->

  get_data: =>
    fetch(@url)
    .then (res) ->
      res.json()
    .then (json) =>
      @timeseries_json = json

  get_latest: =>
    @get_data()
    .then =>
      data = @timeseries_json
      i = data.US.length-1
      latest = {}
      for k,v of data
        latest[k] = data[k][i]
      return latest
        
    
exports.Covid_Data = Covid_Data
exports.covid_data = new Covid_Data(timeseries_json_url)
