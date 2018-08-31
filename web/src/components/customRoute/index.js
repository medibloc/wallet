import React, { Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import ErrorBoundary from '../errorBoundary';
import Header from '../header';
import MainMenu from '../mainMenu';
import offlineStyle from '../offlineWrapper/offlineWrapper.css';
import styles from './customRoute.css';

export const CustomRouteRender = ({ path, component, isPrivate, exact,
  isAuthenticated, pathSuffix = '', pathPrefix = '', t }) => {
  const fullPath = pathPrefix + path + pathSuffix;
  console.log(window.location);
  console.log(fullPath);
  return ((isPrivate && isAuthenticated) || !isPrivate ?
    <Fragment>
      <main className={isPrivate ? `${offlineStyle.disableWhenOffline} ${styles.mainWrapper}` : null}>
        <ErrorBoundary errorMessage={t('An error occoured while rendering this page')}>
          {isPrivate ?
            <section>
              <div className={`${styles.mainBox}`}>
                <Header/>
                <Route path={fullPath} component={component} exact={exact}/>
              </div>
            </section> :
            <div className={`${styles.publicMainBox}`}>
              <Route path={fullPath} component={component} exact={exact}/>
            </div>
          }
        </ErrorBoundary>
      </main>
      {isPrivate ? <MainMenu /> : null}
    </Fragment>
    : null
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.account.address,
});

export default withRouter(connect(mapStateToProps)(translate()(CustomRouteRender)));
