import RegularLogin from './RegularLogin'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<RegularLogin />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <RegularLogin>
      </RegularLogin>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders RegularLogin as expected', () => {
    const clearError = () => {}
    const getAll = () => {}
    const context = { objName: 'Test', objList: {}, clearError, getAll};
	  const wrapper = shallow(<BrowserRouter><RegularLogin/></BrowserRouter>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
