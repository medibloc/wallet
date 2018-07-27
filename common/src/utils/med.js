import BigNumber from 'bignumber.js';

BigNumber.config({ ERRORS: false });

// TODO: replace with medjs utils
export const fromRawMed = value => (
  new BigNumber(value || 0).dividedBy(new BigNumber(10).pow(8)).toFixed()
);

export const toRawMed = value => (
  new BigNumber(new BigNumber(value) * new BigNumber(10).pow(8)).round(0).toFixed()
);
