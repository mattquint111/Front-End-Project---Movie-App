import { signIn, signUp } from "./authentication/auth.js"
firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
      btn.style.display("none")
   }
   else {
      logout.style.display("none")
   }
})

// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305";
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`

const favoritesList = document.getElementById("favoritesList")
const watchedList = document.getElementById("watchedList")
const watchLaterList = document.getElementById("watchLaterList")

let user = firebase.auth().currentUser;

if (user) {
    console.log(user.uid)
} else {
    //not signed in
}


/*==================*/

const displayPlayList = async(title, userId) => {
    let getList = await db.collection('users').doc(userId).collection('playlist').doc(userId).get()

}

const displayLists = async (listype, playlistName, userId) => {
    let getList = await db.collection('users').doc(userId).get()
    let userObject = getList.data()
    let userListType = userObject[listype]
    const playList = document.getElementById(playlistName)
    const movieObject = document.createElement("div")
    movieObject.classList.add("movieObject")

    userListType.forEach((item) => {
        let poster = `
        <div class="posterContainer">
        <img class="moviePoster" src="https://image.tmdb.org/t/p/w300/${item.poster_path}" alt="movie poster" id=${item.id}>
        <div class="listButtons">
            <i id="watchedBtn" class="far fa-eye"></i>
            <i id="favoritesBtn" class="fas fa-heart"></i>
            <i id="watchLaterBtn" class="fas fa-plus"></i>
            <i id="watchLaterBtn" class="fas fa-trash-alt"></i>
            </i>
        </div>
    </div>`
    
    const movieObject = document.createElement("div")
    movieObject.classList.add("movieObject")
    movieObject.innerHTML = poster
    playList.appendChild(movieObject)
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
const logout = document.getElementById('logout');
logout.addEventListener('click', async (e) => {
    e.preventDefault()
    await auth.signOut()
    console.log('user signed out')
})

const loginForm = document.getElementById("login-button")
const signUpForm = document.getElementById("signup-button")

loginForm.addEventListener("click", signIn)
signUpForm.addEventListener("click", signUp)

//-----------------------------



document.onclick = function (e) {
    const target = e.target
    // console.log(e.target.id)
    if (target.tagName.toLowerCase() === "img") {
        const movieContent = target.parentElement.parentElement.parentElement.parentElement.nextElementSibling
        movieContent.classList.add("content-display")
        const id = target.id

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0310c1a97f001b72c2466fdfc9e4f305`)
            .then(res => res.json())
            .then(data => {
                const title = data.original_title
                const overview = data.overview
                const date = data.release_date
                const runtime = data.runtime
                const genre = data.genres[0].name
                console.log(genre)
                let movieInfo = `
                <i class="fas fa-times" id="closeContent"></i>                
                <h1 class="extraDataTitle"><b>${title}</b></h1>
                <h2 class="extraDataDate">Release Date: ${date}</h2>
                <h3 class="extraDataRuntime">Runtime: ${runtime} min</h3>
                <h3 class="extraDataGenre">Genre: ${genre}</h3>
                <hr>
                <p class="extraDataOverview"><em>${overview}</em></p>
                `

                movieContent.innerHTML = movieInfo
                movieContent.classList.add('content-display')

                const closeContentBtn = document.getElementById("closeContent")
                closeContentBtn.addEventListener("click", function () {
                    this.parentElement.classList.remove('content-display')
                })
            })

    }

    if (e.target.id === "deleteBtn") {
        const movieId = e.target.parentElement.parentElement.firstElementChild.id
        console.log(movieId)
        deleteMovieObjectDataFavorites(movieId)
     }
}

function deleteMovieObjectDataFavorites (deleteId) {
        console.log('running delete method')
        console.log(deleteId)
          firebase.auth().onAuthStateChanged(function (user) {
             if (user) {
                let userId = user.uid
                db.collection("users")
                   .doc(userId)
                   .update({
                   "keywords": firebase.firestore.FieldValue.arrayRemove(deleteId)
                   })
             }
          })
       
 }
 
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let username = user.uid
        displayLists('favorites', "favoritesList", username)
        displayLists('watched', "watchedList", username)
        displayLists('watchLater',"watchLaterList", username)

        

    }
    else {
        console.log('no one signed in yet')
    }
})
