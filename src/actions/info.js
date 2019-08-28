import actionTypes from '../constants/actions';

// eslint-disable-next-line import/prefer-default-export
export const updateInfo = data => ({
  data,
  type: actionTypes.infoUpdate,
});
