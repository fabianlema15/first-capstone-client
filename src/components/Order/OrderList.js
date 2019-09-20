import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import OrderProductItem from './OrderProductItem';
import OrderPromotionItem from './OrderPromotionItem';
import Helper from '../Utils/Helper'

class OrderList extends React.Component{
  static contextType = GenericContext;

  renderObjs() {
    let objList = [];
    if (!this.props.objList){
      objList = this.context.objList
      return Object.keys(objList).map(key =>
        <OrderProductItem key={objList[key].id} obj={objList[key]} objLabel={Helper.serializeObj(this.context.getObjArrayProd)}/>
      )
    }else{
      objList = this.props.objList
      return Object.keys(objList).map(key =>
        <OrderPromotionItem key={objList[key].id} obj={objList[key]} objLabel={Helper.serializeObj(this.context.getObjArrayProm)}/>
      )
    }

  }

  render(){
    return <div>
            {this.renderObjs()}
    </div>
  }
}

export default OrderList;
