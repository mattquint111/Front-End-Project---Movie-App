/*
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const loginForm = document.getElementById('login-form')
const signUpForm = document.getElementById('signup-button')

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('user signed in')
    }
    else{
        console.log('user signed out')
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
/*
const logout = document.getElementById('logout');
logout.addEventListener('click', async(e)=>{
    e.preventDefault()
    await auth.signOut()
    console.log('user signed out')
})

})


loginForm.addEventListener("submit", signUp)
signUpForm.addEventListener("submit", signIn)

*/
