import React, { useState } from 'react';
import './style.scss';
import cx from 'classnames';

export const Checkbox = ({ onClick, isChecked }) => {
    const [checked, setChecked] = useState(isChecked);

    const onBoxClick = () => {
        if (onClick) {
            setChecked(!checked);
            onClick();
        }
    };

    return <div className={cx({ "checkbox": true, checked })} onClick={onBoxClick} />;
};