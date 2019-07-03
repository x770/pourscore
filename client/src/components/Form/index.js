import React from 'react';
import './style.css';

export function Input(props) {
  return (
    <div>
      <input {...props} />
    </div>
  )
}

export function TextArea(props) {
  return (
    <div>
      <textarea rows='20' {...props} />
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