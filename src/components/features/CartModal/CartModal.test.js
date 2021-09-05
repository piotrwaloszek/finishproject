import React from 'react';
import { shallow } from 'enzyme';
import { CartModalComponent } from './CartModal';

describe('Component CartModal', () => {
  it('should render without crashing', () => {
    const component = shallow(<CartModalComponent />);
    expect(component).toBeTruthy();
  });
});
