import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import React from 'react';
// import { FontIcon } from '../fontIcon';
import Box from '../box';
import { loadTransactions } from '../../../../common/src/actions/transactions';
// import TransactionList from './../transactions/transactionList';
// import Send from '../send';
// import routes from '../../constants/routes';
import styles from './dashboard.css';
import airDrop from '../../../../common/src/utils/api/airdrop';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // For Testing
    console.log(`Dashboard init: ${this.props.account.balance}`);
    console.log(this.props.account.balance === '0');
    if (this.props.account.balance === '0') {
      console.log('Airdrop starts...');
      this.props.airDrop({
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
    // const { transactions, t, account, loading, history } = this.props;
    const { t } = this.props;
    return <div className={`${styles.wrapper}`}>
      <div className={`${styles.mainWrapper}`}>
        <Box className={`${styles.finance}`}>
          <Box className={`${styles.assets}`}>
          </Box>
          <Box className={`${styles.graph}`}>
          </Box>
        </Box>
        <Box className={`${styles.latestActivity}`}>
          <header>
            <h2 className={styles.title}>
              { t('') }
              { /*
                <Link to={`${routes.dashboard.path}`} className={`${styles.seeAllLink} seeAllLink`}>
                  {t('See all transactions')}
                  <FontIcon value='arrow-right'/>
                </Link> */
              }
            </h2>
          </header>
          { /* <TransactionList {...{
            transactions,
            t,
            address: account.address,
            dashboard: true,
            loading,
            history,
            // onClick: props => history.push(`${routes.wallet.path}?id=${props.value.id}`),
          }} /> */ }
        </Box>
      </div>
      <div className={`${styles.sendWrapper}`}>
        {
          // <Send {...this.props} />
        }
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  account: state.account,
  // account: {
  //   address: '037b18a6ec51135cf29eed0339d5d13324600a63f8e4c79373b5caa42a6119f48c',
  //   balance: 1000,
  //   publicKey: '',
  // },
  loading: true, // state.loading.length > 0,
  peers: state.peers,
  transactions: [...state.transactions.pending, ...state.transactions.confirmed].slice(0, 5),
  pendingTransactions: state.transactions.pending,
});

const mapDispatchToProps = dispatch => ({
  airDrop: data => dispatch(airDrop(data)),
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Dashboard));
