// code
$(document).ready(function() {

  // date
  var year = 2018;
  var month = 0;
  var day = 1;

  // print first month and add holidays
  printMonth(month);
  addHolidays(month);

  // show previous month when clicking previous
  $(document).on('click', '.previous', function() {
    previousMonth();
  });

  // show next month when clicking next
  $(document).on('click', '.next', function() {
    nextMonth();
  });

  // function
  // show next month
  function nextMonth() {
    month++;
    if (month > 11) {
      alert('Sei arrivato alla fine del calendario.');
      month = 11;
    } else {
      printMonth(month);
      addHolidays(month);
    }
  }

  // show previous month
  function previousMonth() {
    month--;
    if (month < 0) {
      alert('Non sono presenti mesi antecedenti a gennaio.');
      month = 0;
    } else {
      printMonth(month);
      addHolidays(month);
    }
  }

  // print the days of the month
  function printMonth(month) {
    // date
    var date = moment({
      'year' : year,
      'month' : month,
      'day' : day
    });
    date.locale('it');
    var monthName = (date.format('MMMM').charAt(0).toUpperCase() + date.format('MMMM').slice(1));
    // days inside that specific month
    var days = date.daysInMonth();
    // clear everything inside the .calendar
    $('.calendar .days').text('');
    for (var i = 1; i <= days; i++) {
      var dateYMD = date.format("YYYY-MM" + '-' + addZero(i));
      // handlebars
      var source = $('#template').html();
      var template = Handlebars.compile(source);
      var context = {
        'day' : i,
        'data-element' : dateYMD
      };
      var html = template(context);
      // add the day to the html
      $('.calendar .days').append(html);
      // add monthName to the html
      $('.month').text(monthName);
    }
  }

  // add holidays for the selected month and make them red
  function addHolidays(month) {
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      method: "GET",
      data: {
        'year' : year,
        'month' : month
      },
      success: function(data, state) {
        // array with holiday objects
        var array = data.response;
        // scan the array
        for (var i = 0; i < array.length; i++) {
          // scan every day inside the html
          $('.calendar .day').each(function() {
            var dataElement = $(this).attr('data-element');
            var arrayElement = array[i].date;
            var arrayName = array[i].name;
            // if data-element matches add it and make it red
            if (dataElement == arrayElement) {
              $(this).addClass('red');
              $(this).append('<span>' + arrayName + '</span>');
            }
          });
        }
      },
      error: function(request, state, error) {
        console.log(error);
      }
    });
  }

  // add a zero to a number that is < 10
  function addZero(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }

});
