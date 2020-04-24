// Generated by CoffeeScript 2.5.1
(function() {
  //!/usr/bin/env coffee

  var CSSE_Covid_19_Data_Source, CSSE_Data_Admin2, CSSE_Data_Country_Region, CSSE_Data_Province_State, CSSE_Data_World, create_CSSE_Covid_19_Data, csv, fetch;

  if (typeof window !== "undefined" && window !== null) {
    fetch = window.fetch;
    csv = window.csv;
  } else {
    fetch = require('node-fetch');
    csv = require('csvtojson');
  }

  CSSE_Covid_19_Data_Source = class CSSE_Covid_19_Data_Source {
    constructor() {
      this.init = this.init.bind(this);
      this.date_to_url = this.date_to_url.bind(this);
      this.fetch_url = this.fetch_url.bind(this);
      
      // async
      this.fetch_csse_data = this.fetch_csse_data.bind(this);
      this.path = "/csse_covid_19_data/csse_covid_19_daily_reports";
      this.repo_root = "raw.githubusercontent.com/CSSEGISandData/COVID-19/master";
      this.date = new Date();
      this.url = this.date_to_url(this.date);
    }

    async init() {
      var csse_data;
      csse_data = (await this.fetch_csse_data());
      this.world = new CSSE_Data_World(csse_data);
      this.countries = this.world.countries;
      this.states = this.countries.US.states;
      return this;
    }

    date_to_url(date) {
      var csv_file, day, month, url, year;
      month = `0${date.getMonth() + 1}`.slice(-2);
      day = `0${date.getDate()}`.slice(-2);
      year = date.getFullYear();
      csv_file = `${month}-${day}-${year}.csv`;
      url = `https://${this.repo_root}/${this.path}/${csv_file}`;
      return url;
    }

    fetch_url(url) {
      var e;
      try {
        return fetch(this.url);
      } catch (error) {
        e = error;
      }
    }

    async fetch_csse_data() {
      var csse_data, csv_str, res;
      this.url = this.date_to_url(this.date);
      res = (await this.fetch_url(this.url));
      while (res.status !== 200) {
        this.date.setDate(this.date.getDate() - 1);
        this.url = this.date_to_url(this.date);
        res = (await this.fetch_url(this.url));
      }
      csv_str = (await res.text());
      csse_data = csv().fromString(csv_str);
      return csse_data;
    }

  };

  CSSE_Data_World = class CSSE_Data_World {
    constructor(data) {
      this.init = this.init.bind(this);
      this.data = data;
      this.countries = {};
      this.cases = 0;
      this.deaths = 0;
      this.init();
    }

    init() {
      var hash, i, key, len, ref, results, val, x;
      hash = {};
      ref = this.data;
      for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        this.cases += Number(x.Confirmed);
        this.deaths += Number(x.Deaths);
        key = x.Country_Region;
        if (hash[key]) {
          hash[key].push(x);
        } else {
          hash[key] = [x];
        }
      }
      results = [];
      for (key in hash) {
        val = hash[key];
        results.push(this.countries[key] = new CSSE_Data_Country_Region(this, val));
      }
      return results;
    }

  };

  CSSE_Data_Country_Region = class CSSE_Data_Country_Region {
    constructor(parent, data) {
      this.init = this.init.bind(this);
      this.parent = parent;
      this.data = data;
      this.states = {};
      this.cases = 0;
      this.deaths = 0;
      this.init();
    }

    init() {
      var hash, i, key, len, ref, results, val, x;
      hash = {};
      ref = this.data;
      for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        this.cases += Number(x.Confirmed);
        this.deaths += Number(x.Deaths);
        key = x['Province_State'];
        if (hash[key]) {
          hash[key].push(x);
        } else {
          hash[key] = [x];
        }
      }
      results = [];
      for (key in hash) {
        val = hash[key];
        results.push(this.states[key] = new CSSE_Data_Province_State(this, val));
      }
      return results;
    }

  };

  CSSE_Data_Province_State = class CSSE_Data_Province_State {
    constructor(parent, data) {
      this.init = this.init.bind(this);
      this.parent = parent;
      this.data = data;
      this.counties = {};
      this.cases = 0;
      this.deaths = 0;
      this.init();
    }

    init() {
      var county, hash, i, key, len, ref, results, val, x;
      hash = {};
      ref = this.data;
      for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        this.cases += Number(x.Confirmed);
        this.deaths += Number(x.Deaths);
        key = x['Admin2'];
        if (hash[key]) {
          hash[key].push(x);
        } else {
          hash[key] = [x];
        }
      }
      results = [];
      for (key in hash) {
        val = hash[key];
        county = new CSSE_Data_Admin2(this, val);
        results.push(this.counties[key] = county);
      }
      return results;
    }

  };

  CSSE_Data_Admin2 = class CSSE_Data_Admin2 {
    constructor(parent, data) {
      this.init = this.init.bind(this);
      this.parent = parent;
      this.data = data;
      this.cases = 0;
      this.deaths = 0;
      this.init();
    }

    init() {
      var d, i, len, ref, results;
      ref = this.data;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        d = ref[i];
        this.cases += Number(d.Confirmed);
        results.push(this.deaths += Number(d.Deaths));
      }
      return results;
    }

  };

  
  // async
  create_CSSE_Covid_19_Data = function() {
    var csse_Covid_19_Data;
    csse_Covid_19_Data = new CSSE_Covid_19_Data_Source();
    return csse_Covid_19_Data.init();
  };

  if (typeof window !== "undefined" && window !== null) {
    window.CSSE_Covid_19_Data_Source = CSSE_Covid_19_Data_Source;
    window.create_CSSE_Covid_19_Data = create_CSSE_Covid_19_Data;
  } else {
    exports.CSSE_Covid_19_Data_Source = CSSE_Covid_19_Data_Source;
    exports.create = create_CSSE_Covid_19_Data;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzZV9jb3ZpZF8xOV9kYXRhLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uIiwic291cmNlcyI6WyJzcmMvY3NzZV9jb3ZpZF8xOV9kYXRhLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0M7RUFBQTs7QUFBQSxNQUFBLHlCQUFBLEVBQUEsZ0JBQUEsRUFBQSx3QkFBQSxFQUFBLHdCQUFBLEVBQUEsZUFBQSxFQUFBLHlCQUFBLEVBQUEsR0FBQSxFQUFBOztFQUVELElBQUcsZ0RBQUg7SUFDRSxLQUFBLEdBQVEsTUFBTSxDQUFDO0lBQ2YsR0FBQSxHQUFNLE1BQU0sQ0FBQyxJQUZmO0dBQUEsTUFBQTtJQUlFLEtBQUEsR0FBUSxPQUFBLENBQVEsWUFBUjtJQUNSLEdBQUEsR0FBTSxPQUFBLENBQVEsV0FBUixFQUxSOzs7RUFRTSw0QkFBTixNQUFBLDBCQUFBO0lBRUUsV0FBYSxDQUFBLENBQUE7VUFNYixDQUFBLFdBQUEsQ0FBQTtVQU9BLENBQUEsa0JBQUEsQ0FBQTtVQVFBLENBQUEsZ0JBQUEsQ0FBQSxxQkFwQkY7OztVQTBCRSxDQUFBLHNCQUFBLENBQUE7TUExQkUsSUFBQyxDQUFBLElBQUQsR0FBUztNQUNULElBQUMsQ0FBQSxTQUFELEdBQWE7TUFDYixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksSUFBSixDQUFBO01BQ1IsSUFBQyxDQUFBLEdBQUQsR0FBTyxJQUFDLENBQUEsV0FBRCxDQUFhLElBQUMsQ0FBQSxJQUFkO0lBSkk7O0lBTVAsTUFBTixJQUFNLENBQUEsQ0FBQTtBQUNSLFVBQUE7TUFBSSxTQUFBLEdBQVksQ0FBQSxNQUFNLElBQUMsQ0FBQSxlQUFELENBQUEsQ0FBTjtNQUNaLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxlQUFKLENBQW9CLFNBQXBCO01BQ1QsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsS0FBSyxDQUFDO01BQ3BCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFNBQVMsQ0FBQyxFQUFFLENB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LElBQU0sQ0FBQSxDQUFBO0FBQ1IsVUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUE7QUFBSTtBQUFBO01BQUEsS0FBQSxxQ0FBQTs7UUFDRSxJQUFDLENBQUEsS0FBRCxJQUFVLE1BQUEsQ0FBTyxDQUFDLENBQUMsU0FBVDtxQkFDVixJQUFDLENBQUEsTUFBRCxJQUFXLE1BQUEsQ0FBTyxDQUFDLENBQUMsTUFBVDtNQUZiLENBQUE7O0lBREk7O0VBUFIsRUF2SEM7Ozs7RUFvSUQseUJBQUEsR0FBNEIsUUFBQSxDQUFBLENBQUE7QUFDNUIsUUFBQTtJQUFFLGtCQUFBLEdBQXNCLElBQUkseUJBQUosQ0FBQTtBQUN0QixXQUFPLGtCQUFrQixDQUFDLElBQW5CLENBQUE7RUFGbUI7O0VBSzVCLElBQUcsZ0RBQUg7SUFDRSxNQUFNLENBQUMseUJBQVAsR0FBbUM7SUFDbkMsTUFBTSxDQUFDLHlCQUFQLEdBQW1DLDBCQUZyQztHQUFBLE1BQUE7SUFLRSxPQUFPLENBQUMseUJBQVIsR0FBb0M7SUFDcEMsT0FBTyxDQUFDLE1BQVIsR0FBaUIsMEJBTm5COztBQXpJQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IGNvZmZlZVxuI1xuXG5pZiB3aW5kb3c/XG4gIGZldGNoID0gd2luZG93LmZldGNoXG4gIGNzdiA9IHdpbmRvdy5jc3ZcbmVsc2VcbiAgZmV0Y2ggPSByZXF1aXJlKCdub2RlLWZldGNoJylcbiAgY3N2ID0gcmVxdWlyZSgnY3N2dG9qc29uJylcblxuXG5jbGFzcyBDU1NFX0NvdmlkXzE5X0RhdGFfU291cmNlXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgQHBhdGggPSAgXCIvY3NzZV9jb3ZpZF8xOV9kYXRhL2Nzc2VfY292aWRfMTlfZGFpbHlfcmVwb3J0c1wiXG4gICAgQHJlcG9fcm9vdCA9IFwicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9DU1NFR0lTYW5kRGF0YS9DT1ZJRC0xOS9tYXN0ZXJcIlxuICAgIEBkYXRlID0gbmV3IERhdGUoKVxuICAgIEB1cmwgPSBAZGF0ZV90b191cmwoQGRhdGUpXG4gIFxuICBpbml0OiA9PlxuICAgIGNzc2VfZGF0YSA9IGF3YWl0IEBmZXRjaF9jc3NlX2RhdGEoKVxuICAgIEB3b3JsZCA9IG5ldyBDU1NFX0RhdGFfV29ybGQoY3NzZV9kYXRhKVxuICAgIEBjb3VudHJpZXMgPSBAd29ybGQuY291bnRyaWVzXG4gICAgQHN0YXRlcyA9IEBjb3VudHJpZXMuVVMuc3RhdGVzXG4gICAgcmV0dXJuIHRoaXNcbiAgICBcbiAgZGF0ZV90b191cmw6IChkYXRlKSA9PlxuICAgIG1vbnRoID0gXCIwI3tkYXRlLmdldE1vbnRoKCkrMX1cIlstMi4uXVxuICAgIGRheSA9IFwiMCN7ZGF0ZS5nZXREYXRlKCl9XCJbLTIuLl1cbiAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgY3N2X2ZpbGUgPSBcIiN7bW9udGh9LSN7ZGF5fS0je3llYXJ9LmNzdlwiXG4gICAgdXJsID0gXCJodHRwczovLyN7QHJlcG9fcm9vdH0vI3tAcGF0aH0vI3tjc3ZfZmlsZX1cIlxuICAgIHJldHVybiB1cmxcblxuICBmZXRjaF91cmw6ICh1cmwpID0+XG4gICAgdHJ5XG4gICAgICByZXR1cm4gZmV0Y2goQHVybClcbiAgICBjYXRjaCBlXG4gICAgICBcbiAgIyBhc3luY1xuICBmZXRjaF9jc3NlX2RhdGE6ID0+XG4gICAgQHVybCA9IEBkYXRlX3RvX3VybChAZGF0ZSlcbiAgICByZXMgPSBhd2FpdCBAZmV0Y2hfdXJsKEB1cmwpXG4gICAgd2hpbGUgcmVzLnN0YXR1cyAhPSAyMDBcbiAgICAgIEBkYXRlLnNldERhdGUoQGRhdGUuZ2V0RGF0ZSgpLTEpXG4gICAgICBAdXJsID0gQGRhdGVfdG9fdXJsKEBkYXRlKVxuICAgICAgcmVzID0gYXdhaXQgQGZldGNoX3VybChAdXJsKVxuICAgIGNzdl9zdHIgPSBhd2FpdCByZXMudGV4dCgpXG4gICAgY3NzZV9kYXRhID0gY3N2KCkuZnJvbVN0cmluZyhjc3Zfc3RyKVxuICAgIHJldHVybiBjc3NlX2RhdGFcblxuICBcblxuY2xhc3MgQ1NTRV9EYXRhX1dvcmxkXG5cbiAgY29uc3RydWN0b3I6IChAZGF0YSkgLT5cbiAgICBAY291bnRyaWVzID0ge31cbiAgICBAY2FzZXMgPSAwXG4gICAgQGRlYXRocyA9IDBcbiAgICBAaW5pdCgpXG5cbiAgaW5pdDogPT5cbiAgICBoYXNoID0ge31cbiAgICBmb3IgeCBpbiBAZGF0YVxuICAgICAgQGNhc2VzICs9IE51bWJlcih4LkNvbmZpcm1lZClcbiAgICAgIEBkZWF0aHMgKz0gTnVtYmVyKHguRGVhdGhzKVxuICAgICAga2V5ID0geC5Db3VudHJ5X1JlZ2lvblxuICAgICAgaWYgaGFzaFtrZXldXG4gICAgICAgIGhhc2hba2V5XS5wdXNoKHgpXG4gICAgICBlbHNlXG4gICAgICAgIGhhc2hba2V5XSA9IFt4XVxuICAgIGZvciBrZXksIHZhbCBvZiBoYXNoXG4gICAgICBAY291bnRyaWVzW2tleV0gPSBuZXcgQ1NTRV9EYXRhX0NvdW50cnlfUmVnaW9uKHRoaXMsIHZhbClcblxuICAgICAgXG5jbGFzcyBDU1NFX0RhdGFfQ291bnRyeV9SZWdpb25cblxuICBjb25zdHJ1Y3RvcjogKEBwYXJlbnQsIEBkYXRhKSAtPlxuICAgIEBzdGF0ZXMgPSB7fVxuICAgIEBjYXNlcyA9IDBcbiAgICBAZGVhdGhzID0gMFxuICAgIEBpbml0KClcblxuICBpbml0OiA9PlxuICAgIGhhc2ggPSB7fVxuICAgIGZvciB4IGluIEBkYXRhXG4gICAgICBAY2FzZXMgKz0gTnVtYmVyKHguQ29uZmlybWVkKVxuICAgICAgQGRlYXRocyArPSBOdW1iZXIoeC5EZWF0aHMpXG4gICAgICBrZXkgPSB4WydQcm92aW5jZV9TdGF0ZSddXG4gICAgICBpZiBoYXNoW2tleV1cbiAgICAgICAgaGFzaFtrZXldLnB1c2goeClcbiAgICAgIGVsc2VcbiAgICAgICAgaGFzaFtrZXldID0gW3hdXG4gICAgZm9yIGtleSwgdmFsIG9mIGhhc2hcbiAgICAgIEBzdGF0ZXNba2V5XSA9IG5ldyBDU1NFX0RhdGFfUHJvdmluY2VfU3RhdGUodGhpcywgdmFsKVxuXG5cbmNsYXNzIENTU0VfRGF0YV9Qcm92aW5jZV9TdGF0ZVxuICBcbiAgY29uc3RydWN0b3I6IChAcGFyZW50LCBAZGF0YSkgLT5cbiAgICBAY291bnRpZXMgPSB7fVxuICAgIEBjYXNlcyA9IDBcbiAgICBAZGVhdGhzID0gMFxuICAgIEBpbml0KClcbiAgICBcbiAgaW5pdDogPT5cbiAgICBoYXNoID0ge31cbiAgICBmb3IgeCBpbiBAZGF0YVxuICAgICAgQGNhc2VzICs9IE51bWJlcih4LkNvbmZpcm1lZClcbiAgICAgIEBkZWF0aHMgKz0gTnVtYmVyKHguRGVhdGhzKVxuICAgICAga2V5ID0geFsnQWRtaW4yJ11cbiAgICAgIGlmIGhhc2hba2V5XVxuICAgICAgICBoYXNoW2tleV0ucHVzaCh4KVxuICAgICAgZWxzZVxuICAgICAgICBoYXNoW2tleV0gPSBbeF1cbiAgICBmb3Iga2V5LCB2YWwgb2YgaGFzaFxuICAgICAgY291bnR5ID0gbmV3IENTU0VfRGF0YV9BZG1pbjIodGhpcywgdmFsKVxuICAgICAgQGNvdW50aWVzW2tleV0gPSBjb3VudHlcblxuXG5jbGFzcyBDU1NFX0RhdGFfQWRtaW4yXG5cbiAgY29uc3RydWN0b3I6IChAcGFyZW50LCBAZGF0YSkgLT5cbiAgICBAY2FzZXMgPSAwXG4gICAgQGRlYXRocyA9IDBcbiAgICBAaW5pdCgpXG4gICAgXG4gIGluaXQ6ID0+XG4gICAgZm9yIGQgaW4gQGRhdGFcbiAgICAgIEBjYXNlcyArPSBOdW1iZXIoZC5Db25maXJtZWQpXG4gICAgICBAZGVhdGhzICs9IE51bWJlcihkLkRlYXRocylcbiAgICBcbiMgYXN5bmNcbmNyZWF0ZV9DU1NFX0NvdmlkXzE5X0RhdGEgPSAtPlxuICBjc3NlX0NvdmlkXzE5X0RhdGEgID0gbmV3IENTU0VfQ292aWRfMTlfRGF0YV9Tb3VyY2UoKVxuICByZXR1cm4gY3NzZV9Db3ZpZF8xOV9EYXRhLmluaXQoKVxuXG4gICBcbmlmIHdpbmRvdz9cbiAgd2luZG93LkNTU0VfQ292aWRfMTlfRGF0YV9Tb3VyY2UgPSBDU1NFX0NvdmlkXzE5X0RhdGFfU291cmNlXG4gIHdpbmRvdy5jcmVhdGVfQ1NTRV9Db3ZpZF8xOV9EYXRhID0gY3JlYXRlX0NTU0VfQ292aWRfMTlfRGF0YVxuXG5lbHNlXG4gIGV4cG9ydHMuQ1NTRV9Db3ZpZF8xOV9EYXRhX1NvdXJjZSA9IENTU0VfQ292aWRfMTlfRGF0YV9Tb3VyY2VcbiAgZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGVfQ1NTRV9Db3ZpZF8xOV9EYXRhXG5cbiJdfQ==
//# sourceURL=/usr/local/server/git/clones/covid_19_data/src/csse_covid_19_data.coffee