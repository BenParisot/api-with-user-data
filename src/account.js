import { auth, favoriteArticlesByUserRef, totalCandidateScoresByUserRef } from './firebase.js';
import loadHeader from './make-header-component.js';
import objectToArray from './object-to-array.js';

loadHeader();

const newsListNode = document.getElementById('candidate-news');
const candidateListNode = document.getElementById('candidates-list');


auth.onAuthStateChanged(user => {
    const userID = user.uid;
    const candidateTotalScoresRef = totalCandidateScoresByUserRef.child(userID);
    candidateTotalScoresRef.once('value') 
        .then(snapshot => {
            const value = snapshot.val();
            console.log(value);
        });
});

// auth.onAuthStateChanged(user => {
//     const userID = user.uid;
//     console.log(userID);
//     const favoriteArticles = favoriteArticlesByUserRef.child(userID);
//     favoriteArticles.once('value')
//         .then(snapshot => {
//             const newsObject = snapshot.val();
//             const newsItems = objectToArray(newsObject);
//             loadSavedNewsList(newsItems);
//         });
//     const candidatesTotalScoresRef = totalCandidateScoresByUserRef.child(userID);
//     candidatesTotalScoresRef.once('value')
//             .then(snapshot => {
//                 const candidates = snapshot.val()
//                 console.log(candidates);
//                 const sortedCandidates = sortCandidatesByTotalScore(candidates);
//                 console.log(sortedCandidates);
//                 sortedCandidates.forEach(candidate => {
//                     const candidateLI = makeCandidatesList(candidate);
//                     candidateListNode.appendChild(candidateLI);
//                 });
//             });
// });

function makeSavedNewsList(newsItem) {
    const html = `
        <li>
            <img src="https://static01.nyt.com/${newsItem.img}">
            <h3>${newsItem.headline}</h3>
            <p>${newsItem.snippet}</p>
            <p><a href="${newsItem.articleLink}">Read More</a> | <span class="favorite-article">☆ Save for Later</span>
            </p>
        </li>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function loadSavedNewsList(newsItems) {
    newsItems.forEach(newsItem => {
        const newsLI = makeSavedNewsList(newsItem);
        newsListNode.appendChild(newsLI);
    });
}

 function makeCandidatesList(candidate) {
    const html = `
        <li>
            <p>${candidate.lastName}: ${candidate.totalScore} points, <a href="candidate-detail.html#f=${candidate.firstName}&l=${candidate.lastName}">Candidate Detail</a></p>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function sortCandidatesByTotalScore(candidates) {
    const newCandidatesArray = candidates.slice();
    return newCandidatesArray.sort((a, b) => {
        if(a.totalScore === b.totalScore) {
            return 0;
        }
        if(a.totalScore > b.totalScore) {
            return -1;
        }
        return 1;
    });
}