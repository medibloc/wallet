import { local } from 'medjs';
import panacea from '@medibloc/panacea-js';
import transactionTypes from '../constants/transactionTypes';
import transactionAttributes from '../constants/transactionAttributes';

const { Message, Tx, Coin, Fee } = panacea;
const { transaction } = local;
const txFieldArr = transactionAttributes.TX_FIELDS_ARR;


export const createVotePayload = data => transaction.createVotePayload(data);

export const dataUploadTx = data => transaction.dataUploadTx(data);

export const valueTransferTx = (data) => {
  const coin = new Coin(`${data.amount}umed`);
  // TODO remove comment below and figure out what exactly happens
  const msg = new Message.default({ // eslint-disable-line
    fromAddress: data.fromAddress,
    toAddress: data.toAddress,
    amount: [coin],
  });

  const fee = new Fee();
  fee.setFee(`${data.fee}umed`);

  const tx = new Tx({
    msg,
    sequence: data.sequence,
    accountNumber: data.accountNumber,
    chainId: data.chainId,
    memo: data.memo,
    fee,
  });
  return tx;
};

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
