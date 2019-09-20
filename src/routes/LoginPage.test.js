import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <LoginPage>
      </LoginPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders LoginPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <LoginPage>
        </LoginPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
