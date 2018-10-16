import actionTypes from '../constants/actions';

/**
 * An action to dispatch sendLoadingBarDisplayed
 *
 */
export const sendLoadingBarDisplayed = data => ({
  data,
  type: actionTypes.sendLoadingBarDisplayed,
});

/**
 * An action to dispatch sendLoadingBarHidden
 *
 */
export const sendLoadingBarHidden = data => ({
  data,
  type: actionTypes.sendLoadingBarHidden,
});
