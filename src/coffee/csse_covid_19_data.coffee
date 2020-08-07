#!/usr/bin/env coffee
#

csv = require('csvtojson')
fetch = window? && window.fetch || require('node-fetch')


# Class CSSE_Covid_19_Data
#
# Creates an object used to fetch the raw data from the Johns Hopkins
# University Center for Systems Science and Engineering (JHU CSSE)
# Github repo at https://github.com/CSSEGISandData/COVID-19
# 
class CSSE_Covid_19_Data

  constructor: ->
    @path =  "/csse_covid_19_data/csse_covid_19_daily_reports"
    @repo_root = "raw.githubusercontent.com/CSSEGISandData/COVID-19/master"

    # The following properties are set by method @init()
    # 
    @date = null
    @url = null
    @csse_data = null
    @world = null
    @countries = null
    @states = null

  # Async Method @init()
  # Initializes data by fetching most recent data from CSSE.
  # 
  init: =>
    @csse_data = await @fetch_csse_data()
    @world = new CSSE_Data_World(@csse_data)
    @countries = @world.countries
    @states = @countries.US.states
    return this

  # Method date_to_url(date)
  # Args:
  #  date: a Date() object
  # Returns: a url suitable for calling @fetch_url(url)
  # 
  date_to_url: (date) =>
    month = "0#{date.getMonth()+1}"[-2..]
    day = "0#{date.getDate()}"[-2..]
    year = date.getFullYear()
    csv_file_name = "#{month}-#{day}-#{year}.csv"
    url = "https://#{@repo_root}/#{@path}/#{csv_file_name}"
    return url

  # Async Method @fetch_csse_data()
  # Returns data for date no later than @date.
  # 
  fetch_csse_data: =>
    @date = new Date()
    @url = @date_to_url(@date)
    res = await fetch(@url)
    while res.status != 200
      # not successful so try prior day
      @date.setDate(@date.getDate()-1)
      @url = @date_to_url(@date)
      res = await fetch(@url)
    # success! so convert result to json
    csv_str = await res.text()
    csse_data = csv().fromString(csv_str)
    return csse_data

  

# Class CSSE_Data_World
# 
class CSSE_Data_World

  # Creates an object containing CSSE data for the countries
  # of the world.
  #
  constructor: (@data) ->
    @countries = {}
    @cases = 0
    @deaths = 0
    @init()

  init: =>
    # hash is used to collect data for each Country_Region
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x.Country_Region
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      @countries[key] = new CSSE_Data_Country_Region(this, val)

      
# Class CSSE_Country_Region
# 
class CSSE_Data_Country_Region

  # Constructs an object containing CSSE data for a Country_Region.
  # Args:
  #   @parent: an instance of CSSE_Data_World 
  #   @data: data for the Country_Region
  # 
  constructor: (@parent, @data) ->
    @states = {}
    @cases = 0
    @deaths = 0
    @init()

  # Method @init()
  # Calculates the number of cases and deaths.
  # Adds objects for each sub-region.
  # 
  init: =>
    # hash is used to collect data for each Province_State
    # in this Country_Region
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x['Province_State']
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      @states[key] = new CSSE_Data_Province_State(this, val)



# Class CSSE_Data_Province_State
# 
class CSSE_Data_Province_State
  
  # Constructs an object containing CSSE data for a province/state.
  # Args:
  #   @parent: an instance of CSSE_Data_Country_Region
  #   @data: data for the province/state
  # 
  constructor: (@parent, @data) ->
    @counties = {}
    @cases = 0
    @deaths = 0
    @init()
    
  # Method @init()
  # Calculates the number of cases and deaths.
  # Adds objects for each sub-region.
  # 
  init: =>
    # hash is used to collect data for each Admin2 
    # in this Province_State
    hash = {}
    for x in @data
      @cases += Number(x.Confirmed)
      @deaths += Number(x.Deaths)
      key = x['Admin2']
      if hash[key]
        hash[key].push(x)
      else
        hash[key] = [x]
    for key, val of hash
      county = new CSSE_Data_Admin2(this, val)
      @counties[key] = county


# Class CSSE_Data_Admin2
# 
class CSSE_Data_Admin2

  # Constructs an object containing CSSE data for an admin2 area
  # Args:
  #   @parent: an instance of CSSE_Data_State_Province
  #   @data: data for the province/state
  # 
  constructor: (@parent, @data) ->
    @cases = 0
    @deaths = 0
    @init()
    
  # Method @init()
  # Calculates the number of cases and deaths.
  # Adds objects for each sub-region.
  # 
  init: =>
    for d in @data
      @cases += Number(d.Confirmed)
      @deaths += Number(d.Deaths)



# Async function create_CSSE_Covid_19_Data()
# Returns an initialized CSSE_Covid_19_Data instance.
# 
create_CSSE_Covid_19_Data = ->
  csse_Covid_19_Data  = new CSSE_Covid_19_Data()
  return csse_Covid_19_Data.init()

   
exports.CSSE_Covid_19_Data = CSSE_Covid_19_Data
exports.create = create_CSSE_Covid_19_Data

