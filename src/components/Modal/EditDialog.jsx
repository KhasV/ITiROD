import React, { useState, useEffect } from 'react';
import { ModalWindow } from './ModalWindow';
import { Input } from '../Forms/Input/Input';
import { firebaseService } from '../../services';

export const EditDialog = ({ task, isOpen, onClose }) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');


    const onSubmit = () => {
        task.title = title;
        task.date = date;
        switch(task.type) {
            case 'task': 
                task.time = startTime;
                task.description = description;
                firebaseService.updateTask(task.id, task);
                break;
            default: 
                break;
        }
        onClose();
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDate(task.date);
        }
    }, [task]);

    const titleInput = <Input variant="outlined-title" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />;

    return <ModalWindow isOpen={isOpen} title={titleInput} onClose={onClose} onSubmit={onSubmit}>
        {task.type === "task" && <>
            <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
            <textarea value={description} rows="7" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </>}
    </ModalWindow>
};