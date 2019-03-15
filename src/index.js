import loadHeader from './make-header-component.js';
import { auth, totalCandidateScoresByUserRef } from './firebase.js';


loadHeader();

    auth.onAuthStateChanged(user => {
        const userID = user.uid;
        const candidateTotalScoresRef = totalCandidateScoresByUserRef.child(userID);
        candidateTotalScoresRef.once('value') 
            .then(snapshot => {
                const value = snapshot.val();
                if(value) {
                    console.log(value);
                } else {
                    console.log('no totals yet');
                }
            })
    });



// const endDebateButtonNode = document.getElementById('end-debate');

// endDebateButtonNode.addEventListener('click', () => {
//     const sortedCandidates = sortCandidatesByDebateScore(candidates);
//     loadCandidates(sortedCandidates);
//     const userID = auth.currentUser.uid;
//     candidatesListByUserRef.child(userID)
//         .set(sortedCandidates);
// });