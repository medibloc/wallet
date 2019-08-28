import actionTypes from '../../constants/actions';

// load setting data from localStorage if it exists
const initialState = JSON.parse(localStorage.getItem('settings')) || {
  advancedMode: false,
  autoLog: true,
  onBoarding: localStorage.getItem('onboarding') !== 'false',
  showVoteIntroPage: true,
  fee: '10',
};

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const settings = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.settingsUpdated:
      return Object.assign({}, state, action.data);
    case actionTypes.settingsReset:
      return Object.assign({}, state, {
        advancedMode: false,
        autoLog: true,
      });
    case actionTypes.settingsChangeFee:
      return Object.assign({}, state, {
        fee: action.data,
      });
    default:
      return state;
  }
};

export default settings;
