import React from 'react';

class Report extends React.Component{
  render(){
    return <main role="main">
      <header role="banner">
        <h1>Dream Walker</h1>
        <h2>just imagine.</h2>
      </header>
      <section>
        <header>
            <h3>Reports</h3>
            <fieldset>
              <label forhtml="from">From</label>
              <select id="from">
                <option>08-20-2019</option>
              </select>
              <label forhtml="to">To</label>
              <select id="to">
                <option>09-15-2019</option>
              </select>
              <label forhtml="seller">Seller</label>
              <select id="seller">
                <option>Karen</option>
              </select>
              <button>Get Report</button>
            </fieldset>
        </header>
      </section>
      <section>
        <header>
            <h3>List of sales</h3>
        </header>
      </section>
      <section>
        <header>
            <h3>Totals by values</h3>
        </header>
      </section>

    </main>
  }
}

export default Report;
