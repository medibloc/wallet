import React from 'react';
import { translate } from 'react-i18next';
import { Input } from '../../../atoms/toolbox/inputs/input';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './resetPasswordStep.css';
import regex from '../../../../utils/regex';
import {
  encryptPrivateKey,
  getAddressFromPrivateKey, getPrivateKeyFromKeyStore,
} from '../../../../utils/account';

class ResetPasswordStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: {
        value: this.props.password || '',
      },
      newPassword: {
        value: this.props.newPassword || '',
      },
      newConfirmPassword: {
        value: this.props.newConfirmPassword || '',
      },
    };
    this.inputValidationRegexps = {
      newPassword: regex.password,
      newConfirmPassword: regex.password,
    };
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        password: {
          value: this.props.prevState.password || this.state.password.value,
        },
        newPassword: {
          value: this.props.prevState.newPassword || this.state.newPassword.value,
        },
        newConfirmPassword: {
          value: this.props.prevState.newConfirmPassword || this.state.newConfirmPassword.value,
        },
      };
      this.setState(newState);
    }
  }

  async decryptPassphrase() {
    try {
      const privKey = getPrivateKeyFromKeyStore(
        this.props.account.encKey, this.state.password.value);
      if (await getAddressFromPrivateKey(privKey) === this.props.account.address) {
        return privKey;
      }
      return null;
    } catch (e) {
      this.setState({
        password: {
          ...this.state.password,
          error: this.props.t('Wrong Password'),
        },
      });
      return null;
    }
  }

  handleChange(name, value, error) {
    this.setState({
      [name]: {
        value,
        error: typeof error === 'string' ? error : this.validateInput(name, value),
      },
    });
    const newConfirmPasswordValue = this.state.newConfirmPassword.value;
    if (name === 'newPassword' && !!newConfirmPasswordValue && newConfirmPasswordValue !== '') {
      this.setState({
        newConfirmPassword: {
          value: newConfirmPasswordValue,
          error: this.validateNewConfirmPassword(newConfirmPasswordValue, value),
        },
      });
    }
  }

  validatePassword(value) {
    if (!value) {
      return this.props.t('Required');
    }
    return undefined;
  }

  validateNewPassword(value) {
    if (!value) {
      return this.props.t('Required');
    } else if (value.length < 8) {
      return this.props.t('Must be at least 8 characters');
    } else if (!value.match(this.inputValidationRegexps.newPassword)) {
      return this.props.t('Try a mix of lowercase letters, uppercase letters, and numbers');
    }
    return undefined;
  }

  validateNewConfirmPassword(value, newPasswordValue = this.state.newPassword.value) {
    if (!value) {
      return this.props.t('Required');
    }
    return newPasswordValue === value ? null : this.props.t('not matched with password');
  }

  validateInput(name, value) {
    if (name === 'password') {
      return this.validatePassword(value);
    } else if (name === 'newPassword') {
      return this.validateNewPassword(value);
    } else if (name === 'newConfirmPassword') {
      return this.validateNewConfirmPassword(value);
    }
    return undefined;
  }

  render() {
    const { t } = this.props;
    return (
      <div className={`${styles.resetPasswordStep}`}>
        <form className={styles.form}>
          <div className={styles.passwordInputWrapper}>
            <Input
              autoFocus={true}
              className={`${styles.passwordInput}`}
              error={this.state.password.error}
              onChange={(...args) => this.handleChange('password', ...args)}
              title={t('Current password')}
              theme={styles}
              type={'password'}
              value={this.state.password.value}
            />
          </div>
          <div className={styles.newPasswordInputWrapper}>
            <Input
              className={`${styles.newPasswordInput}`}
              error={this.state.newPassword.error}
              onChange={(...args) => this.handleChange('newPassword', ...args)}
              title={t('New password')}
              theme={styles}
              type={'password'}
              value={this.state.newPassword.value}
            />
          </div>
          <div className={styles.newConfirmPasswordInputWrapper}>
            <Input
              className={`${styles.newConfirmPasswordInput}`}
              error={this.state.newConfirmPassword.error}
              onChange={(...args) => this.handleChange('newConfirmPassword', ...args)}
              title={t('Confirm new password')}
              theme={styles}
              type={'password'}
              value={this.state.newConfirmPassword.value}
            />
          </div>
        </form>
        <footer className={`${styles.sendFooter}`}>
          <PrimaryButton
            className={`resetPassword-complete-button ${styles.nextButton}`}
            disabled={(!this.state.password.value ||
              !!this.state.newPassword.error ||
              !this.state.newPassword.value ||
              !!this.state.newConfirmPassword.error ||
              !this.state.newConfirmPassword.value)}
            label={t('Complete')}
            onClick={async () => {
              const privKey = await this.decryptPassphrase();
              if (privKey !== null) {
                const encKey = encryptPrivateKey(privKey, this.state.newPassword.value);
                // eslint-disable-next-line max-len
                const newPrivKey = getPrivateKeyFromKeyStore(encKey, this.state.newPassword.value);
                if (privKey === newPrivKey) {
                  this.props.activeAccountPasswordUpdated({
                    address: await getAddressFromPrivateKey(privKey),
                    encKey,
                    networkCode: this.props.account.networkCode,
                  });
                  this.props.nextStep();
                }
              }
            }}/>
        </footer>
      </div>
    );
  }
}

export default translate()(ResetPasswordStep);
