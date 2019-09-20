import React from 'react';
import ReactDOM from 'react-dom';
import ReportPage from './ReportPage'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

describe('<ReportPage />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
      <ReportPage>
      </ReportPage>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders ReportPage as expected', () => {
	    const tree = renderer.create(<BrowserRouter>
        <ReportPage>
        </ReportPage>
      </BrowserRouter>).toJSON();
	    expect(tree).toMatchSnapshot();
	  });

})
