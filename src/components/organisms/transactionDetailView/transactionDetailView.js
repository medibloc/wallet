import React from 'react';
import TransactionDetail from '../transactionDetail';
import WBox from '../../atoms/wbox/index';
import backButton from '../../../assets/images/icons/backButton.png';
import styles from './transactionDetailView.css';

class TransactionDetailView extends React.Component {
  constructor(props) {
    super(props);

    const transactionHash = this.getTransactionHashFromURL();
    if (transactionHash) {
      this.props.loadTransaction({
        hash: transactionHash,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location && !nextProps.location.search) this.props.prevStep();
  }

  getTransactionHashFromURL() {
    const { search } = this.props.location || window.location;
    const params = new URLSearchParams(search);
    return params.get('hash');
  }

  render() {
    const { t, transaction } = this.props;

    return <WBox className={styles.txDetailViewWrapper}>
      {
        this.props.prevStep ?
          <div className={`${styles.backButtonWrapper}`}>
            <a className={`${styles.backButton} transaction-details-back-button`}
              onClick={() => this.props.history.push(this.props.history.location.pathname)}>
              <img className={styles.icon} src={backButton} />
            </a>
          </div> : null
      }
      <WBox className={`${styles.txDetailViewHeader}`}>
        <div className={styles.txDetailViewHeaderTitle}>
          <h4>
            { t('Transaction Information') }
          </h4>
        </div>
      </WBox>
      <TransactionDetail
        transaction={transaction}
      />
    </WBox>;
  }
}

export default TransactionDetailView;
