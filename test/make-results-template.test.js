import { makeResultsArea } from '../src/results-component.js';

const test = QUnit.test;

const candidates = [
    {
        debateScore: 30,
        debateWins: 0,
        firstName: 'Kamala',
        id: 'harris',
        image: 'assets/candidates-harris.jpg',
        lastName: 'Harris'
    },
    {
        debateScore: 15,
        debateWins: 0,
        firstName: 'Elizabeth',
        id: 'warren',
        image: 'assets/candidates-warren.jpg',
        lastName: 'Warren'
    },
    {
        debateScore: 13,
        debateWins: 0,
        firstName: 'Jay',
        id: 'inslee',
        image: 'assets/candidates-inslee.jpg',
        lastName: 'Inslee'
    },
    {
        debateScore: 7,
        debateWins: 0,
        firstName: 'Cory',
        id: 'booker',
        image: 'assets/candidates-booker.jpg',
        lastName: 'Booker'
    },
];

test('make list of candidates results area from template', assert => {
    const candidate = {
        debateScore: 7,
        debateWins: 0,
        firstName: 'Cory',
        id: 'booker',
        image: 'assets/candidates-booker.jpg',
        lastName: 'Booker'
    };
    const expected = `
        <li>
            <p>Cory Booker: 7 points, <a href="candidate-detail.html#f=Cory&amp;l=Booker">Candidate Detail</a></p>
        </li>`;

    const result = makeResultsArea(candidate);

    assert.htmlEqual(result, expected);
});

