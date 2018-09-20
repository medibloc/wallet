import React from 'react';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import Box from '../../box';
import Footer from '../../register/footer/footer';
import { PrimaryButton } from '../../toolbox/buttons/button';
import PassphraseInputBox from '../passphraseInputBox/passphraseinputbox';
import styles from './enter.css';

class Enter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passphrase: props.passphrase || '',
    };
    this.validators = {
      passphrase: this.validatePassphrase.bind(this),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  validatePassphrase(value, error) {
    const data = { passphrase: value };
    data.passphraseValidity = error || '';
    return data;
  }

  changeHandler(name, value, error) {
    const validator = this.validators[name] || (() => ({}));
    this.setState({
      [name]: value,
      ...validator(value, error),
    });
  }

  passFocused() {
    this.setState({
      passInputState: 'focused',
    });
  }

  render() {
    const { history, t, nextStep } = this.props;
    return (<Box className={`${styles.enter}`}>
      <header>
        <h2>{t('Save backup phrase')}</h2>
      </header>
      <div className={`${styles.comment}`}>
        <h6>{t('Since only you control your money, ' +
          'you’ll need to save your backup phrase in case this app is deleted')}</h6>
      </div>
      <PassphraseInputBox
        label={t('Enter your passphrase')}
        className={`${styles.passphrase}`}
        onFocus={() => this.passFocused()}
        theme={styles}
        error={this.state.passphraseValidity}
        value={this.state.passphrase}
        onChange={(...args) => this.changeHandler('passphrase', ...args)} />
      <PrimaryButton
        label={t('Sign in')}
        className={`${styles.nextButton}`}
        disabled={(!!this.state.passphraseValidity ||
          !this.state.passphrase)}
        onClick={() => nextStep({
          passphrase: this.state.passphrase,
        })}/>
      <Footer
        history={history}
        t={t}
        type={'restore'} />
    </Box>);
  }
}

export default withRouter(translate()(Enter));
