import {authentication} from "./authentication/auth.js"
// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305";
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`


// search movies
const searchInput = document.getElementById("inputValue")
const submitButton = document.getElementById('submitButton')


submitButton.addEventListener('click', function() {
    let searchedList = document.getElementById("searchedList")
    searchedList.innerHTML = ''
    const movieName = searchInput.value;
    const searchUrl = searchMovieUrl + movieName

    createPlaylist(searchUrl, 'searched')

    
    searchInput.value = ''
   
})
/*
let addFilmsSearchTxt = document.getElementById("addFilmsSerchTxt")

addFilmsSearchTxt.addEventListener("input", function() {
    let search = addFilmsSearchTxt.value
    let searchUrl = searchMovieUrl + search
    createPlaylist(searchUrl,'searched')
})*/

// create homepage playlists
createPlaylist(nowPlayingUrl, "nowPlaying")
createPlaylist(popularUrl, "popular")
createPlaylist(topRatedUrl, "topRated")
createPlaylist(upcomingUrl, "upcoming")

const fetchMovieData = async (playlistUrl) => {
    const moviesresponse = await fetch(playlistUrl)
    const moviesArray = await moviesresponse.json()
    return moviesArray
}
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

  
    if (target.tagName.toLowerCase() === "img") {
        const movieContent = target.parentElement.parentElement.parentElement.nextElementSibling
        movieContent.classList.toggle("content-display")

        console.log(target.id)

        const movieSpotlight = async(playlistUrl, spotlight) => {
            try {
            let data = await fetchMovieData(playlistUrl)
        
            const resultsArray = data.results
            //filter array for id
            const specificMovie = resultsArray.filter(item => item.id == target.id)
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
            catch(e){
                console.log(`error : ${e}`)
            }

        }
        movieSpotlight(nowPlayingUrl, "nowPlayingContent")
        movieSpotlight(popularUrl, 'popularContent')
        movieSpotlight(topRatedUrl, 'topRatedContent')
        movieSpotlight(upcomingUrl, 'upcomingContent')
        

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
authentication()




