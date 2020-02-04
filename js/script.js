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
  });

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

  // function
  // show next month
  function nextMonth() {
    // code
  }

  // show previous month
  function previousMonth() {
    // code
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
