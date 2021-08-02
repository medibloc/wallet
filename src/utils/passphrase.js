import { EnglishMnemonic } from '@cosmjs/crypto';
import { panaceaWalletOpts } from '@medibloc/panacea-js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import i18next from 'i18next';
import { inDictionary } from './similarWord';

if (global._bitcore) delete global._bitcore;
/**
 * Generates a passphrase using bip39
 *
 * @returns {string} The generated passphrase
 */
export async function generateMnemonic() {
  const wallet = await DirectSecp256k1HdWallet.generate(24, panaceaWalletOpts);
  return wallet.mnemonic;
}

/**
   * Checks if passphrase is valid using bip39
   *
   * @param {string} mnemonic
   * @returns {boolean} isValidMnemonic
   */
export const isValidMnemonic = (mnemonic) => {
  try {
    // eslint-disable-next-line no-new
    new EnglishMnemonic(mnemonic);
    return true;
  } catch (e) {
    return false;
  }
};

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
