async function getMovieDetails() {
  try {
    let userInput = document.getElementById(`userInput`).value;
    let res = await fetch(
      `http://www.omdbapi.com/?t=${userInput}&apikey=c88a5d44`
    );
    let data = await res.json();
    let poster = document.getElementById(`movieposter`);
    poster.src = data.Poster;
    let title = document.getElementById(`moviename`);
    title.innerHTML = "Title" + ": " + data.Title;
    let year = document.getElementById(`Year`);
    year.innerHTML = "Year" + ": " + data.Year;
    let Rated = document.getElementById("Rated");
    Rated.innerHTML = "Rated" + ": " + data.Rated;
    let Actors = document.getElementById(`Actors`);
    Actors.innerHTML = "Actors" + ": " + data.Actors;
    let Awards = document.getElementById(`Awards`);
    Awards.innerHTML = "Awards" + ": " + data.Awards;

    let Released = document.getElementById(`Released`);
    Released.innerHTML = "Released" + ": " + data.Released;

    let Writer = document.getElementById(`Writer`);
    Writer.innerHTML = "Writer" + ": " + data.Writer;

    let imdbRating = document.getElementById(`imdbRating`);
    imdbRating.innerHTML = "imdbRating" + ": " + data.imdbRating;

    let imdbVotes = document.getElementById(`imdbVotes`);
    imdbVotes.innerHTML = "imdbVotes" + ": " + data.imdbVotes;

    /*   let rating = document.getElementById(`rating`);
        rating.innerHTML = data.imdbRating; */
    if (Number(data.imdbRating) >= 8.5) {
      document.getElementById(`recomded`).style.display = "block";
    } else {
      document.getElementById(`recomded`).style.display = "none";
    }
    document.getElementById(`slogan`).style.display = "none";
    let Genre = document.getElementById(`Genre`);
    Genre.innerHTML = "Genre" + ": " + data.Genre;

    if (data.Response === `False`) {
      document.getElementById(`moviecont`).style.display = "none";
      document.getElementById(`err`).style.display = "block";
    }
  } catch (err) {
    console.log(err);
  }
}

/* getMovieDetails();
 */
