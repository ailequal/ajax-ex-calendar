// code
$(document).ready(function() {

  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);


  // moment.js
  // january
  var january = moment("2018-01-01", "YYYY-MM-DD").locale('it');
  // scan all the month
  for (var i = 0; i < 31; i++) {
    var day = january.format("dddd DD MMMM");
    var dayElement = january.format("YYYY-MM-DD");
    // handlebars template
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
  var month = addRed(0);


  // function
  // add red to holidays for the selected month
  function addRed(month) {
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
