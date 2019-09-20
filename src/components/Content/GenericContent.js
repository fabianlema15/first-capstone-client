import React from 'react';
import GenericNew from '../Generic/GenericNew';
import GenericList from '../Generic/GenericList';
import GenericContext from '../../contexts/GenericContext'

class GenericContent extends React.Component{
  static contextType = GenericContext;

  componentDidMount() {
    this.context.clearError()
    this.context.getAll()
  }

  render(){
    return <div>
      <div>{this.context.error}</div>
      {this.context.showForm && <GenericNew />}
      {!this.context.showForm && <button onClick={e => this.context.showHideForm(!this.context.showForm)}>Add</button>}
      <GenericList/>
    </div>
  }
}

export default GenericContent;
