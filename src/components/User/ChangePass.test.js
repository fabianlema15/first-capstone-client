import ChangePass from './ChangePass'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<ChangePass />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <ChangePass>
      </ChangePass>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ChangePass as expected', () => {
    const clearError = () => {}
    const getAll = () => {}
    const context = { objName: 'Test', objList: {}, clearError, getAll};
	  const wrapper = shallow(<BrowserRouter><ChangePass/></BrowserRouter>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
