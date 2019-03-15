import loadHeader from './make-header-component.js';
import candidates from '../data/candidates.js';
import { loadCandidateNewsItems, loadCandidateDetails } from './candidate-detail-component.js';

loadHeader();

const existingQuery = window.location.hash.slice(1);
const searchParams = new URLSearchParams(existingQuery);
const fName = searchParams.get('f');
const lName = searchParams.get('l');
const fullName = `${fName}+${lName}`;
const searchName = fullName.toString();

const candidate = candidates.find(candidate => candidate.firstName === fName);
loadCandidateDetails(candidate);

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
const API_KEY = '48DyuLG1wCcdW2CabBP6RcpqpqovELmu';
const url = `${BASE_URL}q=${searchName}&api-key=${API_KEY}`;

fetch(url)
    .then(response => response.json())
    .then(body => {
        const newsItems = body.response.docs;
        loadCandidateNewsItems(newsItems);
    });

