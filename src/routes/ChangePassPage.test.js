import React from 'react';
import ReactDOM from 'react-dom';
import ChangePassPage from './ChangePassPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<ChangePassPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <ChangePassPage>
      </ChangePassPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ChangePassPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <ChangePassPage>
        </ChangePassPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
