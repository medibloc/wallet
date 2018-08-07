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
      selectedAddress: '',
      network: networks.default.code,
      password: '',
    };
  }

  componentWillReceiveProps(props) {
    const { savedAccounts } = props;
    if (!this.state.selectedAddress && savedAccounts &&
      savedAccounts.accounts && savedAccounts.accounts.length > 0) {
      this.handleAccountChange(savedAccounts.accounts[0].address);
    }
  }

  checkPasswordCorrect(encKey, address) {
    try {
      const account = getAccountFromEncKey(encKey, this.state.password);
      return extractAddress(account.pubKey) === address;
    } catch (e) {
      return false;
    }
  }

  handleAccountChange(address) {
    this.setState({ selectedAddress: address });
  }

  handlePasswordChange(value) {
    this.setState({ password: value });
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
                const encKey = accounts.find(a => a.address === this.state.selectedAddress).encKey;
                if (this.checkPasswordCorrect(encKey, this.state.selectedAddress)) {
                  console.log('GO TO DASHBOARD');
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
