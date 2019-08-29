export const getSavedAccounts = () => {
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  if (!accounts) {
    return [];
  }
  return accounts;
};

export const setSavedAccounts = (accounts) => {
  accounts = accounts.map(({
    address, balance, encKey, label, networkCode, unstaking, vesting,
  }) => ({
    address, balance, encKey, label, networkCode, unstaking, vesting,
  }));
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

export const getLastActiveAccount = () => (getSavedAccounts()[localStorage.getItem('lastActiveAccountIndex')] || getSavedAccounts()[0]);

export const getIndexOfSavedAccount = (savedAccounts, { address, networkCode }) =>
  savedAccounts.findIndex(account => (
    account.address === address &&
    account.networkCode === networkCode
  ));

export const setLastActiveAccount = ({ address, networkCode }) => {
  const lastActiveAccountIndex = getIndexOfSavedAccount(
    getSavedAccounts(),
    { address, networkCode },
  );

  if (lastActiveAccountIndex > -1) {
    localStorage.setItem('lastActiveAccountIndex', lastActiveAccountIndex);
  }
};

export const setLoggedInMark = () => {
  localStorage.setItem('loggedIn', 'true');
};

export const getLoggedInMark = () => localStorage.getItem('loggedIn');

export const removeLastActiveAccount = () => {
  localStorage.removeItem('lastActiveAccountIndex');
  localStorage.removeItem('loggedIn');
};

export const reset = () => {
  localStorage.clear();
};
