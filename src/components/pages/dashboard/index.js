import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Box from '../../atoms/box/index';
import { SecondaryButton } from '../../atoms/toolbox/buttons/button';
import WBox from '../../atoms/wbox/index';
import { accountReload } from '../../../actions/account';
import MedAmount from '../../atoms/medAmount/index';
import Transfer from '../../organisms/transfer/index';
import FeeSettings from '../../organisms/settings/feeSettings/index';
import styles from './dashboard.css';
import { mulMed } from '../../../utils/med';
import arrowRight from '../../../assets/images/icons/baselineArrowRight.png';
import routes from '../../../constants/routes';
import parseBalance from '../../../utils/balanceParser';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFeeSetting: false,
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

  toggleFeeSetting() {
    this.setState({
      showFeeSetting: !this.state.showFeeSetting,
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
                label={t('Fee Settings')}
                onClick={() => this.toggleFeeSetting()} />
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
              <div className={`${styles.assetsRow} ${grid['col-sm-3']}`}>
                <div className={`${styles.assetsHeader} ${styles.hasBorderRight}`}>
                  <small>{t('Balance')}</small>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={6}
                    val={mulMed(balances.base, 10 ** 6)} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-3']}`}>
                <div className={`${styles.assetsHeader} ${styles.hasBorderRight}`}>
                  <small>{t('Bonding')}</small>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={6}
                    val={mulMed(balances.bonding, 10 ** 6)} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-3']}`}>
                <div className={`${styles.assetsHeader} ${styles.hasBorderRight}`}>
                  <small>{t('Unbonding')}</small>
                </div>
                <div className={`${styles.text} ${styles.hasBorderRight}`}>
                  <MedAmount roundTo={6}
                    val={mulMed(balances.unbonding, 10 ** 6)} />
                </div>
              </div>
              <div className={`${styles.assetsRow} ${grid['col-sm-3']}`}>
                <div className={styles.assetsHeader}>
                  <small>{t('Reward')}</small>
                </div>
                <div className={`${styles.text}`}>
                  <MedAmount roundTo={6}
                    val={mulMed(balances.reward, 10 ** 6)} />
                </div>
              </div>
            </WBox>
          </WBox>
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
          </WBox>
        </Box>
      </Box>
      <Box className={`${styles.transferWrapper} ${grid['col-sm-4']} `}>
        <Transfer {...this.props} />
      </Box>
      {
        this.state.showFeeSetting ?
          <FeeSettings
            {...this.props}
            closePopUp={() => this.toggleFeeSetting()}/> : null
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
    .sort((a, b) => b.blockHeight - a.blockHeight) // TODO @ggomma check this with pending txs
    .slice(0, 5),
  pendingTransactions: state.transactions.pending,
  confirmedTransactions: state.transactions.confirmed,
});

const mapDispatchToProps = dispatch => ({
  accountReload: () => dispatch(accountReload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Dashboard));
