import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

export const Modal = ({ children, onClose }) => {
    return ReactDOM.createPortal(<div className="modal" onClick={onClose}>{children}</div>,
        document.getElementById('modal-root'));
};