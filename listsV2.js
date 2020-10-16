import { signIn, signUp } from "./authentication/auth.js"
firebase.auth().onAuthStateChanged(function (user) {
   if (user) {
      btn.style.display = "none"
   } else {
      logout.style.display = "none"
   }
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        db.collection('users').doc(user.uid).get()
        .then(function(res) {
            let favoritesArray = res.data().favorites
            let watchedArray = res.data().watched
            let watchLaterArray = res.data().watchLater

            createPlaylist(favoritesArray, 'favorites')
            createPlaylist(watchedArray, 'watched')
            createPlaylist(watchLaterArray, 'watchLater')
            
        })
        
    }
})

function createPlaylist(playlistArray, playlistName) {
          //array of movie objects
          const movieArray = playlistArray
 
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
                     </i>
                 </div>
             </div>
             
             `
             const movieObject = document.createElement("div")
             movieObject.classList.add("movieObject")
             movieObject.innerHTML = movieData
             playList.appendChild(movieObject)
          }
 }

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
                iframe.width = 624
                iframe.height = 350
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

 //--------------Login modal-------------------------
var modal = document.getElementById("myModal")

// Get the button that opens the modal
var btn = document.getElementById("signIn")

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]

btn.onclick = function () {
   modal.style.display = "block"
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
})

const loginForm = document.getElementById("login-button")
const signUpForm = document.getElementById("signup-button")
const usernameInput = document.getElementById("username-input")
const passwordInput = document.getElementById("password-input")

loginForm.addEventListener("click", signIn)
signUpForm.addEventListener("click", signUp)

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
 