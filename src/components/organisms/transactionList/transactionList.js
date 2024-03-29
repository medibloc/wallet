import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import tableStyle from 'react-toolbox/lib/table/theme.css';
import TransactionRow from './transactionRow';
import TransactionsHeader from './transactionsHeader';
import { parseSearchParams } from '../../../utils/searchParams';

import styles from './transactionList.css';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    if (props.transactions && props.nextStep) this.showDetails(props.transactions);
  }

  componentWillReceiveProps(nextProps) {
    // istanbul ignore else
    if (nextProps.transactions && this.props.nextStep) this.showDetails(nextProps.transactions);
  }

  showDetails(transactions) {
    const paramsHash = parseSearchParams(this.props.history.location.search).hash;
    // istanbul ignore else
    if (paramsHash) {
      const value = transactions.filter(transaction => transaction.hash === paramsHash)[0];
      // istanbul ignore else
      if (value) this.props.nextStep({ value, t: this.props.t });
    }
  }

  render() {
    const {
      account,
      isScrollable,
      loading,
      t,
      transactions,
      total,
    } = this.props;

    if (loading) return null;
    // istanbul ignore else
    if (transactions.length === 0) {
      // istanbul ignore else
      return (
        <p className={`${styles.empty} hasPaddingRow empty-message`}>
          {t('Please click the "See all transactions" button')}
        </p>
      );
    }
    const seeMoreText = 'Click "see more" to see more transactions';

    return (
      <div className={`${styles.results} transaction-results`}>
        <TransactionsHeader tableStyle={tableStyle} />
        <div className={`${styles.transactionRowWrapper} ${isScrollable ? styles.scrollable : null}`}>
          {transactions
            .sort((a, b) => b.blockHeight - a.blockHeight)
            .map((transaction, i) => (
              <TransactionRow address={account.address}
                key={i}
                t={t}
                value={transaction}
              />))}
          {
            // In case that account holds transactions more than 30(default display value)
            transactions.length < total && (
              <div className={`${grid.row} ${styles.showMore}`}>
                { seeMoreText }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default TransactionsList;
