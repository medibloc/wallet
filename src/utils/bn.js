import BigNumber from 'bignumber.js';

BigNumber.config({ ERRORS: false });

const isEqualTo = (v1, v2) => (
  new BigNumber(v1).eq(new BigNumber(v2))
);

const isZero = value => (
  new BigNumber(value).isZero()
);

// isLessThan: true if v1 < v2
const lt = (v1, v2) => (
  new BigNumber(v1 || 0).lt(new BigNumber(v2 || 0))
);

// isLessThanOrEqualTo: true if v1 <= v2
const lte = (v1, v2) => (
  new BigNumber(v1 || 0).lte(new BigNumber(v2 || 0))
);

const max = (...args) => (
  BigNumber.max(...args).toFixed()
);

const min = (...args) => (
  BigNumber.min(...args).toFixed()
);

export default {
  isEqualTo,
  isZero,
  lt,
  lte,
  max,
  min,
};
