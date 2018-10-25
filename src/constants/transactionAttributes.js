import transactionTypes from './transactionTypes';

const COMMON_REQUIRED = [
  'alg',
  'chain_id',
  'from',
  'nonce',
  'timestamp',
  'tx_type',
];

const TX_FIELDS_ARR = {
  [transactionTypes.addCertification]: COMMON_REQUIRED.concat(['payload', 'to']),
  [transactionTypes.addRecord]: COMMON_REQUIRED.concat(['payload']),
  [transactionTypes.becomeCandidate]: COMMON_REQUIRED.concat(['value']),
  [transactionTypes.genesis]: COMMON_REQUIRED.concat(['payload', 'to', 'value']),
  [transactionTypes.genesisVest]: COMMON_REQUIRED.concat(['value']),
  [transactionTypes.quitCandidacy]: COMMON_REQUIRED.concat([]),
  [transactionTypes.revokeCertification]: COMMON_REQUIRED.concat(['payload']),
  [transactionTypes.send]: COMMON_REQUIRED.concat(['payload', 'to', 'value']),
  [transactionTypes.vest]: COMMON_REQUIRED.concat(['value']),
  [transactionTypes.vote]: COMMON_REQUIRED.concat(['payload']),
  [transactionTypes.withdrawVesting]: COMMON_REQUIRED.concat(['value']),
};

export default {
  TX_FIELDS_ARR,
};
