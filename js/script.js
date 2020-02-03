$(document).ready(function() {

  console.log('hello world');

  var source = $('#template').html();
  var template = Handlebars.compile(source);

  var context = {
    subtitle: "hello world",
  };
  var html = template(context);
  $('body').append(html);

  var date = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(date);

});
