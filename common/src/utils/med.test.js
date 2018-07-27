import { expect } from 'chai';
import { fromRawMed, toRawMed } from './med';

describe('med', () => {
  describe('fromRawMed', () => {
    it('should convert 100000000 to "1"', () => {
      expect(fromRawMed(100000000)).to.be.equal('1');
    });

    it('should convert 0 to "0"', () => {
      expect(fromRawMed(0)).to.be.equal('0');
    });

    it('should convert "100000000" to "1"', () => {
      expect(fromRawMed('100000000')).to.be.equal('1');
    });

    it('should convert "0" to "0"', () => {
      expect(fromRawMed('0')).to.be.equal('0');
    });
  });

  describe('toRawMed', () => {
    it('should convert 1 to "100000000"', () => {
      expect(toRawMed(1)).to.be.equal('100000000');
    });

    it('should convert 0 to "0"', () => {
      expect(toRawMed(0)).to.be.equal('0');
    });

    it('should convert "1" to "100000000"', () => {
      expect(toRawMed('1')).to.be.equal('100000000');
    });

    it('should convert "0" to "0"', () => {
      expect(toRawMed('0')).to.be.equal('0');
    });
  });
});
