import React from 'react';
import ReactDOM from 'react-dom';
import OrderProductItem from './OrderProductItem'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<OrderProductItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderProductItem obj={{}} objLabel={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders OrderProductItem as expected', () => {
	    const tree = renderer.create(<OrderProductItem obj={{}} objLabel={{}}/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<OrderProductItem obj={{}} objLabel={{}}/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
