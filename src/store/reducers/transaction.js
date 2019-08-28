import actionTypes from '../../constants/actions';

const transaction = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.transactionCleared:
      return {};
    case actionTypes.transactionLoaded:
      return { success: true, ...action.data };
    case actionTypes.transactionLoadFailed:
      return action.data.error;
    default:
      return state;
  }
};

export default transaction;
