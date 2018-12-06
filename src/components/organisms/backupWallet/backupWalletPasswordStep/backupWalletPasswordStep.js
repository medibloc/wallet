import React from 'react';
import { translate } from 'react-i18next';
import { Input } from '../../../atoms/toolbox/inputs/input';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './backupWalletPasswordStep.css';
import {
  extractAddress,
  getPrivKeyFromEncKey,
  getPubKey,
} from '../../../../utils/account';
import { decryptData } from '../../../../utils/crypto';

class BackupWalletPasswordStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: {
        value: this.props.password || '',
      },
    };
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        password: {
          password: this.props.prevState.password || this.state.password.value,
        },
      };
      this.setState(newState);
    }
  }

  decryptPassphrase() {
    try {
      const privKey = getPrivKeyFromEncKey(this.props.account.encKey, this.state.password.value);
      if (extractAddress(getPubKey(privKey)) === this.props.account.address) {
        return privKey;
      }
      return null;
    } catch (e) {
      this.setState({
        password: {
          ...this.state.password,
          error: this.props.t('You entered a wrong password. Please check again.'),
        },
      });
      return null;
    }
  }

  failToRecoverPassphrase() {
    this.setState({
      password: {
        ...this.state.password,
        error: this.props.t('Sorry, failed to recover your passphrase.'),
      },
    });
  }

  handleChange(name, value, error) {
    this.setState({
      [name]: {
        value,
        error: typeof error === 'string' ? error : this.validateInput(name, value),
      },
    });
  }

  validatePassword(value) {
    if (!value) {
      return this.props.t('Required');
    }
    return undefined;
  }

  validateInput(name, value) {
    if (name === 'password') {
      return this.validatePassword(value);
    }
    return undefined;
  }

  render() {
    const { t } = this.props;
    return (
      <div className={`${styles.backupWalletWrapper}`}>
        <div className={`${styles.bodyWrapper}`}>
          <form className={styles.form}>
            <div className={styles.passwordInputWrapper}>
              <Input
                autoFocus={true}
                className={`${styles.passwordInput}`}
                error={this.state.password.error}
                onChange={(...args) => this.handleChange('password', ...args)}
                title={t('Password')}
                theme={styles}
                type={'password'}
                value={this.state.password.value}
              />
            </div>
          </form>
          <footer className={`${styles.sendFooter}`}>
            <PrimaryButton
              className={`backupWallet-next-button ${styles.nextButton}`}
              disabled={(!this.state.password.value)}
              label={t('Next')}
              onClick={() => {
                const privKey = this.decryptPassphrase();
                if (privKey !== null) {
                  const address = extractAddress(getPubKey(privKey));
                  if (this.props.account.address === address) {
                    const passphrase = decryptData(this.state.password.value,
                      this.props.account.encPassphrase);
                    if (passphrase) {
                      this.props.nextStep({ passphrase });
                    } else {
                      this.failToRecoverPassphrase();
                    }
                  }
                }
              }}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default translate()(BackupWalletPasswordStep);
