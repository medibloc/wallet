import actionTypes from '../constants/actions';

export const startProcess = () => ({
  type: actionTypes.startProcess,
});

export const updateProcess = data => ({
  data,
  type: actionTypes.updateProcess,
});

export const resetProcess = () => ({
  type: actionTypes.resetProcess,
});
