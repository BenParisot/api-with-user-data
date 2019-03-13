import candidates from '../data/candidates.js';
import loadCandidates from './candidate-list-component.js';
import startDebate from './debate-start-component.js';
import scoreCandidates from './score-plus-minus-component.js';
import sortCandidatesByDebateScore from './candidates-sort-component.js';
import loadHeader from './make-header-component.js';
import { auth } from './firebase.js';

loadHeader();
loadCandidates(candidates);
startDebate(candidates);
scoreCandidates(candidates);

const endDebateButtonNode = document.getElementById('end-debate');

auth.onAuthStateChanged(user => {
    const userID = user.uid;
    console.log('userID is', userID);
});  
endDebateButtonNode.addEventListener('click', () => {

    const json = window.localStorage.getItem('sortedCandidates');
    let sortedCandidates = JSON.parse(json);
    sortedCandidates = sortCandidatesByDebateScore(candidates);
    loadCandidates(sortedCandidates);
    const candidateJSON = JSON.stringify(sortedCandidates);
    window.localStorage.setItem('sortedCandidates', candidateJSON);
});