var BirthdayData = {'John': '05 30', 'Smith': '00 02', 'Ram':'03 20', 'Anna':'06 29', 'Riya': '07 10', 'Abc':'07 15', 'Thor':'02 25', 'Captain':'03 05', 'Benner':'04 20', 'Anil':'05 07', 'Rogers':'06 10', 'Strange':'06 25', 'Strac':'08 02', 'Tony':'08 05', 'King':'09 17', 'Johnson':'10 02', 'Singh':'11 13'};
var fullMonthNames =
['January','February','March','April','May','June','July',
    'August','September','October','November','December'];
var weekDayNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
var monthNames =
['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var startYear = 2010;
var endYear = 2030;
var month = 0;
var year = 0;
var selectedDays = [];
var counter = 0;
//This is for week day names
for (var i in weekDayNames) {
  var weekBar = document.getElementById('weeker');
  var localDay = document.createElement('div');
  localDay.className = 'week-day';
  localDay.innerHTML = weekDayNames[i];
  weekBar.appendChild(localDay);
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
document.getElementById('MonthNames').innerHTML = fullMonthNames[month];
document.getElementById('yearNames').innerHTML = year;
// to display days
var date = new Date(year, month, 1);
var dayOfWeek = date.getDay();
var dateDiv = document.getElementById('date-days');
//This is to date display
function dateDisplayBar() {
  var i;
  var totalDays = daysInMonth(month, year);
  var date = new Date(year, month, 1);
  var dayOfWeek = date.getDay();
  var preMon = new Date(year, month);
  preMon.setMonth(month, 0);
  var preTotalDays = preMon.getDate();
  var preStartDay = preTotalDays - dayOfWeek + 1;
  for (var k = preStartDay; k <= preTotalDays; k++) {
    var numBlank = document.createElement('div');
    numBlank.classList.add('day');
    numBlank.classList.add('day-number');
    numBlank.innerHTML = k;
    dateDiv.appendChild(numBlank);
  }

  for(var i = 1; i <= totalDays; i ++) {
    var temp = i;
    var birthFunctionMonth = month;
    var numHolder = document.createElement('div');
    if ((todayDate == i) && (todayMonth == month) && (todayYear == year)) {
        numHolder.classList.add('today');
    }
    numHolder.classList.add('day-number');
    numHolder.innerHTML = temp;
    numHolder.id = temp;
    numHolder.dataset.myday = temp;
    var eventInformation = document.getElementById('event-information');
    numHolder.addEventListener('click', function eventDisplay() {
      selectedDays.push(this);
      for (var t = 1; t <= totalDays; t++)  {
        document.getElementById('' + t).classList.remove('selectedDay');
      }
      if (selectedDays.length == 2) {
        var firstSelect = parseInt(selectedDays[0].id);
        var secondSelect = parseInt(selectedDays[1].id);
        if(firstSelect < secondSelect)  {
          for (var o = firstSelect; o <= secondSelect; o++)  {
            document.getElementById(''+o).classList.add('selectedDay');
          }
        }
        else if (secondSelect == firstSelect) {
          document.getElementById(firstSelect).classList.add('selectedDay');
        }
        else if (secondSelect < firstSelect) {
          for (var o = secondSelect; o <= firstSelect; o++)  {
            document.getElementById(''+o).classList.add('selectedDay');
          }
        }
        selectedDays = [];
      }
    });
    dateDiv.appendChild(numHolder);
    for(var l in BirthdayData) {
      var hbmonth = BirthdayData[l].slice(0, 2);
      hbmonth = parseInt(hbmonth);
      var birthDate = BirthdayData[l].slice(3, 5);
      birthDate = parseInt(birthDate);
      if ((birthDate == temp) && (hbmonth == birthFunctionMonth)) {
        numHolder.classList.add('birthday');
        var ttip = document.createElement('span');
        ttip.classList.add('tooltiptext');
        ttip.innerHTML = 'Happy BirthDay';
        numHolder.appendChild(ttip);
      }
    }
  }
  // Next Month dates display
  var nextDate = new Date(year, month);
  nextDate.setMonth(month, 1);
  var nextStartDay = nextDate.getDate();
  var nextEndDay = 42 - totalDays - dayOfWeek;
  for (var u = nextStartDay; u <= nextEndDay; u++)  {
    var nextDayHolder = document.createElement('div');
    nextDayHolder.classList.add('day');
    nextDayHolder.classList.add('day-number');
    nextDayHolder.innerHTML = u;
    dateDiv.appendChild(nextDayHolder);
  }
}
dateDisplayBar();
// arrow functionality code starts from here
var previous = document.getElementById("move-previous");
var next = document.getElementById("move-next");
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
  monthDis.innerHTML = fullMonthNames[month] + '-';
  yearLabel.innerHTML = year;
  dateDiv.innerHTML = "";
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
  monthDis.innerHTML = fullMonthNames[month];
  yearLabel.innerHTML = year;
  dateDiv.innerHTML = "";
  dateDisplayBar();
}
//for year dropdown
var yearLabel = document.getElementById('yearNames');
var dropYearMenu = document.getElementById('year-content');
for (var i = startYear; i <= endYear; i++ ) {
  var y = document.createElement('option');
  y.innerHTML = i;
  y.value = i;
  dropYearMenu.value = year;
  dropYearMenu.appendChild(y);
}

function changeYear() {
  var selectedYear = dropYearMenu.value;
  yearLabel.innerHTML = selectedYear;
  year = parseInt(selectedYear);
  var date = new Date(year, month, 1);
  var dayOfWeek = date.getDay();
  dateDiv.innerHTML = "";
  dateDisplayBar();
}
// for month dropdown
var monthDis = document.getElementById("MonthNames");
var dropMonthMenu = document.getElementById("month-content");
for (var i in monthNames) {
  var x = document.createElement("option");
  x.innerHTML = monthNames[i];
  x.value = i;
  dropMonthMenu.value = month;
  dropMonthMenu.appendChild(x);
}

function changeMonth()  {
  var selectedMonth = dropMonthMenu.value;
  monthDis.innerHTML = fullMonthNames[selectedMonth];
  month = parseInt(selectedMonth);
  dateDiv.innerHTML = "";
  dateDisplayBar();
}
