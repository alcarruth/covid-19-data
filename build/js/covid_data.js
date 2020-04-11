// Generated by CoffeeScript 2.5.1
(function() {
  //!/usr/bin/env coffee

  var Covid_Data, covid_data, covid_data_url, fetch, per_1000, populations;

  if (typeof window !== "undefined" && window !== null) {
    fetch = window.fetch;
  } else {
    fetch = require('node-fetch');
  }

  covid_data_url = "https://pomber.github.io/covid19/timeseries.json";

  per_1000 = function(x, y) {
    if (y !== 0) {
      return (1000 * x / y).toFixed(3);
    } else {
      return 0;
    }
  };

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
  };

  Covid_Data = class Covid_Data {
    constructor(id, url) {
      this.get_data = this.get_data.bind(this);
      this.get_latest = this.get_latest.bind(this);
      this.create_table_elt = this.create_table_elt.bind(this);
      this.install = this.install.bind(this);
      this.id = id;
      this.url = url || covid_data_url;
      this.populations = populations;
    }

    async get_data() {
      var data, res;
      res = (await fetch(this.url));
      return data = (await res.json());
    }

    async get_latest() {
      var data, i, k, latest, v;
      data = (await this.get_data());
      i = data.US.length - 1;
      latest = {};
      for (k in data) {
        v = data[k];
        latest[k] = data[k][i];
      }
      return latest;
    }

    async create_table_elt() {
      var cases, cases_per_1000, country, deaths, deaths_per_1000, elt, latest, obj, population, row_num, rows;
      elt = document.createElement('table');
      elt.setAttribute('id', 'cv-data-table');
      elt.setAttribute('class', 'sort');
      latest = (await this.get_latest());
      rows = "";
      row_num = 1;
      for (country in latest) {
        obj = latest[country];
        population = this.populations[country];
        if (population && population > 1000) {
          cases = obj.confirmed;
          cases_per_1000 = per_1000(cases, population);
          deaths = obj.deaths;
          deaths_per_1000 = per_1000(deaths, population);
          rows += `<tr>
  <td class="cv-data-rank"> ${row_num++} </td>
  <td class="cv-data-country"> ${country} </td>
  <td class="cv-data-number"> ${population} </td>
  <td class="cv-data-number"> ${cases} </td>
  <td class="cv-data-number"> ${cases_per_1000} </td>
  <td class="cv-data-number"> ${deaths} </td>
  <td class="cv-data-number"> ${deaths_per_1000} </td>
</tr>`;
        }
      }
      elt.innerHTML = `<thead>
  <tr>
    <th data-sort-method='none' class='no-sort cv-data-rank'>Rank</th>
    <th class="cv-data-country">Country</th>
    <th class="cv-data-number">Population</th>
    <th class="cv-data-number">Cases</th>
    <th class="cv-data-number">per 1000</th>
    <th class="cv-data-number">Deaths</th>
    <th class="cv-data-number">per 1000</th>
  </tr>
</thead>
<tbody>
  ${rows}
</tbody>`;
      return elt;
    }

    async install() {
      this.parent_elt = document.getElementById(this.id);
      this.elt = (await this.create_table_elt());
      new Tablesort(this.elt);
      return this.parent_elt.appendChild(this.elt);
    }

  };

  covid_data = new Covid_Data('corona-virus-data');

  if (typeof window !== "undefined" && window !== null) {
    window.covid_data = covid_data;
  } else {
    exports.covid_data = covid_data;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY292aWRfZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLiIsInNvdXJjZXMiOlsic3JjL2NvdmlkX2RhdGEuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQztFQUFBOztBQUFBLE1BQUEsVUFBQSxFQUFBLFVBQUEsRUFBQSxjQUFBLEVBQUEsS0FBQSxFQUFBLFFBQUEsRUFBQTs7RUFFRCxJQUFHLGdEQUFIO0lBQ0UsS0FBQSxHQUFRLE1BQU0sQ0FBQyxNQURqQjtHQUFBLE1BQUE7SUFHRSxLQUFBLEdBQVEsT0FBQSxDQUFRLFlBQVIsRUFIVjs7O0VBS0EsY0FBQSxHQUFpQjs7RUFFakIsUUFBQSxHQUFXLFFBQUEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO0lBQ1QsSUFBRyxDQUFBLEtBQUssQ0FBUjtBQUNFLGFBQU8sQ0FBQyxJQUFBLEdBQU8sQ0FBUCxHQUFXLENBQVosQ0FBYyxDQUFDLE9BQWYsQ0FBdUIsQ0FBdkIsRUFEVDtLQUFBLE1BQUE7QUFHRSxhQUFPLEVBSFQ7O0VBRFM7O0VBTVgsV0FBQSxHQUFjO0lBQ1gsYUFBQSxFQUFlLFFBREo7SUFFWCxTQUFBLEVBQVcsT0FGQTtJQUdYLFNBQUEsRUFBVyxRQUhBO0lBSVgsU0FBQSxFQUFXLEtBSkE7SUFLWCxRQUFBLEVBQVUsUUFMQztJQU1YLHFCQUFBLEVBQXVCLEtBTlo7SUFPWCxXQUFBLEVBQWEsUUFQRjtJQVFYLFNBQUEsRUFBVyxPQVJBO0lBU1gsV0FBQSxFQUFhLFFBVEY7SUFVWCxTQUFBLEVBQVcsT0FWQTtJQVdYLFlBQUEsRUFBYyxRQVhIO0lBWVgsU0FBQSxFQUFXLE1BWkE7SUFhWCxTQUFBLEVBQVcsT0FiQTtJQWNYLFlBQUEsRUFBYyxTQWRIO0lBZVgsVUFBQSxFQUFZLE1BZkQ7SUFnQlgsU0FBQSxFQUFXLE9BaEJBO0lBaUJYLFNBQUEsRUFBVyxRQWpCQTtJQWtCWCxPQUFBLEVBQVMsUUFsQkU7SUFtQlgsUUFBQSxFQUFVLE1BbkJDO0lBb0JYLHdCQUFBLEVBQTBCLE9B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LENBQUMsVUFBUCxHQUFvQixXQUR0QjtHQUFBLE1BQUE7SUFHRSxPQUFPLENBQUMsVUFBUixHQUFxQixXQUh2Qjs7QUEzUUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBjb2ZmZWVcbiNcblxuaWYgd2luZG93P1xuICBmZXRjaCA9IHdpbmRvdy5mZXRjaFxuZWxzZVxuICBmZXRjaCA9IHJlcXVpcmUoJ25vZGUtZmV0Y2gnKVxuXG5jb3ZpZF9kYXRhX3VybCA9IFwiaHR0cHM6Ly9wb21iZXIuZ2l0aHViLmlvL2NvdmlkMTkvdGltZXNlcmllcy5qc29uXCJcblxucGVyXzEwMDAgPSAoeCx5KSAtPlxuICBpZiB5ICE9IDBcbiAgICByZXR1cm4gKDEwMDAgKiB4IC8geSkudG9GaXhlZCgzKVxuICBlbHNlXG4gICAgcmV0dXJuIDBcblxucG9wdWxhdGlvbnMgPSB7XG4gICBcIkFmZ2hhbmlzdGFuXCI6IDM4MDQxNzU0LFxuICAgXCJBbGJhbmlhXCI6IDI4ODA5MTcsXG4gICBcIkFsZ2VyaWFcIjogNDMwNTMwNTQsXG4gICBcIkFuZG9ycmFcIjogNzcxNDIsXG4gICBcIkFuZ29sYVwiOiAzMTgyNTI5NSxcbiAgIFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiOiA5NzExOCxcbiAgIFwiQXJnZW50aW5hXCI6IDQ0NzgwNjc3LFxuICAgXCJBcm1lbmlhXCI6IDI5NTc3MzEsXG4gICBcIkF1c3RyYWxpYVwiOiAyNTIwMzE5OCxcbiAgIFwiQXVzdHJpYVwiOiA4OTU1MTAyLFxuICAgXCJBemVyYmFpamFuXCI6IDEwMDQ3NzE4LFxuICAgXCJCYWhhbWFzXCI6IDM4OTQ4MixcbiAgIFwiQmFocmFpblwiOiAxNjQxMTcyLFxuICAgXCJCYW5nbGFkZXNoXCI6IDE2MzA0NjE2MSxcbiAgIFwiQmFyYmFkb3NcIjogMjg3MDI1LFxuICAgXCJCZWxhcnVzXCI6IDk0NTI0MTEsXG4gICBcIkJlbGdpdW1cIjogMTE1MzkzMjgsXG4gICBcIkJlbmluXCI6IDExODAxMTUxLFxuICAgXCJCaHV0YW5cIjogNzYzMDkyLFxuICAgXCJCb3NuaWEgYW5kIEhlcnplZ292aW5hXCI6IDMzMDEwMDAsXG4gICBcIkJyYXppbFwiOiAyMTEwNDk1MjcsXG4gICBcIkJydW5laVwiOiA0MzMyODUsXG4gICBcIkJ1bGdhcmlhXCI6IDcwMDAxMTksXG4gICBcIkJ1cmtpbmEgRmFzb1wiOiAyMDMyMTM3OCxcbiAgIFwiQ2FibyBWZXJkZVwiOiA1NDk5MzUsXG4gICBcIkNhbWJvZGlhXCI6IDE2NDg2NTQyLFxuICAgXCJDYW1lcm9vblwiOiAyNTg3NjM4MCxcbiAgIFwiQ2FuYWRhXCI6IDM3NDExMDQ3LFxuICAgXCJDZW50cmFsIEFmcmljYW4gUmVwdWJsaWNcIjogNDc0NTE4NSxcbiAgIFwiQ2hhZFwiOiAxNTk0Njg3NixcbiAgIFwiQ2hpbGVcIjogMTg5NTIwMzgsXG4gICBcIkNoaW5hXCI6IDE0MzM3ODM2ODYsXG4gICBcIkNvbG9tYmlhXCI6IDUwMzM5NDQzLFxuICAgXCJDb25nbyAoQnJhenphdmlsbGUpXCI6IDUzODA1MDgsXG4gICBcIkNvbmdvIChLaW5zaGFzYSlcIjogODY3OTA1NjcsXG4gICBcIkNvc3RhIFJpY2FcIjogNTA0NzU2MSxcbiAgIFwiQ290ZSBkJ0l2b2lyZVwiOiAyNTcxNjU0NCxcbiAgIFwiQ3JvYXRpYVwiOiA0MTMwMzA0LFxuICAgXCJDdWJhXCI6IDExMzMzNDgzLFxuICAgXCJDeXBydXNcIjogMTE5ODU3NSxcbiAgIFwiQ3plY2hpYVwiOiAxMDY4OTIwOSxcbiAgIFwiRGVubWFya1wiOiA1NzcxODc2LFxuICAgXCJEamlib3V0aVwiOiA5NzM1NjAsXG4gICBcIkRvbWluaWNhbiBSZXB1YmxpY1wiOiAxMDczODk1OCxcbiAgIFwiRWN1YWRvclwiOiAxNzM3MzY2MixcbiAgIFwiRWd5cHRcIjogMTAwMzg4MDczLFxuICAgXCJFbCBTYWx2YWRvclwiOiA2NDUzNTUzLFxuICAgXCJFcXVhdG9yaWFsIEd1aW5lYVwiOiAxMzU1OTg2LFxuICAgXCJFcml0cmVhXCI6IDM0OTcxMTcsXG4gICBcIkVzdG9uaWFcIjogMTMyNTY0OCxcbiAgIFwiRXN3YXRpbmlcIjogMTE0ODEzMCxcbiAgIFwiRXRoaW9waWFcIjogMTEyMDc4NzMwLFxuICAgXCJGaWppXCI6IDg4OTk1MyxcbiAgIFwiRmlubGFuZFwiOiA1NTMyMTU2LFxuICAgXCJGcmFuY2VcIjogNjUxMjk3MjgsXG4gICBcIkdhYm9uXCI6IDIxNzI1NzksXG4gICBcIkdhbWJpYVwiOiAyMzQ3NzA2LFxuICAgXCJHZW9yZ2lhXCI6IDM5OTY3NjUsXG4gICBcIkdlcm1hbnlcIjogODM1MTcwNDUsXG4gICBcIkdoYW5hXCI6IDMwNDE3ODU2LFxuICAgXCJHcmVlY2VcIjogMTA0NzM0NTUsXG4gICBcIkd1YXRlbWFsYVwiOiAxNzU4MTQ3MixcbiAgIFwiR3VpbmVhXCI6IDEyNzcxMjQ2LFxuICAgXCJHdXlhbmFcIjogNzgyNzY2LFxuICAgXCJIYWl0aVwiOiAxMTI2MzA3NyxcbiAgIFwiSG9seSBTZWVcIjogNzk5LFxuICAgXCJIb25kdXJhc1wiOiA5NzQ2MTE3LFxuICAgXCJIdW5nYXJ5XCI6IDk2ODQ2NzksXG4gICBcIkljZWxhbmRcIjogMzM5MDMxLFxuICAgXCJJbmRpYVwiOiAxMzY2NDE3NzU0LFxuICAgXCJJbmRvbmVzaWFcIjogMjcwNjI1NTY4LFxuICAgXCJJcmFuXCI6IDgyOTEzOTA2LFxuICAgXCJJcmFxXCI6IDM5MzA5NzgzLFxuICAgXCJJcmVsYW5kXCI6IDQ4ODI0OTUsXG4gICBcIklzcmFlbFwiOiA4NTE5Mzc3LFxuICAgXCJJdGFseVwiOiA2MDU1MDA3NSxcbiAgIFwiSmFtYWljYVwiOiAyOTQ4Mjc5LFxuICAgXCJKYXBhblwiOiAxMjY4NjAzMDEsXG4gICBcIkpvcmRhblwiOiAxMDEwMTY5NCxcbiAgIFwiS2F6YWtoc3RhblwiOiAxODU1MTQyNyxcbiAgIFwiS2VueWFcIjogNTI1NzM5NzMsXG4gICBcIktvcmVhLCBTb3V0aFwiOiA1MTIyNTMwOCxcbiAgIFwiS3V3YWl0XCI6IDQyMDcwODMsXG4gICBcIkt5cmd5enN0YW5cIjogNjQxNTg1MCxcbiAgIFwiTGF0dmlhXCI6IDE5MDY3NDMsXG4gICBcIkxlYmFub25cIjogNjg1NTcxMyxcbiAgIFwiTGliZXJpYVwiOiA0OTM3Mzc0LFxuICAgXCJMaWVjaHRlbnN0ZWluXCI6IDM4MDE5LFxuICAgXCJMaXRodWFuaWFcIjogMjc1OTYyNyxcbiAgIFwiTHV4ZW1ib3VyZ1wiOiA2MTU3MjksXG4gICBcIk1hZGFnYXNjYXJcIjogMjY5NjkzMDcsXG4gICBcIk1hbGF5c2lhXCI6IDMxOTQ5Nzc3LFxuICAgXCJNYWxkaXZlc1wiOiA1MzA5NTMsXG4gICBcIk1hbHRhXCI6IDQ0MDM3MixcbiAgIFwiTWF1cml0YW5pYVwiOiA0NTI1Njk2LFxuICAgXCJNYXVyaXRpdXNcIjogMTI2OTY2OCxcbiAgIFwiTWV4aWNvXCI6IDEyNzU3NTUyOSxcbiAgIFwiTW9sZG92YVwiOiA0MDQzMjYzLFxuICAgXCJNb25hY29cIjogMzg5NjQsXG4gICBcIk1vbmdvbGlhXCI6IDMyMjUxNjcsXG4gICBcIk1vbnRlbmVncm9cIjogNjI3OTg3LFxuICAgXCJNb3JvY2NvXCI6IDM2NDcxNzY5LFxuICAgXCJOYW1pYmlhXCI6IDI0OTQ1MzAsXG4gICBcIk5lcGFsXCI6IDI4NjA4NzEwLFxuICAgXCJOZXRoZXJsYW5kc1wiOiAxNzA5NzEzMCxcbiAgIFwiTmV3IFplYWxhbmRcIjogNDc4MzA2MyxcbiAgIFwiTmljYXJhZ3VhXCI6IDY1NDU1MDIsXG4gICBcIk5pZ2VyXCI6IDIzMzEwNzE1LFxuICAgXCJOaWdlcmlhXCI6IDIwMDk2MzU5OSxcbiAgIFwiTm9ydGggTWFjZWRvbmlhXCI6IDIwODM0NTksXG4gICBcIk5vcndheVwiOiA1Mzc4ODU3LFxuICAgXCJPbWFuXCI6IDQ5NzQ5ODYsXG4gICBcIlBha2lzdGFuXCI6IDIxNjU2NTMxOCxcbiAgIFwiUGFuYW1hXCI6IDQyNDY0MzksXG4gICBcIlBhcHVhIE5ldyBHdWluZWFcIjogODc3NjEwOSxcbiAgIFwiUGFyYWd1YXlcIjogNzA0NDYzNixcbiAgIFwiUGVydVwiOiAzMjUxMDQ1MyxcbiAgIFwiUGhpbGlwcGluZXNcIjogMTA4MTE2NjE1LFxuICAgXCJQb2xhbmRcIjogMzc4ODc3NjgsXG4gICBcIlBvcnR1Z2FsXCI6IDEwMjI2MTg3LFxuICAgXCJRYXRhclwiOiAyODMyMDY3LFxuICAgXCJSb21hbmlhXCI6IDE5MzY0NTU3LFxuICAgXCJSdXNzaWFcIjogMTQ1ODcyMjU2LFxuICAgXCJSd2FuZGFcIjogMTI2MjY5NTAsXG4gICBcIlNhaW50IEx1Y2lhXCI6IDE4Mjc5MCxcbiAgIFwiU2FpbnQgVmluY2VudCBhbmQgdGhlIEdyZW5hZGluZXNcIjogMTEwNTg5LFxuICAgXCJTYW4gTWFyaW5vXCI6IDMzODYwLFxuICAgXCJTYXVkaSBBcmFiaWFcIjogMzQyNjg1MjgsXG4gICBcIlNlbmVnYWxcIjogMTYyOTYzNjQsXG4gICBcIlNlcmJpYVwiOiA4NzcyMjM1LFxuICAgXCJTZXljaGVsbGVzXCI6IDk3NzM5LFxuICAgXCJTaW5nYXBvcmVcIjogNTgwNDMzNyxcbiAgIFwiU2xvdmFraWFcIjogNTQ1NzAxMyxcbiAgIFwiU2xvdmVuaWFcIjogMjA3ODY1NCxcbiAgIFwiU29tYWxpYVwiOiAxNTQ0MjkwNSxcbiAgIFwiU291dGggQWZyaWNhXCI6IDU4NTU4MjcwLFxuICAgXCJTcGFpblwiOiA0NjczNjc3NixcbiAgIFwiU3JpIExhbmthXCI6IDIxMzIzNzMzLFxuICAgXCJTdWRhblwiOiA0MjgxMzIzOCxcbiAgIFwiU3VyaW5hbWVcIjogNTgxMzcyLFxuICAgXCJTd2VkZW5cIjogMTAwMzYzNzksXG4gICBcIlN3aXR6ZXJsYW5kXCI6IDg1OTEzNjUsXG4gICBcIlRhbnphbmlhXCI6IDU4MDA1NDYzLFxuICAgXCJUaGFpbGFuZFwiOiA2OTYyNTU4MixcbiAgIFwiVG9nb1wiOiA4MDgyMzY2LFxuICAgXCJUcmluaWRhZCBhbmQgVG9iYWdvXCI6IDEzOTQ5NzMsXG4gICBcIlR1bmlzaWFcIjogMTE2OTQ3MTksXG4gICBcIlR1cmtleVwiOiA4MzQyOTYxNSxcbiAgIFwiVWdhbmRhXCI6IDQ0MjY5NTk0LFxuICAgXCJVa3JhaW5lXCI6IDQzOTkzNjM4LFxuICAgXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiOiA5NzcwNTI5LFxuICAgXCJVbml0ZWQgS2luZ2RvbVwiOiA2NzUzMDE3MixcbiAgIFwiVXJ1Z3VheVwiOiAzNDYxNzM0LFxuICAgXCJVU1wiOiAzMjkwNjQ5MTcsXG4gICBcIlV6YmVraXN0YW5cIjogMzI5ODE3MTYsXG4gICBcIlZlbmV6dWVsYVwiOiAyODUxNTgyOSxcbiAgIFwiVmlldG5hbVwiOiA5NjQ2MjEwNixcbiAgIFwiWmFtYmlhXCI6IDE3ODYxMDMwLFxuICAgXCJaaW1iYWJ3ZVwiOiAxNDY0NTQ2OCxcbiAgIFwiRG9taW5pY2FcIjogNzE4MDgsXG4gICBcIkdyZW5hZGFcIjogMTEyMDAzLFxuICAgXCJNb3phbWJpcXVlXCI6IDMwMzY2MDM2LFxuICAgXCJTeXJpYVwiOiAxNzA3MDEzNSxcbiAgIFwiVGltb3ItTGVzdGVcIjogMTI5MzExOSxcbiAgIFwiQmVsaXplXCI6IDM5MDM1MyxcbiAgIFwiTGFvc1wiOiA3MTY5NDU1LFxuICAgXCJMaWJ5YVwiOiA2Nzc3NDUyLFxuICAgXCJHdWluZWEtQmlzc2F1XCI6IDE5MjA5MjIsXG4gICBcIk1hbGlcIjogMTk2NTgwMzEsXG4gICBcIlNhaW50IEtpdHRzIGFuZCBOZXZpc1wiOiA1MjgyMyxcbiAgIFwiQnVybWFcIjogNTQwNDU0MjAsXG4gICBcIkJvdHN3YW5hXCI6IDIzMDM2OTcsXG4gICBcIkJ1cnVuZGlcIjogMTE1MzA1ODAsXG4gICBcIlNpZXJyYSBMZW9uZVwiOiA3ODEzMjE1LFxuICAgXCJNYWxhd2lcIjogMTg2Mjg3NDcsXG4gICBcIlNvdXRoIFN1ZGFuXCI6IDExMDYyMTEzLFxuICAgXCJXZXN0ZXJuIFNhaGFyYVwiOiA1ODI0NjMsXG4gICBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiOiAyMTUwNTZcbn1cblxuXG5jbGFzcyBDb3ZpZF9EYXRhXG5cbiAgY29uc3RydWN0b3I6IChAaWQsIHVybCkgLT5cbiAgICBAdXJsID0gdXJsIHx8IGNvdmlkX2RhdGFfdXJsXG4gICAgQHBvcHVsYXRpb25zID0gcG9wdWxhdGlvbnNcblxuICBnZXRfZGF0YTogPT5cbiAgICByZXMgPSBhd2FpdCBmZXRjaChAdXJsKVxuICAgIGRhdGEgPSBhd2FpdCByZXMuanNvbigpXG5cbiAgZ2V0X2xhdGVzdDogPT5cbiAgICBkYXRhID0gYXdhaXQgQGdldF9kYXRhKClcbiAgICBpID0gZGF0YS5VUy5sZW5ndGgtMVxuICAgIGxhdGVzdCA9IHt9XG4gICAgZm9yIGssdiBvZiBkYXRhXG4gICAgICBsYXRlc3Rba10gPSBkYXRhW2tdW2ldXG4gICAgcmV0dXJuIGxhdGVzdFxuXG4gIGNyZWF0ZV90YWJsZV9lbHQ6ID0+XG4gICAgZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFibGUnKVxuICAgIGVsdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2N2LWRhdGEtdGFibGUnKVxuICAgIGVsdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NvcnQnKVxuICAgIGxhdGVzdCA9IGF3YWl0IEBnZXRfbGF0ZXN0KClcbiAgICByb3dzID0gXCJcIlxuICAgIHJvd19udW0gPSAxXG4gICAgZm9yIGNvdW50cnksb2JqIG9mIGxhdGVzdFxuICAgICAgcG9wdWxhdGlvbiA9IEBwb3B1bGF0aW9uc1tjb3VudHJ5XVxuICAgICAgaWYgcG9wdWxhdGlvbiAmJiBwb3B1bGF0aW9uID4gMTAwMFxuICAgICAgICBjYXNlcyA9IG9iai5jb25maXJtZWRcbiAgICAgICAgY2FzZXNfcGVyXzEwMDAgPSBwZXJfMTAwMChjYXNlcyxwb3B1bGF0aW9uKVxuICAgICAgICBkZWF0aHMgPSBvYmouZGVhdGhzXG4gICAgICAgIGRlYXRoc19wZXJfMTAwMCA9IHBlcl8xMDAwKGRlYXRocyxwb3B1bGF0aW9uKVxuICAgICAgICByb3dzICs9IFwiXCJcIlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImN2LWRhdGEtcmFua1wiPiAje3Jvd19udW0rK30gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImN2LWRhdGEtY291bnRyeVwiPiAje2NvdW50cnl9IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjdi1kYXRhLW51bWJlclwiPiAje3BvcHVsYXRpb259IDwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjdi1kYXRhLW51bWJlclwiPiAje2Nhc2VzfSA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY3YtZGF0YS1udW1iZXJcIj4gI3tjYXNlc19wZXJfMTAwMH0gPC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzcz1cImN2LWRhdGEtbnVtYmVyXCI+ICN7ZGVhdGhzfSA8L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY3YtZGF0YS1udW1iZXJcIj4gI3tkZWF0aHNfcGVyXzEwMDB9IDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgXCJcIlwiXG4gICAgZWx0LmlubmVySFRNTCA9IFwiXCJcIlxuICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoIGRhdGEtc29ydC1tZXRob2Q9J25vbmUnIGNsYXNzPSduby1zb3J0IGN2LWRhdGEtcmFuayc+UmFuazwvdGg+XG4gICAgICAgICAgICA8dGggY2xhc3M9XCJjdi1kYXRhLWNvdW50cnlcIj5Db3VudHJ5PC90aD5cbiAgICAgICAgICAgIDx0aCBjbGFzcz1cImN2LWRhdGEtbnVtYmVyXCI+UG9wdWxhdGlvbjwvdGg+XG4gICAgICAgICAgICA8dGggY2xhc3M9XCJjdi1kYXRhLW51bWJlclwiPkNhc2VzPC90aD5cbiAgICAgICAgICAgIDx0aCBjbGFzcz1cImN2LWRhdGEtbnVtYmVyXCI+cGVyIDEwMDA8L3RoPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwiY3YtZGF0YS1udW1iZXJcIj5EZWF0aHM8L3RoPlxuICAgICAgICAgICAgPHRoIGNsYXNzPVwiY3YtZGF0YS1udW1iZXJcIj5wZXIgMTAwMDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgICN7cm93c31cbiAgICAgICAgPC90Ym9keT5cbiAgICBcIlwiXCJcbiAgICByZXR1cm4gZWx0XG5cbiAgaW5zdGFsbDogPT5cbiAgICBAcGFyZW50X2VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEBpZClcbiAgICBAZWx0ID0gYXdhaXQgQGNyZWF0ZV90YWJsZV9lbHQoKVxuICAgIG5ldyBUYWJsZXNvcnQoQGVsdClcbiAgICBAcGFyZW50X2VsdC5hcHBlbmRDaGlsZChAZWx0KVxuXG5cbmNvdmlkX2RhdGEgPSBuZXcgQ292aWRfRGF0YSgnY29yb25hLXZpcnVzLWRhdGEnKVxuXG5pZiB3aW5kb3c/IFxuICB3aW5kb3cuY292aWRfZGF0YSA9IGNvdmlkX2RhdGFcbmVsc2VcbiAgZXhwb3J0cy5jb3ZpZF9kYXRhID0gY292aWRfZGF0YVxuIl19
//# sourceURL=/var/www/git/projects/Corona_Virus/src/covid_data.coffee