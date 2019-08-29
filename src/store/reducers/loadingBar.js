import actionTypes from '../../constants/actions';

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const loadingBar = (state = [], action) => {
  switch (action.type) {
    case actionTypes.sendLoadingBarDisplayed:
      return { ...state, sendLoadingBar: true };
    case actionTypes.sendLoadingBarHidden:
      return { ...state, sendLoadingBar: false };
    case actionTypes.resetAll:
      return [];
    default:
      return state;
  }
};

export default loadingBar;
