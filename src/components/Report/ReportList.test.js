import React from 'react';
import ReactDOM from 'react-dom';
import ReportList from './ReportList'
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<ReportList />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ReportList>
      </ReportList>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ReportList as expected', () => {
    const context = { objName: 'Test', orderList: {}};
	  const wrapper = shallow(<ReportList/>, { context });
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

})
