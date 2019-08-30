export default (sendRequest) => {
  const getAccountTransactions = (account, limit) => sendRequest({
    method: 'get',
    path: '/api/v1/transactions',
    payload: {
      account,
      limit,
    },
  });

  const getTransaction = hash => sendRequest({
    method: 'get',
    path: '/api/v1/transactions',
    payload: {
      q: hash,
    },
  });

  return {
    getAccountTransactions,
    getTransaction,
  };
};
