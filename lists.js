import { signIn, signUp } from "./authentication/auth.js"


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

let testUser = db.collection('users').doc("mX56MYienWOIgi6VEQRZy5eOlnw1")

testUser.get().then(function (doc) {
    if (doc.exists) {

        const favorites = doc.data().favorites
        const watched = doc.data().watched
        const watchLater = doc.data().watchLater

        createPlaylist(favoritesList, favorites)
        createPlaylist(watchedList, watched)
        createPlaylist(watchLaterList, watchLater)


    }
})

function createPlaylist(playlistName, playlistArray) {
    for (let i = 0; i < playlistArray.length; i++) {
        let movie = playlistArray[i]
        let movieData = `
        <div class="posterContainer">
            <img class="moviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>
        </div>
        `

        let movieObject = document.createElement('div')
        movieObject.classList.add('movieObject')
        movieObject.innerHTML = movieData
        playlistName.appendChild(movieObject)
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
}

/*==================*/

const displayLists = async (listype, listDom, userId) => {
    let data = await db.collection('users').doc(userId).get()
    let userObject = data.data()
    let userListType = userObject[listype]

    userListType.forEach((item) => {
        console.log(item.poster_path)  
        let poster = `
        <div class="posterContainer">
        <img class="moviePoster" 
        src="https://image.tmdb.org/t/p/w300/${item.poster_path}" 
        alt="movie poster" id=${item.id}>
        <div class="listButtons">
        <i id="watchedBtn" class="far fa-eye"></i>
        <i id="favoritesBtn" class="fas fa-heart"></i>
        <i id="watchLaterBtn" class="fas fa-plus"></i>
        <i id="playlistsBtn" class="fas fa-ellipsis-h">
            <div class='playlistOption">
                <span class="playlistName">test playlist</span>
            </div>
        </i>
    </div>
</div>
</div>`              
        listDom.innerHTML+= poster

    })

    return 
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        let username = user.uid
        displayLists('favorites',favoritesList, username)
        displayLists('watched', watchedList, username)
        displayLists('watchLater',watchLaterList, username)

        

    }
    else {
        console.log('no one signed in yet')
    }
})
