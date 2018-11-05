/**
 * See https://lollyrock.com/articles/nodejs-encryption/
 */
const { promisify } = require('util');
const crypto = require('crypto');
const algorithm = 'aes-256-gcm';

module.exports = async ({ encrypted, iv, password, tag }) => {
  const ivBuffer = new Buffer(iv, 'hex');
  const tagBuffer = new Buffer(tag, 'hex');
  const key = crypto
    .createHash('md5')
    .update(password)
    .digest('hex');
  let decipher;
  let decrypted;

  try {
    decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    decipher.setAuthTag(tagBuffer);
    decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  } catch (error) {
    console.error('error', error);
  }

  return decrypted;
};
