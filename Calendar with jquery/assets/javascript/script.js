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
var date = new Date();
var todayYear = date.getFullYear();
var todayMonth = date.getMonth();
var todayDate = date.getDate();
var eventButton = $('.event-btn-container');
var dateEvent = $('#date-event');
var centerMonth = $("#month-content");
var centerYear = $('#year-content');
var dropdownMonth = $('#MonthNames');
var dropdownYear = $('#yearNames');

$(window).on('load', function() {
  $('#date-event').append('<div class="event-info">No events for today !</div>');
});

function eventDisplay() {
  var eventKey = Object.keys(eventData);
  if (eventKey.length == 0) {
    dateEvent.append('<div class="event-info">No events for today !</div>');
  }
  else {
    function eventModalData() {
      for (var p in eventKey) {
        var eventDay = eventKey[p];
        if (parseInt(valueOfEventDisplay) == parseInt(eventDay)) {
          var myEventTit = eventData[valueOfEventDisplay][0];
          var myEventDes = eventData[valueOfEventDisplay][1];
          var curEvent = myEventTit.title.length;
          console.log(eventData);
          dateEvent.empty();
          for (var v = 0; v < curEvent; v++) {
            dateEvent.append('<div class="event-title">' + (v+1) + "." +myEventTit.title[v]+'</div>');
            dateEvent.append('<div class="event-info">'+myEventDes.desc[v]+'</div>');
          }
          break;
        }
        else {
          dateEvent.empty();
          dateEvent.append('<div class="event-info">No events for today !</div>');
        }
      }
    }
    eventModalData();
  }
}
//This is for week day names
function nameOfWeekDays() {
  for (var i in weekDayNames) {
    var weekBar = $('#weeker');
    var localDay = document.createElement('div');
    $(localDay).addClass('week-day');
    $(localDay).text(weekDayNames[i]);
    $(weekBar).append(localDay);
  }
}
nameOfWeekDays();

function daysInMonth(month, year) {
  var d = new Date(year, month + 1, 0);
  return d.getDate();
}
//setting up default view

month = date.getMonth();
year = date.getFullYear();
dropdownMonth.text(fullMonthNames[month] + '-');
dropdownYear.text(year);
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
  function prevMonthDisableDays() {
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
  }
  prevMonthDisableDays();

  function currentMonthDays() {
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
        eventButton.empty();
        eventButton.append(addEvent);
        $('#my-event').on('click' ,function() {
          $('#event-modal').modal('show');
        });
      }
      //click event for date and range
      function clearRangeButton() {
        var clear = '<button id="clear" class="btn">Clear Range</button>';
        eventButton.append(clear);
        $('#clear').on('click', function()  {
          dateRange = [];
          $('.day-number').removeClass('selectedDay');
          eventButton.empty();
        });
      }
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

          function rangeSelectionMessage(small, big)  {
            eventButton.empty();
            var rangeMessage = '<div>You have selected dates from ' + small + ' to ' + big + '</div>'
            eventButton.append(rangeMessage);
            for (var o = small; o <= big; o++)  {
              $('#'+o).addClass('selectedDay');
            }
          }

          if(firstSelect < secondSelect)  {
            rangeSelectionMessage(firstSelect, secondSelect);
            clearRangeButton()
          }
          else if (secondSelect == firstSelect) {
            eventButton.empty();
            var rangeMessage = '<div>You have selected only one date ' + firstSelect + '</div>'
            eventButton.append(rangeMessage);
            $('#' + firstSelect).addClass('selectedDay');
            clearRangeButton();
          }
          else if (secondSelect < firstSelect) {
            rangeSelectionMessage(secondSelect, firstSelect);
            clearRangeButton()
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

        dateEvent.empty();
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
  }
  currentMonthDays();
  // Next Month dates display
  function nextMonthdays()  {
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
  nextMonthdays();
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
  dropdownMonth.text(fullMonthNames[month] + '-');
  dropdownYear.text(year);
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
  dropdownMonth.text(fullMonthNames[month] + '-');
  dropdownYear.text(year);
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
    centerYear.val(year);
    centerYear.append(y);
  }
}
yearDropDown();

function changeYear() {
  var selectedYear = centerYear.val();
  dropdownYear.text(selectedYear);
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
    centerMonth.val(month);
    centerMonth.append(x);
  }
}
monthDropDown();

function changeMonth()  {
  var selectedMonth = centerMonth.val();
  centerMonth.text(fullMonthNames[selectedMonth] + '-');
  month = parseInt(selectedMonth);
  $(dateDiv).text('');
  dateDisplayBar();
}
//Event Handling Starts from here
function formSubmission(event) {
  var eventDesc = $('#event-description');
  var eventName = $('#event-name');
  var eventKey = Object.keys(eventData);
  $('#' + selectedDays).css('color', 'blue');
  if (selectedDays == 0)  {
    selectedDays = todayDate;
    eventData[selectedDays] = [{title:[eventName.val()]}, {desc:[eventDesc.val()]}];
  }
  else {
    if (eventKey.length == 0) {
      eventData[selectedDays] = [{title:[eventName.val()]}, {desc:[eventDesc.val()]}];
    }
    else {
      if (selectedDays in eventData) {
        eventData[selectedDays][0]["title"].push(eventName.val());
        eventData[selectedDays][1]["desc"].push(eventDesc.val());
      }
      else {
        eventData[selectedDays] = [{title:[eventName.val()]}, {desc:[eventDesc.val()]}];
      }
    }
  }
  eventDisplay();
}
