import React from 'react';
import '../styles/Components.css';

const Button = ({onClick, children}) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button