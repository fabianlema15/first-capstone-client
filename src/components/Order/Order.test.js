import Order from './Order'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Order />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <Order>
      </Order>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders Order as expected', () => {
    const clearError = () => {}
    const getAll = () => {}
    const context = { objName: 'Test', objList: {}, clearError, getAll};
	  const wrapper = shallow(<BrowserRouter><Order/></BrowserRouter>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
