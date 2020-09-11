import React, { useState, useEffect } from 'react';
import { ModalWindow } from './ModalWindow';
import { Input } from '../Forms/Input/Input';
import { firebaseService } from '../../services';

export const EditDialog = ({ task, isOpen, onClose }) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [endTime, setEndTime] = useState('');
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
            case 'event':
                task.interval = `${startTime}-${endTime}`;
                task.description = description;
                firebaseService.updateEvent(task.id, task);
                break;
            case 'reminder':
                firebaseService.updateReminder(task.id, task);
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
            if (task.interval) {
                const [startTime, endTime] = task.interval.split('-');
                setStartTime(startTime);
                setEndTime(endTime);
            }
            if (task.time) {
                setStartTime(task.time);
            }
            setDate(task.date);
        }
    }, [task]);

    const titleInput = <Input variant="outlined-title" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />;

    return (
    <ModalWindow isOpen={isOpen} title={titleInput} onClose={onClose} onSubmit={onSubmit}>
        {task.type === "task" && <>
            <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
            <textarea value={description} rows="7" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        </>}
        {task.type === "event" && <>
            <div className="period">
                <Input value={startTime} placeholder="Start time" onChange={(e) => setStartTime(e.target.value)} />
                <Input value={endTime} placeholder="End time" onChange={(e) => setEndTime(e.target.value)} />
                <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
                <textarea value={description} rows="5" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            </div>
        </>}
        {task.type === "reminder" && <>
            <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
            <Input value={startTime} placeholder="Start time" onChange={(e) => setStartTime(e.target.value)} />
        </>}
    </ModalWindow>);
};