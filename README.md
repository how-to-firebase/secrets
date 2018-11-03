# Secrets: A Firebase feature teacher

We're going to workshop our way through to a functional web application built on the Firebase platform.

We'll try to abstract away as much of the non-Firebase code as possible so that we can focus on the Firebase.

## Dependencies

You'll need to [install node](https://nodejs.org/en/download/), which comes bundled with the [npm](https://docs.npmjs.com/getting-started/what-is-npm) package manager for Node.js dependencies.

We'll use a Node package named [npx](https://github.com/zkat/npx) to run some of our Node.js executables.

`npx` is Node.js package runner written--of course!--with Node.js. `npx` can find an executable from either the local or the global `node_modules` folder. It will attempt to find the executable dependency locally, then globally. If that fails, npx will install it into a global cache and run it from there.

## Create a Firebase project

- Visit `https://console.firebase.google.com/` and create a project.
- Name the project whatever you'd like. The options here don't matter much.

## Enable the Firebase Tools CLI

- Install `npx` with `npm install --global npx`
- `npx firebase login` to log in with the same Google account that you used for your Firebase project

The `firebase-tools` CLI can now be accessed by running `npx firebase`.

## Installation for completed app

- `npm install --global npx` to install npx
- `git checkout complete` to check out the completed branch
- `npm install` to install the front-end dependencies
- `cd functions && npm install` to install Cloud Functions dependencies
- `cd functions && npm test` to run Cloud Functions tests
-
- `npm run-script deploy` to deploy the Firebase app

## Installation for workshop

- `npm install --global npx` to install npx
- `git checkout master` to check out the workshop starting point
- `npm install` to install the front-end dependencies
- `npx firebase init`
  - Use the arrow keys to install all of the Firebase CLI features
  - Select the project that you're using for this workshop
  - Accept the defaults
  - You'll know you're done when you see `+ Firebase initialization complete!` in your terminal

## firebase init

If you accepted the defaults, then `npx firebase init` will have installed the following files:

- `/functions`: Your Cloud Functions code
- `/public`: The public files to be deployed on Firebase Hosting
- `.firebaserc`: Firebase project definition
- `database.rules.json`: Realtime Database (aka the RTDB) security rules
- `firebase.json`: Firebase project config
- `firestore.indexes.json`: Firestore indexes
- `firestore.rules`: Firestore security rules
- `storage.rules`: Firebase Storage security rules

We'll start the workshop with these files in their default states. The only project-specific file in here is `.firebaserc`, which you can edit to point the `firebase-tools` CLI to any Firebase project for which you have access.

Check out `.firebaserc.dist` for an example of the file.

### Check your installation

Run `npx firebase serve` to run a local Firebase Hosting emulator. Open [http://localhost:5000/](http://localhost:5000/) to see what you have so far.

The page you see is served from the `/public` folder. We'll be overwriting these files soon, so don't get attached.

## Run local dev server

We're using the [Parcel](https://parceljs.org/getting_started.html) app bundler and dev server.

Parcel is mostly automated, so there isn't much to manage yourself. The Parcel commands that we'll use are within the `package.json` scripts and can be called with `npm run-script serve` and `npm run-script build`.

Run `npm run-script serve` to get your local dev server running. The terminal will tell you which port on `localhost` to use to view your page. The default url is [http://localhost:1234/](http://localhost:1234/)

## Test your Firebase Hosting deploy

1. Run `npm run-script build` top populate your `/public` folder with the build app files.
2. Run `npx firebase deploy --only hosting` to deploy only Firebase Hosting.
3. See the "Hosting URL" output by your terminal and follow that URL to test your deploy.
4. Add `/__/firebase/init.js` to your hosting URL and open that page to see your Firebase Hosting initialization. Example: `https://how-to-firebase-secrets.firebaseapp.com/__/firebase/init.js`.

The `/__/firebase/init.js` file is available after your first Firebase Hosting deploy. This allows for a very handy pattern where you merely reference the `init.js` file in a script tag on your page and you're automatically initialized wherever you deploy your app on Firebase Hosting.

This is a bit of an advanced tricky, but let's do it!

## Add Firebase to your project

Open up the [Firebase web setup docs](https://firebase.google.com/docs/web/setup) and scroll down to the CDN script tags. Copy the entire block and paste it into your `src/index.html` file at the bottom of the `<head></head>` tag.

We'll use `firebase-app.js`, `firebase-auth.js`, `firebase-firestore.js` and `firebase-functions.js` scripts. So go ahead and comment out or delete the other script tags.

Finally, notice the script tag that contains `firebase.initializeApp(config)`. Replace the guts of that `<script>` tag with the contents of `__/firebase/init.js`. You can delete the first line if `init.js`... or leave it. It's up to you!

Now add `firebase.firestore().settings({ timestampsInSnapshots: true });` to the end of the script tag. You don't need to understand this setting, but omitting it will result in nasty console errors.

The final result should look something like this:

```html
<head>
  <!-- ... A BUNCH OF HEAD TAGS ARE ABOVE THIS LINE ALREADY -->

  <!-- Firebase App is always required and must be first -->
  <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js"></script>

    <!-- Add additional services that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-firestore.js"></script>
  <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-functions.js"></script>

  <!-- Comment out (or don't include) services that you don't want to use -->
  <!-- <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js"></script> -->
  <!-- <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-database.js"></script> -->
  <!-- <script src="https://www.gstatic.com/firebasejs/5.5.6/firebase-storage.js"></script> -->

  <script>
    firebase.initializeApp({
      "apiKey": "AIzaSyAAZJPjhsSQ9gbyuoWp16fYrm0qtlYCWuo",
      "databaseURL": "https://how-to-firebase-secrets.firebaseio.com",
      "storageBucket": "how-to-firebase-secrets.appspot.com",
      "authDomain": "how-to-firebase-secrets.firebaseapp.com",
      "messagingSenderId": "251294611949",
      "projectId": "how-to-firebase-secrets"
    });

    firebase.firestore().settings({ timestampsInSnapshots: true });
  </script>
</head>
```

Check your setup by opening up Chrome DevTools on your dev page and typing `firebase.app().options`. This will output the config for your Firebase app. Just make sure that it looks right, and you're good.

# Firebase Authentication

Now that we have the Firebase SDK on our page, we can implement auth in just three easy steps.

## Task 1: Implement signInWithPopup

**File:** `src/components/login.js`

We're going to wire up the "Log in with Google" button to Firebase Authentication.

You can find the completed code on the `complete` branch of this repo: [login.js](https://github.com/how-to-firebase/secrets/blob/complete/src/components/login.js)

## Task 2: Implement onAuthStateChange listener

**File:** `src/components/app.js`

Firebase has a `currentUser` object that represents the logged-in user's [JWT](https://jwt.io/).

We'll need to sync the `currentUser` JWT to our app's state.

You can find the completed code on the `complete` branch of this repo: [app.js](https://github.com/how-to-firebase/secrets/blob/complete/src/components/app.js)

## Task 3: Implement signOut

**File:** `src/components/logged-in.js`

Signing out with Firebase Authentication is EASY!

You can find the completed code on the `complete` branch of this repo: [logged-in.js](https://github.com/how-to-firebase/secrets/blob/complete/src/components/logged-in.js)

## Task 4: Prepare to add a Firestore record

**File:** `src/database/add-vault.js`

You won't be able to actually add a record until you've completed Task 5. This step succeeds when you get your first `Missing or insufficient permissions` error.

You can find the completed code on the `complete` branch of this repo: [add-vault.js](https://github.com/how-to-firebase/secrets/blob/complete/src/database/add-vault.js)

## Task 5: Add your first security rule

**File:** `firestore.rules`

You created `firestore.rules` earlier when calling `npx firebase init`. `firestore.rules` contains the security rules that you'll need to secure your Firestore database.

Review [Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started) to see how flexible they can be.

We're not going to go deep into security rules. That would be a different workshop. So just make sure that your `firestore.rules` file looks like this:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /user-owned/{uid}/vaults/{vaultId} {
      allow read, write: if request.auth.uid == uid
    }
  }
}
```

Then call `npx firebase deploy --only firestore` to deploy your Firestore rules.

Now you can add the vaults that you wanted in Task 4!

## Task 6: Query your vaults

**File:** `firestore.rules`

You created `firestore.rules` earlier when calling `npx firebase init`. `firestore.rules` contains the security rules that you'll need to secure your Firestore database.

Review [Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started) to see how flexible they can be.

## Task 7: Listen to vault changes

**File:** `src/database/sync-vault.js`

You can find the completed code on the `complete` branch of this repo: [sync-vault.js](https://github.com/how-to-firebase/secrets/blob/complete/src/database/sync-vault.js)

## Task 8: Update the vault

**File:** `src/database/update-vault.js`

You can find the completed code on the `complete` branch of this repo: [update-vault.js](https://github.com/how-to-firebase/secrets/blob/complete/src/database/update-vault.js)

## Task 9: Call the Cloud Function

**File:** `src/database/encrypt-vault.js`

You can find the completed code on the `complete` branch of this repo: [encrypt-vault.js](https://github.com/how-to-firebase/secrets/blob/complete/src/database/encrypt-vault.js)

## Task 10: Configure Jest

**File:** `functions/package.json`

All of the Cloud Functions code lives in this folder, which is a separate NPM project with its own `package.json`. We'll need to make sure that Jest is installed, and we'll want to configure a test command.

1. Run `cd functions` to begin work on your Cloud Functions.
2. `npm install --save-dev jest` to get the Jest test runner.
3. Add a `"scripts"` attribute to `package.json` and add `"test": "jest --watchAll"` to scripts.
4. Add an `"engines"` attribute with `"node": "8"` to make sure that our functions run in the Node v8 runtime instead of the default v6.

The result should look like this:

```json
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "test": "jest --watchAll",
    "serve": "firebase serve --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "dependencies": {
    "firebase-admin": "~6.0.0",
    "firebase-functions": "^2.1.0"
  },
  "engines": {
    "node": "8"
  },
  "private": true,
  "devDependencies": {
    "jest": "^23.6.0"
  }
}
```

The rest of this file is auto-generated by `npx firebase init`, so don't worry about it. The other "scripts" commands are useful but outside the scope of this workshop.

4. Run `npm test` to verify that Jest gets called. Type `q` to quit.

You can find the completed code on the `complete` branch of this repo: [package.json](https://github.com/how-to-firebase/secrets/blob/complete/src/functions/package.json)

## Task 11: Initialize test environment

**File:** `functions/src/encrypt.spec.js`

1. Download a service account for your project: [service account download instructions](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app)
2. Move the service account file to `functions/service-account.json`. This file will be ignored by `git`, so it won't ever make it into your source control. Guard this file carefully, because it grants admin rights to your Firebase project.
3. Copy the `databaseURL` value from the Firebase Admin SDK screen where you just downloaded your service account.
4. Update the `databaseURL` values in `functions/environments/environment.js` and `functions/environments/environment.test.js`.
5. Run `npm test` to verify that the `#encrypt -> setup` tests pass.
6. Open up `functions/utilities/test-context.js` and `functions/jest.config.js` and read the comments at the top of each file.

The Cloud Functions runtime provides an initialized Firebase `admin` app, but we don't have that in our testing environment. Therefore we need to create our own `admin` app with a service account.

We're also setting up basic environment files to add to our `context` object. This `context` object is arbitrary. We just made it up. But most use cases of Cloud Functions will need environment variables and an `admin` app, so we're starting with a robust architecture.

## Task 12: Encrypt the secret

**File:** `functions/encrypt.js`

You can find the completed code on the `complete` branch of this repo: [encrypt.js](https://github.com/how-to-firebase/secrets/blob/complete/functions/src/encrypt.js)

## Task 13: Export EncryptVault to the Cloud Functions runtime

**File:** `functions/index.js`

1. Import `../utilities/prod-context` as your production `context`.
2. Instantiate an instance of our `encrypt` function using `Encrypt(context)`.
3. Export a callable Cloud Function to `exports.encrypt` using [the docs](https://firebase.google.com/docs/functions/callable#write_and_deploy_the_callable_function) as a guide.
4. Run `npm install` and `npx firebase deploy --only functions` to deploy.
5. Open up the Functions logs in your Firebase Console to confirm that the deploy succeeded.
5. Use the running `localhost` version of the app to attempt to encrypt a secret.
6. Verify that the `encrypted` string was saved to Firestore.
7. Watch the Functions logs to see each call to `encrypted` succeed.

You can find the completed code on the `complete` branch of this repo: [index.js](https://github.com/how-to-firebase/secrets/blob/complete/functions/index.js)
