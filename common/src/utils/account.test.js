import { expect } from 'chai';
import { extractPublicKey, extractAddress } from './account';

describe('Utils: Account', () => {
  describe('extractPublicKey', () => {
    it('should return a Hex string from any given string', () => {
      const passphrase = 'field organ country moon fancy glare pencil combine derive fringe security pave';
      const publicKey = '032dd8c5bcb41457d76de9a1145e8e220c765c776fdadd3f68e68c7b4baee81e6f';
      expect(extractPublicKey(passphrase)).to.be.equal(publicKey);
    });
  });

  describe('extractAddress', () => {
    it('should return the account address from given passphrase', () => {
      const passphrase = 'field organ country moon fancy glare pencil combine derive fringe security pave';
      const derivedAddress = '032dd8c5bcb41457d76de9a1145e8e220c765c776fdadd3f68e68c7b4baee81e6f';
      expect(extractAddress(passphrase)).to.be.equal(derivedAddress);
    });

    it('should return the account address from given public key', () => {
      const publicKey = '03422b50476f97327384b2a0f6a65112ced47751bd3ff45d1572e8fad540a3d4c7';
      const derivedAddress = '03422b50476f97327384b2a0f6a65112ced47751bd3ff45d1572e8fad540a3d4c7';
      expect(extractAddress(publicKey)).to.be.equal(derivedAddress);
    });
  });
});
