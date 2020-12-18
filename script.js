const search = document.querySelector("#search");
const movie = document.querySelector("#movie");

$("#search").on("click", () => {
  $("#movies").empty();
  let key = "34bbd0fa";
  let selectedMovie = movie.value.trim();
  let query =
    "http://www.omdbapi.com/?apikey=" + key + "&plot=short&s=" + selectedMovie;
  console.log(query);

  $.ajax({
    url: query,
    method: "GET",
  }).then(function (results) {
    // console.log(results.Search[0].Title);
    for (let i = 0; i < 10; i++) {
      let div = $("<div>");
      $("<h1>").text(results.Search[i].Title).appendTo(div);
      $("<p>").text(results.Search[i].Year).appendTo(div);
      $('<img src="' + results.Search[i].Poster + '">').appendTo(div);
      $("<button>")
        .text("See more")
        .addClass("btn btn-info")
        .attr("imdbID", results.Search[i].imdbID)
        .appendTo(div);
      div.appendTo("#movies");
    }
  });
});

$(document).on("click", ".btn-info", function () {
  let key = "34bbd0fa";
  let id = $(this).attr("imdbID");
  let infoQuery =
    "http://www.omdbapi.com/?apikey=" + key + "&plot=long&i=" + id;
  console.log(infoQuery);
  $.ajax({
    url: infoQuery,
    method: "GET",
  }).then(function (results) {
    $("#movies").empty();

    let div = $("<div>");
    $("<h1>").text(results.Title).appendTo(div);
    $("<p>").text(results.Released).appendTo(div);
    $("<p>").text(results.Genre).appendTo(div);
    $("<p>").text(results.Actors).appendTo(div);
    $("<p>")
      .text(results.Ratings[0].Source + " " + results.Ratings[0].Value)
      .appendTo(div);

    $("<p>").text(results.Plot).appendTo(div);
    $('<img src="' + results.Poster + '">').appendTo(div);

    div.appendTo("#movies");
  });
});
