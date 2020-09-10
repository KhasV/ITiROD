import React from 'react';

export const Task = ({ task, onClick }) => {
    return <div
        className="task"
        style={{ background: task.color }}
        onClick={onClick(task.id, 'task')}>
        {task.title}
    </div>;
}