import React from 'react';
import Form from '../Utils/Form'
import GenericContext from '../../contexts/GenericContext'

class PromotionNew extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (e) => {
    this.context.showHideForm(false);
  }

  render(){
    return <div>
      <Form type={`New ${this.context.objName}`} elements={this.context.getObjArray} actionSubmit={this.context.submitNew} actionCancel={this.cancelSubmit} obj={this.context.newProduct} readonly={true} isNew={true}/>

    </div>
  }
}

export default PromotionNew;
