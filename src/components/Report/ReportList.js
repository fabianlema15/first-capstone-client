import React from 'react';
import GenericContext from '../../contexts/GenericContext';
import ReportItem from './ReportItem';
import Helper from '../Utils/Helper'

class ReportList extends React.Component{
  static contextType = GenericContext;

  getItems = () => {
    const orderList = this.context.orderList;
    return Object.keys(orderList).map(key =>
      <ReportItem key={orderList[key].id} order={orderList[key]} objLabel={Helper.serializeObj(Helper.getOrdersArray())}/>
    )
  }

  render(){
    return <div>
      {Object.keys(this.context.orderList).length>0 ? this.getItems() : `You have no orders`}
    </div>
  }
}

export default ReportList;
