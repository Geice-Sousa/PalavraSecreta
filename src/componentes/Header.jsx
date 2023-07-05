import React from 'react';
import '../styles/Components.css';
import { BsPatchQuestion } from 'react-icons/bs';

const Header = () => {
  return(
    <>
      <h1><BsPatchQuestion size={32} color="#129b4e"/> Descubra a palavra <BsPatchQuestion size={32} color="#129b4e"/></h1>
    </>
  )
}

export default Header;