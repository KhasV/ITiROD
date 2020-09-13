import React, { useState } from 'react';
import { Button } from '../Forms/Button/Button';
import { ModalWindow } from './ModalWindow';
import { Input } from '../Forms/Input/Input';
import { firebaseService } from '../../services';

export const CreateDialog = ({ isOpen, onClose }) => {
    const [active, setActive] = useState('task');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const resetFields = () => {
        setActive('task');
        setDate('');
        setTitle('');
        setDescription('');
        setStartTime('');
        setEndTime('');
    }

    const onSubmit = () => {
        switch (active) {
            case 'task': 
                firebaseService.addTask(title, description, date);
                break;
            case 'event': 
                firebaseService.addEvent(title, description, date, `${startTime}-${endTime}`);
                break; 
            case 'reminder':
                firebaseService.addReminder(title, startTime, date);
                break;
            default: break;
        }
        onClose();
        resetFields();
    }

    const titleInput = <Input variant="outlined-title" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />;

    return (
        <ModalWindow title={titleInput} isOpen={isOpen} onClose={onClose} onSubmit={onSubmit}>
            <div className="container">
                <div className="details">
                    {active === "task" && <>
                        <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
                        <textarea value={description} rows="7" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                    </>}
                    {active === "event" && <>
                        <div className="period">
                            <Input value={startTime} placeholder="Start time" onChange={(e) => setStartTime(e.target.value)} />
                            <Input value={endTime} placeholder="End time" onChange={(e) => setEndTime(e.target.value)} />
                            <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
                            <textarea value={description} rows="5" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </>}
                    {active === "reminder" && <>
                        <Input value={date} type="date" onChange={(e) => setDate(e.target.value)} />
                        <Input value={startTime} placeholder="Start time" onChange={(e) => setStartTime(e.target.value)} />
                    </>}
                </div>
                <section className="types">
                    <Button
                        circled
                        color={active === "event" ? "light-yellow" : "light-aqua"}
                        onClick={() => setActive("event")}>
                        Event
                    </Button>
                    <Button
                        circled
                        color={active === "task" ? "light-green" : "light-aqua"}
                        onClick={() => setActive("task")}>
                        Task
                    </Button>
                    <Button
                        circled
                        color={active === "reminder" ? "light-red" : "light-aqua"}
                        onClick={() => setActive("reminder")}>
                        Reminder
                    </Button>
                </section>
            </div>
        </ModalWindow>
    );
}