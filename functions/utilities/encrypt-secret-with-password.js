/**
 * See https://lollyrock.com/articles/nodejs-encryption/
 */
const { promisify } = require('util');
const crypto = require('crypto');
const pseudoRandomBytes = promisify(crypto.pseudoRandomBytes);
const algorithm = 'aes-256-gcm';

module.exports = async ({ password, secret }) => {
  const ivBuffer = await pseudoRandomBytes(16);
  const key = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');
  let cipher;
  let encrypted;
  let tagBuffer;

  try {
    cipher = crypto.createCipheriv(algorithm, key, ivBuffer);
    encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    tagBuffer = cipher.getAuthTag();
  } catch (error) {
    console.error('error', error);
  }

  return { encrypted, iv: ivBuffer.toString('hex'), tag: tagBuffer.toString('hex') };
};
