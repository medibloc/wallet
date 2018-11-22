import actionTypes from '../../constants/actions';
import { addMed, mulMed, subMed } from '../../utils/med';

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
    case actionTypes.candidatesUpdated: {
      const allCandidates = Array.from(state.allCandidates);
      const voteDiff = action.data.voteDiff || [];
      const votePower = action.data.votePower || 0;
      let voteDiffCounter = 0;

      voteDiff.forEach((obj) => {
        const index = allCandidates.findIndex(o => o.candidateId === obj.candidateId);
        if (index >= 0) {
          if (obj.isAdded) {
            allCandidates[index].votePower = addMed(allCandidates[index].votePower, votePower);
            voteDiffCounter += 1;
          } else {
            allCandidates[index].votePower = subMed(allCandidates[index].votePower, votePower);
            voteDiffCounter -= 1;
          }
        }
      });

      const totalVotes = addMed(state.totalVotes, mulMed(votePower, voteDiffCounter));

      return {
        allCandidates,
        count: state.count,
        totalVotes,
      };
    }
    default:
      return state;
  }
};

export default candidates;
