import loadHeader from './make-header-component.js';

loadHeader();

const json = window.localStorage.getItem('sortedCandidates');
let sortedCandidates = JSON.parse(json);

console.log(sortedCandidates);