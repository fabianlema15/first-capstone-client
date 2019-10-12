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
    if (this.context.objName === 'Order Detail'){
      if (input==='product_id'){
        this.setState({
          [input]: value,
          quantity: 1,
          price: (1 * this.context.productsListOrder[value].price)
        })
      }else if (input==='promotion_id'){
        this.setState({
          [input]: value,
          quantity: 1,
          price: (1 * this.context.promotionsListOrder[value].price)
        })
      }else if (input==='quantity'){
        this.setState({
          [input]: value,
          price: (value * (this.context.productsListOrder[this.state.product_id] ? this.context.productsListOrder[this.state.product_id].price : this.context.promotionsListOrder[this.state.promotion_id].price))
        })
      }else if (input==='price'){
      }else{
        this.setState({
          [input]: value
        })
      }
    }else if (e.target.files){
      this.setState({
        image_title: e.target.files[0]?e.target.files[0].name:null
      })
    }else{
      this.setState({
        [input]: value
      })
    }
  }

  render() {
    const {type, elements, actionSubmit, actionCancel, obj, readonly=false, isNew=false} = this.props;
    const inputsJSX = elements? this.generateElements(elements, readonly) : ''

    return (
      <form onSubmit={actionSubmit}>
          <h3>{type}</h3>
          {obj && <input type='text' id='id' value={obj.id} readOnly hidden/>}
          <div className={isNew?'elements-form':''} >
          {inputsJSX}
          </div>
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
          returValue = element.type!=='decimal' ? <Input key={idx} id={element.id} value={valueElm} label={element.label} type={element.type} onChange={this.handleInputChange} readOnly={readOnly}/>
            : <Input key={idx} id={element.id} value={valueElm} label={element.label} type='number' step="0.01" onChange={this.handleInputChange} readOnly={readOnly}/>
          break;
        case 'textarea':
          returValue = <Textarea key={idx} id={element.id} value={valueElm} label={element.label} onChange={this.handleInputChange} readOnly={readOnly}/>
          break;
        case 'select':
          returValue = <Select key={idx} id={element.id} value={valueElm} label={element.label} onChange={this.handleInputChange} options={element.options} readOnly={readOnly}/>
          break;
        case 'file':
          returValue = <File key={idx} id={element.id} label={element.label} onChange={this.handleInputChange} readOnly={readOnly} buttonTitle={this.state.image_title}/>
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
