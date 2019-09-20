import React from 'react';
import GenericList from '../Generic/GenericList';
import GenericContext from '../../contexts/GenericContext'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'

class Order extends React.Component{
  static contextType = GenericContext;

  componentDidMount() {
    this.context.clearError()
    this.context.getAll()
  }

  render(){
    return <div>
      <Header />
    <main className='content-with-nav'>
        <section>
          <Link to='/orders/new'>Create New Order</Link>
        </section>
        <section>
          <GenericList/>
        </section>
      </main>
    </div>
  }
}

export default Order;
