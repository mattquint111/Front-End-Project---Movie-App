// initial constants
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305"
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`
const path_nowPlaying = "/movie/now_playing"

// NAVBAR
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function navPop() {
   var x = document.getElementById("myLinks")
   if (x.style.display === "block") {
      x.style.display = "none"
   } else {
      x.style.display = "block"
   }
}
