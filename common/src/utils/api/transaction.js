export const transaction = ({ activePeer, hash }) =>
  new Promise((resolve, reject) => {
    activePeer.getTransaction(hash).then((data) => {
      if (data) {
        resolve({
          ...data,
        });
      } else {
        reject(data);
      }
    }).catch(error => reject(error));
  });

export default transaction;
