const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')


        let playlistContainer = document.getElementById('playlist-container')
        /*
        if (user) {
            playlistContainer.style.display = "block"
    
        }
        else {
            playlistContainer.style.display = "none"
            console.log('no users signed in')
        }
        */
        const signUp = async(e) => {
            e.preventDefault()
            const email = usernameInput.value
            const password = passwordInput.value

            //signup method
                const createUser = await (firebase.auth().createUserWithEmailAndPassword(email, password))
                const user = createUser.user
                console.log(user)

                let userObject = {
                    id: user.uid,
                    username: user.email,
                    
                    watched: [],
                    favorites: [],
                    watchLater: [], 
                }
                db.collection('users').doc(user.uid).set(userObject)
                .then(function(docRef) {
                    console.log("Document written with ID");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                db.collection('users').doc(user.uid).collection('playlists').doc(user.uid).set({})
        }

        //signIn method
        const signIn = async (e) => {
            e.preventDefault()
            const email = usernameInput.value
            const password = passwordInput.value

            const getUser = await firebase.auth().signInWithEmailAndPassword(email, password)
            const user = getUser.user
            console.log(user)
        }

export {signUp, signIn}