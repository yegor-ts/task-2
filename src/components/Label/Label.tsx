import React from 'react';
import './Label.css';

interface Props {
  name: string;
  children: React.ReactElement;
}

const Label: React.FC<Props> = (props) => {
  return (
    <label htmlFor={props.name} className='label form__label'>
      <h4 className='label__title'>{props.name}</h4>
      {props.children}
    </label>
  );
};

export default Label;
