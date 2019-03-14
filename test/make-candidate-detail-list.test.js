const test = QUnit.test;

const candidate = {
    id: 'gabbard',
    firstName: 'Tulsi',
    lastName: 'Gabbard',
    image: 'assets/candidates-gabbard.jpg',
    debateScore: 0,
    debateWins: 0
}

function makeCandidateDetailArea(candidate) {
    const html = `
    <section>
        <img src="${candidate.image}" alt="${candidate.firstName} ${candidate.lastName}">
        <h2>${candidate.firstName} ${candidate.lastName}</h2>
    </section>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

test('make candidate detail area from template', assert => {

    const expected = `
    <section>
        <img src="assets/candidates-gabbard.jpg" alt="Tulsi Gabbard">
        <h2>Tulsi Gabbard</h2>
    </section>`;

    const result = makeCandidateDetailArea(candidate);

    assert.htmlEqual(result, expected);
});