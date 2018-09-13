import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import axios from 'axios';
import InlineSVG from 'svg-inline-react';
import styles from './requestFaucet.css';
import CheckBox from '../toolbox/checkbox/checkbox';
import CloseButton from '../../assets/images/icons/buttonX.svg';
import { Input } from '../toolbox/inputs/input';
import { PrimaryButton } from '../toolbox/buttons/button';
import FaucetFail from './faucetFail';
import FaucetSuccess from './faucetSuccess';
import WBox from '../wbox/index';
import regex from '../../../../common/src/utils/regex';

class RequestFaucet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAgreed: false,
      address: this.props.account.address,
      email: {
        value: this.props.email || '',
      },
      isSuccess: false,
      sentRequest: false,
    };

    this.inputValidationRegexps = {
      email: regex.email,
    };
  }

  handleChange(name, value, error) {
    if (name === 'email') {
      this.setState({
        [name]: {
          value,
          error: typeof error === 'string' ? error : this.validateInput(name, value),
        },
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  sendFaucetRequest() {
    if (!this.state.email.error) {
      axios.post('/faucetRequest', {
        address: this.state.address,
        mail: this.state.email.value,
      }).then((res) => {
        if (res.status === 200) {
          this.setState({
            sentRequest: true,
            isSuccess: true,
          });
        } else {
          this.setState({
            sentRequest: true,
            isSuccess: false,
          });
        }
      }).catch((err) => {
        console.log(err);
        this.props.closePopUp();
      });
    }
  }

  validateInput(name, value) {
    if (!value) {
      return this.props.t('Required');
    } else if (!value.match(this.inputValidationRegexps[name])) {
      return this.props.t('Invalid email');
    }
    return undefined;
  }

  render() {
    const { closePopUp, t } = this.props;
    // eslint-disable-next-line no-nested-ternary
    return (!this.state.sentRequest ?
      <Fragment>
        <div className={styles.wrapper}>
          <div className={styles.popupWrapper}>
            <div className={styles.closeWrapper}>
              <div className={styles.closeButtonWrapper}>
                <InlineSVG
                  className={styles.closeButton}
                  onClick={() => closePopUp()}
                  src={CloseButton} />
              </div>
            </div>
            <WBox className={styles.requestFaucetWrapper}>
              <div className={styles.headerWrapper}>
                <div className={styles.notice}>
                  <h5>{t('To get the testnet MED, you should confirm your email.')}</h5>
                </div>
              </div>
              <div className={styles.bodyWrapper}>
                <form>
                  <Input
                    disabled={true}
                    placeholder={t('Paste or enter an address')}
                    onChange={(...args) => this.handleChange('address', ...args)}
                    parentclassname={`${styles.address}`}
                    theme={styles}
                    title={t('My account')}
                    value={this.state.address}
                  />
                  <div className={`${styles.emailWrapper}`}>
                    <Input
                      error={this.state.email.error}
                      placeholder={t('Enter your email.')}
                      onChange={(...args) => this.handleChange('email', ...args)}
                      parentclassname={`${styles.email}`}
                      theme={styles}
                      value={this.state.email.value}
                    />
                  </div>
                  <CheckBox
                    checked={this.state.hasAgreed}
                    className={`${styles.consentBox}`}
                    label={t('I agree to MediBloc\'s terms and conditions and privacy policy.')}
                    onChange={(...args) => this.handleChange('hasAgreed', ...args)}
                  />
                </form>
              </div>
              <footer className={styles.sendFooter}>
                <div className={styles.buttonWrapper}>
                  <PrimaryButton
                    className={'send-next-button'}
                    disabled={(!this.state.address ||
                      !!this.state.email.error ||
                      !this.state.email.value ||
                      !this.state.hasAgreed)}
                    label={t('Send')}
                    onClick={() => {
                      this.sendFaucetRequest();
                    }}/>
                </div>
              </footer>
            </WBox>
          </div>
        </div>
      </Fragment> :
      (this.state.isSuccess ?
        <FaucetSuccess closePopUp={this.props.closePopUp}/> :
        <FaucetFail closePopUp={this.props.closePopUp}/>)
    );
  }
}

export default translate()(RequestFaucet);
