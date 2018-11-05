const encryptSecretWithPassword = require('../utilities/encrypt-secret-with-password');

module.exports = context => async (data, functionContext) => {
  /**
   * Task 12: Encrypt the secret
   * Subject: Cloud Functions
   * Docs:
   *  https://firebase.google.com/docs/functions/callable#write_and_deploy_the_callable_function
   *
   * 1. Pull `admin` off of `context`.
   * 2. Pull `password`, 'secret` and `vaultId` off of `data`
   * 3. Pull `uid` off of `functionContext.auth`
   * 4. Call `await encryptSecretWithPassword({ password, secret})`. Save the result as `encrypted`.
   * 5. Create a `vaultDocRef` object by chaining off of `admin.firestore().collection('user-owned').
   * 6. Return `vaultDocRef.set({encrypted, encryptedDate: Date.now()}, { merge: true })`
   * 7. Make sure you've `cd`ed into the `functions` directory and run `npm test`. All should pass.
   *
   * This file exports a higher-order function that takes `context` as an argument.
   * `context` represents whatever `{ admin, environment }` values we want to work with.
   * This architecture enables use to use a different `context` for test and prod environments.
   *
   * The function that will be exported to the Cloud Functions runtime is async,
   * it also takes `data` and `functionContext` as arguments.
   * The `data` argument contains whatever we passed into the function when we called it,
   * in this case it's `{ password, secret, vaultId }`.
   * The `functionContext` argument contains an `auth` attribute with the user's JWT/currentUser.
   * We're pulling the `uid` variable off of the JWT for security purposes. You can't fake the JWT.
   *
   * `encrypteSecretWithPassword` takes the arguments `{ password, secret }` and returns a string.
   * We're going to set that string as the `encrypted` attribute of our `vaultDocRef`.
   * We could use `vaultDocRef.update(updates)` or `vaultDocRef.set(updates, { merge: true })`.
   * The second `{ merge: true }` argument turns `vaultDocRef.set` into an upsert. The upsert is
   * great for testing, because we don't have to see the `vaultDocRef` with data to run an upsert.
   * `vaultDocRef.update` will fail if a record does not already exist.
   *
   * Note: Cloud Functions requires that every function returns a promise. The easy way to do that
   * is to make sure that you make your function async. The `async` and `await` keywords aren't
   * available in Node v6, so we need to make sure that our function runs in Node v8.
   */

  // TODO: Implement the function!

  const { admin } = context;
  const { password, secret, vaultId } = data;
  const { uid } = functionContext.auth;
  const vaultDocRef = admin
    .firestore()
    .collection('user-owned')
    .doc(uid)
    .collection('vaults')
    .doc(vaultId);

  const { encrypted, iv, tag } = await encryptSecretWithPassword({ password, secret });

  const update = { encrypted, encryptedDate: Date.now(), iv, tag };

  return vaultDocRef.set(update, { merge: true });
};
