import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
// import { FontIcon } from '../fontIcon';
import Box from '../box';
import { SecondaryButton } from '../toolbox/buttons/button';
import WBox from '../wbox';
import { loadTransactions } from '../../../../common/src/actions/transactions';
import MedAmount from '../medAmount';
import TransactionListView from '../transactionDashboard/transactionListView';
import Transfer from '../transfer';
import VestingSettings from '../vestingSettings';
// import routes from '../../constants/routes';
import styles from './dashboard.css';
import { airDropped } from '../../../../common/src/actions/account';
import { addMed } from '../../../../common/src/utils/med';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // For Testing
    // console.log(`Dashboard init: ${this.props.account.balance}`);
    // if (this.props.account.balance === '0') {
    //   console.log('Airdrop starts...');
    //   this.props.airDropped({
    //     activePeer: this.props.peers.activePeer,
    //     address: this.props.account.address,
    //   });
    // }

    this.state = {
      showVestingSetting: false,
    };

    this.props.loadTransactions({
      activePeer: this.props.peers.activePeer,
      address: this.props.account.address,
      mServer: this.props.peers.mServer,
    });
  }

  toggleVestingSetting() {
    this.setState({
      showVestingSetting: !this.state.showVestingSetting,
    });
  }

  render() {
    // const { transactions, t, account, loading, history } = this.props;
    const { account, t } = this.props;

    return <Box className={`${styles.wrapper} ${grid.row}`}>
      <Box className={`${styles.mainWrapper} ${grid['col-sm-8']}`}>
        <Box className={`${styles.financeWrapper}`}>
          <WBox className={`${styles.finance}`}>
            <WBox className={`${styles.totalWrapper}`}>
              <h5 className={`${styles.totalHeader}`}>Total</h5>
              <h2 className={`${styles.total}`}>
                <MedAmount roundTo={2}
                  val={addMed(addMed(account.balance, account.vesting), account.unstaking)} />
              </h2>
            </WBox>
            <WBox className={`${styles.assetsWrapper} ${grid.row}`}>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={styles.assetsHeader}>
                  <h6>{t('Balance')}</h6>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={2}
                    val={account.balance} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={styles.assetsHeader}>
                  <h6>{t('Staking')}</h6>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={2}
                    val={account.vesting} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={styles.assetsHeader}>
                  <h6>{t('Pending')}</h6>
                </div>
                <div className={`${styles.text}`}>
                  <MedAmount roundTo={2}
                    val={account.unstaking} />
                </div>
              </div>
            </WBox>
            <WBox className={styles.vestingSettingsWrapper}>
              <SecondaryButton
                className={`${styles.vestingSettings}`}
                label={t('Staking Settings')}
                onClick={() => this.toggleVestingSetting()} />
            </WBox>
          </WBox>
          { /*  <WBox className={`${styles.graph}`}>
          </WBox> */ }
        </Box>
        <Box className={`${styles.txListViewWrapper}`}>
          <TransactionListView {...this.props}/>
        </Box>
      </Box>
      <Box className={`${styles.transferWrapper} ${grid['col-sm-4']} `}>
        <Transfer {...this.props} />
      </Box>
      {
        this.state.showVestingSetting ?
          <VestingSettings
            {...this.props}
            closePopUp={() => this.toggleVestingSetting()}/> : null
      }
    </Box>;
  }
}

const mapStateToProps = state => ({
  account: state.account,
  loading: state.loading.length > 0,
  peers: state.peers,
  transactions: [...state.transactions.pending,
    ...state.transactions.confirmed]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5),
  pendingTransactions: state.transactions.pending,
});

const mapDispatchToProps = dispatch => ({
  airDropped: data => dispatch(airDropped(data)),
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Dashboard));
