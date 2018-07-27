import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../box';
import { PrimaryButton } from '../../toolbox/buttons/button';
import Input from '../../toolbox/inputs/input';
import styles from './password.css';
// import routes from '../../constants/routes';

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

  // eslint-disable-next-line class-methods-use-this
  validateLabel(value) {
    const data = { label: value };
    data.labelValidity = '';
    return data;
  }

  // eslint-disable-next-line class-methods-use-this
  validatePassword(value) {
    console.log('validatePassword', value, value.length);
    const data = { password: value };
    data.passwordValidity = value.length < 8 ? 'must be at least 8 characters' : '';
    return data;
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
    const { t, nextStep, passphrase } = this.props;
    return (<Box className={`${styles.password}`}>
      <header>
        <h2>{t('Protect Your Account')}</h2>
      </header>
      <Input type='text'
        label={t('Account label')}
        name={'label'}
        className={`${styles.accountLabel}`}
        theme={styles}
        value={this.state.label}
        error={this.state.labelValidity}
        onChange={this.changeHandler.bind(this, 'label')}/>
      <Input type='text'
        label={t('Password')}
        name={'password'}
        className={`${styles.password}`}
        theme={styles}
        value={this.state.password}
        error={this.state.passwordValidity}
        onChange={this.changeHandler.bind(this, 'password')}/>
      <h6> must be at least 8 characters </h6>
      <Input type='text'
        label={t('Confirm password')}
        name={'confirmPassword'}
        className={`${styles.confirmPassword}`}
        theme={styles}
        value={this.state.confirmPassword}
        error={this.state.confirmPasswordValidity}
        onChange={this.changeHandler.bind(this, 'confirmPassword')}/>
      <PrimaryButton label={t('Next')}
        className={`${styles.nextButton}`}
        onClick={() => nextStep({
          passphrase,
        })}/>
    </Box>);
  }
}

export default withRouter(translate()(Password));

