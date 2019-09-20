import React from 'react';
import ReactDOM from 'react-dom';
import NotFoundPage from './NotFoundPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<NotFoundPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <NotFoundPage>
      </NotFoundPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders NotFoundPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <NotFoundPage>
        </NotFoundPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
