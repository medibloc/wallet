// import crypto from 'crypto';
import i18next from 'i18next';
import { inDictionary } from './similarWord';

if (global._bitcore) delete global._bitcore;
const bip39 = require('bip39');

/**
 * Generates a passphrase using bip39
 *
 * @returns {string} The generated passphrase
 */
export const generatePassphrase = () => bip39.generateMnemonic();

/**
   * Checks if passphrase is valid using bip39
   *
   * @param {string} passphrase
   * @returns {bool} isValidPassphrase
   */
export const isValidPassphrase = (passphrase) => {
  const normalizedValue = passphrase.replace(/ +/g, ' ').trim();
  let isValid;
  try {
    isValid = normalizedValue.split(' ').length >= 12 && bip39.validateMnemonic(normalizedValue);
  } catch (e) {
    // If the mnemonic check throws an error, we assume that the
    // passphrase being entered isn't valid
    isValid = false;
  }
  return isValid;
};

export const getPassphraseValidationErrors = (passphrase) => {
  const passphraseArray = passphrase.trim().split(' ');

  const partialPassphraseError = [];
  const invalidWords = passphraseArray.filter((word) => {
    const isNotInDictionary = !inDictionary(word);
    partialPassphraseError[passphraseArray.indexOf(word)] = isNotInDictionary;
    return isNotInDictionary;
  });

  let validationError = i18next.t('Passphrase is not valid');

  if (passphraseArray.length < 12) {
    validationError = i18next.t('Passphrase should have 12 words, entered passphrase has {{length}}', { length: passphraseArray.length });
  }

  if (invalidWords.length > 0) {
    validationError = i18next.t('Please check the highlighted words');
  }

  return { validationError, partialPassphraseError };
};
