import React from 'react';
import ReactDOM from 'react-dom';
import NotAccessPage from './NotAccess'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<NotAccessPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <NotAccessPage>
      </NotAccessPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders NotAccessPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <NotAccessPage>
        </NotAccessPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
