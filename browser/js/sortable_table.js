// Generated by CoffeeScript 2.5.1
(function() {
  //!/usr/bin/env coffee

  var Sortable_Table, Sortable_Table_Body, Sortable_Table_Header, deep, normal_sort;

  if (typeof window !== "undefined" && window !== null) {
    deep = window.deep;
  } else {
    deep = require('deep');
  }

  normal_sort = function(spec) {
    var column, direction;
    ({column, direction} = spec);
    return function(a, b) {
      if (direction === 'ascending') {
        [a, b] = [b, a];
      }
      if (a[column] < b[column]) {
        return 1;
      }
      if (a[column] > b[column]) {
        return -1;
      }
      return 0;
    };
  };

  Sortable_Table = class Sortable_Table {
    constructor(data, columns) {
      var column, i, len, ref;
      this.sort_data = this.sort_data.bind(this);
      // creates and installs new table element
      this.update = this.update.bind(this);
      this.highlight = this.highlight.bind(this);
      this.add_column = this.add_column.bind(this);
      this.handle_click = this.handle_click.bind(this);
      this.columns = columns;
      this.data = deep.copy(data);
      this.elt = document.createElement('table');
      this.elt.setAttribute('id', this.id);
      this.elt.setAttribute('class', 'sortable-table');
      this.thead = new Sortable_Table_Header(this);
      this.tbody = new Sortable_Table_Body(this);
      this.elt.appendChild(this.thead.elt);
      this.elt.appendChild(this.tbody.elt);
      this.defaults = {};
      ref = this.columns;
      for (i = 0, len = ref.length; i < len; i++) {
        column = ref[i];
        this.defaults[column.key] = column.sort_order;
      }
      this.current_sort = {
        column: null,
        direction: null
      };
    }

    async sort_data(spec) {
      var data, i, len, rank, row;
      console.log(`sort_data(${spec})`);
      data = (await this.data);
      data.sort(normal_sort(spec));
      rank = 1;
      for (i = 0, len = data.length; i < len; i++) {
        row = data[i];
        row.rank = rank++;
      }
      this.current_sort = spec;
      return this.update();
    }

    update() {
      var tbody;
      // create new <tbody> element from current data
      tbody = new Sortable_Table_Body(this);
      this.tbody.elt.replaceWith(tbody.elt);
      this.tbody = tbody;
      return this.highlight(this.current_sort.column);
    }

    highlight(key) {
      var className, i, j, len, len1, ref, ref1, results, td, th;
      className = key.replace(/_/g, '-');
      ref = this.thead.elt.getElementsByClassName('column-heading');
      for (i = 0, len = ref.length; i < len; i++) {
        th = ref[i];
        th.classList.remove('highlight');
      }
      ref1 = this.elt.getElementsByClassName(className);
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        td = ref1[j];
        results.push(td.classList.add('highlight'));
      }
      return results;
    }

    add_column(key, spec) {
      spec.key = key;
      return this.columns[key] = spec;
    }

    handle_click(column) {
      var defalt_order, direction;
      defalt_order = this.defaults[column];
      if (defalt_order !== 'none') {
        if (this.current_sort.column === column) {
          if (this.current_sort.direction === 'ascending') {
            direction = 'descending';
          } else {
            direction = 'ascending';
          }
        } else {
          direction = defalt_order;
        }
        return this.sort_data({column, direction});
      }
    }

  };

  Sortable_Table_Header = class Sortable_Table_Header {
    constructor(table) {
      var classes, column, i, len, ref, th;
      this.handle_click = this.handle_click.bind(this);
      this.table = table;
      this.elt = document.createElement('thead');
      this.elt.setAttribute('class', 'sortable-table-header');
      this.tr = document.createElement('tr');
      this.elt.setAttribute('id', 'table-header');
      ref = this.table.columns;
      for (i = 0, len = ref.length; i < len; i++) {
        column = ref[i];
        th = document.createElement('th');
        classes = column.classes.concat(['column-heading']);
        th.setAttribute('class', classes.join(' '));
        th.innerText = column.heading_text;
        th.onclick = this.handle_click(column.key);
        if (column.key !== 'rank') {
          th.onmouseover = this.handle_mouseover(th);
          th.onmouseout = this.handle_mouseout(th);
        }
        this.tr.appendChild(th);
      }
      this.elt.appendChild(this.tr);
    }

    handle_mouseover(th) {
      return function() {
        return th.classList.add('mouseover');
      };
    }

    handle_mouseout(th) {
      return function() {
        return th.classList.remove('mouseover');
      };
    }

    handle_click(key) {
      return () => {
        return this.table.handle_click(key);
      };
    }

  };

  Sortable_Table_Body = class Sortable_Table_Body {
    constructor(table) {
      var classes, i, j, len, len1, obj, ref, ref1, spec, td, tr;
      this.table = table;
      this.elt = document.createElement('tbody');
      this.elt.setAttribute('class', 'sortable-table-body');
      ref = this.table.data;
      for (i = 0, len = ref.length; i < len; i++) {
        obj = ref[i];
        tr = document.createElement('tr');
        tr.setAttribute('class', 'sortable-table-row');
        ref1 = this.table.columns;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          spec = ref1[j];
          td = document.createElement('td');
          classes = spec.classes.concat(['column-data']);
          td.setAttribute('class', spec.classes.join(' '));
          td.innerText = obj[spec.key];
          tr.appendChild(td);
        }
        this.elt.appendChild(tr);
      }
    }

  };

  if (typeof window !== "undefined" && window !== null) {
    window.Sortable_Table = Sortable_Table;
  } else {
    exports.Sortable_Table = Sortable_Table;
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGVfdGFibGUuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbInNyYy9zb3J0YWJsZV90YWJsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNDO0VBQUE7O0FBQUEsTUFBQSxjQUFBLEVBQUEsbUJBQUEsRUFBQSxxQkFBQSxFQUFBLElBQUEsRUFBQTs7RUFHRCxJQUFHLGdEQUFIO0lBQ0UsSUFBQSxHQUFPLE1BQU0sQ0FBQyxLQURoQjtHQUFBLE1BQUE7SUFJRSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsRUFKVDs7O0VBTUEsV0FBQSxHQUFjLFFBQUEsQ0FBQyxJQUFELENBQUE7QUFDZCxRQUFBLE1BQUEsRUFBQTtJQUFFLENBQUEsQ0FBQyxNQUFELEVBQVMsU0FBVCxDQUFBLEdBQXNCLElBQXRCO1dBQ0EsUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUE7TUFDRSxJQUFpQixTQUFBLEtBQWEsV0FBOUI7UUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILENBQUEsR0FBUSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQVI7O01BQ0EsSUFBWSxDQUFDLENBQUMsTUFBRCxDQUFELEdBQVksQ0FBQyxDQUFDLE1BQUQsQ0FBekI7QUFBQSxlQUFPLEVBQVA7O01BQ0EsSUFBYSxDQUFDLENBQUMsTUFBRCxDQUFELEdBQVksQ0FBQyxDQUFDLE1BQUQsQ0FBMUI7QUFBQSxlQUFPLENBQUMsRUFBUjs7QUFDQSxhQUFPO0lBSlQ7RUFGWTs7RUFTUixpQkFBTixNQUFBLGVBQUE7SUFFRSxXQUFhLENBQUMsSUFBRCxTQUFBLENBQUE7QUFDZixVQUFBLE1BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBO1VBZUUsQ0FBQSxnQkFBQSxDQUFBLHFCQWZGOztVQTBCRSxDQUFBLGFBQUEsQ0FBQTtVQU9BLENBQUEsZ0JBQUEsQ0FBQTtVQU9BLENBQUEsaUJBQUEsQ0FBQTtVQUlBLENBQUEsbUJBQUEsQ0FBQTtNQTdDb0IsSUFBQyxDQUFBO01BQ25C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ekI7QUFDQTtRQUFBLEtBQUEsd0NBQUE7O1VBQ0UsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCO1VBQ0wsT0FBQSxHQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBYixDQUFvQixDQUFDLGFBQUQsQ0FBcEI7VUFDVixFQUFFLENBQUMsWUFBSCxDQUFnQixPQUFoQixFQUF5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQWIsQ0FBa0IsR0FBbEIsQ0FBekI7VUFDQSxFQUFFLENBQUMsU0FBSCxHQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBTjtVQUNsQixFQUFFLENBQUMsV0FBSCxDQUFlLEVBQWY7UUFMRjtRQU1BLElBQUMsQ0FBQSxHQUFHLENBQUMsV0FBTCxDQUFpQixFQUFqQjtNQVRGO0lBSFc7O0VBRmY7O0VBaUJBLElBQUcsZ0RBQUg7SUFDRSxNQUFNLENBQUMsY0FBUCxHQUF3QixlQUQxQjtHQUFBLE1BQUE7SUFJRSxPQUFPLENBQUMsY0FBUixHQUF5QixlQUozQjs7QUE3SEMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBjb2ZmZWVcbiNcblxuXG5pZiB3aW5kb3c/XG4gIGRlZXAgPSB3aW5kb3cuZGVlcFxuXG5lbHNlXG4gIGRlZXAgPSByZXF1aXJlKCdkZWVwJylcblxubm9ybWFsX3NvcnQgPSAoc3BlYykgLT5cbiAge2NvbHVtbiwgZGlyZWN0aW9ufSA9IHNwZWNcbiAgKGEsYikgLT5cbiAgICBbYSxiXSA9IFtiLGFdIGlmIGRpcmVjdGlvbiA9PSAnYXNjZW5kaW5nJ1xuICAgIHJldHVybiAxIGlmIGFbY29sdW1uXSA8IGJbY29sdW1uXVxuICAgIHJldHVybiAtMSBpZiBhW2NvbHVtbl0gPiBiW2NvbHVtbl0gXG4gICAgcmV0dXJuIDAgXG5cblxuY2xhc3MgU29ydGFibGVfVGFibGVcblxuICBjb25zdHJ1Y3RvcjogKGRhdGEsIEBjb2x1bW5zKSAtPlxuICAgIEBkYXRhID0gZGVlcC5jb3B5KGRhdGEpXG4gICAgQGVsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcbiAgICBAZWx0LnNldEF0dHJpYnV0ZSgnaWQnLCBAaWQpXG4gICAgQGVsdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NvcnRhYmxlLXRhYmxlJylcbiAgICBAdGhlYWQgPSBuZXcgU29ydGFibGVfVGFibGVfSGVhZGVyKHRoaXMpXG4gICAgQHRib2R5ID0gbmV3IFNvcnRhYmxlX1RhYmxlX0JvZHkodGhpcylcbiAgICBAZWx0LmFwcGVuZENoaWxkKEB0aGVhZC5lbHQpXG4gICAgQGVsdC5hcHBlbmRDaGlsZChAdGJvZHkuZWx0KVxuICAgIEBkZWZhdWx0cyA9IHt9XG4gICAgZm9yIGNvbHVtbiBpbiBAY29sdW1uc1xuICAgICAgQGRlZmF1bHRzW2NvbHVtbi5rZXldID0gY29sdW1uLnNvcnRfb3JkZXJcbiAgICBAY3VycmVudF9zb3J0ID1cbiAgICAgIGNvbHVtbjogbnVsbFxuICAgICAgZGlyZWN0aW9uOiBudWxsXG5cbiAgc29ydF9kYXRhOiAoc3BlYykgPT5cbiAgICBjb25zb2xlLmxvZyhcInNvcnRfZGF0YSgje3NwZWN9KVwiKVxuICAgIGRhdGEgPSBhd2FpdCBAZGF0YVxuICAgIGRhdGEuc29ydChub3JtYWxfc29ydChzcGVjKSlcbiAgICByYW5rID0gMVxuICAgIGZvciByb3cgaW4gZGF0YVxuICAgICAgcm93LnJhbmsgPSByYW5rKytcbiAgICBAY3VycmVudF9zb3J0ID0gc3BlY1xuICAgIEB1cGRhdGUoKVxuXG4gICMgY3JlYXRlcyBhbmQgaW5zdGFsbHMgbmV3IHRhYmxlIGVsZW1lbnRcbiAgdXBkYXRlOiA9PlxuICAgICMgY3JlYXRlIG5ldyA8dGJvZHk+IGVsZW1lbnQgZnJvbSBjdXJyZW50IGRhdGFcbiAgICB0Ym9keSA9IG5ldyBTb3J0YWJsZV9UYWJsZV9Cb2R5KHRoaXMpXG4gICAgQHRib2R5LmVsdC5yZXBsYWNlV2l0aCh0Ym9keS5lbHQpXG4gICAgQHRib2R5ID0gdGJvZHlcbiAgICBAaGlnaGxpZ2h0KEBjdXJyZW50X3NvcnQuY29sdW1uKVxuXG4gIGhpZ2hsaWdodDogKGtleSkgPT5cbiAgICBjbGFzc05hbWUgPSBrZXkucmVwbGFjZSgvXy9nLCAnLScpXG4gICAgZm9yIHRoIGluIEB0aGVhZC5lbHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29sdW1uLWhlYWRpbmcnKVxuICAgICAgdGguY2xhc3NMaXN0LnJlbW92ZSgnaGlnaGxpZ2h0JylcbiAgICBmb3IgdGQgaW4gQGVsdC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlcbiAgICAgIHRkLmNsYXNzTGlzdC5hZGQoJ2hpZ2hsaWdodCcpXG5cbiAgYWRkX2NvbHVtbjogKGtleSwgc3BlYykgPT5cbiAgICBzcGVjLmtleSA9IGtleVxuICAgIEBjb2x1bW5zW2tleV0gPSBzcGVjXG5cbiAgaGFuZGxlX2NsaWNrOiAoY29sdW1uKSA9PlxuICAgIGRlZmFsdF9vcmRlciA9IEBkZWZhdWx0c1tjb2x1bW5dXG4gICAgaWYgZGVmYWx0X29yZGVyICE9ICdub25lJ1xuICAgICAgaWYgQGN1cnJlbnRfc29ydC5jb2x1bW4gPT0gY29sdW1uXG4gICAgICAgIGlmIEBjdXJyZW50X3NvcnQuZGlyZWN0aW9uID09ICdhc2NlbmRpbmcnXG4gICAgICAgICAgZGlyZWN0aW9uID0gJ2Rlc2NlbmRpbmcnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBkaXJlY3Rpb24gPSAnYXNjZW5kaW5nJ1xuICAgICAgZWxzZVxuICAgICAgICBkaXJlY3Rpb24gPSBkZWZhbHRfb3JkZXJcbiAgICAgIEBzb3J0X2RhdGEoe2NvbHVtbiwgZGlyZWN0aW9ufSlcblxuXG5jbGFzcyBTb3J0YWJsZV9UYWJsZV9IZWFkZXJcblxuICBjb25zdHJ1Y3RvcjogKEB0YWJsZSkgLT5cbiAgICBAZWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGhlYWQnKVxuICAgIEBlbHQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzb3J0YWJsZS10YWJsZS1oZWFkZXInKVxuICAgIEB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcbiAgICBAZWx0LnNldEF0dHJpYnV0ZSgnaWQnLCAndGFibGUtaGVhZGVyJylcbiAgICBmb3IgY29sdW1uIGluIEB0YWJsZS5jb2x1bW5zXG4gICAgICB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJylcbiAgICAgIGNsYXNzZXMgPSBjb2x1bW4uY2xhc3Nlcy5jb25jYXQoWydjb2x1bW4taGVhZGluZyddKVxuICAgICAgdGguc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzZXMuam9pbignICcpKVxuICAgICAgdGguaW5uZXJUZXh0ID0gY29sdW1uLmhlYWRpbmdfdGV4dFxuICAgICAgdGgub25jbGljayA9IEBoYW5kbGVfY2xpY2soY29sdW1uLmtleSlcbiAgICAgIGlmIGNvbHVtbi5rZXkgIT0gJ3JhbmsnXG4gICAgICAgIHRoLm9ubW91c2VvdmVyID0gQGhhbmRsZV9tb3VzZW92ZXIodGgpXG4gICAgICAgIHRoLm9ubW91c2VvdXQgPSBAaGFuZGxlX21vdXNlb3V0KHRoKVxuICAgICAgQHRyLmFwcGVuZENoaWxkKHRoKVxuICAgIEBlbHQuYXBwZW5kQ2hpbGQoQHRyKVxuXG4gIGhhbmRsZV9tb3VzZW92ZXI6ICh0aCkgLT5cbiAgICAtPiB0aC5jbGFzc0xpc3QuYWRkKCdtb3VzZW92ZXInKVxuICAgICAgXG4gIGhhbmRsZV9tb3VzZW91dDogKHRoKSAtPlxuICAgIC0+IHRoLmNsYXNzTGlzdC5yZW1vdmUoJ21vdXNlb3ZlcicpXG4gICAgICBcbiAgaGFuZGxlX2NsaWNrOiAoa2V5KSA9PlxuICAgID0+IEB0YWJsZS5oYW5kbGVfY2xpY2soa2V5KVxuXG5cblxuY2xhc3MgU29ydGFibGVfVGFibGVfQm9keVxuXG4gIGNvbnN0cnVjdG9yOiAoQHRhYmxlKSAtPlxuICAgIEBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG4gICAgQGVsdC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NvcnRhYmxlLXRhYmxlLWJvZHknKVxuICAgIGZvciBvYmogaW4gQHRhYmxlLmRhdGFcbiAgICAgIHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKVxuICAgICAgdHIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzb3J0YWJsZS10YWJsZS1yb3cnKVxuICAgICAgZm9yIHNwZWMgaW4gQHRhYmxlLmNvbHVtbnNcbiAgICAgICAgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpXG4gICAgICAgIGNsYXNzZXMgPSBzcGVjLmNsYXNzZXMuY29uY2F0KFsnY29sdW1uLWRhdGEnXSlcbiAgICAgICAgdGQuc2V0QXR0cmlidXRlKCdjbGFzcycsIHNwZWMuY2xhc3Nlcy5qb2luKCcgJykpXG4gICAgICAgIHRkLmlubmVyVGV4dCA9IG9ialtzcGVjLmtleV1cbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGQpXG4gICAgICBAZWx0LmFwcGVuZENoaWxkKHRyKVxuXG5cbmlmIHdpbmRvdz9cbiAgd2luZG93LlNvcnRhYmxlX1RhYmxlID0gU29ydGFibGVfVGFibGVcblxuZWxzZVxuICBleHBvcnRzLlNvcnRhYmxlX1RhYmxlID0gU29ydGFibGVfVGFibGVcbiAgXG4iXX0=
//# sourceURL=/usr/local/server/git/clones/sortable_table/src/sortable_table.coffee