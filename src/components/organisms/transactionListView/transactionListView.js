import React from 'react';
import TransactionList from '../transactionList/transactionList';
import WBox from '../../atoms/wbox/index';
import styles from './transactionListView.css';

class TransactionListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || 12,
    };
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.loading && !nextProps.loading) ||
      (nextProps.transactions.length !== 0 &&
        (this.props.transactions.length !== nextProps.transactions.length ||
          this.props.transactions[0].hash !== nextProps.transactions[0].hash));
  }

  componentDidMount() {
    this.props.loadTransactions({
      activePeer: this.props.peers.activePeer,
      address: this.props.account.address,
      mServer: this.props.peers.mServer,
    });
  }

  render() {
    const { t } = this.props;

    return <WBox className={styles.txListViewWrapper}>
      <WBox className={`${styles.txListHeader}`}>
        <div className={styles.txListHeaderTitle}>
          <h4>
            { t('All activities') }
          </h4>
        </div>
      </WBox>
      <TransactionList
        account={this.props.account}
        loading={this.props.loading}
        onClick={this.props.onClick}
        t={this.props.t}
        transactions={this.props.transactions.slice(0, this.state.number)} />
    </WBox>;
  }
}

export default TransactionListView;
