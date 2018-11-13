import axios from 'axios';

const GET = 'get';
const POST = 'post';
const APPLICATION_JSON = 'application/json';

const configConverter = ({ method, path, payload }) => ({
  method,
  url: path,
  ...method === GET && {
    params: payload,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    // },
  },
  ...method === POST && {
    data: payload,
    headers: {
      'Content-Type': APPLICATION_JSON,
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      // 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});

// eslint-disable-next-line no-unused-vars
export default (baseURL) => {
  const sendRequest = (args) => {
    const config = {
      // baseURL,
      ...configConverter(args),
    };
    return axios(config).then(res => res.data);
  };

  return {
    sendRequest,
  };
};
