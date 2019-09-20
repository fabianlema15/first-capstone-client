import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import GenericSubItem from './GenericSubItem';
import Helper from '../Utils/Helper'

class GenericList extends React.Component{
  static contextType = GenericContext;

  renderObjs() {
    const { objSubList = [] } = this.context
    return Object.keys(objSubList).map(key =>
      <GenericSubItem key={objSubList[key].id} obj={objSubList[key]} objLabel={Helper.serializeObj(this.context.getSubObjArray)}/>
    )
  }

  render(){
    return <div>
      {Object.keys(this.context.objSubList).length>0 ? this.renderObjs() : 'You still have no products added'}
    </div>
  }
}

export default GenericList;
