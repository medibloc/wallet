import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
// import { FontIcon } from '../fontIcon';
import Box from '../../atoms/box/index';
import { SecondaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';
import { accountReload } from '../../../actions/account';
import { loadTransactions } from '../../../actions/transactions';
import MedAmount from '../../atoms/medAmount/index';
import TransactionList from '../../organisms/transactionList/transactionList';
import Transfer from '../../organisms/transfer/index';
import VestingSettings from '../../organisms/settings/vestingSettings/index';
// import routes from '../../constants/routes';
import styles from './dashboard.css';
import { addMed } from '../../../utils/med';
import arrowRight from '../../../assets/images/icons/baselineArrowRight.png';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVestingSetting: false,
    };

    this.loadAccount();
    this.loadTransactions();
  }

  loadAccount() {
    this.props.accountReload();
  }

  loadTransactions() {
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
            <WBox className={styles.vestingSettingsWrapper}>
              <SecondaryButton
                className={`${styles.vestingSettings}`}
                label={t('Staking Settings')}
                onClick={() => this.toggleVestingSetting()} />
            </WBox>
            <WBox className={`${styles.totalWrapper}`}>
              <div className={`${styles.totalHeader}`}>
                <h5>Total</h5>
              </div>
              <div className={`${styles.total}`}>
                <h2>
                  <MedAmount roundTo={2}
                    val={addMed(addMed(account.balance, account.vesting), account.unstaking)} />
                </h2>
              </div>
            </WBox>
            <WBox className={`${styles.assetsWrapper} ${grid.row}`}>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={`${styles.assetsHeader} ${styles.hasBorderRight}`}>
                  <small>{t('Balance')}</small>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={2}
                    val={account.balance} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={`${styles.assetsHeader} ${styles.hasBorderRight}`}>
                  <small>{t('Staking')}</small>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={2}
                    val={account.vesting} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-4']}`}>
                <div className={styles.assetsHeader}>
                  <small>{t('Pending')}</small>
                </div>
                <div className={`${styles.text}`}>
                  <MedAmount roundTo={2}
                    val={account.unstaking} />
                </div>
              </div>
            </WBox>
          </WBox>
          { /*  <WBox className={`${styles.graph}`}>
          </WBox> */ }
        </Box>
        <Box className={`${styles.txListViewWrapper}`}>
          <WBox className={`${styles.txListView}`}>
            <WBox className={`${styles.txListHeader}`}>
              <div className={styles.txListHeaderTitle}>
                <h4>
                  { t('Recent activities') }
                </h4>
              </div>
              <div className={styles.txListHeaderMore}>
                <h6>
                  { t('See all transactions') }
                </h6>
                <div className={styles.arrowRightWrapper}>
                  <img className={styles.arrowRight} src={arrowRight}/>
                </div>
              </div>
            </WBox>
            <TransactionList
              account={this.props.account}
              loading={this.props.loading}
              onClick={this.props.onClick}
              t={this.props.t}
              transactions={this.props.transactions.slice(0, 5)} />
          </WBox>
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
  confirmedTransactions: state.transactions.confirmed,
});

const mapDispatchToProps = dispatch => ({
  accountReload: () => dispatch(accountReload()),
  loadTransactions: data => dispatch(loadTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Dashboard));
