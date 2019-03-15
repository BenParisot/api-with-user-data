import './html-equal.js';
import './make-candidate-list.tests.js';
import './sort-candidates.tests.js';
import './make-header.test.js';
import './make-results-template.test.js';
import './make-candidate-detail-list.test.js';
import './object-to-array.test.js';

// add this import from our firebase.js module:
import { app } from '../src/firebase.js';
import './html-equal.js';
// import your test modules
import './shared/header-component.test.js';
import './shared/footer-component.test.js';
import './movies/hash-query.test.js';
import './movie-api.test.js';
import './movies/movies-component.test.js';
import './movie-detail/movie-detail-component.test.js';
import './convert-object-to-array.test.js';

// add this line that cleans up firebase when test suite is done:
QUnit.done(() => {
    app.delete();
});