import React from 'react';
import './style.scss';
import cx from 'classnames';

export const Button = ({ type = 'text', placeholder, children, rounded, onClick,
    circled, color = 'aqua', borderless, fullwidth }) => {
    return (
        <button
            className={cx({ "form-button": true, rounded, circled, [color]: true, borderless, fullwidth })}
            type={type} onClick={onClick}>
            {children}
        </button>
    );
}