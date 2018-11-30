import actionTypes from '../../constants/actions';
import BN from '../../utils/bn';
import { addMed, mulMed, subMed } from '../../utils/med';

const compare = (a, b) => {
  if (BN.lt(b.votePower, a.votePower)) return -1;
  if (BN.lt(a.votePower, b.votePower)) return 1;
  if (a.alias < b.alias) return -1;
  if (b.alias < a.alias) return 1;
  return 0;
};

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
      console.log(action.data);
      const allCandidates = action.data
        .sort(compare)
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
      let totalVotes = state.totalVotes;

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

      const newVesting = action.data.newVesting;
      if (newVesting) {
        action.data.candidates.forEach((candidateId) => {
          const index = prevCandidates.findIndex(o => o.candidateId === candidateId);
          if (index >= 0) {
            prevCandidates[index].votePower = addMed(prevCandidates[index].votePower, newVesting);
          }
        });
        totalVotes = addMed(totalVotes, mulMed(newVesting, action.data.candidates.length));
      }

      prevCandidates.sort(compare);
      const allCandidates = prevCandidates.map((c, i) => ({ ...c, rank: (i + 1) }));
      totalVotes = addMed(totalVotes, mulMed(votePower, voteDiffCounter));

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
