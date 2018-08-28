export default {
  address: /^[0-9a-f]{66}$/,
  amount: /^\d+(\.\d{1,8})?$/,
  label: /^[a-zA-Z0-9.]*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  transactionId: /^[0-9]+$/,
};
