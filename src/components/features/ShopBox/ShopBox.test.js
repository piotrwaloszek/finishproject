import React from 'react';
import { shallow } from 'enzyme';
import { ShopBoxComponent } from './ShopBox';

describe('Component ShopBox', () => {
  it('should render without crashing', () => {
    const component = shallow(<ShopBoxComponent />);
    expect(component).toBeTruthy();
  });
});
