import React from 'react';

function Input({ className, label, idx, id, ...props }) {
  return (
    <fieldset>
      <label htmlFor={id}>
        {label}
        <input id={id} required className={['Input', className].join(' ')} {...props} />
      </label>
    </fieldset>
  )
}

function Textarea({ className, label, idx, id, ...props }) {
  return (
    <fieldset>
    <label key={idx} htmlFor={id}>
      {label}
      <textarea id={id} className={['Textarea', className].join(' ')} {...props} />
    </label>
    </fieldset>
  )
}

function Select({ className, label, idx, id, options=[], ...props }) {
  const getOptions = options.map(option => <option key={option.id} value={option.id}>{option.value}</option>)
  return (
    <fieldset>
    <label key={idx} htmlFor={id}>
      {label}
      <select id={id} required className={['Textarea', className].join(' ')} {...props}>
        {getOptions}
      </select>
    </label>
    </fieldset>
  )
}

function File({ className, label, idx, id, ...props }) {
  return (
    <fieldset>
    <label key={idx} htmlFor={id}>
      {label}
      <input id={id} type="file" required accept=".png,.jpg,.jpeg" className={['Input', className].join(' ')} {...props} />
    </label>
    </fieldset>
  )
}

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
