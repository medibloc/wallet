import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React from 'react';
import { loadTransactions } from '../../../../common/src/actions/transactions';
import TransactionListView from './transactionListView';
import Transfer from '../transfer';
import WBox from '../wbox';
import styles from './transactionDashboard.css';

class TransactionsDashboard extends React.Component {
  render() {
    return <div className={styles.wrapper}>
      <WBox className={styles.transfer}>
        <Transfer {...this.props}/>
      </WBox>
      <WBox className={styles.txListView}>
        <TransactionListView {...this.props}/>
      </WBox>
    </div>;
  }
}

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading.length > 0,
  peers: state.peers,
  transactions: [...state.transactions.pending, ...state.transactions.confirmed].slice(0, 5),
  pendingTransactions: state.transactions.pending,
});

const mapDispatchToProps = dispatch => ({
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(TransactionsDashboard));
