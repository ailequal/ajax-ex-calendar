// code
$(document).ready(function() {

  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);


  // moment.js
  var january = moment("2018-01-01", "YYYY-MM-DD").locale('it');
  console.log(january);
  for (var i = 0; i < 31; i++) {
    var day = january.format("dddd DD MMMM");
    var dayElement = january.format("YYYY-MM-DD");
    // handlebars template
    var context = {
      'day' : day,
      'data-element' : dayElement
    };
    var html = template(context);
    $('.calendar ul').append(html);
    january.add(1, 'day');
  };


  // function
  // add red to holidays
  function addRed(month) {
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      method: "GET",
      data: {
        'year' : 2018,
        'month' : month
      },
      success: function(data, state) {
        console.log(data.response);
      },
      error: function(request, state, error) {
        console.log(error);
      }
    });
  }

  // test
  var december = addRed(11);

});


// bugs
// make the code dynamic for all months
