/**
 * Firestore collection snapshots have a `.docs` field that contains all of their docs.
 * Firestore docs have a `doc.id` property and store the rest of their data in `doc.data()`.
 * It's very useful to extract these docs into an easier-to-use structure for use in React.
 *
 * This app uses a convention where the `doc.id` value is assigned to `{ __id: doc.id }`
 * for each extracted record. It makes looping in React much easier.
 */
export default snapshot => snapshot.docs.map(doc => ({ __id: doc.id, ...doc.data() }));
