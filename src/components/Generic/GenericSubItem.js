import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import { ColoredLine } from '../Utils/FormElements'

class GenericSubItem extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (id) => {
    this.context.setSelected(id, false);
  }

  getItemContent = () => {
    return Object.keys(this.props.objLabel).map((key, idx) => <div key={idx} className="item-description">
          <div><span>{this.props.objLabel[key].label}:</span></div> <div>{this.props.obj[key]}</div>
       </div>)
  }

  render(){
    return <div>
      <div>{this.getItemContent()}
      <button className='red' onClick={e => this.context.deleteSub(this.props.obj.id)}>Delete</button>
      </div>
      <ColoredLine color="gray" />
    </div>
  }
}

export default GenericSubItem;
