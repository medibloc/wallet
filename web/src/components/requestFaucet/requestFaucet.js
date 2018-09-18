import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import axios from 'axios';
import InlineSVG from 'svg-inline-react';
import styles from './requestFaucet.css';
import CloseButton from '../../assets/images/icons/buttonX.svg';
import { Input } from '../toolbox/inputs/input';
import { PrimaryButton } from '../toolbox/buttons/button';
import FaucetFail from './faucetFail';
import FaucetSuccess from './faucetSuccess';
import PrivacyConsent from './privacyConsent';
import WBox from '../wbox/index';
import regex from '../../../../common/src/utils/regex';

class RequestFaucet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: this.props.account.address,
      email: {
        value: this.props.email || '',
      },
      // hasAgreed: false,
      isSuccess: false,
      sentRequest: false,
      showPrivacyConsent: false,
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
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        // success when the response code is 20X
        console.log(res);
        this.setState({
          sentRequest: true,
          isSuccess: true,
        });
      }).catch((err) => {
        console.log(err);
        this.setState({
          sentRequest: true,
          isSuccess: false,
        });
      });
    }
  }

  showConsentPage() {
    this.setState({
      showPrivacyConsent: true,
    });
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
      (!this.state.showPrivacyConsent ?
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
                    <h5>{t('Please confirm your email to receive MED for testnet.')}</h5>
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
                        autoFocus={true}
                        error={this.state.email.error}
                        placeholder={t('Enter your email.')}
                        onChange={(...args) => this.handleChange('email', ...args)}
                        parentclassname={`${styles.email}`}
                        theme={styles}
                        value={this.state.email.value}
                      />
                    </div>
                  </form>
                </div>
                <footer className={styles.sendFooter}>
                  <div className={styles.buttonWrapper}>
                    <PrimaryButton
                      className={'send-next-button'}
                      disabled={(!this.state.address ||
                        !!this.state.email.error ||
                        !this.state.email.value)}
                      label={t('Next')}
                      onClick={() => {
                        this.showConsentPage();
                      }}/>
                  </div>
                </footer>
              </WBox>
            </div>
          </div>
        </Fragment> :
        <PrivacyConsent
          closePopUp={this.props.closePopUp}
          sendFaucetRequest={() => this.sendFaucetRequest()}/>
      ) :
      (this.state.isSuccess ?
        <FaucetSuccess closePopUp={this.props.closePopUp}/> :
        <FaucetFail closePopUp={this.props.closePopUp}/>)
    );
  }
}

export default translate()(RequestFaucet);
