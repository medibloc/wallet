import { local } from 'medjs';

const { transaction } = local;

export const createDefaultPayload = data => transaction.createDefaultPayload(data);

export const dataUploadTx = data => transaction.dataUploadTx(data);

export const valueTransferTx = data => transaction.valueTransferTx(data);

export const vestTx = data => transaction.vestTx(data);

export const withdrawVestingTx = data => transaction.withdrawVestingTx(data);
