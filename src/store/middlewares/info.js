import { updateInfo } from '../../actions/info';


const updateCoinInfo = (store) => {
  const { peers } = store.getState();

  peers.mServer.getInfo()
    .then((res) => {
      store.dispatch(updateInfo(res));
    });
};

const infoMiddleware = store => next => (action) => {
  const currentState = store.getState();
  if (currentState.peers && currentState.peers.mServer &&
  currentState.info && Object.keys(currentState.info).length === 0) {
    updateCoinInfo(store);
  }
  next(action);
};

export default infoMiddleware;
