import React from 'react';
import TransactionList from '../transactionList/transactionList';
import WBox from '../../atoms/wbox/index';
import styles from './transactionOverview.css';
import getNetwork from '../../../utils/getNetwork';

class TransactionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number || 12,
    };
  }

  componentDidMount() {
    this.props.loadTransactions({
      activePeer: this.props.peers.activePeer,
      address: this.props.account.address,
      mServer: this.props.peers.mServer,
    });
  }

  render() {
    const { t, account, networkCode } = this.props;
    const url = getNetwork(networkCode).mServerURL;

    return <WBox className={styles.txOverviewWrapper}>
      <WBox className={`${styles.txOverviewHeader}`}>
        <div className={styles.txOverviewHeaderTitle}>
          <h4>
            { t('All activities') }
          </h4>
        </div>
        <span>
          <a href={`${url}/en/account/${account.address}`} target={'_blank'}>
            see more
          </a>
        </span>
      </WBox>
      <div className={styles.txListWrapper}>
        <TransactionList
          account={this.props.account}
          isScrollable={this.props.transactions.length > this.state.number}
          history={this.props.history}
          loading={this.props.loading}
          location={this.props.history.location}
          nextStep={this.props.nextStep}
          onClick={this.props.onTransactionRowClick}
          t={this.props.t}
          transactions={this.props.transactions}
          total={this.props.total}
        />
      </div>
    </WBox>;
  }
}

export default TransactionOverview;
