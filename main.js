// initial constants
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305";
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const path_nowPlaying = "/movie/now_playing";
const imageUrl = "https://image.tmdb.org/t/p/w500/"


fetch("https://api.themoviedb.org/3/movie/popular?api_key=0310c1a97f001b72c2466fdfc9e4f305")
    .then(res => res.json())
    .then(data => getPopular(data))
    .catch(error => console.log("Error: ", error))

fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=0310c1a97f001b72c2466fdfc9e4f305")
    .then(res => res.json())
    .then(data => getNowPlaying(data))
    .catch(error => console.log("Error: ", error))




// FUNCTIONS
function getPopular(data) {
    const movieArray = data.results

        for (let i = 0; i < movieArray.length; i++) {
            const popularList = document.getElementById("popularList")
            const movieObject = document.createElement("div")
            movieObject.classList.add('movie-object')

            let movieData = `
            <img src="https://image.tmdb.org/t/p/w200/${movieArray[i].poster_path}" />
            <h1 class='movieTitle'>${movieArray[i].original_title}</h1>
            <h3 class="movieDate'>${movieArray[i].release_date}</h3>
            `

            movieObject.innerHTML = movieData
            popularList.appendChild(movieObject)
        }
}


function getNowPlaying(data) {
    const movieArray = data.results

        for (let i = 0; i < movieArray.length; i++) {
            const nowPlayingList = document.getElementById("nowPlayingList")
            const movieObject = document.createElement("div")
            movieObject.classList.add('movie-object')

            let movieData = `
            <img src="https://image.tmdb.org/t/p/w200/${movieArray[i].poster_path}" />
            <h1 class='movieTitle'>${movieArray[i].original_title}</h1>
            <h3 class="movieDate'>${movieArray[i].release_date}</h3>
            `

            movieObject.innerHTML = movieData
            nowPlayingList.appendChild(movieObject)
        }
}