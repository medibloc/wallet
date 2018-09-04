import React, { Fragment } from 'react';
// import { Route, Switch } from 'react-router-dom';
import { translate } from 'react-i18next';
import InlineSVG from 'svg-inline-react';
import styles from './vestSettings.css';
import CloseButton from '../../assets/images/icons/buttonX.svg';
import SettingsMenu from '../settingsMenu';
import WBox from '../wbox';
import Vest from '../vest';
import WithdrawVesting from '../withdrawVesting';

class VestSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'vest',
    };
  }

  setActiveSetting(active) {
    this.setState({ active });
  }

  render() {
    const { closePopUp, t } = this.props;
    const settings = [
      {
        id: 'vest',
        label: t('Staking'),
      },
      {
        id: 'withdrawVesting',
        label: t('Unstaking'),
      },
    ];

    return (
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
              </div>
              <div className={styles.settingsContentWrapper}>
                {
                  (this.state.active === settings[0].id) ?
                    <Vest {...this.props} /> : null
                }
                {
                  (this.state.active === settings[1].id) ?
                    <WithdrawVesting {...this.props} /> : null
                }
              </div>
            </WBox>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default translate()(VestSettings);
