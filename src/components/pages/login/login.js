import React from 'react';
import styles from './login.css';
import networks from '../../../constants/networks';
import AccountVisual from '../../atoms/accountVisual/index';
import Box from '../../atoms/box/index';
import DropDown from '../../atoms/toolbox/dropdown/dropdown';
import { Input } from '../../atoms/toolbox/inputs/input';
import Footer from '../register/footer/footer';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import {
  getAddressFromPrivateKey,
  getPrivateKeyFromKeyStore,
} from '../../../utils/account';
import routes from '../../../constants/routes';
import { setLoggedInMark } from '../../../utils/savedAccounts';

const customItem = item => (
  <div className={`${styles.dropDownWrapper}`}>
    <div className={`${styles.accountVisual}`}>
      <AccountVisual
        address={item.address}
        size={33} sizeS={33}/>
    </div>
    <div className={`${styles.account}`}>
      <h6 className={`${styles.label}`}>{item.label}</h6>
      <h6 className={`${styles.address}`}>{item.address}</h6>
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
    const account = this.props.savedAccounts.accounts.find(
      a => a.address === this.props.account.address);
    this.state = {
      selectedAddress: this.props.account.address || '',
      networkCode: account ? account.networkCode :
        process.env.NETWORK_CODE || networks.default.code,
      password: '',
      passwordValidity: '',
    };
  }

  componentWillReceiveProps(props) {
    const { savedAccounts } = props;
    if (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      this.handleAccountChange(savedAccounts.lastActive ?
        savedAccounts.lastActive.address : savedAccounts.accounts[0].address);
    }
  }

  checkPasswordCorrect({ address, encKey: keyStore }) {
    try {
      const privKey = getPrivateKeyFromKeyStore(keyStore, this.state.password);
      return getAddressFromPrivateKey(privKey) === address;
    } catch (e) {
      this.setState({
        passwordValidity: this.props.t('Wrong Password'),
      });
      return false;
    }
  }

  handleAccountChange(address) {
    const account = this.props.savedAccounts.accounts.find(a => a.address === address);
    this.setState({
      selectedAddress: address,
      networkCode: account ? account.networkCode :
        process.env.NETWORK_CODE || networks.default.code,
    });
  }

  handlePasswordChange(value) {
    this.setState({
      password: value,
      passwordValidity: '',
    });
  }

  onLoginSubmission(account) {
    setLoggedInMark();
    this.props.accountSwitched({
      address: account.address,
      encKey: account.encKey,
      networkCode: this.state.networkCode,
    });
  }

  render() {
    const { history, t, savedAccounts } = this.props;
    let accounts = [];
    if (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      accounts = savedAccounts.accounts.slice(0).reverse().map(a => (Object.assign({},
        { ...a },
        { value: a.address },
      )));
    }

    return (
      <Box className={`${styles.wrapper}`}>
        <img src="/assets/images/medibloc.svg" />
        <div className={`${styles.loginWrapper}`}>
          <section className={`${styles.login}`}>
            <header>
              <h2>{t('Sign in page for wallet')}</h2>
            </header>
            {(accounts && accounts.length > 0) ?
              <DropDown
                label={t('Account label')}
                parentclassname={`${styles.accountLabel}`}
                source={accounts}
                template={customItem}
                value={this.state.selectedAddress}
                onChange={(...args) => this.handleAccountChange(...args)}
              /> :
              <Input
                title={t('Account label')}
                parentclassname={`${styles.noAccountLabel}`}
                theme={styles}
                name={'label'}
                disabled={true}/>}
            <Input type='password'
              title={t('Password')}
              parentclassname={`${styles.password}`}
              theme={styles}
              name={'password'}
              error={this.state.passwordValidity}
              value={this.state.password}
              disabled={accounts.length === 0}
              onChange={(...args) => this.handlePasswordChange(...args)}/>
            <PrimaryButton
              label={t('Next')}
              className={`${styles.nextButton}`}
              disabled={!this.state.password}
              onClick={() => {
                const account = accounts.find(a => a.address === this.state.selectedAddress);
                if (this.checkPasswordCorrect(account)) {
                  this.onLoginSubmission(account);
                  this.props.history.push(`${routes.dashboard.path}`);
                }
              }}/>
            <Footer
              history={history}
              t={t}
              type={'login'} />
          </section>
        </div>
      </Box>
    );
  }
}

export default Login;
