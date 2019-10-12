import Report from './Report'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Report />', () => {
  it('Renders Report as expected', () => {
    const clearError = () => {}
    const getAll = () => {}
    const context = { objName: 'Test', orderList:{}, objList: {}, clearError, getAll};
	  const wrapper = shallow(<BrowserRouter><Report/></BrowserRouter>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
