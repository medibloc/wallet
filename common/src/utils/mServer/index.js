import transaction from './apis/transaction';
import request from './request';

export default (baseURL) => {
  const { sendRequest } = request(baseURL);
  return {
    ...transaction(sendRequest),
  };
};
