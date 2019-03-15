import { makeProfileHeader } from '../src/make-header-component.js';
const test = QUnit.test;

test('make dynamic profile section from template', assert => {
    const user = {
        displayName: 'Display Name',
        avatar: 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg'
    };
    const expected = `
    <section id="profile-display">
        <img src="https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg" alt="user avatar">
        <h2>Display Name</h2>
        <button>Sign Out</button>
    </section>`;

    const result = makeProfileHeader(user);

    assert.htmlEqual(result, expected);
});