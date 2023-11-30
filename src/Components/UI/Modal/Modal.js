import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Card from '../Card/Card';

const Modal = ({children, className, open, handleClose}) => {
  return ReactDOM.createPortal(
    <>
      <div className={`backdrop ${open ? 'open' : ''}`} onClick={handleClose}></div>
      <Card className={`modal ${className} ${open ? 'open' : ''}`}>
        {children}
      </Card>
    </>,
    document.getElementById('modal')
  );
};

Modal.propTypes ={
  children:PropTypes.node.isRequired
};

export default Modal;