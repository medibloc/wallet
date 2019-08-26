import { cryptography, local, utils } from 'medjs';
import panacea from '@medibloc/panacea-js';

const { crypto } = panacea;

const { Account } = local;

export const extractKeyPair = passphrase =>
  cryptography.getKeyPairFromPassphrase(passphrase);

export const extractPrivKey = passphrase =>
  cryptography.getKeyPairFromPassphrase(passphrase).privKey;

export const extractPublicKey = passphrase =>
  cryptography.getKeyPairFromPassphrase(passphrase).pubKey;

export const getPubKey = privKey =>
  cryptography.getPubKey(privKey);

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
  const privKey = crypto.getPrivateKeyFromMnemonic(data);
  const encodedPubKey = crypto.getAddressFromPrivateKey(privKey);
  return encodedPubKey;
};

export const isAddress = address => (
  utils.isAddress(address)
);

export const getAccountFromPrivKey = (privKey, password) => {
  const encryptedPrivKey = cryptography.encryptKey(password, privKey);
  return new Account(password, encryptedPrivKey);
};

export const getAccountFromKeyPair = (keyPair, password) => {
  const encryptedPrivKey = cryptography.encryptKey(password, keyPair.privKey);
  return new Account(password, encryptedPrivKey, keyPair.pubKey);
};

export const getAccountFromEncKey = (encKey, password) => new Account(password, encKey);

export const getPrivKeyFromEncKey = (encKey, password) => cryptography.decryptKey(password, encKey);
