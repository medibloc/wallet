import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import WBox from './index';

describe('WBox', () => {
  const props = {
    className: 'test',
  };
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<WBox {...props} ><span>text</span></WBox>);
  });

  it("Should className include 'test' and it should render child tags", () => {
    const expectedValue = /.*test$/;
    const reg = new RegExp(expectedValue);
    const className = wrapper.find('div').props().className;
    expect(reg.test(className)).to.be.equal(true);
  });

  it('Should render child tags', () => {
    expect(wrapper.find('span').html()).to.be.equal('<span>text</span>');
  });
});

