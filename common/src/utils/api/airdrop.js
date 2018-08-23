import { getAccount, send } from './account';
import { toRawMed } from '../med';

const delegateAddress = '02fc22ea22d02fc2469f5ec8fab44bc3de42dda2bf9ebc0c0055a9eb7df579056c';
const privKey = 'ee8ea71e9501306fdd00c6e58b2ede51ca125a583858947ff8e309abf11d37ea';
const airDropAmount = 100;

export default ({ activePeer, address }) =>
  new Promise((resolve, reject) => {
    getAccount(activePeer, delegateAddress).then((res) => {
      send({
        activePeer,
        nonce: parseInt(res.nonce, 10) + 1,
        privKey,
        to: address,
        value: toRawMed(airDropAmount),
      }).then((res2) => {
        if (res2.transactionId) resolve(res2);
        else reject(res2);
      });
    });
  });
