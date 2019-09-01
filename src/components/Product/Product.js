import React from 'react';

class Product extends React.Component{
  render(){
    return <main role="main">
      <header role="banner">
        <h1>Dream Walker</h1>
        <h2>just imagine.</h2>
      </header>
      <section>
        <header>
            <h3>New Product</h3>
            <fieldset>
              <label forhtml="name">Name</label>
              <input type="text" id="name"/><br/>
              <label forhtml="stock">Stock</label>
              <input type="number" id="stock"/>
              <label forhtml="price">Unit price</label>
              <input type="number" id="price"/>
              <button>Add Product</button>
            </fieldset>
        </header>

      </section>
      <section>
        <header>
            <h3>List of all products</h3>
        </header>
      </section>
    </main>
  }
}

export default Product;
