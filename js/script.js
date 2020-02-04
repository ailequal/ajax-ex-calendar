// code
$(document).ready(function() {

  // show previous month when clicking previous
  $(document).on('click', '.previous', function() {
    console.log('previous');
  });

  // show next month when clicking next
  $(document).on('click', '.next', function() {
    console.log('next');
  });

  // date
  var year = 2018
  var month = 0;
  var day = 1;
  var date = moment({
    'year' : year,
    'month' : month,
    'day' : day
  }).locale('it');

  // cycle through all days inside the month
  for (var i = 1; i <= 31; i++) {
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
    $('.calendar ul').append(html);
  }

  addHolidays(month);

  // function
  // show next month
  function nextMonth() {
    // code
  }

  // show previous month
  function previousMonth() {
    // code
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
          $('.calendar ul li').each(function() {
            var dataElement = $(this).attr('data-element');
            var arrayElement = array[i].date;
            var arrayName = array[i].name;
            // if data-element matches add it and make it red
            if (dataElement == arrayElement) {
              $(this).addClass('red');
              $(this).append(' - ' + arrayName);
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
