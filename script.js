const search = document.querySelector("#search");
const movie = document.querySelector("#movie");

search.addEventListener("click", () => {
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
      div.appendTo("#movies");
    }
  });
});
