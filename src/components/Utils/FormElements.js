import React, { Component } from 'react';
import './FormElements.css'

function Input({ className, label, idx, id, ...props }) {
  return (
    <div className='fieldset'>
      <label htmlFor={id}>
        {label}
      </label>
      <input id={id} required className={['Input', className].join(' ')} {...props} />
    </div>
  )
}

function Textarea({ className, label, idx, id, ...props }) {
  return (
    <div className='fieldset'>
      <label key={idx} htmlFor={id}>
        {label}
      </label>
      <textarea id={id} className={['Textarea', className].join(' ')} {...props} />
    </div>
  )
}

function Select({ className, label, idx, id, options=[], ...props }) {
  const getOptions = options.map(option => <option key={option.id} value={option.id}>{option.value}</option>)
  return (
    <div className='fieldset'>
      <label key={idx} htmlFor={id}>
        {label}
      </label>
      <select id={id} required className={['Textarea', className].join(' ')} {...props}>
        <option value=''>--SELECT ONE OPTION--</option>
        {getOptions}
      </select>
    </div>
  )
}

class File extends Component{
  ref = React.createRef();

  onClickButton() {
    this.ref.current.click();
  }

  render(){
    const { className, label, idx, id, buttonTitle, ...props } = this.props;
    return (
      <div className='fieldset'>
        <label key={idx} htmlFor={id}>
          {label}
          <input id={id} type="file" ref={this.ref} required accept=".png,.jpg,.jpeg" className={['PictureButton', className].join(' ')} {...props} />

        </label>
        <button type='button' className='green' onClick={() => this.onClickButton()}>{buttonTitle || 'Select Image'}</button>
      </div>
    )
  }
}

/*function File({ className, label, idx, id, buttonTitle, pictureAction, ...props }) {
  return (
    <fieldset>
    <label key={idx} htmlFor={id}>
      {label}
      <input id={id} type="file" ref={ref} required accept=".png,.jpg,.jpeg" className={['PictureButton', className].join(' ')} {...props} />
      <button type='button' className='green' onClick={pictureAction}>{buttonTitle || 'Select Image'}</button>
    </label>
    </fieldset>
  )
}*/

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);

export { Input, Textarea, Select, File, ColoredLine };
