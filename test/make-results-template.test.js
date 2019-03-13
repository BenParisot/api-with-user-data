const test = QUnit.test;


function makeResultsArea(candidates) {
    const html = `
    <section id="winner">
            <h2>Your top candidate this debate was: Kamala Harris</h2>
            <h3>Total Score: 30</h3>
            <p>Number of Good Points: 33</p>
            <p>Number of Bad Points: 3</p>
        </section>
        <hr>
        <section id="runners-up">
            <h3>Your other top candidates:</h3>
            <p>Elizabeth Warren: 15 points</p>
            <p>Jay Insley: 13 points</p>
        </section>
        <hr>
        <section id="others">
            <h4>Remaining Candidates:</h4>
            <p>Booker: 7 points</p>
            <p>Sanders: 6 points</p>
            <p>Gillibrand: 5 points</p>
        </section>
        <hr>
        <section id="debate-info">
            <p>Debate Time: 02:25</p>
            <p>Total Number of Good Points: 103</p>
            <p>Total Number of Bad Points: 32</p>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}
test('make results area from template', assert => {
    const candidates = [
        {
            debateScore: 30,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        },
        {
            debateScore: 15,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        },
        {
            debateScore: 13,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        },
        {
            debateScore: 7,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        },
        {
            debateScore: 6,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        },
        {
            debateScore: 5,
            debateWins: 0,
            firstName: 'Kamala',
            id: 'harris',
            image: './assets/candidates-harris.jpg',
            lastName: 'Harris'
        }
    ];
    const expected = `
    <section id="winner">
            <h2>Your top candidate this debate was: Kamala Harris</h2>
            <h3>Total Score: 30</h3>
            <p>Number of Good Points: 33</p>
            <p>Number of Bad Points: 3</p>
        </section>
        <hr>
        <section id="runners-up">
            <h3>Your other top candidates:</h3>
            <p>Elizabeth Warren: 15 points</p>
            <p>Jay Insley: 13 points</p>
        </section>
        <hr>
        <section id="others">
            <h4>Remaining Candidates:</h4>
            <p>Booker: 7 points</p>
            <p>Sanders: 6 points</p>
            <p>Gillibrand: 5 points</p>
        </section>
        <hr>
        <section id="debate-info">
            <p>Debate Time: 02:25</p>
            <p>Total Number of Good Points: 103</p>
            <p>Total Number of Bad Points: 32</p>
        </section>`;

    const result = makeResultsArea(candidates);

    assert.htmlEqual(result, expected);
});