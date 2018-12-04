import actionTypes from '../constants/actions';
import { loadingFinished, loadingStarted } from './loading';
import candidates from '../utils/api/candidates';

export const loadCandidates = () =>
  (dispatch, getState) => {
    const mServer = getState().peers.mServer;
    dispatch(loadingStarted(actionTypes.candidatesLoaded));
    // dispatch({ type: actionTypes.candidatesCleared });
    candidates({ mServer })
      .then((response) => {
        dispatch({ data: response, type: actionTypes.candidatesLoaded });
        dispatch(loadingFinished(actionTypes.candidatesLoaded));
      }).catch((error) => {
        dispatch({ data: error, type: actionTypes.candidatesLoadFailed });
        dispatch(loadingFinished(actionTypes.candidatesLoaded));
      });
  };

export const candidatesUpdated = data => (dispatch) => {
  dispatch({ data, type: actionTypes.candidatesUpdated });
};
