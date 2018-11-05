export default (firebase, { password, secret, vaultId }) => {
  /**
   * Task 9: Call the `encrypt` Cloud Function
   * Subject: Cloud Functions
   * Docs: https://firebase.google.com/docs/functions/callable#call_the_function
   *
   * 1. Use `.httpsCallable` to get a callable function named `encrypt`.
   * 2. Call the 'encrypt' function with `payload`
   * 3. Make sure to `await` the `encrypt` function
   * 4. Wrap the `encrypt` function call in a try/catch for error handling.
   * 5. Log any caught errors with console.log
   *
   * We haven't written the Cloud Function yet, so this will throw a bunch of errors.
   * We'll write the Cloud Function next.
   */
  const payload = {
    password,
    secret,
    vaultId,
  };
  
  // TODO: Implement Task
};
