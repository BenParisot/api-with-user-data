import candidates from '../data/candidates.js';
import loadCandidates from './candidate-list-component.js';
import startDebate from './debate-start-component.js';
import scoreCandidates from './score-plus-minus-component.js';
import sortCandidatesByDebateScore from './candidates-sort-component.js';
import loadHeader from './make-header-component.js';
import { auth, candidatesListByUserRef } from './firebase.js';

loadHeader();
loadCandidates(candidates);
startDebate(candidates);
scoreCandidates(candidates);

const endDebateButtonNode = document.getElementById('end-debate');

endDebateButtonNode.addEventListener('click', () => {
    const sortedCandidates = sortCandidatesByDebateScore(candidates);
    loadCandidates(sortedCandidates);
    const userID = auth.currentUser.uid;
    candidatesListByUserRef.child(userID)
        .set(sortedCandidates);

    window.location = "results.html";
});