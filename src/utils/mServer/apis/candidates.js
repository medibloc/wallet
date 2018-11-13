export default (sendRequest) => {
  const getCandidates = () => sendRequest({
    method: 'get',
    path: '/api/v1/candidates',
  });

  return {
    getCandidates,
  };
};
