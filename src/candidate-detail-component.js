import { auth, favoriteArticlesByUserRef } from './firebase.js';

export function makeCandidateDetailArea(candidate) {
    const html = `
    <section>
        <img src="${candidate.image}" alt="${candidate.firstName} ${candidate.lastName}">
        <h2>${candidate.firstName} ${candidate.lastName}</h2>
    </section>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function makeCandidateNewsList(newsItem) {
    const image = newsItem.multimedia.find(image => image.crop_name === 'thumbStandard').url;

    const html = `
        <li>
            <img src="https://static01.nyt.com/${image}">
            <h3>${newsItem.headline.main}</h3>
            <p>${newsItem.snippet}</p>
            <p><a href="${newsItem.web_url}">Read More</a> | <span class="favorite-article">☆ Save for Later</span>
            </p>
        </li>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const newsListNode = document.getElementById('candidate-news');
export function loadCandidateNewsItems(newsItems) {
    while(newsListNode.children.length) {
        newsListNode.lastElementChild.remove();
    }
    newsItems.forEach(newsItem => {
        const newsLI = makeCandidateNewsList(newsItem);
        const favoriteArticle = newsLI.querySelector('.favorite-article');
        const userID = auth.currentUser.uid;
        const userFavoritesRef = favoriteArticlesByUserRef.child(userID);
        const userFavoriteArticleRef = userFavoritesRef.child(newsItem._id);

        let isFavorite = false;

        userFavoriteArticleRef.once('value')
            .then(snapshot => {
                const value = snapshot.val();
                if(value) {
                    isFavorite = true;
                    favoriteArticle.classList.add('favorite');
                    favoriteArticle.textContent = '‎★ This Article is Saved';
                } else {
                    isFavorite = false;
                    favoriteArticle.classList.remove('favorite');
                    favoriteArticle.textContent = '‎☆ Save for Later';
                }
            });

        favoriteArticle.addEventListener('click', () => {
            if(isFavorite) {
                isFavorite = false;
                userFavoriteArticleRef.remove();
                favoriteArticle.classList.remove('favorite');
                favoriteArticle.textContent = '☆ Save for Later';
            }
            else {
                isFavorite = true;
                favoriteArticle.classList.add('favorite');
                favoriteArticle.textContent = '‎★ This Article is Saved';
                userFavoriteArticleRef.set({
                    img: newsItem.multimedia[3].url,
                    headline: newsItem.headline.main,
                    snippet: newsItem.snippet,
                    articleLink: newsItem.web_url,
                })
            }
        })

        newsListNode.appendChild(newsLI);
    });
}

const candidateDetailsNode = document.getElementById('details');
export function loadCandidateDetails(candidate) {
    const candidateDetails = makeCandidateDetailArea(candidate);
    candidateDetailsNode.appendChild(candidateDetails);
}