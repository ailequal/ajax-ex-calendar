// code
$(document).ready(function() {

  // api
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=5",
    method: "GET",
    success: function(data, state) {
      // console.log(data.response[0]);
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });


  // handlebars init
  var source = $('#template').html();
  var template = Handlebars.compile(source);


  // moment.js
  var january = moment("01-01-2018", "DD-MM-YYYY");
  for (var i = 0; i < 31; i++) {
    var day = january.format("dddd DD MMMM")

    // handlebars template
    var context = {
      day: day,
    };
    var html = template(context);
    $('.calendar ul').append(html);

    january.add(1, 'day');
  }

});


// bugs
// how to set date in italian?
