import React from 'react';
import GenericContext from '../../contexts/GenericContext'
import Form from '../Utils/Form'
import { ColoredLine } from '../Utils/FormElements'
import config from '../../config'


class GenericItem extends React.Component{
  static contextType = GenericContext;

  cancelSubmit = (id) => {
    this.context.setSelected(id, false);
  }

  createText = (key) => {
    let text = this.props.obj[key];
    if (key==='client_id')
      text = this.props.obj.client.full_name
    return text;
  }

  getItemContent = (classDiv = 'item-description') => {
    return Object.keys(this.props.objLabel).map((key, idx) => key!=='picture' ? <div key={idx} className={classDiv}>
          <div><span>{this.props.objLabel[key].label}:</span>
          </div> <div>{this.createText(key)}</div>
       </div> : '')
  }

  render(){
    return <div>
      {this.props.obj.selected ? <Form type={`Edit ${this.context.objName}`} elements={this.context.getObjArray} obj={this.props.obj} actionSubmit={this.context.submitEdit} actionCancel={this.cancelSubmit} /> :
        <div>
        {(this.context.objName==='Product' || this.context.objName==='Promotion') ? <div className='div-w-picture'>
          <div className='div-picture'><img src={`${config.API_PUBLIC}/${this.props.obj.picture}`} alt='Hello'/></div>
          <div className='div-content'>{this.getItemContent('item-description-p')}
          <button className='red' onClick={e => this.context.delete(this.props.obj.id)}>Delete</button>
          <button className='green' onClick={e => this.context.setSelected(this.props.obj.id)}>Edit</button>
          </div>
        </div> : <div>
          {this.getItemContent()}
          <button className='red' onClick={e => this.context.delete(this.props.obj.id)}>Delete</button>
          <button className='green' onClick={e => this.context.setSelected(this.props.obj.id)}>Edit</button>
        </div>}
        </div>
      }
      <ColoredLine color="gray" />
    </div>
  }
}

export default GenericItem;
