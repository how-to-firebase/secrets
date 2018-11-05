export default async (firebase, { uid, vaultId }) => {
  /**
   * Task 17: Delete a Firestore record
   * Subject: Firestore
   * Docs: https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
   *
   * 1. Delete the vault doc
   *    Hint: /user-owned/{uid}/vaults/{vaultId}
   */

  return firebase
    .firestore()
    .collection('user-owned')
    .doc(uid)
    .collection('vaults')
    .doc(vaultId)
    .delete();
};
