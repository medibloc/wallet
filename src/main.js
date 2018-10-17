import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import App from './components/app';
import store from './store';
import i18n from './i18n'; // initialized i18next instance
import env from './constants/env';
import ipcLocale from './utils/ipcLocale';

if (env.production) {
  ipcLocale.init(i18n);
}

const rootElement = document.getElementById('app');


const renderWithRouter = Component =>
  <Provider store={store}>
    <Router>
      <I18nextProvider i18n={ i18n }>
        <Component />
      </I18nextProvider>
    </Router>
  </Provider>;

ReactDOM.render(renderWithRouter(App), rootElement);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextRootContainer = require('./components/app').default;
    ReactDOM.render(renderWithRouter(NextRootContainer), rootElement);
  });
}
