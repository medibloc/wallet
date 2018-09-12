import React from 'react';
import styles from './login.css';
import networks from '../../../../common/src/constants/networks';
import AccountVisual from '../accountVisual';
import Box from '../box';
import DropDown from '../toolbox/dropdown/dropdown';
import { Input } from '../toolbox/inputs/input';
import logo from '../../assets/images/MEDIBLOC.png';
import Footer from '../register/footer/footer';
import { PrimaryButton } from '../toolbox/buttons/button';
import { extractAddress, getAccountFromEncKey } from '../../../../common/src/utils/account';
import routes from '../../constants/routes';

const customItem = item => (
  <div className={`${styles.dropDownWrapper}`}>
    <div className={`${styles.accountVisual}`}>
      <AccountVisual
        address={item.address}
        size={33} sizeS={33}/>
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
      passwordValidity: '',
    };
  }

  componentDidUpdate() {
    if (this.props.account && this.props.account.address) {
      // this.redirectToReferrer();
    }
  }

  componentWillReceiveProps(props) {
    const { savedAccounts } = props;
    if (savedAccounts && savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      this.handleAccountChange(savedAccounts.lastActive ?
        savedAccounts.lastActive.address : savedAccounts.accounts[0].address);
    }
  }

  checkPasswordCorrect({ address, encKey }) {
    try {
      const account = getAccountFromEncKey(encKey, this.state.password);
      return extractAddress(account.pubKey) === address;
    } catch (e) {
      this.setState({
        passwordValidity: this.props.t('Wrong Password'),
      });
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getReferrerRoute() {
    return `${routes.dashboard.path}`;
  }

  handleAccountChange(address) {
    this.setState({ selectedAddress: address });
  }

  handlePasswordChange(value) {
    this.setState({
      password: value,
      passwordValidity: '',
    });
  }

  onLoginSubmission({ address, encKey }) {
    this.props.activePeerSet({
      address,
      encKey,
      networkCode: this.state.networkCode,
    });
  }

  redirectToReferrer() {
    this.props.history.replace(this.getReferrerRoute());
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

    // return (this.props.account.loading ?
    //   <span /> :
    return (
      <Box className={`${styles.wrapper}`}>
        <img src={logo} />
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
                const address = this.state.selectedAddress;
                const encKey = accounts.find(a => a.address === this.state.selectedAddress).encKey;
                if (this.checkPasswordCorrect({ address, encKey })) {
                  this.onLoginSubmission({ address, encKey });
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
