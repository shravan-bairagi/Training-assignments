var BirthdayData = {'John': '05 30', 'Smith': '00 02', 'Ram':'03 20', 'Anna':'06 29', 'Riya': '07 10', 'Abc':'07 15', 'Thor':'02 25', 'Captain':'03 05', 'Benner':'04 20', 'Anil':'05 07', 'Rogers':'06 10', 'Strange':'06 25', 'Strac':'08 02', 'Tony':'08 05', 'King':'09 17', 'Johnson':'10 02', 'Singh':'11 13'};
var fullMonthNames =
['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
var weekDayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
var monthNames =
['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var startYear = 2010;
var endYear = 2030;
var month = 0;
var year = 0;
var selectedDays = 0;
var dateRange = [];
var eventData = {};
var valueOfEventDisplay = 0;

$(window).on('load', function() {
  $('#date-event').append('<div class="event-info">No events for today !</div>');
});

function eventDisplay() {
  var eventKey = Object.keys(eventData);
  if (eventKey.length == 0) {
    $('#date-event').append('<div class="event-info">No events for today !</div>');
  }
  else {
    for (var p in eventKey) {
      var eventDay = eventKey[p];
      if (parseInt(valueOfEventDisplay) == parseInt(eventDay)) {
        var myEventTit = eventData[valueOfEventDisplay][0];
        var myEventDes = eventData[valueOfEventDisplay][1];
        var curEvent = myEventTit.title.length;
        console.log(eventData);
        $('#date-event').empty();
        for (var v = 0; v < curEvent; v++) {
          $('#date-event').append('<div class="event-title">' + (v+1) + "." +myEventTit.title[v]+'</div>');
          $('#date-event').append('<div class="event-info">'+myEventDes.desc[v]+'</div>');
        }
        break;
      }
      else {
        $('#date-event').empty();
        $('#date-event').append('<div class="event-info">No events for today !</div>');
      }
    }
  }
}
//This is for week day names
for (var i in weekDayNames) {
  var weekBar = $('#weeker');
  var localDay = document.createElement('div');
  $(localDay).addClass('week-day');
  $(localDay).text(weekDayNames[i]);
  $(weekBar).append(localDay);
}

function daysInMonth(month, year) {
  var d = new Date(year, month + 1, 0);
  return d.getDate();
}
//setting up default view
var date = new Date();
var todayYear = date.getFullYear();
var todayMonth = date.getMonth();
var todayDate = date.getDate();
month = date.getMonth();
year = date.getFullYear();
$('#MonthNames').text(fullMonthNames[month] + '-');
$('#yearNames').text(year);
// to display days
var date = new Date(year, month, 1);
var dayOfWeek = date.getDay();
var dateDiv = $('#date-days');
//This is to date display
function dateDisplayBar() {
  var i;
  var date = new Date(year, month, 1);
  var totalDays = daysInMonth(month, year);
  var dayOfWeek = date.getDay();
  var preMon = new Date(year, month);
  preMon.setMonth(month, 0);
  var preTotalDays = preMon.getDate();
  var preStartDay = preTotalDays - dayOfWeek + 1;
  for (var k = preStartDay; k <= preTotalDays; k++) {
    var preDays = document.createElement('div');
    $(preDays).addClass('day');
    $(preDays).text(k);
    $(dateDiv).append(preDays);
  }

  for(var i = 1; i <= totalDays; i ++) {
    var temp = i;
    var bMonth = month;
    var curDays = document.createElement('div');
    if ((todayDate == i) && (todayMonth == month) && (todayYear == year)) {
        $(curDays).addClass('today');
    }
    $(curDays).addClass('day-number');
    $(curDays).attr('id', temp);
    var innerButton = '<span id="'+ temp +'" class="btn innerDate">' + temp + '</span>';
    $(curDays).append(innerButton);
    curDays.dataset.myday = temp;
    //functionality for clicking of specific event buttons
  $('.innerDate').on('click', function()  {
    event. stopPropagation();
    var eventKey = Object.keys(eventData);
    valueOfEventDisplay = $(this).attr('id');
    for (var x in eventKey) {
      if (parseInt(eventKey[x]) == parseInt(valueOfEventDisplay)) {
        eventDisplay();
        $('#display-event').modal('show');
      }
    }
  });
    // Add event button on hover code
    function addEventButton() {
      var addEvent = '<div id="my-event" class="add-event-button btn">+Add event</div>';
      $('.event-btn-container').empty();
      $('.event-btn-container').append(addEvent);
      $('#my-event').on('click' ,function() {
        $('#event-modal').modal('show');
      });
    }
    //click event for date and range
    $(curDays).on('click', function() {
      dateRange.push(this.dataset.myday);
      $('.day-number').removeClass('selectedDay');
      $(this).addClass('selectedDay');
      if (dateRange.length == 1) {
        addEventButton();
      }
      else if (dateRange.length == 2) {
        var firstSelect = parseInt(dateRange[0]);
        var secondSelect = parseInt(dateRange[1]);

        if(firstSelect < secondSelect)  {
          $('.event-btn-container').empty();
          var rangeMessage = '<div>You have selected dates from ' + firstSelect + ' to ' + secondSelect + '</div>'
          $('.event-btn-container').append(rangeMessage);
          for (var o = firstSelect; o <= secondSelect; o++)  {
            $('#'+o).addClass('selectedDay');
          }
        }
        else if (secondSelect == firstSelect) {
          $('.event-btn-container').empty();
          var rangeMessage = '<div>You have selected only one date ' + firstSelect + '</div>'
          $('.event-btn-container').append(rangeMessage);
          $('#' + firstSelect).addClass('selectedDay');
        }
        else if (secondSelect < firstSelect) {
          $('.event-btn-container').empty();
          var rangeMessage = '<div>You have selected dates from ' + secondSelect + ' to ' + firstSelect + '</div>'
          $('.event-btn-container').append(rangeMessage);
          for (var o = secondSelect; o <= firstSelect; o++)  {
            $('#' + o).addClass('selectedDay');
          }
        }
        else {
          addEventButton();
        }
        dateRange = [];
      }
      //This code belongs to events
      if (selectedDays != this.dataset.myday) {
        selectedDays = 0;
        selectedDays = this.dataset.myday;
      }

      $('#date-event').empty();
    });
    $(dateDiv).append(curDays);
    for(var l in BirthdayData) {
      var hbmonth = BirthdayData[l].slice(0, 2);
      hbmonth = parseInt(hbmonth);
      var birthDate = BirthdayData[l].slice(3, 5);
      birthDate = parseInt(birthDate);
      if ((birthDate == temp) && (hbmonth == bMonth)) {
        // $(curDays).addClass('birthday');
        var ttip = document.createElement('span');
        $(ttip).addClass('tooltiptext');
        $(ttip).text('Happy BirthDay ' + l);
        // $(curDays).append(ttip);
      }
    }
  }
  // Next Month dates display
  var nextDate = new Date(year, month);
  nextDate.setMonth(month, 1);
  var nextStartDay = nextDate.getDate();
  var nextEndDay = 42 - totalDays - dayOfWeek;
  for (var u = nextStartDay; u <= nextEndDay; u++)  {
    var nextDays = document.createElement('div');
    $(nextDays).addClass('day');
    $(nextDays).text(u);
    $(dateDiv).append(nextDays);
  }
}
dateDisplayBar();
// arrow functionality code starts from here
var previous = $("#move-previous");
var next = $("#move-next");
function previousFunction() {
  if (month == 0) {
    month = 11;
  }
  else {
    month = month - 1;
  }
  if (month == 11)  {
    year = year-1;
  }
  $('#MonthNames').text(fullMonthNames[month] + '-');
  $('#yearNames').text(year);
  $(dateDiv).text('');
  monthDropDown()
  yearDropDown()
  dateDisplayBar();
}

function nextFunction() {
  if (month == 11) {
    month = 0;
  }
  else {
    month = month + 1;
  }
  if (month == 0)  {
    year = year+1;
  }
  $('#MonthNames').text(fullMonthNames[month] + '-');
  $('#yearNames').text(year);
  $(dateDiv).text('');
  monthDropDown()
  yearDropDown()
  dateDisplayBar();
}
//for year dropdown
function yearDropDown() {
  for (var i = startYear; i <= endYear; i++ ) {
    var y = document.createElement('option');
    $(y).text(i);
    $(y).val(i);
    $('#year-content').val(year);
    $('#year-content').append(y);
  }
}
yearDropDown();

function changeYear() {
  var selectedYear = $('#year-content').val();
  $('#yearNames').text(selectedYear);
  year = parseInt(selectedYear);
  var date = new Date(year, month, 1);
  var dayOfWeek = date.getDay();
  $(dateDiv).text('');
  dateDisplayBar();
}
// for month dropdown
function monthDropDown()  {
  for (var i in monthNames) {
    var x = document.createElement("option");
    $(x).text(monthNames[i]);
    $(x).val(i);
    $("#month-content").val(month);
    $("#month-content").append(x);
  }
}
monthDropDown();

function changeMonth()  {
  var selectedMonth = $("#month-content").val();
  $("#MonthNames").text(fullMonthNames[selectedMonth] + '-');
  month = parseInt(selectedMonth);
  $(dateDiv).text('');
  dateDisplayBar();
}
//Event Handling Starts from here
function formSubmission(event) {
  var eventKey = Object.keys(eventData);
  $('#' + selectedDays).css('color', 'blue');
  if (selectedDays == 0)  {
    selectedDays = todayDate;
    eventData[selectedDays] = [{title:[$('#event-name').val()]}, {desc:[$('#event-description').val()]}];
  }
  else {
    if (eventKey.length == 0) {
      eventData[selectedDays] = [{title:[$('#event-name').val()]}, {desc:[$('#event-description').val()]}];
    }
    else {
      if (selectedDays in eventData) {
        eventData[selectedDays][0]["title"].push($('#event-name').val());
        eventData[selectedDays][1]["desc"].push($('#event-description').val());
      }
      else {
        eventData[selectedDays] = [{title:[$('#event-name').val()]}, {desc:[$('#event-description').val()]}];
      }
    }
  }
  eventDisplay();
}
