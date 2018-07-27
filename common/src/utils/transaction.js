import { local } from 'medjs';

const { transaction } = local;

export const dataUploadTx = data => transaction.dataUploadTx(data);

export const valueTransferTx = data => transaction.valueTransferTx(data);

export const vestTx = data => transaction.vest(data);

export const withdrawVestingTx = data => transaction.withdrawVesting(data);
