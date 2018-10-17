export default (sendRequest) => {
  const getAccountTransactions = account => sendRequest({
    method: 'get',
    path: '/api/v1/transactions',
    payload: {
      account,
    },
  });

  return {
    getAccountTransactions,
  };
};
