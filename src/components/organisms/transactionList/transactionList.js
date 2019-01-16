import React from 'react';
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
      onClick,
      t,
      transactions,
      // loadMore,
    } = this.props;

    // const fixIncomingFilter = (transaction) => {
    //   const isTypeNonSend = transaction.type !== txTypes.send;
    //   const isFilterIncoming = filter && filter.value === txFilters.incoming;
    //   const isAccountInit = transaction.type === txTypes.send
    //     && transaction.to === transaction.from;
    //
    //   return !(isFilterIncoming && (isTypeNonSend || isAccountInit));
    // };

    if (loading) return null;
    // istanbul ignore else
    if (transactions.length === 0) {
      // istanbul ignore else
      return <p className={`${styles.empty} hasPaddingRow empty-message`}>
        {t('There are no transactions.')}
      </p>;


      // if (dashboard || (filter && filter.value !== txFilters.all)) {
      //   return <p className={`${styles.empty} hasPaddingRow empty-message`}>
      //     {t('There are no {{filterName}} transactions.', {
      //       filterName: filter && filter.name ? filter.name.toLowerCase() : '',
      //     })}
      //   </p>;
      // }
      // return null;
    }
    return <div className={`${styles.results} transaction-results`}>
      <TransactionsHeader tableStyle={tableStyle} />
      <div className={`${styles.transactionRowWrapper} ${isScrollable ? styles.scrollable : null}`}>
        {transactions
          // .filter(fixIncomingFilter)
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((transaction, i) => (
            <TransactionRow address={account.address}
              key={i}
              t={t}
              value={transaction}
              onClick={onClick}
            />))}
      </div>
    </div>;
  }
}

export default TransactionsList;
