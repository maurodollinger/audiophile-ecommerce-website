import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Modal = ({children, className, open, handleClose}) => {
  return ReactDOM.createPortal(
    <>
      <div className={`backdrop ${open ? 'open' : ''}`} onClick={handleClose}></div>
      <div className={`modal ${className} ${open ? 'open' : ''}`}>
        {children}
      </div>
    </>,
    document.getElementById('modal')
  );
};

Modal.propTypes ={
  children:PropTypes.node.isRequired
};

export default Modal;