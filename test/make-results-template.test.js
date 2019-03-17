import { makeResultsArea } from '../src/results-component.js';

const test = QUnit.test;

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
            <p>Cory Booker: 7 points, <a href="candidate-detail.html#f=Cory&amp;l=Booker">View Candidate Detail</a></p>
        </li>`;

    const result = makeResultsArea(candidate);

    assert.htmlEqual(result, expected);
});

