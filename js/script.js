// code
$(document).ready(function() {

  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);


  // ajax call for holidays api
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    success: function(data, state) {
      // moment.js
      var january = moment("2018-01-01", "YYYY-MM-DD").locale('it');
      var monthHolidays = data.response;
      console.log(monthHolidays);
      console.log(january);
      for (var i = 0; i < 31; i++) {
        var day = january.format("dddd DD MMMM");
        // handlebars template
        var context = {
          'day' : day
        };
        var html = template(context);
        $('.calendar ul').append(html);
        if (scanDate(monthHolidays, january)) {
          $('.calendar ul li:last-child').addClass('red');
          console.log('if');
          console.log(monthHolidays[i].date);
          console.log(january._i);
        }
        // add a day to the month
        january.add(1, 'day');
        // test
      }
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });

  // function
  // scan an array with objects .date and an object .date
  function scanDate(array, object) {
    var i = 0;
    while (i < array.length) {
      var arrayDate = array[i].date;
      var objectDate = object._i;
      if (arrayDate === objectDate) {
        return true;
      }
      i++;
    }
    return false;
  }

  // test
  var array = [
    {
      'date' : '2020-01-01'
    },
    {
      'date' : '2020-03-01'
    },
    {
      'date' : '2020-05-01'
    },
    {
      'date' : '2020-01-20'
    }
  ];

  var object = {
    '_i' : '2020-01-200'
  }

  console.log(scanDate(array, object));

});


// bugs
// make the code dynamic for all months
