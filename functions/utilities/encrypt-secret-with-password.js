/**
 * See https://lollyrock.com/articles/nodejs-encryption/
 */
const { promisify } = require('util');
const crypto = require('crypto');
const pseudoRandomBytes = promisify(crypto.pseudoRandomBytes);
const algorithm = 'aes-256-ctr';

module.exports = async ({ password, secret }) => {
  const ivBuffer = await pseudoRandomBytes(16);
  const key = crypto
    .createHash('md5')
    .update(password)
    .digest('utf8');
  let cipher;
  let crypted;
  try {
    cipher = crypto.createCipheriv(algorithm, '3zTvzr3p67VC61jmV54rIYu1545x4TlY', ivBuffer);
    crypted = cipher.update(secret, 'utf8', 'hex');
    crypted += cipher.final('hex');
  } catch (error) {
    console.error('error', error);
  }

  return crypted;
};
