import Client from './Client'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<Client />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <Client>
      </Client>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders Client as expected', () => {
    const clearError = () => {}
    const getAll = () => {}
    const context = { objName: 'Test', objList: {}, clearError, getAll};
	  const wrapper = shallow(<BrowserRouter><Client/></BrowserRouter>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
