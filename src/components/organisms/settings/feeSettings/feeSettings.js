import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import InlineSVG from 'svg-inline-react';
import styles from './feeSettings.css';
import CloseButton from '../../../../assets/images/icons/buttonX.svg';
import SettingsMenu from '../settingsMenu/index';
import WBox from '../../../atoms/wbox/index';
import Fee from '../../fee/index';

class FeeSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'fee',
    };
  }

  setActiveSetting(active) {
    this.setState({ active });
  }

  render() {
    const { closePopUp, t } = this.props;
    const settings = [
      {
        id: 'fee',
        label: t('Fee'),
      },
    ];

    return (
      <Fragment>
        <div className={styles.relative}>
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
                    <h4>{ t('Fee Settings') }</h4>
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
                      <Fee {...this.props} /> : null
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

export default translate()(FeeSettings);
