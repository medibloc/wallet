export const parseCandidates = candidates =>
  candidates.map(c => ({
    address: c.address,
    alias: c.account.alias,
    candidateId: c.candidate_id,
    collateral: c.collateral,
    url: c.url,
    votePower: c.votePower,
  }));

export const parseTransactions = transactions => transactions.map(tx => tx.data);
