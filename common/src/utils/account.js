import { cryptography, local } from 'medjs';

const { Account } = local;

export const extractPrivKey = passphrase =>
  cryptography.getKeyPairFromPassphrase(passphrase).privKey;

export const extractPublicKey = passphrase =>
  cryptography.getKeyPairFromPassphrase(passphrase).pubKey;

/**
* @param {String} data - passphrase or public key
*/
export const extractAddress = (data) => {
  if (!data) {
    return false;
  }
  if (data.indexOf(' ') < 0) {
    return data;
  }
  const { pubKey } = cryptography.getKeyPairFromPassphrase(data);
  return pubKey;
};

// export const getAccountFromPassphrase = (passphrase, password) => {
//   const privKey = cryptography.getKeyPairFromPassphrase(passphrase).privKey;
//   const encryptedPrivKey = cryptography.encryptKey(password, privKey);
//   return account(password, encryptedPrivKey);
// };

export const getAccountFromPrivKey = (privKey, password) => {
  const encryptedPrivKey = cryptography.encryptKey(password, privKey);
  return new Account(password, encryptedPrivKey);
};
