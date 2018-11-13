import { parseCandidates } from '../mServer/utils/parser';

const candidates = ({ mServer }) =>
  new Promise((resolve, reject) => {
    mServer.getCandidates().then((res) => {
      if (res && res.candidates) {
        resolve(parseCandidates(res.candidates));
      }
      reject(res);
    }).catch(error => reject(error));
  });

export default candidates;
