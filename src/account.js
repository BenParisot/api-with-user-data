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
            const candidateTotals = snapshot.val();
            const sortedCandidateTotals = sortCandidatesByTotalScore(candidateTotals);
            sortedCandidateTotals.forEach(candidate => {
                const candidateLI = makeCandidatesList(candidate);
                candidateListNode.appendChild(candidateLI);
            });
        });

    const userSavedArticles = favoriteArticlesByUserRef.child(userID);
    userSavedArticles.once('value')
        .then(snapshot => {
            const savedArticles = snapshot.val();
            
            if(savedArticles) {
                const savedArticlesArray = objectToArray(savedArticles);
                savedArticlesArray.forEach(article => {
                    const articleLI = makeSavedNewsList(article);
                    const savedArticle = articleLI.querySelector('.favorite-article');
                    const newSavedArticlesRef = favoriteArticlesByUserRef.child(userID);
                    const newSavedArticleRef = newSavedArticlesRef.child(article.id);
                    console.log(article.id);
                    

                    let isFavorite = false;

                    if(savedArticle) {
                        isFavorite = true;
                        savedArticle.classList.add('favorite');
                        savedArticle.textContent = '‎★ This Article is Saved';
                    } else {
                        isFavorite = false;
                        savedArticle.classList.remove('favorite');
                        savedArticle.textContent = '‎☆ Save for Later';
                    }

                    savedArticle.addEventListener('click', () => {
                        if(isFavorite) {
                            isFavorite = false;
                            savedArticle.classList.remove('favorite');
                            savedArticle.textContent = '‎☆ Save for Later';
                            newSavedArticleRef.remove();
                        } else {
                            isFavorite = true;
                            savedArticle.classList.add('favorite');
                            savedArticle.textContent = '‎★ This Article is Saved';
                        }
                    });
                    newsListNode.appendChild(articleLI);
                });
            } else {
                const noArticleNotice = document.createElement('p');
                noArticleNotice.textContent = 'You have no saved articles.';
                newsListNode.appendChild(noArticleNotice);
            }

        });
});

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