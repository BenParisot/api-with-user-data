import { getSearchNameFromHash } from '../src/get-searchname-from-hash.js';
const test = QUnit.test;

test('get candidate searchName from hash', assert => {
    const existingQuery = 'f=Cory&l=Booker';
    const expected = 'Cory+Booker';
    const result = getSearchNameFromHash(existingQuery);

    assert.equal(result, expected);
});