import { signIn, signUp } from "./authentication/auth.js"


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
if (submitButton) {
   submitButton.addEventListener("click", function () {
      let searchedList = document.getElementById("searchedList")
      searchedList.innerHTML = ""
      const movieName = searchInput.value
      const searchUrl = searchMovieUrl + movieName
      createPlaylist(searchUrl, "searched")
      searchInput.value = ""
   })
}

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
                <img class="moviePoster" src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="movie poster" id=${movie.id}>
                <div class="listButtons">
                    <i id="watchedBtn" class="far fa-eye"></i>
                    <i id="favoritesBtn" class="fas fa-heart"></i>
                    <i id="watchLaterBtn" class="fas fa-plus"></i>                    
                </div>
            </div>
            `
            const movieObject = document.createElement("div")
            movieObject.classList.add("movieObject")
            movieObject.innerHTML = movieData
            playList.appendChild(movieObject)
         }
      })
}

//--------------Login modal-------------------------
var modal = document.getElementById("myModal")

// Get the button that opens the modal
var btn = document.getElementById("signIn")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

btn.onclick = function () {
   modal.style.display = "block"
   btn.style.display = "none"
   logout.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
   modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
   if (event.target == modal) {
      modal.style.display = "none"
   }
}
//----------Authentication stuff -----------------
const logout = document.getElementById("logout")
logout.addEventListener("click", async (e) => {
   e.preventDefault()
   await auth.signOut()
   console.log("user signed out")
   btn.style.display = "block"
   logout.style.display = "none"
})

const loginForm = document.getElementById("login-button")
const signUpForm = document.getElementById("signup-button")
const usernameInput = document.getElementById("username-input")
const passwordInput = document.getElementById("password-input")

loginForm.addEventListener("click", signIn)
signUpForm.addEventListener("click", signUp)

// Create and access user playlists

document.onclick = function (e) {
   const target = e.target
   // console.log(e.target.id)
   if (target.tagName.toLowerCase() === "img") {
      const movieContent =
         target.parentElement.parentElement.parentElement.parentElement
            .nextElementSibling
      movieContent.classList.add("content-display")
      const id = target.id

      fetch(
         `https://api.themoviedb.org/3/movie/${id}?api_key=0310c1a97f001b72c2466fdfc9e4f305`
      )
         .then((res) => res.json())
         .then((data) => {
            const title = data.title
            const overview = data.overview
            const date = data.release_date
            const runtime = data.runtime
            const genre = data.genres[0].name

            let movieInfo = `
                <i class="fas fa-times" id="closeContent"></i>                
                <h1 class="extraDataTitle"><b>${title}</b></h1>
                <h4 class="extraDataDate">Release Date: <b>${date}</b></h4>
                <h4 class="extraDataRuntime">Runtime: <b>${runtime}</b> min</h4>
                <h4 class="extraDataGenre">Genre: <b>${genre}</b></h4>
                <hr>
                <p class="extraDataOverview"><em>${overview}</em></p>
                <hr>
                `

            movieContent.classList.add("content-display")
            movieContent.innerHTML = movieInfo

            createIframeContainer(id)

            function createIframeContainer(movieId) {
               fetch(
                  `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=0310c1a97f001b72c2466fdfc9e4f305`
               )
                  .then((res) => res.json())
                  .then((data) => {
                     let videoArray = data.results
                     const length =
                        videoArray.length > 1 ? 1 : videoArray.length
                     const iframeContainer = document.createElement("div")

                     for (let i = 0; i < length; i++) {
                        const video = videoArray[i]
                        const iframe = createIframe(video)
                        iframeContainer.appendChild(iframe)
                     }
                     movieContent.appendChild(iframeContainer)
                  })
            }

            function createIframe(video) {
               const iframe = document.createElement("iframe")
               iframe.src = `https://www.youtube.com/embed/${video.key}`
               iframe.width = 325
               iframe.height = 275
               iframe.allowFullscreen = true
               iframe.id = "iframeVideo"

               return iframe
            }

            const closeContentBtn = document.getElementById("closeContent")
            closeContentBtn.addEventListener("click", function () {
               this.parentElement.classList.remove("content-display")
            })
         })
   }

   // select watched movie icon
   if (e.target.id === "watchedBtn") {
      const movieId = e.target.parentElement.parentElement.firstElementChild.id
      addMovieObjectDataWatched(movieId)
   }

   // select favorites movie icon
   if (e.target.id === "favoritesBtn") {
      const movieId = e.target.parentElement.parentElement.firstElementChild.id
      addMovieObjectDataFavorites(movieId)
   }

   // select watch later movie icon
   if (e.target.id === "watchLaterBtn") {
      const movieId = e.target.parentElement.parentElement.firstElementChild.id
      addMovieObjectDataWatchLater(movieId)
   }
}

function addMovieObjectDataWatchLater(movieId) {
   fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=0310c1a97f001b72c2466fdfc9e4f305`
   )
      .then((res) => res.json())
      .then((data) => {
         firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
               let userId = user.uid
               db.collection("users")
                  .doc(userId)
                  .update({
                     watchLater: firebase.firestore.FieldValue.arrayUnion(data),
                  })
            }
         })
      })
}

function addMovieObjectDataWatched(movieId) {
   fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=0310c1a97f001b72c2466fdfc9e4f305`
   )
      .then((res) => res.json())
      .then((data) => {
         firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
               let userId = user.uid
               db.collection("users")
                  .doc(userId)
                  .update({
                     watched: firebase.firestore.FieldValue.arrayUnion(data),
                  })
            }
         })
      })
}

function addMovieObjectDataFavorites(movieId) {
   fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=0310c1a97f001b72c2466fdfc9e4f305`
   )
      .then((res) => res.json())
      .then((data) => {
         firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
               let userId = user.uid
               db.collection("users")
                  .doc(userId)
                  .update({
                     favorites: firebase.firestore.FieldValue.arrayUnion(data),
                  })
            }
         })
      })
}
