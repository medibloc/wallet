import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './app.css';
import MainMenu from '../mainMenu';
import OfflineWrapper from '../offlineWrapper';
import CustomRoute from '../customRoute';
import Header from '../header';
// import SavedAccounts from '../savedAccounts';
import NotFound from '../notFound';

import routes from '../../constants/routes';
// eslint-disable-next-line import/no-named-as-default

class App_backup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  markAsLoaded() {
    this.main.classList.add(styles.loaded);
    this.main.classList.add('appLoaded');
    this.setState({ loaded: true });
  }

  componentDidMount() {
    this.markAsLoaded();
  }

  render() {
    const allRoutes = Object.values(routes);

    const defaultRoutes = allRoutes.filter(routeObj =>
      routeObj.component && !routeObj.pathPrefix && !routeObj.isLoaded);

    console.log(`defaultRoutes: ${(JSON.stringify(defaultRoutes))}`);

    const routesOutsideMainWrapper = [
      'register',
      // 'restoreAccount',
      'login',
    ];

    console.log(`routesOutsideMainWrapper: ${(JSON.stringify(routesOutsideMainWrapper))}`);

    return (
      <OfflineWrapper>
        <main className={`${styles.bodyWrapper}`} ref={(el) => { this.main = el; }}>
          {
            this.state.savedAccounts ? <MainMenu /> : null
          }
          <section>
            <div className={styles.mainBox}>
              <Header />
              <Switch>
                {this.state.loaded ?
                  defaultRoutes.map((route, key) => (
                    <CustomRoute
                      path={route.path}
                      pathSuffix={route.pathSuffix}
                      component={route.component}
                      isPrivate={route.isPrivate}
                      exact={route.exact}
                      key={key} />
                  ))
                  : null
                }

                {
                  routesOutsideMainWrapper.map((route, key) => (
                    <CustomRoute
                      path={routes[route].path}
                      component={routes[route].component}
                      isPrivate={false}
                      exact={true}
                      key={key} />
                  ))
                }
                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </section>
        </main>
      </OfflineWrapper>
    );
  }
}

export default App_backup;
