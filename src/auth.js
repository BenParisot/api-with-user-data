import { auth } from './firebase.js';

const ui = new firebaseui.auth.AuthUI(auth);
ui.start('#login', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/'
});

