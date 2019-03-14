import { getSearchNameFromHash } from './get-searchname-from-hash.js';

const existingQuery = window.location.hash.slice(1);
const searchName = getSearchNameFromHash(existingQuery);
console.log(searchName);

const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
const API_KEY = '48DyuLG1wCcdW2CabBP6RcpqpqovELmu';
const url = `${BASE_URL}q=${searchName}&api-key=${API_KEY}`;

fetch(url)
    .then(response => response.json())
    .then(body => {
        console.log(body.response.docs);
    });

