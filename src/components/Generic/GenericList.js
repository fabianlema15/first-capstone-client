import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import GenericItem from './GenericItem';
import Helper from '../Utils/Helper'

class GenericList extends React.Component{
  static contextType = GenericContext;

  renderObjs() {
    const objList = this.context.objList;
    return Object.keys(objList).map(key =>
      <GenericItem key={objList[key].id} obj={objList[key]} objLabel={Helper.serializeObj(this.context.getObjArray)}/>
    )
  }

  render(){
    return <div>
            {Object.keys(this.context.objList).length>0 ? this.renderObjs() : `You still have no ${this.context.objName}s added`}
      </div>
  }
}

export default GenericList;
