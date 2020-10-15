import { signIn, signUp } from "./authentication/auth.js"
firebase.auth().onAuthStateChanged(function (user) {
   if (user) {
      btn.style.display("none")
   } else {
      logout.style.display("none")
   }
})

// initial variables
const apiKey = "0310c1a97f001b72c2466fdfc9e4f305"
const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`

// getting elements and creating global variables
let listNameTxt = document.getElementById("listNameTxt")
let submitListInfoBtn = document.getElementById("submitListInfoBtn")
let listBuilderInfoDiv = document.getElementById("listBuilderInfoDiv")
let addFilmsDiv = document.getElementById("addFilmsDiv")
let addFilmsSearchBtn = document.getElementById("addFilmsSearchBtn")
let addFilmsSearchTxt = document.getElementById("addFilmsSearchTxt")
let searchResultsDiv = document.getElementById("searchResultsDiv")
let addFilmsToListBtn = document.getElementById("addFilmsToListBtn")
var listName
var tempArr = []

// first window - gets list name from user
submitListInfoBtn.addEventListener("click", function () {
   listBuilderInfoDiv.style.display = "none"
   addFilmsDiv.style.display = "flex"
   listName = listNameTxt.value
   firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
         db.collection("users")
            .doc(user.uid)
            .collection("playlists")
            .doc(listName)
            .set({})
      }
   })
})

// search button
addFilmsSearchBtn.addEventListener("click", function () {
   searchResultsDiv.innerHTML = ""
   let userInput = addFilmsSearchTxt.value
   let searchUrl = searchMovieUrl + userInput
   // print list of movies
   fetch(searchUrl)
      .then((res) => res.json())
      .then((data) => {
         let movieArray = data.results
         console.log(movieArray)
         for (let i = 0; i < movieArray.length; i++) {
            let movie = movieArray[i]
            let movieObject = `
                <img class="addMoviePoster" src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="movie poster" id=${movie.id}>`
            let movieObjectDiv = `<div id="test">${movieObject}</div>`
            searchResultsDiv.insertAdjacentHTML("beforeend", movieObjectDiv)
         }
      })
})

// fetches movies added to tempArr and puts them inside the collection under listName
addFilmsToListBtn.addEventListener("click", function () {
   console.log(listName)
   for (let i = 0; i < tempArr.length; i++) {
      fetch(
         `https://api.themoviedb.org/3/movie/${tempArr[i]}?api_key=0310c1a97f001b72c2466fdfc9e4f305`
      )
         .then((res) => res.json())
         .then((data) => {
            firebase.auth().onAuthStateChanged(function (user) {
               if (user) {
                  let userId = user.uid
                  db.collection("users")
                     .doc(userId)
                     .collection("playlists")
                     .doc(listName)
                     .update({
                        playlist: firebase.firestore.FieldValue.arrayUnion(
                           data
                        ),
                     })
                     .catch((e) => {
                        console.log(e)
                     })
               }
            })
         })
   }
})

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

loginForm.addEventListener("click", () => {
   signIn()
   usernameInput.value = ""
   passwordInput.value = ""
})
signUpForm.addEventListener("click", () => {
   signUp()
   usernameInput.value = ""
   passwordInput.value = ""
})

document.onclick = function (e) {
   const target = e.target

   // select movies in playlist creator
   if (e.target.className === "addMoviePoster") {
      tempArr.push(e.target.id)
      console.log(tempArr)
      if (target.style.border === "3px solid #f50040") {
         target.style.border = ""
      } else {
         target.style.border = "3px solid #f50040"
      }
   }
}
