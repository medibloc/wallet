import { cryptography, local, utils } from 'medjs';

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

export const isAddress = address => (
  utils.isAddress(address)
);

export const getAccountFromPrivKey = (privKey, password) => {
  const encryptedPrivKey = cryptography.encryptKey(password, privKey);
  return new Account(password, encryptedPrivKey);
};

export const getAccountFromEncKey = (encKey, password) => new Account(password, encKey);
