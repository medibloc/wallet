// Limit transaction due to prevent network overuse
export async function transactions() {
  return {
    count: 0,
    transactions: [],
    total: 0,
  };
}

export async function transaction() {
  return {
    transactions: [],
  };
}
