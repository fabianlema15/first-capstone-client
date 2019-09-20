import React from 'react';
import ReactDOM from 'react-dom';
import OrderDetailPage from './OrderDetailPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<OrderDetailPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <OrderDetailPage>
      </OrderDetailPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders OrderDetailPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <OrderDetailPage>
        </OrderDetailPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
