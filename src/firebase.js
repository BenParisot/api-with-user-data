var config = {
    apiKey: 'AIzaSyBlWWZMehdMG_wb6LGWvTU6FdiqtI_U4yg',
    authDomain: 'debate-app-prototype.firebaseapp.com',
    databaseURL: 'https://debate-app-prototype.firebaseio.com',
    projectId: 'debate-app-prototype',
    storageBucket: 'debate-app-prototype.appspot.com',
    messagingSenderId: '788768079858'
};

firebase.initializeApp(config);

export const auth = firebase.auth(); 

const db = firebase.database();

export const userRef = db.ref('users');
export const candidatesListByUserRef = db.ref('candidates-list-by-user');

