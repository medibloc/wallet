import { expect } from 'chai';
import { extractPublicKey, extractAddress } from './account';

describe('Utils: Account', () => {
  describe('extractPublicKey', () => {
    it('should return a Hex string from any given string', () => {
      const passphrase = 'field organ country moon fancy glare pencil combine derive fringe security pave';
      const publicKey = '02cd94dab39ac0530331b855de5af5abddc6776692e52346dbffb40a14c186337c';
      expect(extractPublicKey(passphrase)).to.be.equal(publicKey);
    });
  });

  describe('extractAddress', () => {
    it('should return the account address from given passphrase', () => {
      const passphrase = 'field organ country moon fancy glare pencil combine derive fringe security pave';
      const derivedAddress = '02cd94dab39ac0530331b855de5af5abddc6776692e52346dbffb40a14c186337c';
      expect(extractAddress(passphrase)).to.be.equal(derivedAddress);
    });

    it('should return the account address from given public key', () => {
      const publicKey = '02cd94dab39ac0530331b855de5af5abddc6776692e52346dbffb40a14c186337c';
      const derivedAddress = '02cd94dab39ac0530331b855de5af5abddc6776692e52346dbffb40a14c186337c';
      expect(extractAddress(publicKey)).to.be.equal(derivedAddress);
    });
  });
});
