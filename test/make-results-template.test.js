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
    {
        debateScore: 5,
        debateWins: 0,
        firstName: 'Bernie',
        id: 'sanders',
        image: 'assets/candidates-sanders.jpg',
        lastName: 'Sanders'
    }
];

function makeWinnerResultsArea(candidates) {
    const html = `
        <section id="winner">
            <img src="${candidates[0].image}" alt="${candidates[0].firstName} ${candidates[0].lastName}">
            <h2>Your top candidate this debate was: ${candidates[0].firstName} ${candidates[0].lastName}</h2>
            <h3>Points: ${candidates[0].debateScore}</h3>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function makeRunnersUpArea(candidates) {
    const html = `
        <section id="runners-up">
            <img src="${candidates[1].image}" alt="${candidates[1].firstName} ${candidates[1].lastName}">
            <p>${candidates[1].firstName} ${candidates[1].lastName}</p>
            <p>Points: ${candidates[1].debateScore}</p>
            <img src="${candidates[2].image}" alt="${candidates[2].firstName} ${candidates[2].lastName}">
            <p>${candidates[2].firstName} ${candidates[2].lastName}</p>
            <p>Points: ${candidates[2].debateScore}</p>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

function makeOthersArea(candidate) {
    const html = `
        <li>
            <p>${candidate.lastName}: ${candidate.debateScore} points</p>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

test('make winner-results area from template', assert => {
    const expected = `
        <section id="winner">
            <img src="assets/candidates-harris.jpg" alt="Kamala Harris">
            <h2>Your top candidate this debate was: Kamala Harris</h2>
            <h3>Points: 30</h3>
        </section>`;

    const result = makeWinnerResultsArea(candidates);

    assert.htmlEqual(result, expected);
});

test('make runners up area from template', assert => {
    const expected = `
        <section id="runners-up">
            <img src="assets/candidates-warren.jpg" alt="Elizabeth Warren">
            <p>Elizabeth Warren</p>
            <p>Points: 15</p>
            <img src="assets/candidates-inslee.jpg" alt="Jay Inslee">
            <p>Jay Inslee</p>
            <p>Points: 13</p>
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
            <p>Booker: 7 points</p>
        </li>`;

    const result = makeOthersArea(candidate);

    assert.htmlEqual(result, expected);
});

