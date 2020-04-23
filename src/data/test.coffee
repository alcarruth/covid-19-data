
{ Covid_Data } = require('./covid_data')
{ Population_Data_Source } = require('./population_data_source')
{ CSSE_Covid_19_Data_Source } = require('./csse_covid_19_data_source')

covid_data = new Covid_Data()
population_data_source = new Population_Data_Source()
csse_covid_19_data_source = new CSSE_Covid_19_Data_Source()

module.exports = {
  covid_data,
  Covid_Data,
  population_data_source,
  Population_Data_Source,
  csse_covid_19_data_source,
  CSSE_Covid_19_Data_Source
  }
