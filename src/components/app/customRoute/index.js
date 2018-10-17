import React, { Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import ErrorBoundary from '../../organisms/errorBoundary/index';
import Header from '../../organisms/header/index';
import MainMenu from '../../organisms/mainMenu/index';
import offlineStyle from '../../atoms/offlineWrapper/offlineWrapper.css';
import styles from './customRoute.css';

export const CustomRouteRender = ({ path, component, isPrivate, exact,
  isAuthenticated, pathSuffix = '', pathPrefix = '', t }) => {
  const fullPath = pathPrefix + path + pathSuffix;
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
            <section>
              <div className={`${styles.publicMainBox}`}>
                <Route path={fullPath} component={component} exact={exact}/>
              </div>
            </section>
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
