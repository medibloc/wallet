// eslint-disable-next-line import/prefer-default-export
export const info = mServer =>
  new Promise((resolve, reject) => {
    mServer.getInfo().then((res) => {
      if (res) {
        resolve({
          data: res,
        });
      }
      reject(res);
    }).catch(error => reject(error));
  });
