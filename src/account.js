import { auth, favoriteArticlesByUserRef } from './firebase.js';
import loadHeader from './make-header-component.js';
import objectToArray from './object-to-array.js';

loadHeader();

const newsListNode = document.getElementById('candidate-news');

auth.onAuthStateChanged(user => {
    const userID = auth.currentUser.uid;
    const favoriteArticles = favoriteArticlesByUserRef.child(userID);
    favoriteArticles.once('value')
        .then(snapshot => {
            const newsObject = snapshot.val();
            const newsItems = objectToArray(newsObject);
            loadSavedNewsList(newsItems);
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

function loadSavedNewsList(newsItems) {
    newsItems.forEach(newsItem => {
        const newsLI = makeSavedNewsList(newsItem);
        newsListNode.appendChild(newsLI);
    });
}