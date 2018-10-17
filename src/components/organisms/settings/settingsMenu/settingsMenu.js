import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import styles from './settingsMenu.css';

class SettingsMenu extends React.Component {
  render() {
    const { active, setActiveSetting } = this.props;
    return (
      <Fragment>
        {this.props.settings.map(({ id, label }, index) =>
          <div className={`${styles.tab} ${active === id ? styles.activeTab : null}`}
            onClick={() => setActiveSetting(id)}
            key={index}>
            <h6>{label}</h6>
          </div>)}
      </Fragment>
    );
  }
}

export default translate()(SettingsMenu);
