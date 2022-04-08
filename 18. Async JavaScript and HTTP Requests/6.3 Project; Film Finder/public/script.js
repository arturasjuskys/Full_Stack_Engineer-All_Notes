// 1.
const tmdbKey = '19e0c4dd3fb09aea225bc53899fe4b93';
// 2.
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// 6.
const getGenres = async () => {
  // 3.
  const genreRequestEndpoint = '/genre/movie/list';
  // 4.
  const requestParams = `?api_key=${tmdbKey}`;
  // 5.
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  // 7.
  try {
    // 8.
    const response = await fetch(urlToFetch);
    // 9.
    if (response.ok) {
      // 10.
      const jsonResponse = await response.json();
      // 11.
      const genres = jsonResponse.genres;
      console.log(genres);
      // 12.
      return genres;
    }
  } catch (error) {
    console.log(error.message);
  };
};

const getMovies = () => {
  const selectedGenre = getSelectedGenre();

};

const getMovieInfo = () => {

};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

};

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById('genres')

  for (const genre of genres) {
      let option = document.createElement("option");
      option.value = genre.id;
      option.text = genre.name;
      select.appendChild(option);
  }
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
