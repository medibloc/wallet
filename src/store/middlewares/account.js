import { getAccount } from '../../utils/api/account';
import { transactions as getTransactions } from '../../utils/api/transaction';
import { accountUpdated } from '../../actions/account';
// import { transactionsUpdateUnconfirmed } from '../../actions/transactions';
import { activePeerUpdate } from '../../actions/peers';
// import { votesFetched } from '../../actions/voting';
import actionTypes from '../../constants/actions';
import accountConfig from '../../constants/account';
// import { getDelegate } from '../../utils/api/delegate';
// import transactionTypes from '../../constants/transactionTypes';
import { isEqualTo } from '../../utils/med';

const { lockDuration } = accountConfig;

const updateTransactions = (store, peers) => {
  const state = store.getState();
  const { filter } = state.transactions;
  const address = state.transactions.account
    ? state.transactions.account.address
    : state.account.address;

  getTransactions({
    address, limit: 25, mServer: peers.mServer, filter,
  }).then((response) => {
    store.dispatch({
      data: {
        confirmed: response.transactions,
        count: parseInt(response.count, 10),
      },
      type: actionTypes.transactionsUpdated,
    });
    if (state.transactions.pending.length) {
      // store.dispatch(transactionsUpdateUnconfirmed({
      //   activePeer: peers.activePeer,
      //   address,
      //   pendingTransactions: state.transactions.pending,
      // }));
    }
  });
};

// const hasRecentTransactions = txs => (
//   txs.confirmed.filter(tx => tx.confirmations < 1000).length !== 0 ||
//   txs.pending.length !== 0
// );

const updateAccountData = (store) => {
  const { peers, account } = store.getState();

  getAccount(peers.activePeer, account.address).then((result) => {
    if (!isEqualTo(result.balance, account.balance) ||
      !isEqualTo(result.vesting, account.vesting) ||
      !isEqualTo(result.unstaking, account.unstaking) ||
      !isEqualTo(result.nonce, account.nonce)) {
      updateTransactions(store, peers, account);
    }
    store.dispatch(accountUpdated(result));
    store.dispatch(activePeerUpdate({ online: true }));
  }).catch((res) => {
    store.dispatch(activePeerUpdate({ online: false, code: res.code }));
  });
};

// const getRecentTransactionOfType = (transactionsList, type) => (
//   transactionsList.filter(transaction => (
//     transaction.type === type &&
//     // limit the number of confirmations to 5
//     // to not fire each time there is another new transaction
//     // theoretically even less then 5, but just to be on the safe side
//     transaction.confirmations < 5))[0]
// );

// const delegateRegistration = (store, action) => {
//   const delegateRegistrationTx = getRecentTransactionOfType(
//     action.data.confirmed, transactionTypes.registerDelegate);
//   const state = store.getState();
//
//   if (delegateRegistrationTx) {
//     getDelegate(state.peers.activePeer, { publicKey: state.account.publicKey })
//       .then((delegateData) => {
//         store.dispatch(accountUpdated(Object.assign({},
//           { delegate: delegateData.delegate, isDelegate: true })));
//       });
//   }
// };

// const votePlaced = (store, action) => {
//   const voteTransaction = getRecentTransactionOfType(
//     action.data.confirmed, transactionTypes.vote);
//
//   if (voteTransaction) {
//     const state = store.getState();
//     const { peers, account } = state;
//
//     store.dispatch(votesFetched({
//       activePeer: peers.activePeer,
//       address: account.address,
//       type: 'update',
//     }));
//   }
// };

const passwordUsed = (store) => {
  store.dispatch(accountUpdated({
    expireTime: Date.now() + lockDuration,
    passwordValidity: true,
    passwordVerifying: false,
  }));
};

const passwordVerifying = (store) => {
  store.dispatch(accountUpdated({
    passwordValidity: false,
    passwordVerifying: true,
  }));
};

const passwordFailed = (store) => {
  store.dispatch(accountUpdated({
    passwordValidity: false,
    passwordVerifying: false,
  }));
};

// const checkTransactionsAndUpdateAccount = (store, action) => {
//   const state = store.getState();
//   const { peers, account, transactions } = state;
//
//   if (action.data.windowIsFocused && hasRecentTransactions(transactions)) {
//     updateTransactions(store, peers, account);
//   }
//
//   const tx = action.data.block.transactions;
//   const accountAddress = state.account.address;
//   const blockContainsRelevantTransaction = tx.filter((transaction) => {
//     const sender = transaction ? transaction.senderId : null;
//     const recipient = transaction ? transaction.recipientId : null;
//     return accountAddress === recipient || accountAddress === sender;
//   }).length > 0;
//
//   if (blockContainsRelevantTransaction) {
//     updateAccountData(store, action);
//   }
// };

const accountMiddleware = store => next => (action) => {
  next(action);
  switch (action.type) {
    // update on login because the 'save account' button
    // depends on a rerendering of the page
    // TODO: fix the 'save account' path problem, so we can remove this
    case actionTypes.accountLoggedIn:
      updateAccountData(store);
      break;
    case actionTypes.accountReload:
      updateAccountData(store);
      break;
    // case actionTypes.newBlockCreated:
    //   checkTransactionsAndUpdateAccount(store, action);
    //   break;
    // case actionTypes.transactionsUpdated:
    //   delegateRegistration(store, action);
    //   votePlaced(store, action);
    //   break;
    case actionTypes.passwordUsed:
      passwordUsed(store);
      break;
    case actionTypes.passwordVerifying:
      passwordVerifying(store);
      break;
    case actionTypes.passwordFailed:
      passwordFailed(store);
      break;
    default: break;
  }
};

export default accountMiddleware;
