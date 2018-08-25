import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import InlineSVG from 'svg-inline-react';
import { Tab, Tabs as ToolboxTabs } from 'react-toolbox/lib/tabs';
// import Drawer from 'react-toolbox/lib/drawer';
// import MenuBar from '../menuBar';
import styles from './mainMenu.css';
import logo from '../../assets/images/main-menu-icons/homeCopy.png';
import * as menuLogos from '../../assets/images/main-menu-icons/*.svg'; //eslint-disable-line
// import { FontIcon } from '../fontIcon';
import routes from '../../constants/routes';

const getIndex = (history, tabs) => {
  if (history.location.pathname.includes('explorer')) return 3;

  let index = -1;
  tabs.map(t => new RegExp(`${t.route}(\\/?)`)).forEach((item, i) => {
    if (history.location.pathname.match(item)) {
      index = i;
    }
  });
  return index;
};

const isCurrent = (history, index, tabs) =>
  history.location.pathname.indexOf(tabs[index].route) === 6; // after: /main/

const TabTemplate = ({ img, label }) => (
  <div>
    <InlineSVG className={`${styles.tabImg}`} src={img}/>
    <small className={`${styles.tabLabel}`}>{label}</small>
  </div>
);


class MainMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      active: false,
      setting: false,
      index: 0,
    };
  }

  navigate(history, tabs, index) {
    if (!isCurrent(history, index, tabs)) {
      this.setState({ active: false, index });
      history.replace(tabs[index].route);
    }
  }

  render() {
    const { history, t, account } = this.props;
    const tabs = [
      {
        label: t('Dashboard'),
        route: `${routes.dashboard.path}`,
        id: 'dashboard',
        image: menuLogos.dashboard,
      },
      {
        label: t('Wallet'),
        route: `${routes.wallet.path}`,
        id: 'transactions',
        image: menuLogos.wallet,
      }, {
      //   label: t('Block Producer'),
      //   route: `${routes.blockProducer.path}`,
      //   id: 'bp',
      //   image: menuLogos.bp,
      // }, {
        label: t('Explorer'),
        route: `${routes.explorer.path}`,
        id: 'explorer',
        image: menuLogos.explorer,
      }, {
        label: t('Settings'),
        route: `${routes.setting.path}`,
        id: 'settings',
        image: menuLogos.settings,
      },
    ];

    const itemShouldBeDisabled = index =>
      (isCurrent(history, index, tabs) || !account.address) && index !== 3;

    return (
      <Fragment>
        <aside className={styles.aside}>
          <div className={styles.sideBarWrapper}>
            <img src={logo} className={styles.logo} />
            <ToolboxTabs
              className={`${styles.tabs} main-tabs`}
              disableAnimatedBottomBorder={true}
              index={getIndex(history, tabs)}
              onChange={(...args) => this.navigate(history, tabs, ...args)}
              theme={styles}
            >
              {tabs.map(({ id, image, label }, index) =>
                <Tab
                  activeClassName={styles.activeTab}
                  className={styles.tab}
                  disabled={itemShouldBeDisabled(index)}
                  id={id}
                  key={index}
                  label={<TabTemplate img={image} label={label} />}
                />)}
            </ToolboxTabs>
          </div>
        </aside>
      </Fragment>
    );
  }
}

export default MainMenu;
