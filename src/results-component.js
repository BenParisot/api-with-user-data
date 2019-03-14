import { auth, candidatesListByUserRef } from './firebase.js';

export function makeWinnerResultsArea(candidates) {
    const html = `
        <section>
            <img src="${candidates[0].image}" alt="${candidates[0].firstName} ${candidates[0].lastName}">
            <h2>Your top candidate this debate was: ${candidates[0].firstName} ${candidates[0].lastName}</h2>
            <h3>Points: ${candidates[0].debateScore}</h3>
            <h3><a href="candidate-detail.html#${candidates[0].firstName}+${candidates[0].lastName}">Candidate Detail</a></h3>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function makeRunnersUpArea(candidates) {
    const html = `
        <section>
            <img src="${candidates[1].image}" alt="${candidates[1].firstName} ${candidates[1].lastName}">
            <p>${candidates[1].firstName} ${candidates[1].lastName}</p>
            <p>Points: ${candidates[1].debateScore}</p>
            <p><a href="candidate-detail.html#${candidates[1].firstName}+${candidates[1].lastName}">Candidate Detail</a></p>
            <img src="${candidates[2].image}" alt="${candidates[2].firstName} ${candidates[2].lastName}">
            <p>${candidates[2].firstName} ${candidates[2].lastName}</p>
            <p>Points: ${candidates[2].debateScore}</p>
            <p><a href="candidate-detail.html#${candidates[2].firstName}+${candidates[2].lastName}">Candidate Detail</a></p>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function makeOthersArea(candidate) {
    const html = `
        <li>
            <p>${candidate.lastName}: ${candidate.debateScore} points, <a href="candidate-detail.html#${candidate.firstName}+${candidate.lastName}">Candidate Detail</a></p>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const winnerNode = document.getElementById('winner');
const runnersUpNode = document.getElementById('runners-up');
const othersNode = document.getElementById('others');
export default function loadResults() {
    auth.onAuthStateChanged(user => {
        const userID = user.uid;
        const userCandidatesListRef = candidatesListByUserRef.child(userID);
        userCandidatesListRef.once('value') 
            .then(snapshot => {
                const candidates = snapshot.val();
                const others = candidates.slice(3);
                const winnerArea = makeWinnerResultsArea(candidates);
                const runnersUpArea = makeRunnersUpArea(candidates);
                winnerNode.appendChild(winnerArea);
                runnersUpNode.appendChild(runnersUpArea);
                others.forEach(other => {
                    const otherLI = makeOthersArea(other);
                    othersNode.appendChild(otherLI);
                })
            })
    })
}