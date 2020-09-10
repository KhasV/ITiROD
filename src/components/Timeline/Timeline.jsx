import React, { useEffect, useRef, useState, useCallback } from 'react';
import { formatHours, convertInterval, convertInMinutes } from '../../utils/date';
import './style.scss';
import { DAY_HOURS } from '../../constansts';

export const Timeline = ({ date }) => {
    const timestampRef = useRef();
    const [nextPosition, setNextPosition] = useState();
  
    useEffect(() => {
        if (nextPosition) {
            setPositions((positions) => [...positions, nextPosition]);
        }
    }, [nextPosition]);

    let timestamps = [
        <div className="timestamp" ref={timestampRef} key={0}>
            <hr /><div className="time">{formatHours(0)}</div>
        </div>
    ];

    for (let i = 1; i < DAY_HOURS + 1; i++) {
        timestamps.push(
            <div className="timestamp" key={i}>
                <hr /><div className="time">{formatHours(i)}</div>
            </div>
        );
    }

    return <>

        <div className="timeline">
            {timestamps}
        </div>
    </>;
};