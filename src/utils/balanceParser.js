import BigNumber from 'bignumber.js';
import { addMed, fromRawMed } from './med';

const parseBalance = (account) => {
  const balances = {
    base: '0',
    bonding: '0',
    unbonding: '0',
    reward: '0',
    total: '0',
  };

  try {
    balances.base = fromRawMed(account.value.coins[0].amount);
  } catch (e) { balances.base = '0'; }
  try {
    balances.bonding = account.bonding
      .reduce((acc, coin) => addMed(acc, fromRawMed(coin.shares)), new BigNumber(0));
  } catch (e) { balances.bonding = '0'; }
  try {
    balances.unbonding = account.unbonding.reduce((acc, { entries }) => {
      // eslint-disable-next-line no-return-assign
      entries.forEach(({ balance }) => acc = addMed(acc, fromRawMed(balance)));
      return acc;
    }, new BigNumber(0));
  } catch (e) { balances.unbonding = '0'; }
  try { balances.reward = fromRawMed(account.reward[0].amount); } catch (e) { balances.reward = '0'; }

  balances.total = Object.keys(balances)
    .reduce((acc, k) => addMed(acc, balances[k]), new BigNumber(0));
  return balances;
};

export default parseBalance;
