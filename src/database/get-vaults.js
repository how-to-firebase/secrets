import extractRecordsFromFirestoreSnapshot from './extract-records-from-firestore-snapshot';

export default async (firebase, uid) => {
  /**
   * Task 6: Query your vaults
   * Subject: Firestore
   * Docs: https://firebase.google.com/docs/firestore/query-data/get-data
   *
   * 1. Call `.get()` on the user's `vaults` collection.
   * 2. Don't forget to await the result of `.get()`
   * 3. Pass the snapshot through `extractRecordsFromFirestoreSnapshot(snapshot)`
   * 4. Return the extracted records
   * 5. Review `src/database/extract-records-from-firestore-snapshot.js`
   *
   * The easiest error to make here is to forget the `await` keyword.
   * You can use a promise-based pattern here if you don't like async/await
   */
  const snapshot = await firebase
    .firestore()
    .collection('user-owned')
    .doc(uid)
    .collection('vaults')
    .get();

  return extractRecordsFromFirestoreSnapshot(snapshot);
};
