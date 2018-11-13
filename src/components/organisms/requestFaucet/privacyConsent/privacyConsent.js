import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import Checkbox from '../../../atoms/toolbox/checkbox/checkbox';
import { PrimaryButton, SecondaryButton } from '../../../atoms/toolbox/buttons/button';
import WBox from '../../../atoms/wbox/index';
import styles from './privacyConsent.css';

class PrivacyConsent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAgreed: false,
    };
  }

  handleChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { closePopUp, sendFaucetRequest, t } = this.props;
    return (
      <Fragment>
        <div className={styles.wrapper}>
          <WBox className={styles.privacyConsentWrapper}>
            <div className={styles.headerWrapper}>
              <div className={styles.notice}>
                <h5>{t('Consent to the Collection and Use of Personal Information for the Provision of Free Tokens by MediBloc Testnet')}</h5>
              </div>
            </div>
            <div className={styles.bodyWrapper}>
              <div className={styles.comment1}>
                <h5>{t('For the protection of your personal information, please read carefully the contents below on the collection and use of personal information and choose whether to agree.')
                  + t('MediBloc processes personal information as follows.')}
                </h5>
                <br/>
              </div>
              <div className={styles.comment2}>
                <span>{t('Item')}</span>
                <h5>{t('E-mail address, address of electronic wallet')}</h5>
                <br/>
              </div>
              <div className={styles.comment3}>
                <span>{t('Purpose of Processing')}</span>
                <h5>{t('Checking whether MediBloc Testnet tokens were applied for and provision of free tokens\n')}</h5>
                <br/>
              </div>
              <div className={styles.comment4}>
                <span>{t('Term of Retention\n')}</span>
                <h5>{t('Until provision of tokens is completed\n')}</h5>
                <br/>
              </div>
              <div className={styles.comment5}>
                <h5>{t('You have the right not to consent to the necessary minimum use of personal information as described above.')}</h5>
                <h5>{t('However, if you choose not to consent, there may be restrictions in being chosen as a subject, as the provision of tokens cannot be made.')}</h5>
                <br/>
              </div>
              <div className={`${styles.consentBoxWrapper}`}>
                <Checkbox
                  checked={this.state.hasAgreed}
                  className={`${styles.consentBox}`}
                  onChange={(...args) => this.handleChange('hasAgreed', ...args)}
                />
                <h5 className={styles.hasIndent}>
                  {t('I agree to the Collection and Use of Personal Information for the Provision of Free Tokens by MediBloc Testnet and') + t(' ')}
                  <a href='https://docs.medibloc.org/PrivacyPolicy_ENG.pdf' target={'_blank'}>{t('privacy policy')}</a>
                  {t('.')}
                </h5>
              </div>
            </div>
            <footer className={styles.sendFooter}>
              <div className={styles.buttonWrapper}>
                <SecondaryButton
                  className={styles.closeButton}
                  label={t('Cancel')}
                  onClick={() => closePopUp()}/>
                <PrimaryButton
                  className={styles.okButton}
                  disabled={!this.state.hasAgreed}
                  label={t('Agree')}
                  onClick={() => sendFaucetRequest()}/>
              </div>
            </footer>
          </WBox>
        </div>
      </Fragment>
    );
  }
}

export default translate()(PrivacyConsent);
