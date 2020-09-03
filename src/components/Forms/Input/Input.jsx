import React from 'react';
import './style.scss';
import cx from 'classnames';

export const Input = ({ type = 'text', placeholder, onChange, variant = 'primary', value }) => {
    return <input
        className={cx({ "form-input": true, [variant]: true })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
}