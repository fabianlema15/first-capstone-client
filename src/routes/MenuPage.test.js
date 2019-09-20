import React from 'react';
import ReactDOM from 'react-dom';
import MenuPage from './MenuPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<MenuPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <MenuPage>
      </MenuPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders MenuPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <MenuPage>
        </MenuPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
