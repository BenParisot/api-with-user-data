import { app } from '../src/firebase.js';
import './html-equal.js';
import './make-candidate-list.tests.js';
import './sort-candidates.tests.js';
import './make-header.test.js';
import './make-results-template.test.js';
import './make-candidate-detail-list.test.js';
import './object-to-array.test.js';

QUnit.done(() => {
    app.delete();
});