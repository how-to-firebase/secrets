import React from 'react';
import { Fab } from '@rmwc/fab';
import { Snackbar } from '@rmwc/snackbar';
import { SimpleTopAppBar } from '@rmwc/top-app-bar';

import Vault from './vault';
import Vaults from './vaults';
import addVault from '../database/add-vault';
import removeVault from '../database/remove-vault';
import getVaults from '../database/get-vaults';

import '@material/fab/dist/mdc.fab.css';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/top-app-bar/dist/mdc.top-app-bar.css';

export default class LoggedIn extends React.Component {
  constructor() {
    super();

    this.state = this.localStorageState || {
      selectedVaultId: '',
      snackbarText: '',
      vaults: [],
    };
  }

  get firebase() {
    return window.firebase;
  }

  get localStorageStateName() {
    return 'logged-in-state';
  }

  get localStorageState() {
    return JSON.parse(window.localStorage.getItem(this.localStorageStateName));
  }

  set localStorageState(state) {
    window.localStorage.setItem(this.localStorageStateName, JSON.stringify(this.state));
  }

  async componentDidMount() {
    await this.getUserVaults();
  }

  componentDidUpdate() {
    this.localStorageState = this.state;
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

    // TODO: Implement Task
  }

  async handleAddVaultClick() {
    const { currentUser } = this.props;

    await addVault(this.firebase, currentUser.uid);

    await this.getUserVaults();

    this.setSnackbarText('Vault added');
  }

  async handleRemoveVaultClick() {
    const { currentUser } = this.props;
    const { selectedVaultId } = this.state;

    await removeVault(this.firebase, { vaultId: selectedVaultId, uid: currentUser.uid });

    this.handleBack();

    this.setSnackbarText('Vault removed');
  }

  async getUserVaults() {
    const { currentUser } = this.props;

    const vaults = await getVaults(this.firebase, currentUser.uid);

    this.setState({ vaults });
  }

  setSnackbarText(snackbarText) {
    this.setState({ snackbarText });
  }

  async handleBack() {
    await this.getUserVaults();

    this.setState({ selectedVaultId: '' });
  }

  render() {
    const { currentUser } = this.props;
    const { selectedVaultId, snackbarText, vaults } = this.state;

    return (
      <div id="logged-in">
        <SimpleTopAppBar
          title="Secrets"
          navigationIcon={{ onClick: () => console.log('Navigate') }}
          actionItems={[{ onClick: this.handleSignOutClick.bind(this), icon: 'power_off' }]}
        />
        <div className="content">
          {selectedVaultId ? (
            <Vault
              uid={currentUser.uid}
              vaultId={selectedVaultId}
              onBack={this.handleBack.bind(this)}
            />
          ) : (
            <Vaults
              vaults={vaults}
              onVaultSelected={selectedVaultId => this.setState({ selectedVaultId })}
            />
          )}
        </div>
        {selectedVaultId ? (
          <Fab
            className="fab"
            icon="delete_forever"
            onClick={this.handleRemoveVaultClick.bind(this)}
          />
        ) : (
          <Fab className="fab" icon="add" onClick={this.handleAddVaultClick.bind(this)} />
        )}
        <Snackbar
          show={!!snackbarText}
          message={snackbarText}
          onHide={() => this.setSnackbarText('')}
        />
      </div>
    );
  }
}
