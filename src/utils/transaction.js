import { local } from 'medjs';
import transactionAttributes from '../constants/transactionAttributes';

const { transaction } = local;
const txFieldArr = transactionAttributes.TX_FIELDS_ARR;

export const createDefaultPayload = data => transaction.createDefaultPayload(data);

export const dataUploadTx = data => transaction.dataUploadTx(data);

export const valueTransferTx = data => transaction.valueTransferTx(data);

export const vestTx = data => transaction.vestTx(data);

export const withdrawVestingTx = data => transaction.withdrawVestingTx(data);

export const recoverPayload = tx => transaction.recoverPayload({ rawTx: tx });

export const isTransactionField = (txType, field) => {
  if (txType && txFieldArr[txType]) {
    return txFieldArr[txType].includes(field);
  }
  return false;
};
