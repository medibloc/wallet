import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../../atoms/box/index';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import { Input } from '../../../atoms/toolbox/inputs/input';
import {
  getAccountFromPrivKey,
  extractPrivKey,
  encryptPrivateKey,
} from '../../../../utils/account';
import regex from '../../../../utils/regex';
import styles from './password.css';

class Password extends React.Component {
  constructor() {
    super();
    this.state = {
      label: '',
      password: '',
      confirmPassword: '',
    };

    this.validators = {
      label: this.validateLabel.bind(this),
      password: this.validatePassword.bind(this),
      confirmPassword: this.validateConfirmPassword.bind(this),
    };
  }

  validateLabel(value) {
    const data = { label: value };
    if (!value) {
      data.labelValidity = this.props.t('Required');
    } else {
      data.labelValidity = value.match(regex.label) ? '' : this.props.t('Only letters, numbers, and periods are allowed.');
    }
    return data;
  }

  validatePassword(value) {
    const data = { password: value };
    if (!value) {
      data.passwordValidity = this.props.t('Required');
    } else if (value.length < 8) {
      data.passwordValidity = this.props.t('Must be at least 8 characters');
    } else if (!value.match(regex.password)) {
      data.passwordValidity = this.props.t('Try a mix of lowercase letters, uppercase letters, and numbers');
    } else {
      data.passwordValidity = '';
    }
    return data;
  }

  validateConfirmPassword(value, password = this.state.password) {
    const data = { confirmPassword: value };
    data.confirmPasswordValidity = password === value ? null :
      this.props.t('not matched with password');
    return data;
  }

  changeHandler(name, value) {
    const validator = this.validators[name] || (() => ({}));
    this.setState({
      [name]: value,
      ...validator(value),
    });
    if (name === 'password' && !!this.state.confirmPassword) {
      this.setState({
        ...this.validators.confirmPassword(this.state.confirmPassword, value),
      });
    }
  }

  render() {
    const { t, mnemonic } = this.props;
    return (<Box className={`${styles.passwordWrapper}`}>
      <header>
        <h2>{t('Protect Your Account')}</h2>
      </header>
      <Input
        autoFocus={true}
        type='text'
        title={t('Account label')}
        name={'label'}
        parentclassname={`${styles.accountLabel}`}
        theme={styles}
        value={this.state.label}
        error={this.state.labelValidity}
        onChange={(...args) => this.changeHandler('label', ...args)}/>
      <Input type='password'
        title={t('Password')}
        name={'password'}
        parentclassname={`${styles.password}`}
        theme={styles}
        required={true}
        value={this.state.password}
        error={this.state.passwordValidity}
        onChange={(...args) => this.changeHandler('password', ...args)}/>
      <Input type='password'
        title={t('Confirm password')}
        name={'confirmPassword'}
        parentclassname={`${styles.confirmPassword}`}
        theme={styles}
        required={true}
        value={this.state.confirmPassword}
        error={this.state.confirmPasswordValidity}
        onChange={(...args) => this.changeHandler('confirmPassword', ...args)}/>
      <PrimaryButton label={t('Next')}
        className={`${styles.nextButton}`}
        disabled={(!!this.state.labelValidity ||
          !this.state.label ||
          !!this.state.passwordValidity ||
          !this.state.password ||
          !!this.state.confirmPasswordValidity ||
          !this.state.confirmPassword)}
        onClick={async () => {
          const label = this.state.label;
          const account = await getAccountFromPrivKey(await extractPrivKey(mnemonic));

          this.props.finalCallback({
            address: account.address,
            encKey: encryptPrivateKey(account.privateKey, this.state.password),
            label,
          });
        }}/>
    </Box>);
  }
}

export default withRouter(translate()(Password));

