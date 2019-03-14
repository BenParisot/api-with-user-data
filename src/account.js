import { auth, favoriteArticlesByUserRef } from './firebase.js';
import loadHeader from './make-header-component.js';

loadHeader();
console.log('hello');
auth.onAuthStateChanged(user => {
    const userID = auth.currentUser.uid;
    console.log(userID);
});
