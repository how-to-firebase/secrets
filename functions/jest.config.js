/**
 * `roots` tells Jest where to look for tests
 * `transformIgnorePatterns` tells Jest to not attempt Babel transforms on our files
 *
 * Jest is built for front-end React tests, so it assumes that every test needs to
 * be compiled with Babel. Babel throws all sorts of errors when testing Node.js code,
 * so we're telling Jest to not attempt to run Babel transforms on our files.
 *
 * You'll need to add folder
 */

module.exports = {
  roots: ['src', 'utilities'],
  transformIgnorePatterns: ['/'],
};
