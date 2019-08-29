export default (sendRequest) => {
  const getAccountTransactions = (account, limit) => sendRequest({
    method: 'get',
    path: '/api/v1/transactions',
    payload: {
      account,
      limit,
    },
  });

  return {
    getAccountTransactions,
  };
};
