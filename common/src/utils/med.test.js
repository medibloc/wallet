import { expect } from 'chai';
import { addMed, fromRawMed, toRawMed } from './med';

describe('med', () => {
  describe('addMed', () => {
    it('should 0 + 1 = 1', () => {
      expect(addMed(0, 1)).to.be.equal('1');
    });

    it('should 1.000000000001 + 2.000000000002 = 3.000000000003', () => {
      expect(addMed(1.000000000001, 2.000000000002)).to.be.equal('3.000000000003');
    });

    it('should 100000000000000000000 + 100000000000000000000 = 200000000000000000000', () => {
      expect(addMed(100000000000000000000, 100000000000000000000))
        .to.be.equal('200000000000000000000');
    });

    it('should 100000000000000000000 + 1.000000000001 = 100000000000000000001.000000000001', () => {
      expect(addMed(100000000000000000000, 1.000000000001))
        .to.be.equal('100000000000000000001.000000000001');
    });
  });

  describe('fromRawMed', () => {
    it('should convert 1000000000000 to "1"', () => {
      expect(fromRawMed(1000000000000)).to.be.equal('1');
    });

    it('should convert 0 to "0"', () => {
      expect(fromRawMed(0)).to.be.equal('0');
    });

    it('should convert "1000000000000" to "1"', () => {
      expect(fromRawMed('1000000000000')).to.be.equal('1');
    });

    it('should convert "0" to "0"', () => {
      expect(fromRawMed('0')).to.be.equal('0');
    });
  });

  describe('toRawMed', () => {
    it('should convert 1 to "1000000000000"', () => {
      expect(toRawMed(1)).to.be.equal('1000000000000');
    });

    it('should convert 0 to "0"', () => {
      expect(toRawMed(0)).to.be.equal('0');
    });

    it('should convert "1" to "1000000000000"', () => {
      expect(toRawMed('1')).to.be.equal('1000000000000');
    });

    it('should convert "0" to "0"', () => {
      expect(toRawMed('0')).to.be.equal('0');
    });
  });
});
