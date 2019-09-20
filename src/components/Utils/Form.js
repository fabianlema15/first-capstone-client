import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericContext from '../../contexts/GenericContext'
import { Input, Textarea, Select, File } from '../Utils/FormElements';

export default class Form extends Component {
  static contextType = GenericContext;

  static defaultProps = {
    type: '',
    inputs: []
  }

  state = {
    data: null
  }

  componentDidMount(){
    this.setState(this.props.obj)
  }

  handleInputChange = e => {
    if (this.context.error) this.context.clearError()
    const input = e.target.id;
    const value = e.target.value;
    //console.log(input, value)
    this.setState({
      [input]: value
    })
  }

  render() {
    const {type, elements, actionSubmit, actionCancel, obj, readonly=false} = this.props;
    const inputsJSX = this.generateElements(elements, readonly)

    return (
      <form onSubmit={actionSubmit}>
          <h3>{type}</h3>
          {obj && <input type='text' id='id' value={obj.id} readOnly hidden/>}
          {inputsJSX}
          {!readonly && <div>
            <button className='blue' type='submit'>Submit</button>
            <button className='orange' onClick={obj?()=>actionCancel(obj.id):actionCancel} type='button'>Cancel</button>
          </div> }
      </form>
    )
  }

  generateElements = (elements, readOnly) => {
    return elements.map((element, idx) => {
      let returValue;
      const valueElm = this.state[element.id] || '';
      switch (element.element) {
        case 'input':
          returValue = <Input key={idx} id={element.id} value={valueElm} label={element.label} type={element.type} onChange={this.handleInputChange} readOnly={readOnly}/>
          break;
        case 'textarea':
          returValue = <Textarea key={idx} id={element.id} value={valueElm} label={element.label} onChange={this.handleInputChange} readOnly={readOnly}/>
          break;
        case 'select':
          returValue = <Select key={idx} id={element.id} value={valueElm} label={element.label} onChange={this.handleInputChange} options={element.options} readOnly={readOnly}/>
          break;
        case 'file':
          returValue = <File key={idx} id={element.id} label={element.label} onChange={this.handleInputChange} readOnly={readOnly}/>
          break;
        default:
          returValue = <div></div>;

      }
      return returValue;
    })
  }
}

Form.propTypes = {
  type: PropTypes.string,
  inputs: PropTypes.arrayOf(PropTypes.string)
}
