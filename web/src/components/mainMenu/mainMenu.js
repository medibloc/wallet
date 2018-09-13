import React, { Fragment } from 'react';
import InlineSVG from 'svg-inline-react';
import { Tab, Tabs as ToolboxTabs } from 'react-toolbox/lib/tabs';
import RequestFaucet from '../requestFaucet';
import Settings from '../settings';
import styles from './mainMenu.css';
import logo from '../../assets/images/main-menu-icons/home.png';
import * as menuLogos from '../../assets/images/main-menu-icons/*.svg'; //eslint-disable-line
import routes from '../../constants/routes';

const getIndex = (history, tabs) => {
  let index = -1;
  tabs.map(t => new RegExp(`${t.route}(\\/?)`)).forEach((item, i) => {
    if (history.location.pathname.match(item)) {
      index = i;
    }
  });
  return index;
};

const isCurrent = (history, index, tabs) =>
  history.location.pathname.indexOf(tabs[index].route) === 0;

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
      showFaucetRequest: false,
      showSetting: false,
      index: 0,
    };
  }

  navigate(history, tabs, index) {
    if (!isCurrent(history, index, tabs)) {
      if (tabs[index].id === 'explorer') {
        if (window) {
          window.open('http://explorer.medibloc.org/');
        }
      } else {
        this.setState({ active: false, index });
        history.replace(tabs[index].route);
      }
    }
  }

  toggleFaucetRequest() {
    this.setState({
      showFaucetRequest: !this.state.showFaucetRequest,
    });
  }

  toggleSetting() {
    this.setState({
      showSetting: !this.state.showSetting,
    });
  }

  render() {
    const { history, t } = this.props;
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
      },
    ];

    const settingTab = {
      label: t('Settings'),
      id: 'settings',
      image: menuLogos.settings,
    };

    // const itemShouldBeDisabled = () => false

    return (
      <Fragment>
        <aside className={styles.aside}>
          <div className={styles.sideBarWrapper}>
            <div className={styles.logoWrapper}
              onClick={() => this.toggleFaucetRequest()}>
              <img src={logo} className={styles.logo} />
              <small>{t('Test MED')}</small>
            </div>
            <ToolboxTabs
              className={`${styles.tabs} main-tabs`}
              disableAnimatedBottomBorder={true}
              index={getIndex(history, tabs)}
              onChange={(...args) => this.navigate(history, tabs, ...args)}
              theme={styles}
            >p
              {tabs.map(({ id, image, label }, index) =>
                <Tab
                  activeClassName={styles.activeTab}
                  className={`${styles.tab} ${id === 'settings' ? styles.settingsTab : null}`}
                  // disabled={itemShouldBeDisabled(index)}
                  id={id}
                  key={index}
                  label={<TabTemplate img={image} label={label} />}
                />)}
            </ToolboxTabs>
            <div className={styles.bottomTabs}>
              <div className={styles.settingsTabWrapper}>
                <div className={`${styles.tab}`}
                  onClick={() => this.toggleSetting()}>
                  <TabTemplate
                    img={settingTab.image}
                    label={settingTab.label}/>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {
          this.state.showSetting ?
            <Settings
              {...this.props}
              closePopUp={() => this.toggleSetting()}/> : null
        }
        {
          this.state.showFaucetRequest ?
            <RequestFaucet
              {...this.props}
              closePopUp={() => this.toggleFaucetRequest()}
            /> : null
        }
      </Fragment>
    );
  }
}

export default MainMenu;
