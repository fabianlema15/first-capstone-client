import React from 'react';
import GenericNew from '../Generic/GenericNew';
import OrderList from '../Order/OrderList';
import GenericContext from '../../contexts/GenericContext'
import { Textarea, Select } from '../Utils/FormElements';
import Header from '../Header/Header'

class OrderDetail extends React.Component{
  static contextType = GenericContext;

  state = {
    subtotal: 0,
    tax: 0,
    total: 0,
    observation: '',
    client_id: ''
  }

  componentDidMount() {
    this.context.clearError()
    this.context.getAll()
  }

  handleInputChange = e => {
    const input = e.target.id;
    const value = e.target.value;
    this.setState({
      [input]: value
    })
  }

  submitNewOrder = (e) => {
    const newOrderDetail = {
      client_id: this.state.client_id,
      subtotal: this.state.subtotal,
      tax: this.state.tax,
      total: this.state.total,
      observation: this.state.observation,
    }
    this.context.submitNewOrder(newOrderDetail)
  }

  render(){
    return <div>
      <Header back='/orders' />
    <main className='content-with-nav'>
        <section>
          <Select id='client_id' value={this.context.currentOrder?this.context.currentOrder.client_id:this.state.client_id} label='Client' onChange={this.handleInputChange} options={this.context.getClientsObj}/>
          <Textarea id='observation' value={this.state.observation} label='Observation' onChange={this.handleInputChange}/>
          {!this.context.currentOrder && <button className='blue' onClick={this.submitNewOrder}>Create and Save</button>}
          {(!this.context.showForm && this.context.currentOrder) && <div>
              <button className='green' onClick={e => this.context.showHideForm(!this.context.showForm, 1)}>Add Product</button>
              <button className='green' onClick={e => this.context.showHideForm(!this.context.showForm, 2)}>Add Promotion</button>
            </div>}
        </section>
        {this.context.error && <section><div className='errorMsg'>{this.context.error}</div></section>}
        {this.context.showForm && <section><GenericNew /></section>}
        <section>
          {(Object.keys(this.context.objList).length > 0 || Object.keys(this.context.objListAux).length > 0) ? <div>
            <OrderList/>
          <OrderList objList={this.context.objListAux}/></div> : 'You still have no products added'}

        </section>
        <section>
          <div className="item-description">
              <div><span>Subtotal:</span></div><div>{this.context.currentOrder?this.context.currentOrder.subtotal:'0'}</div>
              <div><span>Tax:</span></div><div>{this.context.currentOrder?this.context.currentOrder.tax:'0'}</div>
              <div><span>Total:</span></div><div>{this.context.currentOrder?this.context.currentOrder.total:'0'}</div>
           </div>
        </section>
      </main>
    </div>
  }
}

export default OrderDetail;
