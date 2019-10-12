import React from 'react';
import ReactDOM from 'react-dom';
import GenericList from './GenericList'
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<GenericList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GenericList>
      </GenericList>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders GenericList as expected', () => {
    const context = { objName: 'Test', objList: {}};
	  const wrapper = shallow(<GenericList/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
