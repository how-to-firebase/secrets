const decryptEncryptedWithPassword = require('../utilities/decrypt-encrypted-with-password');

module.exports = context => async (data, functionContext) => {
  /**
   * Task 15: Decrypt the vault
   * Subject: Cloud Functions
   * Docs:
   *  https://firebase.google.com/docs/functions/callable#write_and_deploy_the_callable_function
   *
   * 1. Pull `admin` off of `context`.
   * 2. Pull `password` and `vaultId` off of `data`
   * 3. Pull `uid` off of `functionContext.auth`
   * 4. Pull `password` and 'vaultId` off of `data`
   * 5. Create a `vaultDocRef` by chaining off of `admin.firestore().collection('user-owned')`
   *    Hint: /user-owned/{uid}/vaults/{vaultId}
   * 6. Get the `vaultDoc` by awaiting `vaultDocRef.get()`
   * 7. Extract `encrypted`, `iv`, and `tag` off of `vaultDoc.data()`
   * 8. Call `await decryptEncryptedWithPassword({ encrypted, iv, password, tag })`.
   *    Save the result as `decrypted`.
   * 3. Return the `decrypted` value as { decrypted: 'the decrypted string' }
   */

  // TODO: Implement the function!

  const { admin } = context;
  const { password, vaultId } = data;
  const { uid } = functionContext.auth;
  const vaultDocRef = admin
    .firestore()
    .collection('user-owned')
    .doc(uid)
    .collection('vaults')
    .doc(vaultId);

  const vaultDoc = await vaultDocRef.get();

  const { encrypted, iv, tag } = vaultDoc.data();
  const decrypted = await decryptEncryptedWithPassword({ encrypted, iv, password, tag });

  return { decrypted };
};
