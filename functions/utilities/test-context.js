/**
 * Pulls in a service account and an environment file
 * Initializes a Firebase admin app
 * Sets Firestore settings on the admin app
 * Exports the context, consisting of the admin app and the environment
 */
const admin = require('firebase-admin');

const serviceAccount = require('../service-account.json');

const environment = require('../environments/environment.test.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: environment.firebase.databaseURL,
});

admin.firestore().settings({ timestampsInSnapshots: true });

module.exports = { admin, environment };
