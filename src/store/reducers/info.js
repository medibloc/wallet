import actionTypes from '../../constants/actions';

// load setting data from localStorage if it exists
const initialState = {};

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
const info = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.infoUpdate:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default info;
