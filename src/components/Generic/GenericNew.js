import React from 'react';
import Form from '../Utils/Form'
import GenericContext from '../../contexts/GenericContext'

class GenericNew extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (e) => {
    this.context.showHideForm(false);
  }

  render(){
    return <Form type={`New ${this.context.objName}`} elements={this.context.getObjArray} actionSubmit={this.context.submitNew} actionCancel={this.cancelSubmit} />
  }
}

export default GenericNew;
