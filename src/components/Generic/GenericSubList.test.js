import React from 'react';
import ReactDOM from 'react-dom';
import GenericSubList from './GenericSubList'
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<GenericSubList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <GenericSubList>
      </GenericSubList>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders GenericSubList as expected', () => {
    const context = { objName: 'Test', objSubList: {}};
	  const wrapper = shallow(<GenericSubList/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
