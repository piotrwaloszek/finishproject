import React from 'react';
import { shallow } from 'enzyme';
import { RecommendationBoxComponent } from './RecommendationBox';

describe('Component RecommendationBox', () => {
  it('should render without crashing', () => {
    const component = shallow(<RecommendationBoxComponent />);
    expect(component).toBeTruthy();
  });
});
