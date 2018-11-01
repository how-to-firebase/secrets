import React from 'react';
import { SimpleTopAppBar } from '@rmwc/top-app-bar';
import { Fab } from '@rmwc/fab';

import Vaults from './vaults';

import '@material/fab/dist/mdc.fab.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

export default class LoggedIn extends React.Component {
  get firebase() {
    return window.firebase;
  }

  handleSignOutClick() {
    /**
     * Task 3: Implement signOut
     * Subject: Authentication
     * Docs: https://firebase.google.com/docs/auth/web/google-signin#next_steps
     *
     * 1. Call `signOut` to sign out of Firebase Authentication
     *
     * Try using `this.firebase` to access `window.firebase` via this component's `firebase` getter
     */

    this.firebase.auth().signOut();
  }

  handleAddVaultClick() {
    console.log('add vault clicked');
  }

  render() {
    const { currentUser, vaults } = this.props;

    return (
      <div id="logged-in">
        <SimpleTopAppBar
          title="Secrets"
          navigationIcon={{ onClick: () => console.log('Navigate') }}
          actionItems={[{ onClick: this.handleSignOutClick.bind(this), icon: 'power_off' }]}
        />
        <div className="content">
          <Vaults vaults={vaults} />
        </div>
        <Fab className="add-vault-fab" icon="add" onClick={this.handleAddVaultClick.bind(this)} />
      </div>
    );
  }
}
