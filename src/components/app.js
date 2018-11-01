import React from 'react';
import Login from './login';
import LoggedIn from './logged-in';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
      vaults: [],
    };
  }

  get firebase() {
    return window.firebase;
  }

  componentDidMount() {
    this.syncCurrentUser();
  }

  syncCurrentUser() {
    /**
     * Task 2: Implement onAuthStateChange listener
     * Subject: Authentication
     * Docs: https://firebase.google.com/docs/auth/web/start
     *
     * 1. Use `onAuthStateChanged` to call this.setState({ currentUser })
     * 2. You'll know you've logged in when you see the "Log Out"
     */
    this.firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }));
  }

  render() {
    const { currentUser, vaults } = this.state;

    return currentUser ? <LoggedIn currentUser={currentUser} vaults={vaults} /> : <Login />;
  }
}
