import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.css';
import CustomRoute from '../customRoute';
// import SavedAccounts from '../savedAccounts';
import LoadingBar from '../loadingBar';
import NotFound from '../notFound';
import NotSupportMobile from '../notSupportMobile';
import OfflineWrapper from '../offlineWrapper';
import Toaster from '../toaster';
import platforms from '../../../../common/src/constants/platforms';

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

  render() {
    if (navigator.platform && platforms.indexOf(navigator.platform.toLowerCase()) < 0) {
      return (
        <NotSupportMobile />
      );
    }

    const allRoutes = Object.values(routes);

    const defaultRoutes = allRoutes.filter(routeObj =>
      routeObj.component && !routeObj.pathPrefix && !routeObj.isLoaded);

    const routesOutsideMainWrapper = [
      'login',
      'register',
      'startPage',
      'restore',
    ];

    return (
      <OfflineWrapper>
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
            <Toaster />
          </main>
        </BrowserRouter>
        <LoadingBar markAsLoaded={() => this.markAsLoaded()} />
      </OfflineWrapper>
    );
  }
}

export default App;
