import React from 'react';
import ReactDOM from 'react-dom';
import PromotionPage from './PromotionPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<PromotionPage />', () => {
  it('renders without crashing', () => {
    const value = {}
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <PromotionPage>
      </PromotionPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders PromotionPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <PromotionPage>
        </PromotionPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
