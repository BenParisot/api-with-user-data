import { makeStaticHeader, makeProfileHeader } from '../src/make-header-component.js';
const test = QUnit.test;

test('make static header from template', assert => {
    const expected = `
    <section>
        <img src="https://static.thenounproject.com/png/678952-200.png" alt="debate icon">
        <h1>Track Your Candidate</h1>
    </section>
    `;

    const result = makeStaticHeader();

    assert.htmlEqual(result, expected);
});

test('make dynamic profile section from template', assert => {
    const user = {
        displayName: 'Display Name',
        avatar: 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
    };
    const expected = `
    <section id="profile-display">
        <img src="https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg" alt="user avatar">
        <h2>Display Name</h2>
        <a href=\"account.html\">Your Account</a>
        <button>Sign Out</button>
    </section>`;

    const result = makeProfileHeader(user);

    assert.htmlEqual(result, expected);
});