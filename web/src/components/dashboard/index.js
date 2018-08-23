import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import React from 'react';
// import { FontIcon } from '../fontIcon';
import Box from '../box';
import WBox from '../wbox';
import { loadTransactions } from '../../../../common/src/actions/transactions';
import TransactionList from './../transactions/transactionList';
import Transfer from '../transfer';
// import routes from '../../constants/routes';
import { fromRawMed } from '../../../../common/src/utils/med';
import styles from './dashboard.css';
import { airDropped } from '../../../../common/src/actions/account';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // For Testing
    console.log(`Dashboard init: ${this.props.account.balance}`);
    if (this.props.account.balance === '0') {
      console.log('Airdrop starts...');
      this.props.airDropped({
        activePeer: this.props.peers.activePeer,
        address: this.props.account.address,
      });
    }

    this.props.loadTransactions({
      activePeer: this.props.peers.activePeer,
      address: this.props.account.address,
      publicKey: this.props.account.publicKey,
    });
  }

  render() {
    const { transactions, t, account, loading, history } = this.props;
    // const { transactions, t, account } = this.props;

    return <Box className={`${styles.wrapper}`}>
      <Box className={`${styles.mainWrapper}`}>
        <Box className={`${styles.finance}`}>
          <WBox className={`${styles.assets}`}>
            <WBox className={`${styles.assetsHeader}`}>
              <h4>My Assets</h4>
            </WBox>
            <WBox className={`${styles.balanceWrapper}`}>
              <h6 className={`${styles.balanceHeader}`}>Balance</h6>
              <h2 className={`${styles.balance}`}>{fromRawMed(account.balance)}</h2>
            </WBox>
            <WBox className={`${styles.vestingWrapper}`}>
              <div className={`${styles.vestingHeader}`}>
                <h6>Vesting</h6>
              </div>
              <div className={`${styles.vesting}`}>
                <h6>{fromRawMed(account.vesting)}</h6>
              </div>
            </WBox>
          </WBox>
          <WBox className={`${styles.graph}`}>
          </WBox>
        </Box>
        <WBox className={`${styles.txList}`}>
          <WBox className={`${styles.txListHeader}`}>
            <div className={styles.txListHeaderTitle}>
              <h4>
                { t('Last Activity') }
                { /*
                  <Link to={`${routes.dashboard.path}`}
                  className={`${styles.seeAllLink} seeAllLink`}>
                    {t('See all transactions')}
                    <FontIcon value='arrow-right'/>
                  </Link> */
                }
              </h4>
            </div>
            <div className={styles.txListHeaderMore}>
              <h6>
                { t('See all transactions') }
              </h6>
            </div>
          </WBox>
          { <TransactionList {...{
            transactions,
            t,
            address: account.address,
            dashboard: true,
            loading,
            history,
            // onClick: props => history.push(`${routes.wallet.path}?id=${props.value.id}`),
          }} /> }
        </WBox>
      </Box>
      <WBox className={`${styles.transferWrapper}`}>
        <Transfer {...this.props} />
      </WBox>
    </Box>;
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
  airDropped: data => dispatch(airDropped(data)),
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Dashboard));
