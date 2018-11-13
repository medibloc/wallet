export const parseCandidates = candidates =>
  candidates.map((c, i) => ({
    address: c.address,
    alias: `candidate${i + 1}`, // for test
    candidateId: `candidateId${i + 1}`, // for test
    collateral: '100000000000000000000', // for test
    url: `https://medibloc${i + 1}.org`, // for test
    votePower: c.votePower,
  }));

export const parseTransactions = transactions => transactions.map(tx => tx.data);
