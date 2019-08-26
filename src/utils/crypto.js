import {
  createHash, randomBytes,
  createCipheriv, createDecipheriv,
} from 'crypto-browserify';
import is from 'is_js';

const algorithm = 'AES-256-CTR';

export const decryptData = (password, encData) => {
  if (!encData) return null;

  const textParts = encData.split(':');
  if (textParts.length !== 2) {
    throw new Error('Invalid encrypted data format');
  }

  const iv = Buffer.from(textParts.shift(), 'hex');
  const encText = Buffer.from(textParts[0], 'hex');
  const hashedPassword = createHash('sha256').update(password).digest('hex');

  const decipher = createDecipheriv(algorithm, Buffer.from(hashedPassword, 'hex'), iv);
  const decryptedData = decipher.update(encText, 'hex', 'utf8');

  try {
    return decryptedData + decipher.final('utf8');
  } catch (err) {
    throw new Error('Wrong password');
  }
};

export const encryptData = (password, data) => {
  if (!is.string(password)) throw new Error('Password needs to be a string format');

  const iv = randomBytes(16);
  const hashedPassword = createHash('sha256').update(password).digest('hex');

  const cipher = createCipheriv(algorithm, Buffer.from(hashedPassword, 'hex'), iv);
  const encryptedData = `${cipher.update(data, 'utf8', 'hex')}${cipher.final('hex')}`;

  return `${iv.toString('hex')}:${encryptedData}`;
};
