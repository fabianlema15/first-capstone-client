import React from 'react';
import ReactDOM from 'react-dom';
import GenericSubNew from './GenericSubNew'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<GenericSubNew />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GenericSubNew/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders GenericSubNew as expected', () => {
	    const tree = renderer.create(<GenericSubNew/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<GenericSubNew/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
