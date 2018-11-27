import { local } from 'medjs';
import transactionTypes from '../constants/transactionTypes';
import transactionAttributes from '../constants/transactionAttributes';

const { transaction } = local;
const txFieldArr = transactionAttributes.TX_FIELDS_ARR;

export const createDefaultPayload = data => transaction.createDefaultPayload(data);

export const createVotePayload = data => transaction.createVotePayload(data);

export const dataUploadTx = data => transaction.dataUploadTx(data);

export const valueTransferTx = data => transaction.valueTransferTx(data);

export const vestTx = data => transaction.vestTx(data);

export const voteTx = data => transaction.voteTx(data);

export const withdrawVestingTx = data => transaction.withdrawVestingTx(data);

export const recoverPayloadWithType = (payload, type) => {
  if (payload && type) {
    const recoveredPayload = transaction.recoverPayloadWithType(payload, type);
    switch (type) {
      case transactionTypes.send:
        if (recoveredPayload && recoveredPayload.message) {
          return recoveredPayload.message;
        }
        break;
      case transactionTypes.vote:
        if (recoveredPayload && recoveredPayload.candidates) {
          const candidates = recoveredPayload.candidates.map(cid =>
            Buffer.from(cid).toString('hex'));
          return JSON.stringify(candidates);
        }
        break;
      default:
        break;
    }
  }
  return null;
};

export const isTransactionField = (txType, field) => {
  if (txType && txFieldArr[txType]) {
    return txFieldArr[txType].includes(field);
  }
  return false;
};
