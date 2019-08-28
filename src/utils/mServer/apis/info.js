export default (sendRequest) => {
  const getInfo = () => sendRequest({
    method: 'get',
    path: '/api/v1/info',
  });

  return {
    getInfo,
  };
};
