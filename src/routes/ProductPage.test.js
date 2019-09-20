import React from 'react';
import ReactDOM from 'react-dom';
import ProductPage from './ProductPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('<ProductPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <ProductPage>
      </ProductPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ProductPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <ProductPage>
        </ProductPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

  /*it('The component opens a clicked section', () => {
	  const wrapper = shallow(<BrowserRouter>
      <ProductPage>
      </ProductPage>
    </BrowserRouter>);
	  wrapper.find('button').at(1).simulate('click');
    wrapper.setContext({ name: 'bar' });
	  expect(toJson(wrapper)).toMatchSnapshot();
	})*/

})
