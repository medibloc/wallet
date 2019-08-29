import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { isMobile, isIE, browserVersion } from 'react-device-detect';
import styles from './app.css';
import CustomRoute from './customRoute/index';
import LoadingBar from '../molecules/loadingBar/index';
import NotFound from '../pages/notFound/index';
import NotSupportBrowser from '../pages/notSupportBrowser/index';
import NotSupportMobile from '../pages/notSupportMobile/index';
import OfflineWrapper from '../atoms/offlineWrapper/index';
import Toaster from '../molecules/toaster/index';

import routes from '../../constants/routes';

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
    const allRoutes = Object.values(routes);

    const defaultRoutes = allRoutes.filter(routeObj =>
      routeObj.component && !routeObj.pathPrefix && !routeObj.isLoaded);

    const routesOutsideMainWrapper = [
      'login',
      'register',
      'startPage',
      'restore',
    ];

    if (isMobile) return (<NotSupportMobile />);
    // TODO: test in IE
    else if (isIE && browserVersion < 10) return (<NotSupportBrowser />);
    return (
      <OfflineWrapper>
        <BrowserRouter>
          <main className={`${styles.bodyWrapper}`} ref={(el) => {
            this.main = el;
          }}>
            <Switch>
              {
                this.state.loaded ?
                  defaultRoutes.map((route, key) => (
                    <CustomRoute
                      path={route.path}
                      component={route.component}
                      isPrivate={route.isPrivate}
                      exact={route.exact}
                      key={key}/>
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
                    key={key}/>
                ))
              }
              <Route path='*' component={NotFound}/>
            </Switch>
            <Toaster/>
          </main>
        </BrowserRouter>
        <LoadingBar markAsLoaded={() => this.markAsLoaded()}/>
      </OfflineWrapper>);
  }
}

export default App;
