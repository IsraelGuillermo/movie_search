const search = document.querySelector('#search');
const movie = document.querySelector('#movie');

$('#search').on('click', () => {
  let key = '34bbd0fa';
  let selectedMovie = movie.value.trim();
  let query =
    'https://www.omdbapi.com/?apikey=' + key + '&plot=short&s=' + selectedMovie;
  console.log(query);

  if (selectedMovie == '') {
    alert('You must enter a title!');
    return;
  } else {
    $('#centered-search').removeClass('centered').addClass('reduced-height');
    $('#movies').empty();

    $.ajax({
      url: query,
      method: 'GET',
    }).then(function (results) {
      // console.log(results.Search[0].Title);
      for (let i = 0; i < 8; i++) {
        let div = $('<div>').addClass('card card-float');
        let bodyDiv = $('<div>').addClass('card-body');
        let movieTitle = results.Search[i].Title;
        if (movieTitle.length > 20) {
          movieTitle = movieTitle.substring(0, 19).concat('...');
        }

        $('<h5>').addClass('card-title').text(movieTitle).appendTo(bodyDiv);
        $('<p>').text(results.Search[i].Year).appendTo(bodyDiv);
        $('<img src="' + results.Search[i].Poster + '">')
          .addClass('card-img-top')
          .appendTo(div);
        $('<button>')
          .text('See more')
          .addClass('btn btn-info')
          .attr('imdbID', results.Search[i].imdbID)
          .appendTo(bodyDiv);
        bodyDiv.appendTo(div);
        div.appendTo('#movies');
      }
    });
  }
});

$(document).on('click', '.btn-info', function () {
  let key = '34bbd0fa';
  let id = $(this).attr('imdbID');
  let infoQuery =
    'https://www.omdbapi.com/?apikey=' + key + '&plot=long&i=' + id;
  console.log(infoQuery);
  $.ajax({
    url: infoQuery,
    method: 'GET',
  }).then(function (results) {
    $('#movies').empty();

    let div = $('<div>').addClass('more-info card card-info');
    $('<h1>').text(results.Title).appendTo(div);
    $('<p>').text(results.Released).appendTo(div);
    $('<p>').text(results.Genre).appendTo(div);
    $('<p>').text(results.Actors).appendTo(div);
    $('<p>')
      .text(results.Ratings[0].Source + ' ' + results.Ratings[0].Value)
      .appendTo(div);

    $('<p>').text(results.Plot).appendTo(div);
    $('<img src="' + results.Poster + '">').appendTo(div);

    div.appendTo('#movies');
  });
});
