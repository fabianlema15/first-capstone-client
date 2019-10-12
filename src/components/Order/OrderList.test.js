import React from 'react';
import ReactDOM from 'react-dom';
import OrderList from './OrderList'
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<OrderList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <OrderList objList={{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders OrderList as expected', () => {
    const context = { objName: 'Test', objList: {}};
	  const wrapper = shallow(<OrderList objList={{}}/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
