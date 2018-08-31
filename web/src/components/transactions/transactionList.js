import React from 'react';
// import Waypoint from 'react-waypoint';
import tableStyle from 'react-toolbox/lib/table/theme.css';
import TransactionRow from './transactionRow';
import TransactionsHeader from './transactionsHeader';

// import txFilters from './../../../../common/src/constants/transactionFilters';
// import txTypes from './../../../../common/src/constants/transactionTypes';
import styles from './transactionList.css';

// const isLargeScreen = () => window.innerWidth > 768;

class TransactionsList extends React.Component {
  render() {
    const {
      account,
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
    console.log(transactions);
    return <div className={`${styles.results} transaction-results`}>
      <TransactionsHeader tableStyle={tableStyle} />
      {transactions
        // .filter(fixIncomingFilter)
        .sort((a, b) => a.timestamp < b.timestamp)
        .map((transaction, i) => (
          <TransactionRow address={account.address}
            key={i}
            t={t}
            value={transaction}
            onClick={onClick}
          />))}
      {
        // the transaction list should be scrollable on a large screen
        // otherwise (XS) the whole transaction box will be scrollable
        // (see transactionOverview.js)
        // isLargeScreen()
        //   ? <Waypoint bottomOffset='-80%'
        //     key={transactions.length}
        //     onEnter={() => {
        //       loadMore();
        //     }} />
        //   : null
      }
    </div>;
  }
}

export default TransactionsList;
