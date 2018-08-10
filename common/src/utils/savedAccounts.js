export const getSavedAccounts = () => {
  const accounts = JSON.parse(localStorage.getItem('accounts'));
  if (!accounts) {
    return [];
  }
  return accounts;
};

export const setSavedAccounts = (accounts) => {
  accounts = accounts.map(({
    address, balance, encKey, networkCode,
  }) => ({
    address, balance, encKey, networkCode,
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
