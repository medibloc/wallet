import React from 'react';
import MultiStep from '../../atoms/multiStep';
import TransactionDetailView from '../transactionDetailView';
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

  // shouldComponentUpdate(nextProps) {
  //   return (this.props.loading && !nextProps.loading) ||
  //     (nextProps.transactions.length !== 0 &&
  //       (this.props.transactions.length !== nextProps.transactions.length ||
  //         this.props.transactions[0].hash !== nextProps.transactions[0].hash));
  // }

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
      <WBox>
        <MultiStep className={styles.transactions}
          hideBackButton={true}>
          <TransactionOverview
            {...this.props}
            onTransactionRowClick={props => this.onTransactionRowClick(props)}
            title={'Transaction overview'}
          />
          <TransactionDetailView
            {...this.props}
            title={'Transaction detail view'}
          />
        </MultiStep>
      </WBox>
    );
  }
}

export default TransactionDashboard;
