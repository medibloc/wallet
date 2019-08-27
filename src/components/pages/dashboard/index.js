import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Box from '../../atoms/box/index';
import { SecondaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';
import { accountReload } from '../../../actions/account';
import { loadTransactions } from '../../../actions/transactions';
import MedAmount from '../../atoms/medAmount/index';
import TransactionList from '../../organisms/transactionList/transactionList';
import Transfer from '../../organisms/transfer/index';
import VestingSettings from '../../organisms/settings/vestingSettings/index';
import styles from './dashboard.css';
import { addMed, fromRawMed, mulMed } from '../../../utils/med';
import arrowRight from '../../../assets/images/icons/baselineArrowRight.png';
import routes from '../../../constants/routes';

const parseBalance = (account) => {
  const balances = {
    base: '0',
    bonding: '0',
    unbonding: '0',
    reward: '0',
    total: '0',
  };

  try {
    balances.base = fromRawMed(account.value.coins[0].amount);
  } catch (e) { balances.base = '0'; }
  try {
    balances.bonding = account.bonding
      .reduce((acc, coin) => addMed(acc, fromRawMed(coin.shares)), new BigNumber(0));
  } catch (e) { balances.bonding = '0'; }
  try {
    balances.unbonding = account.unbonding.reduce((acc, { entries }) => {
      // eslint-disable-next-line no-return-assign
      entries.forEach(({ balance }) => acc = addMed(acc, fromRawMed(balance)));
      return acc;
    }, new BigNumber(0));
  } catch (e) { balances.unbonding = '0'; }
  try { balances.reward = fromRawMed(account.reward[0].amount); } catch (e) { balances.reward = '0'; }

  balances.total = Object.keys(balances)
    .reduce((acc, k) => addMed(acc, balances[k]), new BigNumber(0));
  return balances;
};

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

  moveToWalletDashboard() {
    this.props.history.push(`${routes.wallet.path}`);
  }

  onTransactionRowClick(props) {
    this.props.history.push(`${routes.wallet.path}?hash=${props.value.hash}`);
  }

  toggleVestingSetting() {
    this.setState({
      showVestingSetting: !this.state.showVestingSetting,
    });
  }

  render() {
    const { account, t } = this.props;
    const balances = parseBalance(account);

    return <Box className={`${styles.wrapper} ${grid.row}`}>
      <Box className={`${styles.mainWrapper} ${grid['col-sm-8']}`}>
        <Box className={`${styles.financeWrapper}`}>
          <WBox className={`${styles.finance}`} hasBorder={true}>
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
                  <MedAmount roundTo={6}
                    val={mulMed(balances.total, 10 ** 6)} />
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
                    val={account.staking} />
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
          <WBox className={`${styles.txListView}`} hasBorder={true}>
            <WBox className={`${styles.txListHeader}`}>
              <div className={styles.txListHeaderTitle}>
                <h4>
                  { t('Recent activities') }
                </h4>
              </div>
              <div className={styles.txListHeaderMore}
                onClick={() => this.moveToWalletDashboard()}>
                <h6>
                  { t('See all transactions') }
                </h6>
                <div className={styles.arrowRightWrapper}>
                  <img className={styles.arrowRight} src={arrowRight}/>
                </div>
              </div>
            </WBox>
            <div className={styles.txListWrapper}>
              <TransactionList
                account={this.props.account}
                history={this.props.history}
                loading={this.props.loading}
                onClick={props => this.onTransactionRowClick(props)}
                t={this.props.t}
                transactions={this.props.transactions.slice(0, 5)} />
            </div>
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
