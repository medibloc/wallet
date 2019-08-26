import { cryptography, local, utils } from 'medjs';
import panacea from '@medibloc/panacea-js';

const { Account, crypto } = panacea;

export const extractKeyPair = (mnemonic) => {
  const privKey = crypto.getPrivateKeyFromMnemonic(mnemonic);
  const pubKey = crypto.getPublicKeyFromPrivateKey(privKey);
  return ({ privKey, pubKey });
};

export const extractPrivKey = mnemonic => extractKeyPair(mnemonic).privKey;

export const extractPublicKey = mnemonic => extractKeyPair(mnemonic).pubKey;

export const getPubKey = privKey => crypto.getPublicKeyFromPrivateKey(privKey);

export const getAddressFromPublicKey = pubKey => crypto.getAddressFromPublicKey(pubKey);

export const getAddressFromPrivateKey = privKey => crypto.getAddressFromPrivateKey(privKey);

/**
* @param {String} data - passphrase or public key
*/
export const extractAddressFromMnemonic = (mnemonic) => {
  if (!mnemonic) {
    return false;
  }
  if (mnemonic.indexOf(' ') < 0) {
    return mnemonic;
  }
  const privKey = crypto.getPrivateKeyFromMnemonic(mnemonic);
  const address = crypto.getAddressFromPrivateKey(privKey);
  return address;
};

export const isAddress = address => (
  utils.isAddress(address)
);

export const getAccountFromPrivKey = privateKey => new Account({ privateKey });

export const getAccountFromKeyPair = (keyPair, password) => {
  const encryptedPrivKey = cryptography.encryptKey(password, keyPair.privKey);
  return new local.Account(password, encryptedPrivKey, keyPair.pubKey);
};

export const getAccountFromEncKey = (encKey, password) => new local.Account(password, encKey);

export const getPrivKeyFromEncKey = (encKey, password) => cryptography.decryptKey(password, encKey);

export const encryptPrivateKey = (privKey, password) => crypto.generateKeyStore(privKey, password);

export const getPrivateKeyFromKeyStore = (keyStore, password) =>
  crypto.getPrivateKeyFromKeyStore(keyStore, password);
