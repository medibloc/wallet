import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import MultiStepNav from './multiStepNav';

describe('MultiStep Navigation', () => {
  const steps = [
    { props: { title: 'Title 1' } },
    { props: { title: 'Title 2' } },
    { props: { title: 'Title 3' } },
  ];

  it('Should not render backButton if showBackButton is not defined', () => {
    const wrapper = mount(<MultiStepNav steps={steps} />);
    expect(wrapper.find('div')).to.have.lengthOf(1);
    expect(wrapper.find('a')).to.have.lengthOf(0);
  });

  it('Should call prevStep if current is over 0 and backButton is clicked', () => {
    const props = {
      steps,
      showBackButton: true,
      prevPage: spy(),
      prevStep: spy(),
      current: 2,
    };

    const wrapper = mount(<MultiStepNav {...props} />);
    expect(wrapper.find('a')).to.have.lengthOf(1);
    wrapper.find('a').simulate('click');
    expect(props.prevStep).to.have.been.calledWith();
  });

  it('Should call prevPage if current is 0 and backButton is clicked', () => {
    const props = {
      steps,
      showBackButton: true,
      prevPage: spy(),
      prevStep: spy(),
      current: 0,
    };

    const wrapper = mount(<MultiStepNav {...props} />);
    expect(wrapper.find('a')).to.have.lengthOf(1);
    wrapper.find('a').simulate('click');
    expect(props.prevPage).to.have.been.calledWith();
  });
});
