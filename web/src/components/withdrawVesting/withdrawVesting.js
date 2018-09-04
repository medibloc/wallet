import React from 'react';
import { fromRawMed } from '../../../../common/src/utils/med';
import { PrimaryButton } from './../toolbox/buttons/button';
import Converter from '../converter';
import MedAmount from '../medAmount';
import { Input } from '../toolbox/inputs/input';
import styles from './withdrawVesting.css';
import regex from './../../../../common/src/utils/regex';
import { extractAddress, getPrivKeyFromEncKey, getPubKey } from '../../../../common/src/utils/account';

class WithdrawVesting extends React.Component {
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
    }
    return undefined;
  }

  getMaxAmount() {
    return fromRawMed(Math.max(0, this.props.account.vesting));
  }

  render() {
    const { t } = this.props;

    return (
      <div className={`${styles.withdrawVestingWrapper}`}>
        <div className={`${styles.bodyWrapper}`}>
          <div className={styles.vestingWrapper}>
            <h6 className={styles.vestingHeader}>
              {t('Staking MED')}
            </h6>
            <h4 className={styles.vesting}>
              <MedAmount val={this.props.account.vesting}/>
            </h4>
          </div>
          <form className={styles.form}>
            <Converter
              autoFocus={true}
              error={this.state.amount.error}
              placeholder={t('Amount for unstaking')}
              onChange={(...args) => this.handleChange('amount', ...args)}
              parentclassname={`${styles.amount}`}
              t={t}
              theme={styles}
              title={t('Unstaking')}
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
            <small>{t('Staking MED will be convert into balance after 7 days.')}</small>
            <PrimaryButton
              className={`withdraw-vesting-complete-button ${styles.completeButton}`}
              disabled={(!!this.state.amount.error ||
                !this.state.amount.value ||
                !this.state.password)}
              label={t('Complete')}
              onClick={() => {
                const privKey = this.decryptPassphrase();
                if (privKey !== null) {
                  const nonce = Number(this.props.account.nonce) + 1;
                  this.props.withdrewVesting({
                    activePeer: this.props.peers.activePeer,
                    address: this.props.account.address,
                    amount: this.state.amount.value,
                    nonce,
                    privKey,
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

export default WithdrawVesting;
