#!/usr/bin/env coffee
#

if window?
  fetch = window.fetch
else
  fetch = require('node-fetch')

covid_data_url = "https://pomber.github.io/covid19/timeseries.json"

per_million = (x,y) ->
  if y != 0
    return Number((1000000 * x / y).toFixed())
  else
    return 0

populations = {
   "Afghanistan": 38041754,
   "Albania": 2880917,
   "Algeria": 43053054,
   "Andorra": 77142,
   "Angola": 31825295,
   "Antigua and Barbuda": 97118,
   "Argentina": 44780677,
   "Armenia": 2957731,
   "Australia": 25203198,
   "Austria": 8955102,
   "Azerbaijan": 10047718,
   "Bahamas": 389482,
   "Bahrain": 1641172,
   "Bangladesh": 163046161,
   "Barbados": 287025,
   "Belarus": 9452411,
   "Belgium": 11539328,
   "Benin": 11801151,
   "Bhutan": 763092,
   "Bosnia and Herzegovina": 3301000,
   "Brazil": 211049527,
   "Brunei": 433285,
   "Bulgaria": 7000119,
   "Burkina Faso": 20321378,
   "Cabo Verde": 549935,
   "Cambodia": 16486542,
   "Cameroon": 25876380,
   "Canada": 37411047,
   "Central African Republic": 4745185,
   "Chad": 15946876,
   "Chile": 18952038,
   "China": 1433783686,
   "Colombia": 50339443,
   "Congo (Brazzaville)": 5380508,
   "Congo (Kinshasa)": 86790567,
   "Costa Rica": 5047561,
   "Cote d'Ivoire": 25716544,
   "Croatia": 4130304,
   "Cuba": 11333483,
   "Cyprus": 1198575,
   "Czechia": 10689209,
   "Denmark": 5771876,
   "Djibouti": 973560,
   "Dominican Republic": 10738958,
   "Ecuador": 17373662,
   "Egypt": 100388073,
   "El Salvador": 6453553,
   "Equatorial Guinea": 1355986,
   "Eritrea": 3497117,
   "Estonia": 1325648,
   "Eswatini": 1148130,
   "Ethiopia": 112078730,
   "Fiji": 889953,
   "Finland": 5532156,
   "France": 65129728,
   "Gabon": 2172579,
   "Gambia": 2347706,
   "Georgia": 3996765,
   "Germany": 83517045,
   "Ghana": 30417856,
   "Greece": 10473455,
   "Guatemala": 17581472,
   "Guinea": 12771246,
   "Guyana": 782766,
   "Haiti": 11263077,
   "Holy See": 799,
   "Honduras": 9746117,
   "Hungary": 9684679,
   "Iceland": 339031,
   "India": 1366417754,
   "Indonesia": 270625568,
   "Iran": 82913906,
   "Iraq": 39309783,
   "Ireland": 4882495,
   "Israel": 8519377,
   "Italy": 60550075,
   "Jamaica": 2948279,
   "Japan": 126860301,
   "Jordan": 10101694,
   "Kazakhstan": 18551427,
   "Kenya": 52573973,
   "Korea, South": 51225308,
   "Kuwait": 4207083,
   "Kyrgyzstan": 6415850,
   "Latvia": 1906743,
   "Lebanon": 6855713,
   "Liberia": 4937374,
   "Liechtenstein": 38019,
   "Lithuania": 2759627,
   "Luxembourg": 615729,
   "Madagascar": 26969307,
   "Malaysia": 31949777,
   "Maldives": 530953,
   "Malta": 440372,
   "Mauritania": 4525696,
   "Mauritius": 1269668,
   "Mexico": 127575529,
   "Moldova": 4043263,
   "Monaco": 38964,
   "Mongolia": 3225167,
   "Montenegro": 627987,
   "Morocco": 36471769,
   "Namibia": 2494530,
   "Nepal": 28608710,
   "Netherlands": 17097130,
   "New Zealand": 4783063,
   "Nicaragua": 6545502,
   "Niger": 23310715,
   "Nigeria": 200963599,
   "North Macedonia": 2083459,
   "Norway": 5378857,
   "Oman": 4974986,
   "Pakistan": 216565318,
   "Panama": 4246439,
   "Papua New Guinea": 8776109,
   "Paraguay": 7044636,
   "Peru": 32510453,
   "Philippines": 108116615,
   "Poland": 37887768,
   "Portugal": 10226187,
   "Qatar": 2832067,
   "Romania": 19364557,
   "Russia": 145872256,
   "Rwanda": 12626950,
   "Saint Lucia": 182790,
   "Saint Vincent and the Grenadines": 110589,
   "San Marino": 33860,
   "Saudi Arabia": 34268528,
   "Senegal": 16296364,
   "Serbia": 8772235,
   "Seychelles": 97739,
   "Singapore": 5804337,
   "Slovakia": 5457013,
   "Slovenia": 2078654,
   "Somalia": 15442905,
   "South Africa": 58558270,
   "Spain": 46736776,
   "Sri Lanka": 21323733,
   "Sudan": 42813238,
   "Suriname": 581372,
   "Sweden": 10036379,
   "Switzerland": 8591365,
   "Tanzania": 58005463,
   "Thailand": 69625582,
   "Togo": 8082366,
   "Trinidad and Tobago": 1394973,
   "Tunisia": 11694719,
   "Turkey": 83429615,
   "Uganda": 44269594,
   "Ukraine": 43993638,
   "United Arab Emirates": 9770529,
   "United Kingdom": 67530172,
   "Uruguay": 3461734,
   "US": 329064917,
   "Uzbekistan": 32981716,
   "Venezuela": 28515829,
   "Vietnam": 96462106,
   "Zambia": 17861030,
   "Zimbabwe": 14645468,
   "Dominica": 71808,
   "Grenada": 112003,
   "Mozambique": 30366036,
   "Syria": 17070135,
   "Timor-Leste": 1293119,
   "Belize": 390353,
   "Laos": 7169455,
   "Libya": 6777452,
   "Guinea-Bissau": 1920922,
   "Mali": 19658031,
   "Saint Kitts and Nevis": 52823,
   "Burma": 54045420,
   "Botswana": 2303697,
   "Burundi": 11530580,
   "Sierra Leone": 7813215,
   "Malawi": 18628747,
   "South Sudan": 11062113,
   "Western Sahara": 582463,
   "Sao Tome and Principe": 215056
}


class Covid_Data

  constructor: (@id, url) ->
    @url = url || covid_data_url
    @populations = populations

  # async @fetch_data()
  fetch_data: =>
    res = await fetch(@url)
    timeseries = await res.json()
    # most recent is last in list
    last = timeseries.US.length-1
    @data = []
    for country,_ of timeseries
      population = @populations[country]
      if population && population > 1000000
        obj = timeseries[country][last]
        population = Number.parseInt(population)
        cases = Number.parseInt(obj.confirmed)
        cases_per_million = per_million(cases,population)
        deaths = Number.parseInt(obj.deaths)
        deaths_per_million = per_million(deaths,population)
        deaths_per_cent = (100*deaths/cases).toFixed()
        @data.push {
          country,
          population,
          cases,
          cases_per_million,
          deaths,
          deaths_per_million,
          deaths_per_cent
          }
    return @data

  sort_data: (column, direction = 'ascending') =>
    data = await @data
    console.log("column #{column}: #{typeof(data[0][column])}")
    data.sort (a,b) ->
      if a[column] < b[column]
        res = 1
      else if a[column] > b[column]
        res = -1
      else
        res = 0
      return direction == 'descending' && res || -res
    @update_table(data)
    return data


  # creates and installs new table element
  update_table: (data) =>
    # create element from current data
    elt = @create_table_elt(data)
    @elt.replaceWith(elt)
    @elt = elt

  # TODO:
  # 0. separate into Covid_Data and Covid_Table_View classes
  #    Data class maintains the sorted data Array.
  #    View class maintains the table element and does the following:
  # 1. separates creation of table head from table rows
  # 2. links table head clicks to sort functions.
  # 3. on update, just replaces table rows, leaves head intact

  # create element from current data
  create_table_elt: (data) =>
    elt = document.createElement('table')
    elt.setAttribute('id', 'cv-data-table')
    elt.setAttribute('class', 'sort')
    rows = ""
    row_num = 1
    # @data is initialized asynchronously by @fetch_data()
    for obj in data
      rows += """
        <tr>
          <td class="cv-data-rank"> #{row_num++} </td>
          <td class="cv-data-country"> #{obj.country} </td>
          <td class="cv-data-number"> #{obj.population} </td>
          <td class="cv-data-number"> #{obj.cases} </td>
          <td class="cv-data-number"> #{obj.cases_per_million} </td>
          <td class="cv-data-number"> #{obj.deaths} </td>
          <td class="cv-data-number"> #{obj.deaths_per_million} </td>
          <td class="cv-data-number"> #{obj.deaths_per_cent}% </td>
        </tr>
      """
    elt.innerHTML = """
        <thead>
          <tr>
            <th class='cv-data-rank'>#</th>
            <th class="cv-data-country">Country</th>
            <th class="cv-data-number">Population</th>
            <th class="cv-data-number">Cases</th>
            <th class="cv-data-number">Cases / Million</th>
            <th class="cv-data-number">Deaths</th>
            <th class="cv-data-number">Deaths / Million</th>
            <th class="cv-data-number">Deaths %</th>
          </tr>
        </thead>
        <tbody>
          #{rows}
        </tbody>
    """
    return elt

  # call after document loaded
  install: =>
    @parent_elt = document.getElementById(@id)
    data = await @fetch_data()
    @elt = await @create_table_elt(data)
    @parent_elt.appendChild(@elt)


if window? 
  covid_data = new Covid_Data('corona-virus-data')
  window.covid_data = covid_data
else
  exports.Covid_Data = Covid_Data
