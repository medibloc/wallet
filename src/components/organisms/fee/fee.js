import React from 'react';
import { toRawMed } from '../../../utils/med';
import { PrimaryButton } from '../../atoms/toolbox/buttons/button';
import Converter from '../../molecules/converter/index';
import MedAmount from '../../atoms/medAmount/index';
import styles from './fee.css';
import regex from '../../../utils/regex';

class Fee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: {
        value: this.props.fee || '',
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
      };
      this.setState(newState);
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
    this.props.changeDefaultFee(this.state.amount.value);
    this.props.closePopUp();
  }

  validateInput(name, value) {
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return name === 'amount' ? this.props.t('Invalid amount') : null;
    }
    return undefined;
  }

  render() {
    const { t } = this.props;

    return (
      <div className={`${styles.feeWrapper}`}>
        <div className={`${styles.bodyWrapper}`}>
          <div className={styles.balanceWrapper}>
            <h6 className={styles.balanceHeader}>
              {t('Current Fee')}
            </h6>
            <h4 className={styles.balance}>
              <MedAmount val={toRawMed(this.props.fee)}/> MED
            </h4>
          </div>
          <form className={styles.form}>
            <Converter
              autoFocus={true}
              error={this.state.amount.error}
              placeholder={t('Amount for transaction fee')}
              onChange={(...args) => this.handleChange('amount', ...args)}
              parentclassname={`${styles.amount}`}
              t={t}
              theme={styles}
              title={t('Transaction Fee')}
              value={this.state.amount.value}
            />
          </form>
          <footer className={`${styles.sendFooter}`}>
            <small>{t('Transaction will not be accepted if fee is too small')}</small>
            <PrimaryButton
              className={`vest-complete-button ${styles.nextButton}`}
              disabled={(!!this.state.amount.error ||
                !this.state.amount.value ||
                (this.props.loading && this.props.loading.length > 0))}
              label={t('Complete')}
              onClick={() => this.handleClick()}/>
          </footer>
        </div>
      </div>
    );
  }
}

export default Fee;
