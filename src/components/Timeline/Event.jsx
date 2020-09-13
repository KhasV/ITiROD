import React, { useCallback, useState } from 'react';
import { convertInHours } from '../../utils/date';

export const Event = ({ event, barHeight, position, setNextPosition, onClick, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const eventRef = useCallback(node => {
        if (node) {
            const { right } = node.getBoundingClientRect();
            if (position) {
                setNextPosition(right - 25);
                setIsVisible(true);
            }
        }
    }, [position, setNextPosition]);

    const { title, startTime, endTime, color } = event;

    const startPos = startTime / 60 * barHeight;
    const endPos = endTime / 60 * barHeight;
    const style = {
        top: startPos + 'px',
        left: position + 'px',
        height: endPos - startPos + 'px',
        background: color,
        visibility: isVisible ? 'visible' : 'hidden',
    };

    return <div className="event" style={style} ref={eventRef} onClick={onClick(event.id, 'event')}>
        <div className="remove-btn" onClick={onRemove(event.id)}>x</div>
        <div className="title">{title}</div>
        <div>{convertInHours(startTime)} - {convertInHours(endTime)}</div>
    </div>;
};