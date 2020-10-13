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
const signup = document.getElementById('signup')


// Event Delegation
document.onclick = function (event) {
    const target = event.target;
    console.log(target)

    if (target.tagName.toLowerCase() === "img") {
        const movieContent = target.parentElement.parentElement.parentElement.nextElementSibling
        movieContent.classList.toggle("content-display")

        console.log(target.id)
        const movieSpotlight = async (playlistUrl, spotlight) => {
            const response = await (fetch(playlistUrl))
            const movieArray = await response.json()
            const resultsArray = movieArray.results

            //filter array for id
            let specificMovie = resultsArray.filter(item => item.id == target.id)
            const highlight = document.getElementById(spotlight)

            highlight.innerHTML = `
            <div class = "movie-spotlight">
                <div id = "spotlight-title">${specificMovie[0].title}</div>
                <div>Release date:${specificMovie[0].release_date}</div>
                <div>Description: ${specificMovie[0].overview}</div>
                <div>Ratings: ${specificMovie[0].vote_average} in ${specificMovie[0].vote_count} votes</div>
            </div>
            `

            console.log(resultsArray)

        }
        movieSpotlight(nowPlayingUrl, "nowPlayingContent")
        movieSpotlight(popularUrl, 'popularContent')
        movieSpotlight(topRatedUrl, 'topRatedContent')
        movieSpotlight(upcomingUrl, 'upcomingContent')

        //   const section = target.parentElement;
        //   const content = section.nextElementSibling;
        //   content.classList.add("content-display");
    }
}
//--------------Login modal-------------------------
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("signup");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//----------Authentication stuff -----------------
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const loginForm = document.getElementById('login-form')
const signUpForm = document.getElementById('signup-button')

firebase.auth().onAuthStateChanged(function (user) {
    let playlistContainer = document.getElementById('playlist-container')
    if (user) {
        playlistContainer.style.display = "block"

    }
    else {
        playlistContainer.style.display = "none"
        console.log('no users signed in')
    }

    const signUp = (e) => {
        e.preventDefault()
        const email = usernameInput.value
        const password = passwordInput.value


        //signup method
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(cred => {
                console.log(cred.user)
                signUpForm.reset()
            })

            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }

    //signIn method
    const signIn = (e) => {
        e.preventDefault()
        const email = usernameInput.value
        const password = passwordInput.value

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(cred => {
                console.log(cred.user)
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }


    //logout method
    
    const logout = document.getElementById('logout');
    logout.addEventListener('click', async(e)=>{
        e.preventDefault()
        await auth.signOut()
        console.log('user signed out')
    })
    
   loginForm.addEventListener("submit", signUp)
    signUpForm.addEventListener("submit", signIn)   
})



