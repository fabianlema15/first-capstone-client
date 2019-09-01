import React from 'react';

class NewOrder extends React.Component{
  render(){
    return <main role="main">
      <header role="banner">
        <h1>Dream Walker</h1>
        <h2>just imagine.</h2>
      </header>
      <section>
        <header>
            <h3>New Order</h3>
            <fieldset>
              <label forhtml="client">Client</label>
              <select id="client">
                <option>Mark</option>
              </select>
            </fieldset>
        </header>
        <fieldset>
          <label forhtml="product">Product</label>
          <select id="product">
            <option>Product 1</option>
          </select>
          <label forhtml="quantity">Quantity</label>
          <input type="number" id="quantity"/>
        </fieldset>
        <button type='button'>Add Product</button>
      </section>
      <section>
        <header>
            <h3>List of product in the order</h3>
        </header>
      </section>
      <section>
        <header>
            <h3>Sum total of values</h3>
        </header>
      </section>
    </main>
  }
}

export default NewOrder;
