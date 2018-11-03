export default (firebase, uid, vaultId, callback) => {
  /**
   * Task 7: Listen to vault changes
   * Subject: Firestore
   * Docs: https://firebase.google.com/docs/firestore/query-data/listen
   *
   * 1. Call `.onSnapshot()` on the user's `vault` doc.
   * 2. Call the callback function with the record.
   * 3. Return the `unsubscribe` function
   *
   * The `.onSnapshot` function takes a callback only. It returns an unsubscribe function.
   *
   */
  const unsubscribe = firebase
    .firestore()
    .collection('user-owned')
    .doc(uid)
    .collection('vaults')
    .doc(vaultId)
    .onSnapshot(doc => {
      // console.log('doc.id', doc.id);
      // console.log('doc.data()', doc.data());
      return callback(doc.data());
    });

  return unsubscribe;
};
