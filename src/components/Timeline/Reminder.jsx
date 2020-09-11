import React, { useCallback, useState } from 'react';
import { convertInHours } from '../../utils/date';

export const Reminder = ({ reminder, setNextPosition, barHeight, position, onClick, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);

    const { color, time, title } = reminder;

    const startPos = time / 60 * barHeight;

    const reminderRef = useCallback(node => {
        if (node) {
            const { right } = node.getBoundingClientRect();
            if (position) {
                setNextPosition(right - 25);
                setIsVisible(true);
            }
        }
    }, [setNextPosition, position]);

    const style = {
        top: startPos + 'px',
        left: position + 'px',
        visibility: isVisible ? 'visible' : 'hidden',
        background: color,
    };

    return <div className="reminder"
        style={style} ref={reminderRef}
        onClick={onClick(reminder.id, 'reminder')}>
        <div className="remove-btn" onClick={onRemove(reminder.id)}>x</div>
        <span className="title">{title}</span><span>{convertInHours(time)}</span>
    </div>;
};