#!/usr/bin/env coffee
#
# un_data.coffee
#

fs = require('fs')

class UN_Data

  constructor: (@csv_file) ->
    @lines = fs.readFileSync(@csv_file, 'utf8').split('\n')
    @headings = @lines[0].split(',')
    @entries = {}
    for line in @lines[1..]
      # ignore blank lines
      if line.length > 0
        entry = new UN_Data_Entry(line)
        @entries[entry.country] = entry

  population: =>
    population = {}
    for country, entry of @entries
      population[country] = Math.round(1000 * entry.population)
    return population

  save_json: (json_file) =>
    json_str = JSON.stringify(@population(), null, 3)
    fs.writeFileSync(json_file, json_str)

class UN_Data_Entry

  constructor: (line) ->
    # values are strings separated by commas and have an extra pair
    # of outer quotes which we remove with the mapaped function.
    values = line.split(',').map((s)->s[1...s.length-1])
    @country = values[0]
    @year = values[1]
    @variance = values[2]
    @population = Number(values[3])
    

exports.UN_Data = UN_Data
