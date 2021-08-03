import React from 'react';
import { translate } from 'react-i18next';
import { Input } from '../../../atoms/toolbox/inputs/input';
import { PrimaryButton } from '../../../atoms/toolbox/buttons/button';
import styles from './backupWalletPasswordStep.css';
import {
  getAddressFromPrivateKey, getPrivateKeyFromKeyStore,
} from '../../../../utils/account';

const download = (filename, text) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
};

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
          value: this.props.prevState.password || this.state.password.value,
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
          error: this.props.t('You entered a wrong password. Please check again.'),
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
              label={t('Download')}
              onClick={() => {
                const privKey = this.decryptPassphrase();
                if (privKey !== null) {
                  const keyStore = this.props.account.encKey;
                  const filename = `${this.props.account.address}.txt`;
                  download(filename, JSON.stringify(keyStore));
                  this.props.nextStep();
                }
              }}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default translate()(BackupWalletPasswordStep);
