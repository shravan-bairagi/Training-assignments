window.tiles = function() {
  var tile = {};
  var pageNumber = $('#page-number');
  max_display = 5;

  tile.initialize = function(bookName, pageNo)  {
    $.ajax({url: 'https://cors-anywhere.herokuapp.com/https://api.itbook.store/1.0/search/'+ bookName + '/' + pageNo,headers: {'Access-Control-Allow-Origin': '*'}, type: 'GET', success: function(data) {
      var book = data.books;
      var totalData = parseInt(data.total);
      $('#book-container').empty();

      $(document).ready(function () {
        $('.my-link').on('click', function ()  {
          console.log('hello');
          var linkId = $(this).attr('id');
          $.get('https://cors-anywhere.herokuapp.com/https://api.itbook.store/1.0/books/'+ linkId, function(modalData, status){
            console.log(modalData);
            $('.modal-title div').append(modalData.title);
            $('#model-img').attr('src', modalData.image);
            $('#model-subtitle').text(modalData.subtitle);
            $('#model-price').text('Price: ' + modalData.price);
            $('#model-isbn').text('ISBN13: ' + modalData.isbn13);
          });
        });

        // Rating code starts from here
        function ratingStarDisplay()  {
          var rateScale = $('<div></div>').addClass('title');
          for (var q = 1; q <= max_display; q++)  {
            $(rateScale).append($('<i></i>').addClass('rating fa fa-star').attr('data-id', q));
          }
          $('.info-box').append(rateScale);
        }
        ratingStarDisplay();

        $('.rating').on('click', function()  {
          let tempThis = $(this);
          tempThis.prevAll().addClass('golden');
          tempThis.addClass('golden');
          tempThis.nextAll().removeClass('golden')
        });

        //heart icon on top
        $('.heartIcon').on('click',function() {
          $(this).toggleClass('heart-click');
        });
      });


      $.get({url: '../assets/templates/template.mustache', 'Access-Control-Allow-Origin': '*', type: 'GET', success:
        function (template) {
          var output = Mustache.render(template, data);
          $('#book-container').append(output);
        }});
      //pagination code starts from here
      function bottomPagination() {

        pageEnd = parseInt(data.total) / 10 + 1;
        pageNumber.empty();
        var displayPages = [];
        displayPages.length = 0;
        for (var m = parseInt(curPage); m <= parseInt(curPage) + 4; m++)  {
          displayPages.push(m);
        }
        for (var u = 1; u <= pageEnd; u++)  {
          for (var b in displayPages) {
            if (u == displayPages[b]) {
              pageNumber.append($('<div></div>').addClass('page-nu btn pagination').attr('data-id', u).text(u));
            }
            else {
              pageNumber.append($('<div></div>').addClass('page-no btn pagination').attr('data-id', u).text(u));
            }
          }

          var pageN = $('.page-nu ');
          if ( u == curPage) {
            pageN.addClass('active');
            pageN.prevAll().removeClass('active');
          }
        }

        function pagerClick() {
          var pageN = $('.page-nu ');
          pageN.on('click', function() {
            curPage = $(this).attr('data-id');
            mainFunctions()
          });
        }
        pagerClick();
      }
      bottomPagination();
    }});
  }
  return tile;
};
