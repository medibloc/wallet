import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Account from './account';

describe('Account', () => {
  let props;

  beforeEach(() => {
    props = {
      t: key => key,
      i18n: {},
      store: {},
      onActivePeerUpdated: sinon.spy(),
      peers: {
        status: {
          online: false,
        },
        data: {
          currentPeer: 'localhost',
          port: 9921,
          options: {
            name: 'Custom Node',
          },
        },
      },
      account: {
        isDelegate: false,
        address: '022a3393c8054a1f93dbe4ba881d9eaa06919e8fba944800659d1b179a4707a7ff',
        username: 'medibloc',
        balance: 1e8,
      },
    };
  });

  // Should be updated once we know what happens with this component
  // Maybe it should be merged with the avatar or sidebar part, we don't know yet
  it.skip('should Address component', () => {
    const wrapper = shallow(<Account {...props} />);
    expect(wrapper.find('Address')).to.have.lengthOf(1);
  });

  // it('depicts being online when peers.status.online is true', () => {
  //   props.peers.status.online = true;
  //   const wrapper = shallow(<Account {...props} />);
  //   expect(wrapper.find('.status FontIcon')).to.have.className('online');
  // });
});
