import React from 'react';
import styles from './login.css';
import networks from '../../../../common/src/constants/networks';
import AccountVisual from '../accountVisual';
import Box from '../box';
import DropDown from '../toolbox/dropdown/dropdown';
import { Input } from '../toolbox/inputs/input';
import Footer from '../register/footer/footer';
import { PrimaryButton } from '../toolbox/buttons/button';
import { extractAddress, getAccountFromEncKey } from '../../../../common/src/utils/account';
import getNetwork from '../../../../common/src/utils/getNetwork';
import routes from '../../constants/routes';

const customItem = item => (
  <div className={`${styles.dropDownWrapper}`}>
    <div className={`${styles.accountVisual}`}>
      <AccountVisual
        address={item.address}
        size={40} sizeS={40}/>
    </div>
    <div className={`${styles.address}`}>
      <h6>{item.label}</h6>
      <h6>{item.address}</h6>
    </div>
  </div>
);

/**
 * The container component containing login
 * account functionality
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAddress: this.props.account.address || '',
      networkCode: networks.default.code,
      password: '',
    };
  }

  componentDidUpdate() {
    if (this.props.account && this.props.account.address) {
      // this.redirectToReferrer();
    }
  }

  componentWillReceiveProps(props) {
    const { savedAccounts } = props;
    if (!this.state.selectedAddress && savedAccounts &&
      savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      this.handleAccountChange(savedAccounts.accounts[0].address);
    }
  }

  checkPasswordCorrect({ address, encKey }) {
    try {
      const account = getAccountFromEncKey(encKey, this.state.password);
      return extractAddress(account.pubKey) === address;
    } catch (e) {
      return false;
    }
  }

  getNetwork() {
    const network = Object.assign({}, getNetwork(this.state.networkCode));
    if (this.state.networkCode === networks.customNode.code) {
      network.url = this.state.url;
    }
    return network;
  }

  // eslint-disable-next-line class-methods-use-this
  getReferrerRoute() {
    return `${routes.dashboard.path}`;
  }

  handleAccountChange(address) {
    this.setState({ selectedAddress: address });
  }

  handlePasswordChange(value) {
    this.setState({ password: value });
  }

  onLoginSubmission({ address, encKey }) {
    const network = this.getNetwork();
    this.props.activePeerSet({
      address,
      encKey,
      network,
    });
  }

  redirectToReferrer() {
    this.props.history.replace(this.getReferrerRoute());
  }

  render() {
    const { t, savedAccounts } = this.props;
    let accounts;
    if (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      accounts = savedAccounts.accounts.map(a => (Object.assign({},
        { ...a },
        { value: a.address },
      )));
    }

    // return (this.props.account.loading ?
    //   <span /> :
    return (
      <Box className={`${styles.wrapper}`}>
        <img src="../../assets/images/MEDIBLOC.png" />
        <div className={`${styles.loginWrapper}`}>
          <section className={`${styles.login}`}>
            <header>
              <h2>{t('Sign in page for wallet')}</h2>
            </header>
            { accounts ?
              <DropDown
                label={t('Account label')}
                parentclassname={`${styles.accountLabel}`}
                source={accounts}
                template={customItem}
                value={this.state.selectedAddress}
                onChange={(...args) => this.handleAccountChange(...args)}
              /> : null}
            <Input type='password'
              title={t('Password')}
              parentclassname={`${styles.password}`}
              theme={styles}
              name={'password'}
              value={this.state.password}
              onChange={(...args) => this.handlePasswordChange(...args)}/>
            <PrimaryButton
              label={t('Next')}
              className={`${styles.nextButton}`}
              onClick={() => {
                const address = this.state.selectedAddress;
                const encKey = accounts.find(a => a.address === this.state.selectedAddress).encKey;
                if (this.checkPasswordCorrect({ address, encKey })) {
                  this.onLoginSubmission({ address, encKey });
                  this.props.history.push(`${routes.dashboard.path}`);
                } else {
                  console.log('WRONG PASSWORD');
                }
              }}/>
            <Footer t={t} />
          </section>
        </div>
      </Box>
    );
  }
}

export default Login;
