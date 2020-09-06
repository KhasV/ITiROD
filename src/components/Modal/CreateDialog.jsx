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


    const resetFields = () => {
        setActive('task');
        setDate('');
        setTitle('');
        setDescription('');
    }

    const onSubmit = () => {
        switch (active) {
            case 'task': 
                firebaseService.addTask(title, description, date);
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
                </div>
                <section className="types">
                    <Button
                        circled
                        color={active === "task" ? "light-green" : "light-aqua"}
                        onClick={() => setActive("task")}>
                        Task
                    </Button>
                </section>
            </div>
        </ModalWindow>
    );
}