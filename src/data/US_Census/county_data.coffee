#!/usr/bin/env coffee
#

fs = require('fs')
csv = require('csvtojson')


class County

  constructor: (row) ->
    @name = row.CTYNAME
    @state = row.STNAME
    @population = Number.parseInt(row.POPESTIMATE2019)

  # TODO:
  # This only works for some counties, parishes.
  # Alaska has some weird ones.  Maybe other states do too.
  # 
  short_name: =>
    return  @name.split(' ')[...-1].join(' ')


class County_Population_Data
  
  constructor: ->
    @counties = {}
    @csv_str = fs.readFileSync('co-est2019-alldata.csv', 'utf8')

  init: =>
    for row in await csv().fromString(@csv_str)
      county = new County(row)
      state = county.state
      key = county.name.replace(/ /g, '_')
      if not @counties[state]?
        @counties[state] = {}
      @counties[state][key] = county

  get_population: (state, county) =>
    return @counties[state][county].population

  to_json: =>
    JSON.stringify(@counties, null, 3)


module.exports = new County_Population_Data()




