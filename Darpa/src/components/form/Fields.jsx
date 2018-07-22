import React from 'react';

export const Checkbox = (props) => {
  const field = props.fieldData;
  const handler = props.fieldHandler;
  const name = props.fieldName;
  const setter = props.setter || [];
  return (
    <label className='field-grid_2'>
      <input type='checkbox'
        name={name}
        value={field.value}
        checked={setter.indexOf(field.value) >= 0}
        className='checkbox'
        onChange={handler} />{field.title}
    </label>
  );
}

export const Radio = (props) => {
  const field = props.fieldData;
  const handler = props.fieldHandler;
  const name = props.fieldName;
  const setter = props.setter;
  return (
    <label className='field-grid_2'>
      <input type='radio'
        name={name}
        value={field.value}
        className='checkbox'
        checked={setter === field.value}
        onChange={handler} />{field.title}
    </label>
  );
}

export const FieldText = (props) => {
  // const field = props.fieldData;
  const handler = props.fieldHandler;
  const name = props.fieldName;
  const setter = props.setter;
  return (
    <label className='field-grid'>
      <input type='text'
        name={name}
        value={setter}
        className='checkbox'
        onChange={handler} />
    </label>
  );
}

export const Select = (props) => {
  const field = props.fieldData;
  const handler = props.fieldHandler;
  const name = props.fieldName;
  // const setter = props.setter;
  return (
    <label className='field-grid'>
      <input type='checkbox' name={name} value='1' className='checkbox' onChange={handler} />{field.title}
    </label>
  );
}
