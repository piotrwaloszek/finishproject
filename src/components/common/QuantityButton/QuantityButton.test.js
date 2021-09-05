import React from 'react';
import { shallow } from 'enzyme';
import { QuantityButtonComponent } from './QuantityButton';

describe('Component QuantityButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<QuantityButtonComponent />);
    expect(component).toBeTruthy();
  });
});
