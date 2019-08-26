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
export const generateMnemonic = () => crypto.generateMnemonic();

/**
   * Checks if passphrase is valid using bip39
   *
   * @param {string} passphrase
   * @returns {bool} isValidMnemonic
   */
export const isValidMnemonic = mnemonic => crypto.validateMnemonic(mnemonic);

export const getMnemonicValidationErrors = (mnemonic) => {
  const mnemonicArray = mnemonic.trim().split(' ');

  const partialMnemonicError = [];
  const invalidWords = mnemonicArray.filter((word) => {
    const isNotInDictionary = !inDictionary(word);
    partialMnemonicError[mnemonicArray.indexOf(word)] = isNotInDictionary;
    return isNotInDictionary;
  });

  let validationError = i18next.t('Mnemonic is not valid');

  if (mnemonicArray.length < 24) {
    validationError = i18next.t('Mnemonic should have 24 words, entered mnemonic has {{length}}', { length: mnemonicArray.length });
  }

  if (invalidWords.length > 0) {
    validationError = i18next.t('Please check the highlighted words');
  }

  return { validationError, partialPassphraseError: partialMnemonicError };
};
