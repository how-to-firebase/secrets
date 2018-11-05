const testContext = require('../utilities/test-context');
const Encrypt = require('./encrypt');
const uuidv4 = require('uuid/v4');

describe('#encrypt', () => {
  describe('setup', () => {
    it('should start with a valid testContext ', () => {
      expect(Object.keys(testContext)).toEqual(['admin', 'environment']);
    });
  });

  describe('function call', () => {
    const password = 'password123';
    const secret = 'a super secret text block';
    const vaultId = 'test-vault';
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
      const encrypt = Encrypt(testContext);

      await encrypt({ password, secret, vaultId }, { auth: { uid } });

      const doc = await vaultDocRef.get();

      result = doc.data();
    });

    afterAll(async () => {
      await vaultDocRef.remove();
    });

    it('should have the encrypted attribute', () => {
      expect(result.encrypted.length).toEqual(50);
    });
  });
});
