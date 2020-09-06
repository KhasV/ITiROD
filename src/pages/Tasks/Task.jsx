import React from 'react';

export const Task = ({ id, title }) => {
    return <>
        <div className="task">
            <div className="title">{title}</div>
        </div>
        <hr />
    </>
};