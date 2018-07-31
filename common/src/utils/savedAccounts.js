export const getSavedAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem('accounts'));
  } catch (e) {
    return [];
  }
};

export const setSavedAccounts = (accounts) => {
  accounts = accounts.map(({
    address, encKey, network, nodes, balance,
  }) => ({
    address, encKey, network, nodes, balance,
  }));
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

export const getLastActiveAccount = () => (getSavedAccounts()[localStorage.getItem('lastActiveAccountIndex')] || getSavedAccounts()[0]);

export const getIndexOfSavedAccount = (savedAccounts, { address, network, nodes }) =>
  savedAccounts.findIndex(account => (
    account.address === address &&
    account.network === network &&
    account.nodes === nodes
  ));

export const setLastActiveAccount = ({ address, network, nodes }) => {
  const lastActiveAccountIndex = getIndexOfSavedAccount(
    getSavedAccounts(),
    { address, network, nodes },
  );

  if (lastActiveAccountIndex > -1) {
    localStorage.setItem('lastActiveAccountIndex', lastActiveAccountIndex);
  }
};
