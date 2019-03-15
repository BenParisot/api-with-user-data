import { auth, favoriteArticlesByUserRef, totalCandidateScoresByUserRef } from './firebase.js';
import loadHeader from './make-header-component.js';
import objectToArray from './object-to-array.js';

loadHeader();

const newsListNode = document.getElementById('candidate-news');
const candidateListNode = document.getElementById('candidates-list');


auth.onAuthStateChanged(user => {
    const userID = user.uid;

    //make total candidates list
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

    //make saved news area
    const userSavedArticles = favoriteArticlesByUserRef.child(userID);
    userSavedArticles.once('value')
        .then(snapshot => {
            const savedArticles = snapshot.val();
            if(savedArticles) {
                const savedArticlesArray = objectToArray(savedArticles);
                savedArticlesArray.forEach(article => {
                    const articleLI = makeSavedNewsList(article);
                    const savedArticle = articleLI.querySelector('.favorite-article');
    
                    let isFavorite = false;

                    if(savedArticle) {
                        console.log('this article is saved: ', article);
                        isFavorite = true;
                        savedArticle.classList.add('favorite');
                        savedArticle.textContent = '‎★ This Article is Saved';
                    } else {
                        console.log('this article is not saved');
                        isFavorite = false;
                        savedArticle.classList.remove('favorite');
                        savedArticle.textContent = '‎☆ Save for Later';
                    }

                    savedArticle.addEventListener('click', () => {
                        if(isFavorite) {
                            isFavorite = false;
                            savedArticle.classList.remove('favorite');
                            savedArticle.textContent = '‎☆ Save for Later';
                        } else {
                            isFavorite = true;
                            savedArticle.classList.add('favorite');
                            savedArticle.textContent = '‎★ This Article is Saved';
                        }
                    });


                    newsListNode.appendChild(articleLI);
                });
            } else {
                console.log('there are no saved articles yet');
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

// function loadSavedNewsList(newsItems) {
//     newsItems.forEach(newsItem => {
//         const newsLI = makeSavedNewsList(newsItem);
//         const favoriteArticle = newsLI.querySelector('.favorite-article');
//         const userID = auth.currentUser.uid;
//         const userFavoritesRef = favoriteArticlesByUserRef.child(userID);
//         const userFavoriteArticleRef = userFavoritesRef.child(newsItem._id);

//         let isFavorite = false;

//         userFavoriteArticleRef.once('value')
//             .then(snapshot => {
//                 const value = snapshot.val();
//                 if(value) {
//                     isFavorite = true;
//                     favoriteArticle.classList.add('favorite');
//                     favoriteArticle.textContent = '‎★ This Article is Saved';
//                 } else {
//                     isFavorite = false;
//                     favoriteArticle.classList.remove('favorite');
//                     favoriteArticle.textContent = '‎☆ Save for Later';
//                 }
//             });

//         favoriteArticle.addEventListener('click', () => {
//             if(isFavorite) {
//                 isFavorite = false;
//                 userFavoriteArticleRef.remove();
//                 favoriteArticle.classList.remove('favorite');
//                 favoriteArticle.textContent = '☆ Save for Later';
//                 console.log('favorite removed');
//             }
//             else {
//                 isFavorite = true;
//                 favoriteArticle.classList.add('favorite');
//                 favoriteArticle.textContent = '‎★ This Article is Saved';
//                 console.log('favorite added');
//                 userFavoriteArticleRef.set({
//                     img: newsItem.multimedia[3].url,
//                     headline: newsItem.headline.main,
//                     snippet: newsItem.snippet,
//                     articleLink: newsItem.web_url,
//                 })
//             }
//         })




//         newsListNode.appendChild(newsLI);
//     });
// }

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