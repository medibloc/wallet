import actionTypes from '../constants/actions';
import { loadingFinished, loadingStarted } from './loading';
import candidates from '../utils/api/candidates';

export const loadCandidates = () =>
  (dispatch, getState) => {
    const mServer = getState().peers.mServer;
    dispatch({ type: actionTypes.candidatesCleared });
    dispatch(loadingStarted(actionTypes.candidatesLoaded));
    candidates({ mServer })
      .then((response) => {
        dispatch({ data: response, type: actionTypes.candidatesLoaded });
        dispatch(loadingFinished(actionTypes.candidatesLoaded));
      }).catch((error) => {
        dispatch({ data: error, type: actionTypes.candidatesLoadFailed });
        dispatch(loadingFinished(actionTypes.candidatesLoaded));
      });
  };

export default loadCandidates;
