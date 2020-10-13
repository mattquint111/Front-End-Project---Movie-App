
// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305";
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`


// create homepage playlists
createPlaylist(nowPlayingUrl, "nowPlaying")
createPlaylist(popularUrl, "popular")
createPlaylist(topRatedUrl, "topRated")
createPlaylist(upcomingUrl, "upcoming")


// search movies
const searchInput = document.getElementById("inputValue")
const submitButton = document.getElementById('submitButton')

submitButton.addEventListener('click', function() {
    const movieName = searchInput.value;
    const url = searchMovieUrl + movieName
    
    fetch(url)
        .then(res => res.json())
        .then(data => function() {
            const movieArray = data.results
        
            const playList = document.getElementById(`searchedMovieList`)
            const movieObject = document.createElement('div')
            movieObject.classList.add('movieObject')

            for (let i = 0; i < movieArray.length; i++) {
                let movie = movieArray[i]
                let movieData = `
                <img class="moviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>
                <span class="movieTitle">${movie.original_title}</span>
                <span class="movieReleaseDate">${movie.release_date}</span>
                `
                const movieObject = document.createElement('div')
                movieObject.classList.add('movieObject')
                movieObject.innerHTML = movieData
                playList.appendChild(movieObject)
            }
           

        })
        let searchResultsLabel = document.getElementById("searchResultsDiv")
        searchResultsLabel.classList.toggle("content-display")
})

// FUNCTIONS
function createPlaylist(playlistUrl, playlistName) {
    fetch(playlistUrl)
    .then(res => res.json())
    .then(data => {
        //array of movie objects
        const movieArray = data.results
        
        const playList = document.getElementById(`${playlistName}List`)
        const movieObject = document.createElement('div')
        movieObject.classList.add('movieObject')

        for (let i = 0; i < movieArray.length; i++) {
            let movie = movieArray[i]
            let movieData = `
            <img class="moviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>
            <span class="movieTitle">${movie.original_title}</span>
            <span class="movieReleaseDate">${movie.release_date}</span>
            `
            const movieObject = document.createElement('div')
            movieObject.classList.add('movieObject')
            movieObject.innerHTML = movieData
            playList.appendChild(movieObject)
        }
    })
}


// Event Delegation
document.onclick = function (event) {
    const target = event.target;

  
    if (target.tagName.toLowerCase() === "img") {
      const movieContent = target.parentElement.parentElement.parentElement.nextElementSibling
      movieContent.classList.toggle("content-display")
    }
}

