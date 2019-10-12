import React from 'react';
import ReactDOM from 'react-dom';
import PromotionNew from './PromotionNew'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<PromotionNew />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PromotionNew/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders PromotionNew as expected', () => {
	    const tree = renderer.create(<PromotionNew/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<PromotionNew/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
