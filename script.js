const search = document.querySelector("#search");
const movie = document.querySelector("#movie");

search.addEventListener("click", () => {
  let key = "34bbd0fa";
  let selectedMovie = movie.value.trim();
  let query = "http://www.omdbapi.com/?apikey=" + key + "&s=" + selectedMovie;
  console.log(query);

  $.ajax({
    url: query,
    method: "GET",
  }).then(function (results) {
    console.log(results);
  });
});
