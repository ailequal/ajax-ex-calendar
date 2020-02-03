// code
$(document).ready(function() {

  // api
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
    method: "GET",
    success: function(data, state) {
      console.log(data);
    },
    error: function(request, state, error) {
      console.log(error);
    }
  });


  // handlebars
  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var context = {
    day: "first day",
  };
  var html = template(context);
  $('.calendar').append(html);


  // moment.js
  var date1 = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(date1);
  var date2 = moment();
  console.log(date2);
  var date3 = moment("21-02-1993", "DD-MM-YYYY");
  console.log(date3.format());
  var date4 = moment();
  console.log(date4.month());

});
