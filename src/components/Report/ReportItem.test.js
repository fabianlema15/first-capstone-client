import React from 'react';
import ReactDOM from 'react-dom';
import ReportItem from './ReportItem'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json'
import Helper from '../Utils/Helper'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });


describe('<ReportItem />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ReportItem obj={{}} objLabel={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ReportItem as expected', () => {
	    const tree = renderer.create(<ReportItem obj={{}} objLabel={{}}/>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  it('With Context', () => {
    const context = { objName: 'Test', getObjArray: Helper.getProductArray()};
	  const wrapper = shallow(<ReportItem obj={{}} objLabel={{}}/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})

})
