import React from 'react';
import ReactDOM from 'react-dom';
import ProductPage from './ProductPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

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

})
