import React from 'react';
import ReactDOM from 'react-dom';
import GenericNew from './GenericNew'
import renderer from 'react-test-renderer';
//import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<GenericNew />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GenericNew/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders GenericNew as expected', () => {
	    const tree = renderer.create(<GenericNew/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<GenericNew/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
