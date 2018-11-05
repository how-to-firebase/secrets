export default (firebase, { password, vaultId }) => {
  /**
   * Task 14: Call the `decrypt` Cloud Function
   * Subject: Cloud Functions
   * Docs: https://firebase.google.com/docs/functions/callable#call_the_function
   *
   * 1. Use `.httpsCallable` to get a callable function named `decrypt`.
   * 2. Call the 'decrypt' function with `payload`
   * 3. Make sure to `await` the `decrypt` function
   * 4. Wrap the `decrypt` function call in a try/catch for error handling.
   * 5. Log any caught errors with console.log
   *
   * We haven't written the Cloud Function yet, so this will throw a bunch of errors.
   * We'll write the Cloud Function next.
   */
  const payload = {
    password,
    vaultId,
  };
  const decrypt = firebase.functions().httpsCallable('decrypt');

  try {
    return decrypt(payload);
  } catch (error) {
    console.error(error);
  }
};
