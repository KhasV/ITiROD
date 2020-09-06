import React from 'react';
import { Checkbox } from '../../components/Forms/Checkbox/Checkbox';

export const Task = ({ id, title, removeTask, editTask, onCheckboxClick, completed }) => {
    return <>
        <div className="task">
            <Checkbox onClick={onCheckboxClick(id)} isChecked={completed} />
            <div className="title">{title}</div>
            <div className="controls">
                <span className="edit" onClick={editTask(id)}>Edit</span>
                <span className="delete" onClick={removeTask(id)}>Delete</span>
            </div>
        </div>
        <hr />
    </>
};