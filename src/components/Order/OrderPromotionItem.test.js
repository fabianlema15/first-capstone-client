import React from 'react';
import ReactDOM from 'react-dom';
import OrderPromotionItem from './OrderPromotionItem'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<OrderPromotionItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderPromotionItem obj={{}} objLabel={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders OrderPromotionItem as expected', () => {
	    const tree = renderer.create(<OrderPromotionItem obj={{}} objLabel={{}}/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<OrderPromotionItem obj={{}} objLabel={{}}/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
