import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import configureMockStore from 'redux-mock-store';
import i18n from '../../../i18n';
import Restore from './index';

describe('RestoreHOC', () => {
  let wrapper;
  const peers = {};
  const account = {};
  const store = configureMockStore([])({
    peers,
    account,
  });

  beforeEach(() => {
    wrapper = mount(<Provider store={store}>
      <Router>
        <I18nextProvider i18n={ i18n }>
          <Restore />
        </I18nextProvider>
      </Router>
    </Provider>);
  });

  it('should render Restore', () => {
    expect(wrapper).to.have.descendants('Restore');
  });
});
