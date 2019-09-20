import React from 'react';
import ReactDOM from 'react-dom';
import ClientPage from './ClientPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<ClientPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <ClientPage>
      </ClientPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ClientPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <ClientPage>
        </ClientPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
