export const parseCandidates = candidates =>
  candidates.map(c => ({
    address: c.address,
    alias: c.alias,
    candidateId: c.candidate_id,
    collateral: c.collateral,
    url: c.url,
    votePower: c.vote_power,
  }));

export const parseTransactions = transactions => transactions.map(tx => tx.data);
