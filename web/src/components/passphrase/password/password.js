import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../box';
import { PrimaryButton } from '../../toolbox/buttons/button';
import Input from '../../toolbox/inputs/input';
import { extractAddress,
  extractPrivKey,
  getAccountFromPrivKey } from '../../../../../common/src/utils/account';
import styles from './password.css';
// import routes from '../../constants/routes';

const validateLabel = (value) => {
  const data = { label: value };
  data.labelValidity = '';
  return data;
};

const validatePassword = (value) => {
  const data = { password: value };
  data.passwordValidity = value.length < 8 ? 'must be at least 8 characters' : '';
  return data;
};

class Password extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      password: '',
      confirmPassword: '',
    };

    this.validators = {
      label: validateLabel,
      password: validatePassword,
      confirmPassword: this.validateConfirmPassword.bind(this),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  validateConfirmPassword(value) {
    const data = { confirmPassword: value };
    data.confirmPasswordValidity = this.state.password === value ? '' :
      'not matched with password';
    return data;
  }

  changeHandler(name, value, error) {
    const validator = this.validators[name] || (() => ({}));
    this.setState({
      [name]: value,
      ...validator(value, error),
    });
  }

  render() {
    const { t, passphrase } = this.props;
    return (<Box className={`${styles.passwordWrapper}`}>
      <header>
        <h2>{t('Protect Your Account')}</h2>
      </header>
      <Input type='text'
        title={t('Account label')}
        name={'label'}
        parentclassname={`${styles.accountLabel}`}
        theme={styles}
        value={this.state.label}
        error={this.state.labelValidity}
        onChange={this.changeHandler.bind(this, 'label')}/>
      <Input type='password'
        title={t('Password')}
        name={'password'}
        parentclassname={`${styles.password}`}
        theme={styles}
        required={true}
        value={this.state.password}
        error={this.state.passwordValidity}
        onChange={this.changeHandler.bind(this, 'password')}/>
      {/* <h6> must be at least 8 characters </h6> */}
      <Input type='password'
        title={t('Confirm password')}
        name={'confirmPassword'}
        parentclassname={`${styles.confirmPassword}`}
        theme={styles}
        required={true}
        value={this.state.confirmPassword}
        error={this.state.confirmPasswordValidity}
        onChange={this.changeHandler.bind(this, 'confirmPassword')}/>
      <PrimaryButton label={t('Next')}
        className={`${styles.nextButton}`}
        onClick={() => {
          const label = this.state.label;
          const account = getAccountFromPrivKey(extractPrivKey(passphrase), this.state.password);
          this.props.finalCallback({
            address: extractAddress(account.pubKey),
            encKey: account.encryptedPrivKey,
            label,
            passphrase,
          });
        }}/>
    </Box>);
  }
}

export default withRouter(translate()(Password));

