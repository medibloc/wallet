import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import InlineSVG from 'svg-inline-react';
import styles from './settings.css';
import BackupWallet from '../backupWallet';
import CloseButton from '../../../assets/images/icons/buttonX.svg';
import ResetPassword from '../resetPassword/index';
import FormatWallet from '../formatWallet/index';
import SettingsMenu from './settingsMenu/index';
import WBox from '../../atoms/wbox/index';
import routes from '../../../constants/routes';
import Fee from '../fee';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'resetPassword',
    };
  }

  reset() {
    if (window.confirm('This will remove all data.\nAre you sure to reset all?')) {
      this.props.resetAll();
      this.props.history.push(`${routes.startPage.path}`);
    }
  }

  logOut() {
    this.props.history.push(`${routes.login.path}`);
    this.props.logOut();
  }

  setActiveSetting(active) {
    this.setState({ active });
  }

  render() {
    const { closePopUp, t } = this.props;
    const settings = [
      {
        id: 'resetPassword',
        label: t('Reset password'),
      },
      {
        id: 'backupWallet',
        label: t('Backup wallet'),
      },
      {
        id: 'fee',
        label: t('Fee'),
      },
      {
        id: 'formatWallet',
        label: t('Format wallet'),
      },
    ];

    return (
      <Fragment>
        <div className={styles.relative}>
          <div className={styles.wrapper}>
            <div className={styles.popupWrapper}>
              <header className={styles.closeWrapper}>
                <div className={styles.closeButtonWrapper}>
                  <InlineSVG
                    className={styles.closeButton}
                    onClick={() => closePopUp()}
                    src={CloseButton} />
                </div>
              </header>
              <WBox className={styles.settingsWrapper}>
                <div className={styles.settingsMenuWrapper}>
                  <div className={styles.menuHeader}>
                    <h4>{ t('Settings') }</h4>
                  </div>
                  <div className={styles.menuBody}>
                    <SettingsMenu
                      active={this.state.active}
                      setActiveSetting={(...args) => this.setActiveSetting(...args)}
                      settings={settings} />
                  </div>
                  <div className={styles.menuFooter}>
                    <h6 className={styles.logOutWrapper}
                      onClick={() => this.logOut()}>{ t('Log out') }</h6>
                  </div>
                </div>
                <div className={styles.settingsContentWrapper}>
                  {
                    (this.state.active === settings[0].id) ?
                      <ResetPassword {...this.props} /> : null
                  }
                  {
                    (settings.length > 1 && this.state.active === settings[1].id) ?
                      <BackupWallet {...this.props} /> : null
                  }
                  {
                    (settings.length > 2 && this.state.active === settings[2].id) ?
                      <Fee {...this.props} /> : null
                  }
                  {
                    (settings.length > 3 && this.state.active === settings[3].id) ?
                      <FormatWallet {...this.props} /> : null
                  }
                </div>
              </WBox>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default translate()(Settings);
