import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.css';
import CustomRoute from '../customRoute';
// import SavedAccounts from '../savedAccounts';
import NotFound from '../notFound';

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
      'login',
      'register',
      'startPage',
      'restore',
    ];

    return (
      <BrowserRouter>
        <main className={`${styles.bodyWrapper}`} ref={(el) => { this.main = el; }}>
          <Switch>
            {
              this.state.loaded ?
                defaultRoutes.map((route, key) => (
                  <CustomRoute
                    path={route.path}
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
            <Route path='*' component={NotFound} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
