import React from 'react';
import TransactionOverview from '../transactionOverview';
import WBox from '../../atoms/wbox';
import routes from '../../../constants/routes';

import styles from './transactionDashboard.css';

class TransactionDashboard extends React.Component {
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

  onTransactionRowClick(props) {
    this.props.history.push(`${routes.wallet.path}?hash=${props.value.hash}`);
  }

  render() {
    return (
      <WBox className={styles.wrapper}>
        <TransactionOverview
          {...this.props}
          onTransactionRowClick={props => this.onTransactionRowClick(props)}
          title={'Transaction overview'}
        />
      </WBox>
    );
  }
}

export default TransactionDashboard;
