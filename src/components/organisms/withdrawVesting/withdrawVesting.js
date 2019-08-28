import React from 'react';
import { fromRawMed, subMed } from '../../../utils/med';
import actionTypes from '../../../constants/actions';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import BN from '../../../utils/bn';
import { BANDWIDTH_USED_TX } from '../../../constants/bandwidth';
import Converter from '../../molecules/converter/index';
import MedAmount from '../../atoms/medAmount/index';
import { Input } from '../../atoms/toolbox/inputs/input';
import styles from './withdrawVesting.css';
import regex from '../../../utils/regex';

class WithdrawVesting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: {
        value: this.props.amount || '',
      },
      sent: false,
      password: {
        value: this.props.password || '',
      },
      passwordCorrected: false,
      passwordFailed: false,
      requestSucceeded: false,
      requestFailed: false,
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

  componentDidUpdate(prevProps) {
    if (this.state.sent && !this.props.account.passwordVerifying &&
      prevProps.account.passwordVerifying) {
      if (this.props.account.passwordValidity) {
        this.setState({ passwordCorrected: true });
      } else {
        this.setState({ passwordFailed: true });
      }
    }

    // TODO: check failed transaction
    if (this.state.sent && (!this.props.loading ||
      !(this.props.loading.includes(actionTypes.requestWithdrawVestingTransaction))) &&
      (prevProps.loading && prevProps.loading.length > 0 &&
        (prevProps.loading.includes(actionTypes.requestWithdrawVestingTransaction)))) {
      this.setState({ requestSuccess: true });
    }

    if (this.state.passwordFailed) {
      this.initRequestState();
      this.setState({
        password: {
          ...this.state.password,
          error: this.props.t('Wrong Password'),
        },
      });
    }

    if (this.state.passwordCorrected && this.state.requestSuccess) {
      this.props.closePopUp();
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

  handleClick() {
    const nonce = Number(this.props.account.nonce) + 1;
    this.setState({ sent: true });
    setTimeout(() => {
      this.props.withdrewVesting({
        account: this.props.account,
        activePeer: this.props.peers.activePeer,
        amount: this.state.amount.value,
        chainId: this.props.peers.chainId,
        nonce,
        password: this.state.password.value,
      });
    }, 500);
  }

  initRequestState() {
    this.setState({
      sent: false,
      passwordVerified: false,
      passwordFailed: false,
      requestSuccess: false,
      requestFailed: false,
    });
  }

  validateInput(name, value) {
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return name === 'amount' ? this.props.t('Invalid amount') : null;
    } else if (name === 'amount' && value > parseFloat(this.getMaxAmount())) {
      return this.props.t('Exceeded maximum unstaking amount');
    }
    return undefined;
  }

  getMaxAmount() {
    return fromRawMed(BN.max(0, subMed(this.props.account.staking, BANDWIDTH_USED_TX)));
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
              <MedAmount val={this.props.account.staking}/>
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
              price={this.props.price}
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
                !this.state.password.value ||
                (this.props.loading && this.props.loading.length > 0) ||
                this.state.sent)}
              label={t('Complete')}
              onClick={() => this.handleClick()}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default WithdrawVesting;
