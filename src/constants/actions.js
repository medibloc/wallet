const actionTypes = {
  accountUpdated: 'ACCOUNT_UPDATED',
  accountPasswordUpdated: 'ACCOUNT_PASSWORD_UPDATED',
  accountLoggedOut: 'ACCOUNT_LOGGED_OUT',
  accountLoggedIn: 'ACCOUNT_LOGGED_IN',
  accountLoading: 'ACCOUNT_LOADING',
  accountReload: 'ACCOUNT_RELOAD',
  accountAddVotes: 'ACCOUNT_ADD_VOTES',
  accountAddVoters: 'ACCOUNT_ADD_VOTERS',
  activePeerSet: 'ACTIVE_PEER_SET',
  activePeerUpdate: 'ACTIVE_PEER_UPDATE',
  activePeerReset: 'ACTIVE_PEER_RESET',
  candidatesCleared: 'CANDIDATES_CLEAR',
  candidatesLoaded: 'CANDIDATES_LOADED',
  candidatesLoadFailed: 'CANDIDATES_LOAD_FAILED',
  candidatesUpdated: 'CANDIDATES_UPDATED',
  infoUpdate: 'INFO_UPDATE',
  dialogDisplayed: 'DIALOG_DISPLAYED',
  storeCreated: 'STORE_CREATED',
  newBlockCreated: 'NEW_BLOCK_CREATED',
  dialogHidden: 'DIALOG_HIDDEN',
  votePlaced: 'VOTE_PLACED',
  voteToggled: 'VOTE_TOGGLED',
  votesAdded: 'VOTES_ADDED',
  votesCleared: 'VOTES_CLEARED',
  votesUpdated: 'VOTES_UPDATED',
  voteLookupStatusCleared: 'VOTE_LOOKUP_STATUS_CLEARED',
  voteLookupStatusUpdated: 'VOTE_LOOKUP_STATUS_UPDATED',
  delegatesAdded: 'DELEGATES_ADDED',
  delegatesRetrieved: 'DELEGATES_RETRIEVED',
  delegatesRetrieving: 'DELEGATES_RETRIEVING',
  delegateRegisteredSuccess: 'DELEGATE_REGISTERED_SUCCESS',
  delegateRegisteredFailure: 'DELEGATE_REGISTERED_FAILURE',
  updateDelegate: 'UPDATE_DELEGATE',
  pendingVotesAdded: 'PENDING_VOTES_ADDED',
  toastDisplayed: 'TOAST_DISPLAYED',
  toastHidden: 'TOAST_HIDDEN',
  addDataToCurrencyGraph: 'ADD_DATA_TO_CURRENCY_GRAPH',
  addErrorToCurrencyGraph: 'ADD_ERROR_TO_CURRENCY_GRAPH',
  clearDataOfCurrencyGraph: 'CLEAR_DATA_OF_CURRENCY_GRAPH',
  loadingStarted: 'LOADING_STARTED',
  loadingFinished: 'LOADING_FINISHED',
  requestTransferTransaction: 'REQUEST_TRANSFER_TRANSACTION',
  requestVestTransaction: 'REQUEST_VEST_TRANSACTION',
  requestVestAndSendTransaction: 'REQUEST_VEST_AND_SEND_TRANSACTION',
  requestVestAndVoteTransaction: 'REQUEST_VEST_AND_VOTE_TRANSACTION',
  requestVoteTransaction: 'REQUEST_VOTE_TRANSACTION',
  requestWithdrawVestingTransaction: 'REQUEST_WITHDRAW_VESTING_TRANSACTION',
  searchTransactions: 'SEARCH_TRANSACTIONS',
  searchMoreTransactions: 'SEARCH_MORE_TRANSACTIONS',
  searchAccount: 'SEARCH_ACCOUNT',
  searchDelegate: 'SEARCH_DELEGATE',
  searchVotes: 'SEARCH_VOTES',
  searchVoters: 'SEARCH_VOTERS',
  searchUpdateLast: 'SEARCH_UPDATE_LAST',
  sendLoadingBarDisplayed: 'SEND_LOADING_BAR_DISPLAYED',
  sendLoadingBarHidden: 'SEND_LOADING_BAR_HIDDEN',
  transactionsFailed: 'TRANSACTIONS_FAILED',
  transactionsUpdated: 'TRANSACTIONS_UPDATED',
  transactionsLoad: 'TRANSACTIONS_LOAD',
  transactionsLoadFinish: 'TRANSACTIONS_LOAD_FINISH',
  transactionsLoaded: 'TRANSACTIONS_LOADED',
  transactionsFilterSet: 'TRANSACTIONS_FILTER_SET',
  transactionsFiltered: 'TRANSACTIONS_FILTERED',
  transactionAdded: 'TRANSACTION_ADDED',
  transactionFailed: 'TRANSACTION_FAILED',
  transactionAddDelegateName: 'TRANSACTION_ADD_DELEGATE_NAME',
  transactionCleared: 'TRANSACTION_CLEARED',
  transactionLoadRequested: 'TRANSACTION_LOAD_REQUESTED',
  transactionLoaded: 'TRANSACTION_LOADED',
  transactionLoadFailed: 'TRANSACTION_LOAD_FAILED',
  passwordUsed: 'PASSWORD_USED',
  accountsRetrieved: 'ACCOUNTS_RETRIEVED',
  accountSaved: 'ACCOUNT_SAVED',
  activeAccountSaved: 'ACTIVE_ACCOUNT_SAVED',
  activeAccountPasswordUpdated: 'ACTIVE_ACCOUNT_PASSWORD_UPDATED',
  accountRemoved: 'ACCOUNT_REMOVED',
  accountSwitched: 'ACCOUNT_SWITCHED',
  removePassphrase: 'REMOVE_PASSPHRASE',
  settingsUpdated: 'SETTINGS_UPDATED',
  settingsReset: 'SETTINGS_RESET',
  settingsChangeFee: 'SETTINGS_CHANGE_FEE',
  removeSavedAccountPassphrase: 'REMOVE_SAVED_ACCOUNT_PASSPHRASE',
  passwordFailed: 'PASSWORD_FAILED',
  passwordVerifying: 'PASSWORD_VERIFYING',
  updateProcess: 'PROCESS_UPDATE',
  resetProcess: 'PROCESS_RESET',
  startProcess: 'PROCESS_START',
};

export default actionTypes;
