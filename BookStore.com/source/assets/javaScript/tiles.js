var subjects = ['PHP', 'Java', 'MySql', 'Python', 'jQuery', 'HTML'];
var pageEnd = 0;
var curBook = subjects[0];
var curPage = 1;
var max_display = 5;

function bookHistory(bName, bPage)  {
  history.pushState({myBook: bName, myPage: bPage}, null, "/" + bName + '/'+ bPage);
}

function mainFunctions()  {
  bookHistory(curBook, curPage);
  tiles().initialize(curBook, curPage);
}
//loader code starts from here
function loader() {
  var load = '<div class="loader"></div>';
  $('#book-container').append(load);
}

window.onload = function()  {
  loader();
  bookHistory(subjects[0], 1);
  tiles().initialize(subjects[0], 1);
};
//side bar menu code
for (var j in subjects)  {
  var menu = $('<div></div>').addClass('menu btn btn-lg').attr('data-id',subjects[j]).append(subjects[j]);
  $('#side').append(menu);
}

//heart icon on top
$('.heartIcon').on('click',function() {
  $(this).toggleClass('heart-click');
});

//Click event code
function menuClick()  {
  $('.menu').on('click', function() {
    var search = $(this).attr('data-id');
    curBook = search;
    curPage = 1;
    bookHistory(search, curPage);
    tiles().initialize(search, 1);
  });
}
menuClick();

window.addEventListener('popstate', function(e) {
  if (e.state != null) {
      tiles().initialize(e.state.myBook, e.state.myPage);
  }
  else {
    tiles().initialize(subjects[0], 1);
  }
});


//click events
function nextPrevClickEvents()  {
  $('#prev').on('click', function() {
    var goTo = 0;
    if (parseInt(curPage) == 1) {
      curPage = 1;
    }
    else {
      curPage = parseInt(curPage)-1;
    }
    mainFunctions()
  });

  $('#next').on('click', function() {
    var goTo = 0;
    if (parseInt(curPage) >= pageEnd - 1) {
      curPage = curPage - 1;
    }
    else {
      curPage = parseInt(curPage)+1;
    }
    mainFunctions()
  });
}
nextPrevClickEvents();
