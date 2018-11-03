/**
 * Initializes a Firebase admin app without arguments
 * `admin.initializeApp()` can be called without arguments in the production runtime
 * Sets Firestore settings on the admin app
 * Exports the context, consisting of the admin app and the environment
 */
const admin = require('firebase-admin');

const environment = require('../environments/environment.json');

admin.initializeApp();

admin.firestore().settings({ timestampsInSnapshots: true });

module.exports = { admin, environment };
