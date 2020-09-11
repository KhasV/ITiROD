import React from 'react';
import './style.scss';
import cx from 'classnames';

export const CalendarCell = ({ day, active = true, onDayClick, hasEvent, hasReminder, hasTask }) => {
    
    let colorClass = '';

    if (hasEvent && hasReminder && hasTask) {
        colorClass = 'event-task-reminder';
    } else {
        if (hasEvent && hasReminder) { 
            colorClass = 'event-reminder';
        } else if (hasEvent && hasTask) {
            colorClass = 'event-task';
        } else if (hasTask && hasReminder) {
            colorClass = 'task-reminder';
        } else if (hasTask) {
            colorClass = 'task';
        } else if (hasReminder) {
            colorClass = 'reminder';
        } else if (hasEvent) {
            colorClass = 'event';
        }
    }
    
    return <div className={cx({ "calendar-cell": true, active, [colorClass]: true })} onClick={onDayClick}>
        <div className="cell-day">{day || ''}</div>
    </div>;
}