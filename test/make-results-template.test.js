import { makeWinnerResultsArea, makeRunnersUpArea, makeOthersArea } from '../src/results-component.js';

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

test('make winner-results area from template', assert => {
    const expected = `
        <section>
            <img src="assets/candidates-harris.jpg" alt="Kamala Harris">
            <h2>Your top candidate this debate was: Kamala Harris</h2>
            <h3>Points: 30</h3>
            <h3><a href="candidate-detail.html#f=Kamala&amp;l=Harris">Candidate Detail</a></h3>
        </section>`;

    const result = makeWinnerResultsArea(candidates);

    assert.htmlEqual(result, expected);
});

test('make runners up area from template', assert => {
    const expected = `
        <section>
            <img src="assets/candidates-warren.jpg" alt="Elizabeth Warren">
            <p>Elizabeth Warren</p>
            <p>Points: 15</p>
            <p><a href="candidate-detail.html#f=Elizabeth&amp;l=Warren">Candidate Detail</a></p>
            <img src="assets/candidates-inslee.jpg" alt="Jay Inslee">
            <p>Jay Inslee</p>
            <p>Points: 13</p>
            <p><a href="candidate-detail.html#f=Jay&amp;l=Inslee">Candidate Detail</a></p>
        </section>`;

    const result = makeRunnersUpArea(candidates);

    assert.htmlEqual(result, expected);
});

test('make runnersup of candidates results area from template', assert => {
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
            <p>Booker: 7 points, <a href="candidate-detail.html#f=Cory&amp;l=Booker">Candidate Detail</a></p>
        </li>`;

    const result = makeOthersArea(candidate);

    assert.htmlEqual(result, expected);
});

