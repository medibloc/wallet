import actionTypes from '../../constants/actions';
import { addMed } from '../../utils/med';

const candidates = (
  state = {
    allCandidates: [],
    count: 0,
    totalVotes: 0,
  }, action) => {
  switch (action.type) {
    case actionTypes.candidatesCleared:
      return {};
    case actionTypes.candidatesLoaded: {
      const allCandidates = action.data;
      const count = allCandidates ? allCandidates.length : 0;
      const sum = allCandidates ? allCandidates.reduce((a, b) => (
        { votePower: addMed(a.votePower, b.votePower) })) : 0;
      return {
        allCandidates,
        count,
        totalVotes: sum.votePower,
      };
    }
    case actionTypes.candidatesLoadFailed:
      return action.data.error;
    default:
      return state;
  }
};

export default candidates;
