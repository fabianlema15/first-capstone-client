import React from 'react';
import ReactDOM from 'react-dom';
import GenericSubItem from './GenericSubItem'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<GenericSubItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GenericSubItem obj={{}} objLabel={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders GenericSubItem as expected', () => {
	    const tree = renderer.create(<GenericSubItem obj={{}} objLabel={{}}/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<GenericSubItem obj={{}} objLabel={{}}/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
