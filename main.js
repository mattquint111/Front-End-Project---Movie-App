// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305"
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`

// search movies
const searchInput = document.getElementById("inputValue")
const submitButton = document.getElementById("submitButton")

submitButton.addEventListener("click", function () {
   let searchedList = document.getElementById("searchedList")
   searchedList.innerHTML = ""
   const movieName = searchInput.value
   const searchUrl = searchMovieUrl + movieName
})
// listener for List Builder button
let listNameTxt = document.getElementById("listNameTxt")
let listDescrTxt = document.getElementById("listDescrTxt")
let submitListInfoBtn = document.getElementById("submitListInfoBtn")
let listBuilderInfoDiv = document.getElementById("listBuilderInfoDiv")
let addFilmsDiv = document.getElementById("addFilmsDiv")
let navbar = document.getElementsByClassName("navbar navbar-expand-lg")
submitListInfoBtn.addEventListener("click", function () {
   listBuilderInfoDiv.style.display = "none"
   addFilmsDiv.style.display = "block"
   let listName = listNameTxt.value
   let listDescription = listDescrTxt.value
   /* PLACEHOLDER ADD NAME AND DESCR TO PLAYLIST OBJECT */
})

// create homepage playlists
createPlaylist(nowPlayingUrl, "nowPlaying")
createPlaylist(popularUrl, "popular")
createPlaylist(topRatedUrl, "topRated")
createPlaylist(upcomingUrl, "upcoming")

// FUNCTIONS
function createPlaylist(playlistUrl, playlistName) {
   fetch(playlistUrl)
      .then((res) => res.json())
      .then((data) => {
         //array of movie objects
         const movieArray = data.results

         const playList = document.getElementById(`${playlistName}List`)
         const movieObject = document.createElement("div")
         movieObject.classList.add("movieObject")

         for (let i = 0; i < movieArray.length; i++) {
            let movie = movieArray[i]
            let movieData = `
            <div class="posterContainer">
                <img class="moviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>
                <div class="listButtons">
                    <i id="watchedBtn" class="far fa-eye"></i>
                    <i id="favoritesBtn" class="fas fa-heart"></i>
                    <i id="watchLaterBtn" class="fas fa-plus"></i>
                    <i id="playlistsBtn" class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div class="movieDataContainer">
                <span class="movieTitle">${movie.original_title}</span>
                <span class="movieReleaseDate">${movie.release_date}</span>
            </div>
            `
            const movieObject = document.createElement("div")
            movieObject.classList.add("movieObject")
            movieObject.innerHTML = movieData
            playList.appendChild(movieObject)
         }
      })
}

// Event Delegation
document.onclick = function (event) {
   const target = event.target

   if (target.tagName.toLowerCase() === "img") {
      const movieContent =
         target.parentElement.parentElement.parentElement.nextElementSibling
      movieContent.classList.toggle("content-display")

      if (target.tagName.toLowerCase() === "img") {
         const movieContent =
            target.parentElement.parentElement.parentElement.parentElement
               .nextElementSibling
         movieContent.classList.toggle("content-display")

         const movieSpotlight = async (playlistUrl, spotlight) => {
            const response = await fetch(playlistUrl)
            const movieArray = await response.json()
            const resultsArray = movieArray.results

            highlight.innerHTML = `
            <div class = "movie-spotlight">
                <div id = "spotlight-title">${specificMovie[0].original_title}</div>
                <div>Release date:${specificMovie[0].release_date}</div>
                <div>Description: ${specificMovie[0].overview}</div>
                <div>Ratings: ${specificMovie[0].vote_average} in ${specificMovie[0].vote_count} votes</div>
            </div>
            `
         }
         movieSpotlight(nowPlayingUrl, "nowPlayingContent")
         movieSpotlight(popularUrl, "popularContent")
         movieSpotlight(topRatedUrl, "topRatedContent")
         movieSpotlight(upcomingUrl, "upcomingContent")

         console.log(resultsArray)
      }
      movieSpotlight(nowPlayingUrl, "nowPlayingContent")
      movieSpotlight(popularUrl, "popularContent")
      movieSpotlight(topRatedUrl, "topRatedContent")
      movieSpotlight(upcomingUrl, "upcomingContent")
   }
}
