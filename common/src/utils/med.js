import BigNumber from 'bignumber.js';

BigNumber.config({ ERRORS: false });

export const addMed = (v1, v2) => (
  new BigNumber(v1 || 0).add(new BigNumber(v2 || 0)).toFixed()
);

// TODO: replace with medjs utils
export const fromRawMed = value => (
  new BigNumber(value || 0).dividedBy(new BigNumber(10).pow(12)).toFixed()
);

export const toRawMed = value => (
  new BigNumber(new BigNumber(value) * new BigNumber(10).pow(12)).round(0).toFixed()
);
