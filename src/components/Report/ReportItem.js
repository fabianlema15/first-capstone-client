import React from 'react';
import { ColoredLine } from '../Utils/FormElements'

class ReportItem extends React.Component{

  getItemContent = () => {
    return Object.keys(this.props.objLabel).map((key, idx) => <div key={idx} className="item-description">
          <div><span>{this.props.objLabel[key].label}:</span></div> <div>{this.props.order[key]}</div>
       </div>)
  }

  render(){
    return <div>
      <div>
        {this.getItemContent()}
      </div>
      <ColoredLine color="gray" />
    </div>
  }
}

export default ReportItem;
