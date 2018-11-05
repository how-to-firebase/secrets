const functions = require('firebase-functions');
const context = require('./utilities/prod-context');

// Encrypt
const Encrypt = require('./src/encrypt');
const encrypt = Encrypt(context);

exports.encrypt = functions.https.onCall(encrypt);

// Decrypt
const Decrypt = require('./src/decrypt');
const decrypt = Decrypt(context);

exports.decrypt = functions.https.onCall(decrypt);
