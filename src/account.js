import { auth, favoriteArticlesByUserRef } from './firebase.js';
import loadHeader from './make-header-component.js';

loadHeader();

auth.onAuthStateChanged(user => {
    const userID = auth.currentUser.uid;
    const favoriteArticles = favoriteArticlesByUserRef.child(userID);
    favoriteArticles.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            console.log(value);
        });
});
