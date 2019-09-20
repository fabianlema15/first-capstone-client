import React from 'react';
import Form from '../Utils/Form'
import GenericContext from '../../contexts/GenericContext'

class GenericSubNew extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (e) => {
    this.context.showHideSubForm(false);
  }

  render(){
    return <Form type={`Add Product`} elements={this.context.getSubObjArray} actionSubmit={this.context.submitSubNew} actionCancel={this.cancelSubmit} />
  }
}

export default GenericSubNew;
