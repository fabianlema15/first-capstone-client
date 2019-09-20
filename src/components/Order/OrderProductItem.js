import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import Form from '../Utils/Form'
import { ColoredLine } from '../Utils/FormElements'

class OrderProductItem extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (id) => {
    this.context.setSelected(id, 1, false);
  }

  createText = (key) => {
    let text = this.props.obj[key];
    if (key==='product_id')
      text = this.props.obj.product.name
    return text;
  }

  getItemContent = () => {

    return Object.keys(this.props.objLabel).map((key, idx) => <div key={idx} className="item-description">
          <div><span>{this.props.objLabel[key].label}:</span></div> <div>{this.createText(key)}</div>
       </div>)
  }

  render(){
    return <div>
      {this.props.obj.selected ? <Form type={`Edit ${this.context.objName}`} elements={this.context.getObjArrayProd} obj={this.props.obj} actionSubmit={this.context.submitProductEdit} actionCancel={this.cancelSubmit} /> :
        <div>{this.getItemContent()}
        <button className='red' onClick={e => this.context.delete(this.props.obj.id, 1)}>Delete</button>
        </div>
      }
      <ColoredLine color="gray" />
    </div>
  }
}

export default OrderProductItem;
