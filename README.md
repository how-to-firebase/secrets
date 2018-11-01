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
  - You'll know you're done when you see `+  Firebase initialization complete!` in your terminal

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

The page you see is served from the `/public` folder. We'll be overwriting them soon, so don't get attached.

## Run local dev server

We're using the [Parcel](https://parceljs.org/getting_started.html) app bundler and dev server.

Parcel is mostly automated, so there isn't much to manage yourself. The Parcel commands that we'll use are within the `package.json` scripts and can be called with `npm run-script serve` and `npm run-script build`. 
