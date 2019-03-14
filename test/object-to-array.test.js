import objectToArray from '../src/object-to-array.js';

const test = QUnit.test;

test('make array from object', assert => {
    const object = {
        abc: { id: '335' },
        def: { id: '785775' },
        efg: { id: '845743' }
    };
    const expected = [
        { id: '335' },
        { id: '785775' },
        { id: '845743' }
    ];

    const result = objectToArray(object);

    assert.deepEqual(result, expected);
})