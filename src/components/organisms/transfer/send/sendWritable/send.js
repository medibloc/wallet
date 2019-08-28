import React, { Fragment } from 'react';
import { MIN_BANDWIDTH_IN_MED } from '../../../../../constants/bandwidth';
import BN from '../../../../../utils/bn';
import { fromRawMed, lte, toRawMed, subMed } from '../../../../../utils/med';
import { PrimaryButton } from '../../../../atoms/toolbox/buttons/button';
import AutoVesting from '../../../autoVesting/index';
import BandwidthBar from '../../../../molecules/bandwidthBar/index';
import Converter from '../../../../molecules/converter/index';
import EventRecipient from '../../../../molecules/eventRecipient/index';
import TransferTabs from '../../transferTabs/index';
import { Input } from '../../../../atoms/toolbox/inputs/input';
import styles from './sendWritable.css';
import regex from '../../../../../utils/regex';
import parseBalance from '../../../../../utils/balanceParser';
import { isAddress } from '../../../../../utils/account';

class SendWritable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
      fee: '10', // TODO @ggomma consider how to change this
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

  componentDidMount() {
    const { base } = parseBalance(this.props.account);
    this.setState({ balance: base });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.account.address !== this.props.account.address) {
      const { base } = parseBalance(this.props.account);
      this.setState({ balance: base });
    }
  }

  calcVestingAmount(value) {
    return Math.min(Math.max(1,
      fromRawMed(subMed(this.props.account.balance, toRawMed(value))),
    ), 10);
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
    return lte(toRawMed(value), toRawMed(subMed(this.state.balance, this.state.fee)));
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

  toggleAutoVesting() {
    this.setState({
      showAutoVesting: !this.state.showAutoVesting,
    });
  }

  toggleEventAddress() {
    const address = '0249a4b6e933581a50b90275017bab823835c925702b47a350deb60309087e132b';
    this.setState({
      recipient: {
        value: (this.state.recipient.value === address) ? '' : address,
      },
    });
  }

  validateInput(name, value) {
    if (name === 'description') {
      if (value.length > 50) {
        return this.props.t('Max length exceeded');
      }
      return '';
    }
    if (!value) {
      return this.props.t('Required');
    } else if (name === 'amount' && !value.match(this.inputValidationRegexps[name])) {
      return this.props.t('Invalid amount');
    } else if (name === 'amount' && !this.isEnoughAmount(value)) {
      return this.props.t('Not enough MED(includes staking)');
    } else if (name === 'amount' && value === '0') {
      return this.props.t('Zero not allowed');
    } else if (name === 'recipient' && !isAddress(value)) {
      return this.props.t('Invalid address');
    }
    return '';
  }

  render() {
    const { setTabSend, t } = this.props;
    // const balance = parseBalance(this.props.account);

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
                fee={this.state.fee}
              />
              <EventRecipient
                error={this.state.recipient.error}
                toggleEventAddress={() => this.toggleEventAddress()}
                placeholder={t('Paste or enter an address')}
                onChange={(...args) => this.handleChange('recipient', ...args)}
                parentclassname={`${styles.recipient}`}
                t={t}
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
                  if (BN.lte(MIN_BANDWIDTH_IN_MED,
                    fromRawMed(this.props.account.points))) {
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
