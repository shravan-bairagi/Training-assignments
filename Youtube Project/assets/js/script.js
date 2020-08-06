$(document).ready(function()  {
  var apiKey = 'AIzaSyDX1g5S0PfSxz1aW0DRyF0DI0gfzPYJ0AA';
  var search = '';

  window.onload = function()  {
    search = '';
    getVideo(apiKey, search, 50);
  };

  $('#enter').on('click', function(event)  {
    event.preventDefault();
    var search = $('#search-it').val();
    getVideo(apiKey, search, 50);
  });
  function getVideo(apiKey, search, maxResults) {
    $.get('https://www.googleapis.com/youtube/v3/search?key=' +apiKey+'&type=video&part=snippet&maxResults=' + maxResults + '&q=' + search, function(data, status){
      console.log(data);
      console.log(status);
      $('#videos').empty();
      for (var i in data.items) {
        var thumbnail = data.items[i].snippet.thumbnails.high.url;
        var description = data.items[i].snippet.title;
        var channelTitle = data.items[i].snippet.channelTitle;
        var image = $('<img>').addClass('video-tile').attr('src', thumbnail);
        // var info = Mustache.render('<div class="text-tile col-sm-11"></div>')
        var info = $('<div></div>').addClass('text-tile col-sm-11').text(description).append(title);
        var title = $('<div></div>').addClass('title-tile').text(channelTitle);
        var tile = $('<div></div>').addClass('vid-container col-sm-3').append(image).append(info);
        $('#videos').append(tile);
      }
    });
  }
});
