import candidates from './apis/candidates';
import transaction from './apis/transaction';
import request from './request';

export default (baseURL) => {
  const { sendRequest } = request(baseURL);
  return {
    ...candidates(sendRequest),
    ...transaction(sendRequest),
  };
};
