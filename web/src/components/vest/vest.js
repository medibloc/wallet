import React from 'react';
import { fromRawMed } from '../../../../common/src/utils/med';
import { PrimaryButton } from './../toolbox/buttons/button';
import BN from '../../../../common/src/utils/bn';
import { MIN_BANDWIDTH_IN_MED } from '../../../../common/src/constants/bandwidth';
import Converter from '../converter';
import MedAmount from '../medAmount';
import { Input } from '../toolbox/inputs/input';
import styles from './vest.css';
import regex from './../../../../common/src/utils/regex';
import { extractAddress, getPrivKeyFromEncKey, getPubKey } from '../../../../common/src/utils/account';

class Vest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: {
        value: this.props.amount || '',
      },
      password: {
        value: this.props.password || '',
      },
    };
    this.inputValidationRegexps = {
      amount: regex.amount,
    };
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        amount: {
          value: this.props.prevState.amount || this.state.amount.value,
        },
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
  }

  validateInput(name, value) {
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return name === 'amount' ? this.props.t('Invalid amount') : null;
    } else if (name === 'amount' && value > parseFloat(this.getMaxAmount())) {
      return this.props.t('Not enough MED');
    } else if (name === 'amount' && value < this.getMinVesting()) {
      return this.props.t('At least 1 MED is required to staking');
    }
    return undefined;
  }

  getMaxAmount() {
    return fromRawMed(BN.max(0, this.props.account.balance));
  }

  // eslint-disable-next-line class-methods-use-this
  getMinVesting() {
    return MIN_BANDWIDTH_IN_MED;
  }

  render() {
    const { t } = this.props;

    return (
      <div className={`${styles.vestWrapper}`}>
        <div className={`${styles.bodyWrapper}`}>
          <div className={styles.balanceWrapper}>
            <h6 className={styles.balanceHeader}>
              {t('Available MED')}
            </h6>
            <h4 className={styles.balance}>
              <MedAmount val={this.props.account.balance}/>
            </h4>
          </div>
          <form className={styles.form}>
            <Converter
              autoFocus={true}
              error={this.state.amount.error}
              placeholder={t('Amount for staking')}
              onChange={(...args) => this.handleChange('amount', ...args)}
              parentclassname={`${styles.amount}`}
              t={t}
              theme={styles}
              title={t('Staking')}
              value={this.state.amount.value}
            />
            <div className={styles.passwordInputWrapper}>
              <Input
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
            <small>{t('Staking MED can be returned through unstaking.')}</small>
            <PrimaryButton
              className={`vest-complete-button ${styles.nextButton}`}
              disabled={(!!this.state.amount.error ||
                !this.state.amount.value ||
                !this.state.password.value ||
                (this.props.loading && this.props.loading.length > 0))}
              label={t('Complete')}
              onClick={() => {
                const privKey = this.decryptPassphrase();
                if (privKey !== null) {
                  const nonce = Number(this.props.account.nonce) + 1;
                  this.props.vested({
                    account: this.props.account,
                    activePeer: this.props.peers.activePeer,
                    amount: this.state.amount.value,
                    nonce,
                    password: this.state.password.value,
                  });
                  this.props.closePopUp();
                }
              }}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default Vest;
