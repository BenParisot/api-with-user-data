const test = QUnit.test;


function makeWinnerResultsArea(candidates) {
    const topThree = candidates.slice(0, 3);
    const runnersUp = candidates.slice(3);
    const html = `
        <section id="winner">
            <img src="${topThree[0].image}" alt="${topThree[0].firstName} ${topThree[0].lastName}">
            <h2>Your top candidate this debate was: ${topThree[0].firstName} ${topThree[0].lastName}</h2>
            <h3>Points: ${topThree[0].debateScore}</h3>
        </section>`;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}
test('make winner-results area from template', assert => {
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
            image: './assets/candidates-inslee.jpg',
            lastName: 'Inslee'
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
            debateScore: 7,
            debateWins: 0,
            firstName: 'Cory',
            id: 'booker',
            image: './assets/candidates-booker.jpg',
            lastName: 'Booker'
        },
        {
            debateScore: 5,
            debateWins: 0,
            firstName: 'Bernie',
            id: 'sanders',
            image: './assets/candidates-sanders.jpg',
            lastName: 'Sanders'
        }
    ];
    const expected = `
        <section id="winner">
            <img src="assets/candidates-harris.jpg" alt="Kamala Harris">
            <h2>Your top candidate this debate was: Kamala Harris</h2>
            <h3>Points: 30</h3>
        </section>`;

    const result = makeWinnerResultsArea(candidates);

    assert.htmlEqual(result, expected);
});