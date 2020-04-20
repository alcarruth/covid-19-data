#!/usr/bin/env coffee
#

csv_file = 'un_data_2019.csv'
pop_file = 'population_2019.json'
key_map_file = 'key_map.json'

fs = require('fs')
{ Populations } = require('populations')
{ UN_Data } = require('un_data')

populations = new Populations()
populations.save_JSON('js/populations.json')

un_data_2019 = new UN_Data(csv_file)
un_data_2019.save_json(pop_file)

