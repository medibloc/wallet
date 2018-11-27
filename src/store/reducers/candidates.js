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
      const allCandidates = action.data
        .sort((a, b) => b.votePower - a.votePower)
        .map((c, i) => ({ ...c, rank: (i + 1) }));
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
      const prevCandidates = Array.from(state.allCandidates);
      const voteDiff = action.data.voteDiff || [];
      const votePower = action.data.votePower || 0;
      let voteDiffCounter = 0;

      voteDiff.forEach((obj) => {
        const index = prevCandidates.findIndex(o => o.candidateId === obj.candidateId);
        if (index >= 0) {
          if (obj.isAdded) {
            prevCandidates[index].votePower = addMed(prevCandidates[index].votePower, votePower);
            voteDiffCounter += 1;
          } else {
            prevCandidates[index].votePower = subMed(prevCandidates[index].votePower, votePower);
            voteDiffCounter -= 1;
          }
        }
      });

      prevCandidates.sort((a, b) => b.votePower - a.votePower);
      const allCandidates = prevCandidates.map((c, i) => ({ ...c, rank: (i + 1) }));

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
