import { panaceaWalletOpts } from '@medibloc/panacea-js';
import { v4 as uuidv4 } from 'uuid';
import is from 'is_js';
import hexEncoding from 'crypto-js/enc-hex';
import SHA3 from 'crypto-js/sha3';
import SHA256 from 'crypto-js/sha256';
import { DirectSecp256k1HdWallet, DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { Secp256k1 } from '@cosmjs/crypto';
import { Bech32 } from '@cosmjs/encoding';
import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';

const browserifiedCrypto = require('crypto-browserify');

export async function extractKeyPair(mnemonic) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, panaceaWalletOpts);
  const [firstAccount] = await wallet.getAccountsWithPrivkeys();

  return {
    privKey: firstAccount.privkey,
    pubKey: firstAccount.pubkey,
  };
}

export async function extractPrivKey(mnemonic) {
  const keyPair = await extractKeyPair(mnemonic);
  return keyPair.privKey;
}

export async function extractPublicKey(mnemonic) {
  const keyPair = await extractKeyPair(mnemonic);
  return keyPair.pubKey;
}

export async function getPubKey(privKey) {
  const { pubkey } = await Secp256k1.makeKeypair(privKey);
  return Secp256k1.compressPubkey(pubkey);
}

export function getAddressFromPublicKey(pubKey) {
  return Bech32.encode(panaceaWalletOpts.prefix, rawSecp256k1PubkeyToRawAddress(pubKey));
}

export async function getAddressFromPrivateKey(privKey) {
  const pubKey = await getPubKey(privKey);
  return getAddressFromPublicKey(pubKey);
}

export async function extractAddressFromMnemonic(mnemonic) {
  const pubKey = await extractPublicKey(mnemonic);
  return getAddressFromPublicKey(pubKey);
}

export function isAddress(address) {
  return address.startsWith(panaceaWalletOpts.prefix);
}

export async function getAccountFromPrivKey(privateKey) {
  const wallet = await DirectSecp256k1Wallet.fromKey(privateKey, panaceaWalletOpts.prefix);
  return {
    address: wallet.address,
    privateKey: wallet.privkey,
  };
}

/**
 * Computes a single SHA256 digest.
 * @param {string} hex message to hash
 * @returns {string} hash output
 */
export const sha256 = (hex) => {
  if (hex.length % 2 !== 0) {
    throw new Error(`invalid hex string length: ${hex}`);
  }
  const hexEncoded = hexEncoding.parse(hex);
  // eslint-disable-next-line new-cap
  return SHA256(hexEncoded).toString();
};

/**
 * Computes a single SHA3-Keccak digest.
 * @param {string} hex message to hash
 * @param {number} outputLength output length in bits (224, 256, 384, or 512)
 * @returns {string} hash output
 */
export const sha3keccak = (hex, outputLength) => {
  if (hex.length % 2 !== 0) {
    throw new Error(`invalid hex string length: ${hex}`);
  }
  const hexEncoded = hexEncoding.parse(hex);
  // eslint-disable-next-line new-cap
  return SHA3(hexEncoded, { outputLength }).toString();
};

/**
 * Returns a key size of the given cipher algorithm.
 * If the given cipher algorithm is not supported, it throws an error.
 * @param {string} cipherAlgo The cipher algorithm
 * @returns {number} The cipher key size in bytes (eg. 16, 32, ...)
 */
export const getCipherKeySize = (cipherAlgo) => {
  switch (cipherAlgo) {
    case 'aes-128-ctr':
      return 16;
    case 'aes-256-ctr':
      return 32;
    default:
      throw new Error(`Unsupported cipher algorithm: ${cipherAlgo}`);
  }
};

export const getPrivateKeyFromKeyStore = (keystore, password) => {
  if (!is.string(password)) {
    throw new Error('No password given');
  }

  const json = is.json(keystore) ? keystore : JSON.parse(keystore);
  const { kdfparams, ciphertext } = json.crypto;

  // `version !== 1` is only for the backward compatibility.
  // Previously, the version had been defined as 1 (by mistake),
  // even though we have followed the format of version 3.
  if (json.version !== 3 && json.version !== 1) {
    throw new Error(`Unsupported version: ${json.version}`);
  }

  if (kdfparams.prf !== 'hmac-sha256') {
    throw new Error(`Unsupported parameters to PBKDF2 PRF: ${kdfparams.prf}`);
  }

  const derivedKey = browserifiedCrypto.pbkdf2Sync(
    Buffer.from(password), // password
    Buffer.from(kdfparams.salt, 'hex'), // salt
    kdfparams.c, // iteration
    kdfparams.dklen, // keylen
    'sha256', // digest
  );
  const ciphertextBuf = Buffer.from(ciphertext, 'hex');
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), ciphertextBuf]);

  // try sha3-keccak256 (new / ethereum keystore) mac first
  const mac = sha3keccak(bufferValue.toString('hex'), 256);
  if (mac !== json.crypto.mac) {
    // try again with the legacy format: sha3-keccak512
    let macLegacy = sha3keccak(bufferValue.toString('hex'), 512);
    if (macLegacy !== json.crypto.mac) {
      // the other legacy (sha256) mac is next to be checked.
      // pre-testnet keystores used a sha256 digest for the mac.
      // the sha256 mac was not compatible with ethereum keystores,
      // so it was changed to sha3 for mainnet.
      macLegacy = sha256(bufferValue.toString('hex'));
      if (macLegacy !== json.crypto.mac) {
        throw new Error('Keystore mac check failed (sha3-keccak256 & sha3-keccak512 & sha256) - wrong password?');
      }
    }
  }

  const decipher = browserifiedCrypto.createDecipheriv(
    json.crypto.cipher,
    derivedKey.slice(0, getCipherKeySize(json.crypto.cipher)),
    Buffer.from(json.crypto.cipherparams.iv, 'hex'),
  );
  const privateKeyBuf = Buffer.concat([decipher.update(ciphertextBuf), decipher.final()]);
  return Uint8Array.from(privateKeyBuf);
};

export const getAccountFromEncKey = async (encKey, password) => {
  const privateKey = getPrivateKeyFromKeyStore(encKey, password);
  // eslint-disable-next-line no-return-await
  return await getAccountFromPrivKey(privateKey);
};

export const generateKeyStore = (privateKey, password = '') => {
  const salt = browserifiedCrypto.randomBytes(32);
  const iv = browserifiedCrypto.randomBytes(16);
  const cipherAlg = 'aes-128-ctr';

  const kdf = 'pbkdf2';
  const kdfparams = {
    dklen: 32,
    salt: salt.toString('hex'),
    c: 262144,
    prf: 'hmac-sha256',
  };

  const derivedKey = browserifiedCrypto.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
  const derivedKeyForCipher = derivedKey.slice(0, getCipherKeySize(cipherAlg));
  const cipher = browserifiedCrypto.createCipheriv(cipherAlg, derivedKeyForCipher, iv);
  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const cipherText = Buffer.concat([cipher.update(privateKey), cipher.final()]);
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), cipherText]);

  return {
    version: 3,
    id: uuidv4({
      random: browserifiedCrypto.randomBytes(16),
    }),
    crypto: {
      ciphertext: cipherText.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: cipherAlg,
      kdf,
      kdfparams,
      // mac must use sha3-keccak256 according to web3 secret storage spec
      mac: sha3keccak(bufferValue.toString('hex'), 256),
    },
  };
};

export const encryptPrivateKey = (privKey, password) => generateKeyStore(privKey, password);
