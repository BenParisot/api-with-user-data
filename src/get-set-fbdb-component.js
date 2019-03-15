import { auth, totalCandidateScoresByUserRef } from './firebase.js';

export function getTotalCandidateScoresFromFB() {
    auth.onAuthStateChanged(user => {
        const userID = user.uid;
        const candidateTotalScoresRef = totalCandidateScoresByUserRef.child(userID);
        candidateTotalScoresRef.once('value') 
            .then(snapshot => {
                const value = snapshot.val();
                console.log(value);
            })
    });
}



function setTotalScoresToDB() {

}