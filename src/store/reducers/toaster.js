import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const toaster = (state = [], action) => {
  switch (action.type) {
    case actionTypes.toastDisplayed:
      return [
        {
          ...action.data,
          index: 0,
        },
      ];
    case actionTypes.toastHidden:
      return state.filter(toast => toast.index !== action.data.index);
    case actionTypes.resetAll:
      return [];
    default:
      return state;
  }
};

export default toaster;
