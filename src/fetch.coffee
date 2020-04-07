#!/usr/bin/env/coffee
#
# fetch.coffee
#

test_url = "https://pomber.github.io/covid19/timeseries.json"

https = require('https')

fetch = (url) ->
  
  https.get('http://nodejs.org/dist/index.json', (res) -> 
    { statusCode } = res
    contentType = res.headers['content-type']

    if (statusCode != 200)
      error = new Error("Request Failed.\nStatus Code: #{statusCode}")
      
    else if (!/^application\/json/.test(contentType))
      error = new Error("Invalid content-type.\nExpected application/json but received #{contentType}")

    if (error)
      console.error(error.message)
      # Consume response data to free up memory
      res.resume()
      return

    res.setEncoding('utf8')
    rawData = ''
    res.on( 'data', (chunk) -> rawData += chunk)
    res.on( 'end', -> 
      try 
        parsedData = JSON.parse(rawData)
        return parsedData
      catch (e) 
        console.error(e.message)
    )
  ).on('error', (e) ->
    console.error("Got error: #{e.message}")

