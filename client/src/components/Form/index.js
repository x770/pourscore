import React from 'react';
import './style.css';

export function Input(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label} </label> <br />
      <input {...props} />
    </div>
  )
}

export function TextArea(props) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label} </label> <br />
      <textarea rows='5' cols='50' {...props} />
    </div>
  )
}

export function FormBtn(props) {
  return (
    <button {...props}>
      {props.children}
    </button>
  )
}