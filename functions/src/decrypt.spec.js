const testContext = require('../utilities/test-context');
const Decrypt = require('./decrypt');
const uuidv4 = require('uuid/v4');

describe('#decrypt', () => {
  describe('setup', () => {
    it('should start with a valid testContext ', () => {
      expect(Object.keys(testContext)).toEqual(['admin', 'environment']);
    });
  });

  describe('function call', () => {
    const encrypted = '6745818dbec53e324928ffffc55d3b6d5ba76ee31ae321be08';
    const tag = '5702fe4235553668640571f96e2842dd';
    const iv = '75316872421c63c5c9a1f7db4d5887f3';
    const password = 'password123';
    const vaultId = 'test-vault';
    const secret = 'a super secret text block';
    const uid = `test-uuid-${uuidv4()}`;

    const { admin } = testContext;
    const vaultDocRef = admin
      .firestore()
      .collection('user-owned')
      .doc(uid)
      .collection('vaults')
      .doc(vaultId);

    let result;

    beforeAll(async () => {
      const decrypt = Decrypt(testContext);

      await vaultDocRef.set({ encrypted, tag, iv });

      result = await decrypt({ password, vaultId }, { auth: { uid } });
    });

    afterAll(async () => {
      await vaultDocRef.remove();
    });

    it('should have the decrypted attribute', () => {
      expect(result.decrypted).toEqual(secret);
    });
  });
});
