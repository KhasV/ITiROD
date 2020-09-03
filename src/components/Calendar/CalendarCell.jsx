import React from 'react';
import './style.scss';
import cx from 'classnames';

export const CalendarCell = ({ day, active = true, onDayClick, hasEvent, hasReminder, hasTask }) => {
    let colorClass = '';
    
    return <div className={cx({ "calendar-cell": true, active, [colorClass]: true })} onClick={onDayClick}>
        <div className="cell-day">{day || ''}</div>
    </div>;
}