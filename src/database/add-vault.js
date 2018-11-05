export default async (firebase, uid) => {
  /**
   * Task 4: Add a Firestore record
   * Subject: Firestore
   * Docs: https://firebase.google.com/docs/firestore/manage-data/add-data
   *
   * 1. Enable Firestore in your Console at Database > Create Database. Start in "locked mode"
   * 2. Add the vault to /user-owned/{uid}/vaults/.
   * 3. Click your the "+" fab button to test.
   *    YOU WILL GET AN ERROR IN YOUR CONSOLE. THIS IS EXPECTED.
   *
   * Firestore follows a collection/doc/collection/doc pattern.
   * You can only call .add on a collection, which will create a new doc.
   * We're expecting a `Missing or insufficient permissions` error.
   */
  const vault = { name: `New Vault: ${new Date().toISOString()}`, created: Date.now() };

  // TODO: Implement Task
};
