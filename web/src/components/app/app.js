import React from 'react';
import { Switch } from 'react-router-dom';
import styles from './app.css';
import CustomRoute from '../customRoute';
// import SavedAccounts from '../savedAccounts';

import routes from '../../constants/routes';
// eslint-disable-next-line import/no-named-as-default

class App extends React.Component {
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
  //
  // componentDidMount() {
  //   this.markAsLoaded();
  // }

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
      <main className={`${styles.bodyWrapper}`} ref={(el) => { this.main = el; }}>
        <Switch>
          {
            this.state.loaded ?
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
            <div className={styles.mainBox}>
              <Switch>
                {
                  routesOutsideMainWrapper.map((route, key) => (
                    <CustomRoute
                      path={routes[route].path}
                      component={routes[route].component}
                      isPrivate={false}
                      exact={true}
                      key={key}/>
                  ))
                }
              </Switch>
            </div>
          }
        </Switch>
      </main>
    );
  }
}

export default App;
