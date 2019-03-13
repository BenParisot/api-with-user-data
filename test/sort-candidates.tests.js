import sortCandidatesByDebateScore from '../src/candidates-sort-component.js';
const test = QUnit.test;

const candidates = [
    { name: 'fred', debateScore: 3 },
    { name: 'ned', debateScore: -5 },
    { name: 'mary', debateScore: 6 },
    { name: 'charlie', debateScore: 2 },
    { name: 'bill', debateScore: 0 },
    { name: 'ted', debateScore: -1 },
];

test('sort candidate list by debateScore', assert => {

    const expected = [
        { name: 'mary', debateScore: 6 },
        { name: 'fred', debateScore: 3 },
        { name: 'charlie', debateScore: 2 },
        { name: 'bill', debateScore: 0 },
        { name: 'ted', debateScore: -1 },
        { name: 'ned', debateScore: -5 },
    ];

    const result = sortCandidatesByDebateScore(candidates);

    assert.deepEqual(result, expected);
});