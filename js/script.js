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

  // moment.js
  var january = moment("2018-01-01", "YYYY-MM-DD").locale('it');
  // scan all the month
  for (var i = 0; i < 31; i++) {
    var day = january.format("dddd DD MMMM");
    var dayElement = january.format("YYYY-MM-DD");
    // handlebars
    var source = $('#template').html();
    var template = Handlebars.compile(source);
    var context = {
      'day' : day,
      'data-element' : dayElement
    };
    var html = template(context);
    // add the day to the html
    $('.calendar ul').append(html);
    january.add(1, 'day');
  };

  // test
  var month = addHolidays(0);


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
        'year' : 2018,
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
            // if data-element match add red
            if (dataElement == arrayElement) {
              $(this).addClass('red');
            }
          });
        }
      },
      error: function(request, state, error) {
        console.log(error);
      }
    });
  }

});


// bugs
// make the code dynamic for all months
