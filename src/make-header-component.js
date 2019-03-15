import { auth } from './firebase.js';

export function makeProfileHeader(user) {
    const avatar = user.photoURL || 'https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg';
    const html = `
    <section id="profile-display">
        <img src="${avatar}" alt="user avatar">
        <h2>${user.displayName}</h2>
        <button>Sign Out</button>
    </section>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const headerNode = document.getElementById('header');

export default function loadHeader(options) {
    if(options && options.authSkip) {
        return;
    }

    auth.onAuthStateChanged(user => {
        if(user) {
            const profileHeader = makeProfileHeader(user);
            const signOutButton = profileHeader.querySelector('button');
            signOutButton.addEventListener('click', () => {
                auth.signOut();
            });
            headerNode.appendChild(profileHeader);
        }
        else {
            window.location = 'auth.html';
        }

    });
}