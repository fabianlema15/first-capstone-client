import { Input, Textarea, Select, File, ColoredLine } from './FormElements'
import React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<FormElements />', () => {
  it('renders Input without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Input/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders Input as expected', () => {
	  const wrapper = shallow(<Input/>);
	  expect(toJson(wrapper)).toMatchSnapshot();
	  });

    it('renders Textarea without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
        <Textarea/>, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('Renders Textarea as expected', () => {
  	  const wrapper = shallow(<Textarea/>);
  	  expect(toJson(wrapper)).toMatchSnapshot();
  	  });

      it('renders Select without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
          <Select/>, div);
        ReactDOM.unmountComponentAtNode(div);
      });

      it('Renders Select as expected', () => {
    	  const wrapper = shallow(<Select/>);
    	  expect(toJson(wrapper)).toMatchSnapshot();
    	  });

        it('renders File without crashing', () => {
          const div = document.createElement('div');
          ReactDOM.render(
            <File/>, div);
          ReactDOM.unmountComponentAtNode(div);
        });

        it('Renders File as expected', () => {
      	  const wrapper = shallow(<File/>);
      	  expect(toJson(wrapper)).toMatchSnapshot();
      	  });

          it('renders ColoredLine without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(
              <ColoredLine/>, div);
            ReactDOM.unmountComponentAtNode(div);
          });

          it('Renders ColoredLine as expected', () => {
        	  const wrapper = shallow(<ColoredLine/>);
        	  expect(toJson(wrapper)).toMatchSnapshot();
        	  });

})
