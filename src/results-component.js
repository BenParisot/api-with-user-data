import { auth, candidatesListByUserRef } from './firebase.js';

export function makeResultsArea(candidate) {
    const html = `
        <li>
            <p>${candidate.firstName} ${candidate.lastName}: ${candidate.debateScore} points, <a href="candidate-detail.html#f=${candidate.firstName}&l=${candidate.lastName}">View Candidate Detail</a></p>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const resultsNode = document.getElementById('results');

export default function loadResults() {
    auth.onAuthStateChanged(user => {
        const userID = user.uid;
        const userCandidatesListRef = candidatesListByUserRef.child(userID);
        userCandidatesListRef.once('value') 
            .then(snapshot => {
                const candidates = snapshot.val();
                candidates.forEach(candidate => {
                    const candidateLI = makeResultsArea(candidate);
                    resultsNode.appendChild(candidateLI);
                });
            });
    });
}