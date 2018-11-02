import React from 'react';
import { Button } from '@rmwc/button';
import { IconButton } from '@rmwc/icon-button';
import { Snackbar } from '@rmwc/snackbar';
import { TextField } from '@rmwc/textfield';

import syncVault from '../database/sync-vault';
import updateVault from '../database/update-vault';
import encryptVault from '../database/encrypt-vault';
import debounceAsync from '../utilities/debounce-async';

import '@material/button/dist/mdc.button.css';
import '@material/snackbar/dist/mdc.snackbar.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';

export default class Vault extends React.Component {
  constructor() {
    super();

    this.state = {
      draftVault: null,
      password: 'default password',
      secret: '',
      snackbarText: '',
      encrypting: false,
      vault: null,
    };

    this.__updateVault = debounceAsync(updateVault, 1000 * 1);
  }

  get firebase() {
    return window.firebase;
  }

  componentDidMount() {
    this.startSync();
  }

  componentWillUnmount() {
    this.stopSync();
  }

  startSync() {
    const { uid, vaultId } = this.props;

    this.unsubscribe = syncVault(this.firebase, uid, vaultId, this.setVault.bind(this));
  }

  stopSync() {
    this.unsubscribe && this.unsubscribe();
  }

  setVault(vault) {
    this.setState({ draftVault: vault, vault });
  }

  setSnackbarText(snackbarText) {
    this.setState({ snackbarText });
  }

  async updateName(e) {
    const { uid, vaultId } = this.props;
    const { draftVault } = this.state;
    const name = e.target.value;

    this.setState({ draftVault: { ...draftVault, name } });

    const result = await this.__updateVault(this.firebase, uid, vaultId, { name });

    result && this.setSnackbarText('Saved');
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  updateSecret(e) {
    this.setState({ secret: e.target.value });
  }

  async encryptVault(e) {
    const { uid, vaultId } = this.props;
    const { draftVault, password, secret } = this.state;

    e.preventDefault();

    this.setState({ encrypting: true });

    await encryptVault(this.firebase, uid, vaultId, { password, secret });

    this.setSnackbarText('encrypted');

    return false;
  }

  render() {
    const { vaultId, onBack } = this.props;
    const { draftVault, encrypting, password, secret, snackbarText, vault } = this.state;

    return vault ? (
      <div id="vault">
        <IconButton icon="arrow_back" onClick={onBack} />
        <h1>Vault {vaultId}</h1>

        <form onSubmit={this.encryptVault.bind(this)}>
          <TextField
            outlined
            label="Vault Name"
            value={draftVault.name}
            onChange={this.updateName.bind(this)}
          />
          <TextField
            outlined
            label="Password"
            value={password}
            onChange={this.updatePassword.bind(this)}
          />
          <TextField
            outlined
            textarea
            label="Secret"
            value={secret}
            onChange={this.updateSecret.bind(this)}
          />
          <Button raised disabled={encrypting || !!vault.encryptedSecret}>
            encrypt
          </Button>
        </form>
        <Snackbar
          show={!!snackbarText}
          message={snackbarText}
          onHide={() => this.setSnackbarText('')}
        />
      </div>
    ) : null;
  }
}
