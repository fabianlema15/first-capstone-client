import React from 'react';
import ReactDOM from 'react-dom';
import OrderPage from './OrderPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<OrderPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <OrderPage>
      </OrderPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders OrderPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <OrderPage>
        </OrderPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
