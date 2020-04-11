#!/usr/bin/env coffee
#

{ covid_data } = require('./covid_data')
fs = require('fs')

key_map_file = 'key_map.json'
un_data_file = 'un_data.json'

class Populations

  constructor: (key_map_file, un_data_file) ->
    json = fs.readFileSync(key_map_file, 'utf8')
    @key_map = JSON.parse(json)
    json = fs.readFileSync(un_data_file, 'utf8')
    @un_data = JSON.parse(json)

  get: (key) =>
    
    if @key_map.hasOwnProperty(key)
      key = @key_map[key]
    return @un_data[key]

  to_obj: =>
    cv = await covid_data.get_latest()
    populations = {}
    for k,v of cv
      populations[k] = @get(k)
    return populations

  to_JSON: =>
    populations = await @to_obj()
    return JSON.stringify(populations, null, 3)

  save_JSON: (fname) =>
    fs.writeFileSync(fname, await @to_JSON())



if module.parent
  exports.Populations = Populations
else
  populations = new Populations()
  populations.save_JSON('js/populations.json')

