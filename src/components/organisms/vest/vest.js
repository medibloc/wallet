import React from 'react';
import actionTypes from '../../../constants/actions';
import { fromRawMed } from '../../../utils/med';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import BN from '../../../utils/bn';
import { MIN_BANDWIDTH_IN_MED } from '../../../constants/bandwidth';
import Converter from '../../molecules/converter/index';
import MedAmount from '../../atoms/medAmount/index';
import { Input } from '../../atoms/toolbox/inputs/input';
import styles from './vest.css';
import regex from '../../../utils/regex';

class Vest extends React.Component {
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
      !(this.props.loading.includes(actionTypes.requestVestTransaction))) &&
      (prevProps.loading && prevProps.loading.length > 0 &&
        (prevProps.loading.includes(actionTypes.requestVestTransaction)))) {
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
      this.props.vested({
        account: this.props.account,
        activePeer: this.props.peers.activePeer,
        amount: this.state.amount.value,
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

export default Vest;
