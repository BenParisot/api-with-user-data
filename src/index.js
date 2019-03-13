
import loadHeader from './make-header-component.js';
import { auth } from './firebase.js';

loadHeader();

const endDebateButtonNode = document.getElementById('end-debate');

endDebateButtonNode.addEventListener('click', () => {
    const sortedCandidates = sortCandidatesByDebateScore(candidates);
    loadCandidates(sortedCandidates);
    const userID = auth.currentUser.uid;
    candidatesListByUserRef.child(userID)
        .set(sortedCandidates);
});