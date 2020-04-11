#!/usr/bin/env coffee
#

fs = require('fs')
{ Populations } = require('populations')
{ Covid_Data } = require('covid_data')
{ UN_Data } = require('un_data')

key_map_file = 'key_map.json'
un_data_file = 'un_data.json'

csv_file = 'un_data_2019.csv'
pop_file = 'population_2019.json'

covid_data = new Covid_Data('corona-virus-data')
populations = new Populations()
populations.save_JSON('js/populations.json')


produce_population_file = (csv_file, pop_file) ->
  un_data_2019 = new UN_Data(csv_file)
  un_data_2019.save_json(pop_file)

produce_population_file(csv_file, pop_file)
