var config = {
    apiKey: 'AIzaSyBlWWZMehdMG_wb6LGWvTU6FdiqtI_U4yg',
    authDomain: 'debate-app-prototype.firebaseapp.com',
    databaseURL: 'https://debate-app-prototype.firebaseio.com',
    projectId: 'debate-app-prototype'
};

export const app = firebase.initializeApp(config);

export const auth = firebase.auth(); 
export const db = firebase.database();
export const userRef = db.ref('user');
export const candidatesListByUserRef = db.ref('candidates-list-by-user');
export const favoriteArticlesByUserRef = db.ref('favorite-articles-by-user');
export const totalCandidateScoresByUserRef = db.ref('total-candidate-scores-by-user');

