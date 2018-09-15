import React, { Fragment } from 'react';
import { addMed, fromRawMed, lte, toRawMed, subMed } from '../../../../common/src/utils/med';
import { PrimaryButton } from './../toolbox/buttons/button';
import AutoVesting from '../autoVesting';
import BandwidthBar from '../bandwidthBar';
import Converter from '../converter';
import TransferTabs from '../transferTabs';
import { Input } from '../toolbox/inputs/input';
import styles from './sendWritable.css';
import regex from './../../../../common/src/utils/regex';

class SendWritable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoVesting: this.props.autoVesting || false,
      recipient: {
        value: this.props.address || '',
      },
      amount: {
        value: this.props.amount || '',
      },
      description: {
        value: this.props.description || '',
      },
      showAutoVesting: false,
      vestingAmount: this.props.vestingAmount || 0,
    };
    this.inputValidationRegexps = {
      recipient: regex.address,
      amount: regex.amount,
    };
  }

  calcVestingAmount(value) {
    return Math.min(Math.max(1,
      fromRawMed(subMed(this.props.account.balance, toRawMed(value))),
    ), 10);
  }

  componentDidMount() {
    if (this.props.prevState) {
      const newState = {
        recipient: {
          value: this.props.prevState.recipient || this.state.recipient.value,
        },
        amount: {
          value: this.props.prevState.amount || this.state.amount.value,
        },
        description: {
          description: this.props.prevState.description || this.state.description.value,
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
      vestingAmount: (name === 'amount') ? this.calcVestingAmount(value) : this.state.vestingAmount,
    });
  }

  // need 2 bandwidth for tx + 1 bandwidth for buffer
  isEnoughAmount(value) {
    return lte(toRawMed(value), this.props.account.balance) &&
      lte(addMed(toRawMed(value), toRawMed(3)),
        addMed(this.props.account.balance, this.props.account.bandwidth));
  }

  nextStepWithParam(autoVesting) {
    this.props.nextStep({
      amount: this.state.amount.value,
      autoVesting,
      description: this.state.description.value,
      recipient: this.state.recipient.value,
      vestingAmount: this.state.vestingAmount,
    });
  }

  // setVestingAmount(value) {
  //   this.setVestingAmount({
  //     vestingAmount: Math.max(1,
  //       fromRawMed(subMed(this.props.account.balance, toRawMed(this.state.amount.value))),
  //     ),
  //   });
  // }

  toggleAutoVesting() {
    this.setState({
      showAutoVesting: !this.state.showAutoVesting,
    });
  }

  validateInput(name, value) {
    if (name === 'description') {
      if (value.length > 50) {
        return this.props.t('Max length exceeded');
      }
      return undefined;
    }
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return name === 'amount' ? this.props.t('Invalid amount') : this.props.t('Invalid address');
    } else if (name === 'amount' && !this.isEnoughAmount(value)) {
      return this.props.t('Not enough MED(includes staking)');
    } else if (name === 'amount' && value === '0') {
      return this.props.t('Zero not allowed');
    }
    return undefined;
  }

  render() {
    const { setTabSend, t } = this.props;

    return (
      <Fragment>
        <div className={`${styles.sendWrapper}`}>
          <TransferTabs setTabSend={setTabSend} isActiveTabSend={true}/>
          <div className={`${styles.bodyWrapper}`}>
            <form className={styles.form}>
              <Converter
                autoFocus={this.props.autoFocus}
                error={this.state.amount.error}
                placeholder={t('Amount to send')}
                onChange={(...args) => this.handleChange('amount', ...args)}
                parentclassname={`${styles.amount}`}
                t={t}
                theme={styles}
                title={t('MED')}
                value={this.state.amount.value}
              />
              <Input
                error={this.state.recipient.error}
                placeholder={t('Paste or enter an address')}
                onChange={(...args) => this.handleChange('recipient', ...args)}
                parentclassname={`${styles.recipient}`}
                theme={styles}
                title={t('Recipient')}
                value={this.state.recipient.value}
              />
              <Input
                error={this.state.description.error}
                placeholder={t('Write message (optional)')}
                onChange={(...args) => this.handleChange('description', ...args)}
                parentclassname={`${styles.description}`}
                theme={styles}
                title={t('Description')}
                value={this.state.description.value}
              />
            </form>
            <footer className={`${styles.sendFooter}`}>
              <BandwidthBar t={t}/>
              <PrimaryButton
                className={`send-next-button ${styles.nextButton}`}
                disabled={(!!this.state.recipient.error ||
                        !this.state.recipient.value ||
                        !!this.state.amount.error ||
                        !this.state.amount.value ||
                        !!this.state.description.error)}
                label={t('Next')}
                onClick={() => {
                  if (lte(1, fromRawMed(this.props.account.bandwidth))) {
                    this.nextStepWithParam(false);
                  } else {
                    this.toggleAutoVesting();
                  }
                }}/>
            </footer>
          </div>
        </div>
        {
          this.state.showAutoVesting ?
            <AutoVesting
              closePopUp={() => this.toggleAutoVesting()}
              nextStep={() => this.nextStepWithParam(true)}
              vestingAmount={this.state.vestingAmount}/> : null
        }
      </Fragment>
    );
  }
}

export default SendWritable;
