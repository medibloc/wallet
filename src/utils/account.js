import { Account, crypto } from '@medibloc/panacea-js';

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

export const isAddress = address => crypto.checkAddress(address, 'panacea');

export const getAccountFromPrivKey = privateKey => new Account({ privateKey });

export const getAccountFromEncKey = (encKey, password) => {
  const privateKey = crypto.getPrivateKeyFromKeyStore(encKey, password);
  return getAccountFromPrivKey(privateKey);
};

export const encryptPrivateKey = (privKey, password) => crypto.generateKeyStore(privKey, password);

export const getPrivateKeyFromKeyStore = (keyStore, password) =>
  crypto.getPrivateKeyFromKeyStore(keyStore, password);
