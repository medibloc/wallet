import panacea from '@medibloc/panacea-js';
import i18next from 'i18next';
import { inDictionary } from './similarWord';

const { crypto } = panacea;

if (global._bitcore) delete global._bitcore;
/**
 * Generates a passphrase using bip39
 *
 * @returns {string} The generated passphrase
 */
export const generatePassphrase = () => crypto.generateMnemonic();

/**
   * Checks if passphrase is valid using bip39
   *
   * @param {string} passphrase
   * @returns {bool} isValidPassphrase
   */
export const isValidPassphrase = passphrase => crypto.validateMnemonic(passphrase);

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
