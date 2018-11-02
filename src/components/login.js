import React from 'react';
import { Button } from '@rmwc/Button';

import '@material/button/dist/mdc.button.css';

export default class Login extends React.Component {
  get firebase() {
    return window.firebase;
  }

  signIn() {
    /**
     * Task 1: Implement signInWithPopup
     * Subject: Authentication
     * Docs: https://firebase.google.com/docs/auth/web/google-signin
     * Scopes: https://developers.google.com/identity/protocols/googlescopes#google_sign-in
     *
     * 1. Create a new GoogleAuthProvider
     * 2. Add the 'email' scope to the provider
     * 3. Call signInWithPopup using the new provider
     * 4. Attempt to sign in with the button and you'll likely get an 
     *    `auth/operation-not-allowed` error.
     * 5. Visit your Firebase Console an navigate to Authentication > Sign-in Method.
     * 6. Enable the Google sign-in provider.
     * 7. Attempt another login
     * 8. Call `firebase.auth().currentUser` in DevToolsto see your currentUser object 
     */

    // TODO: Implement Task
  }

  render() {
    return (
      <div id="login">
        <Button raised onClick={this.signIn.bind(this)}>
          Log in with Google
        </Button>
      </div>
    );
  }
}
