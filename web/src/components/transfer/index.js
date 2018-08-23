import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
// import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Send from '../send';
import WBox from '../wbox';
import styles from './transfer.css';

// const TabTemplate = ({ label }) => (
//   <div className={`${styles.tabLabelWrapper}`}>
//     <small className={`${styles.tabLabel}`}>{label}</small>
//   </div>
// );

class Transfer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  // handleTabChange(index) {
  //   console.log(`tab ${index} clicked!`);
  //   this.setState({ index });
  // }

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <WBox className={styles.wrapper}>
          <div className={styles.headerWrapper}>
            <h4>{t('Transfer')}</h4>
          </div>
          <div className={styles.bodyWrapper}>
            <Send {...this.props} />
          </div>
        </WBox>
      </Fragment>
    );
  }
}

/*
  <Tabs className={`${styles.tabs} transfer-tabs`}
    disableAnimatedBottomBorder={true}
    index={this.state.index}
    theme={styles}
    onChange={(...args) => this.handleTabChange(...args)} >
    <Tab
      active={true}
      activeClassName={styles.activeTab}
      className={styles.tab}
      id={'send'}
      key={'send'}
      label={<TabTemplate label={t('Send')} />}
    >
      <Send {...this.props} />
    </Tab>
    <Tab
      activeClassName={styles.activeTab}
      className={styles.tab}
      disabled={true}
      id={'request'}
      key={'request'}
      label={<TabTemplate label={t('Request')} />}
    >
    </Tab>
  </Tabs>
 */

export default translate()(Transfer);
