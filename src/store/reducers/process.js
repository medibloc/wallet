import actionTypes from '../../constants/actions';

const initialState = {
  onProcess: false,
  error: null,
};

const process = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.startProcess:
      return { onProcess: true };
    case actionTypes.updateProcess:
      return Object.assign({}, state, action.data);
    case actionTypes.resetProcess:
      return { onProcess: false, error: null };
    default:
      return state;
  }
};

export default process;
