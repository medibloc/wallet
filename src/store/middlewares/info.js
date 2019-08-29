import { updateInfo } from '../../actions/info';

// Prevent infoUpdate called more than once
let flag = true;

const updateCoinInfo = (store) => {
  const { peers } = store.getState();

  peers.mServer.getInfo()
    .then((res) => {
      store.dispatch(updateInfo(res));
    });
};

const infoMiddleware = store => next => (action) => {
  const currentState = store.getState();

  if (flag && currentState.peers && currentState.peers.mServer &&
  currentState.info && Object.keys(currentState.info).length === 0) {
    updateCoinInfo(store);
    flag = false;
  }
  next(action);
};

export default infoMiddleware;
