import React from 'react';

export const Task = ({ id, title, removeTask }) => {
    return <>
        <div className="task">
            <div className="title">{title}</div>
            <div className="controls">
                <span className="delete" onClick={removeTask(id)}>Delete</span>
            </div>
        </div>
        <hr />
    </>
};