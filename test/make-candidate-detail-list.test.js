import { makeCandidateDetailArea, makeCandidateNewsList } from '../src/candidate-detail-component.js';
const test = QUnit.test;

test('make candidate detail area from template', assert => {
    const candidate = {
        id: 'gabbard',
        firstName: 'Tulsi',
        lastName: 'Gabbard',
        image: 'assets/candidates-gabbard.jpg',
        debateScore: 0,
        debateWins: 0
    }
    const expected = `
    <section>
        <img src="assets/candidates-gabbard.jpg" alt="Tulsi Gabbard">
        <h2>Tulsi Gabbard</h2>
    </section>`;

    const result = makeCandidateDetailArea(candidate);

    assert.htmlEqual(result, expected);
});

test('make candidate news area from template', assert => {
    const newsItem = {
        firstName: 'Tulsi',
        lastName: 'Gabbard',
        baseURL: 'https://static01.nyt.com/',
        image: 'images/2019/01/12/us/politics/12gabbard/12gabbard-thumbStandard.jpg',
        headline: 'Tulsi Gabbard, Representative From Hawaii, Announces Democratic Presidential Bid',
        snippet: 'Ms. Gabbard, 37, joins what is likely to be a jammed Democratic field. She has earned a reputation for sometimes breaking from the Democratic Party line.',
        articleLink: 'https://www.nytimes.com/2019/01/11/us/politics/tulsi-gabbard-2020-president-announcement.html'
    }
    const expected = `
        <li>
            <img src="https://static01.nyt.com/images/2019/01/12/us/politics/12gabbard/12gabbard-thumbStandard.jpg" alt="Tulsi Gabbard">
            <h3>Tulsi Gabbard, Representative From Hawaii, Announces Democratic Presidential Bid</h3>
            <p>Ms. Gabbard, 37, joins what is likely to be a jammed Democratic field. She has earned a reputation for sometimes breaking from the Democratic Party line.</p>
            <p>
                <a href="https://www.nytimes.com/2019/01/11/us/politics/tulsi-gabbard-2020-president-announcement.html">Read More</a> | <span class="favorite-article">Save for Later</span>
            </p>
        </li>`;

    const result = makeCandidateNewsList(newsItem);
    assert.htmlEqual(result, expected);
});
