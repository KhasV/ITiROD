import React, { useEffect, useRef, useState, useCallback } from 'react';
import { formatHours, convertInterval, convertInMinutes } from '../../utils/date';
import './style.scss';
import { DAY_HOURS } from '../../constansts';
import { Task } from './Task';
import { EditDialog } from '../Modal/EditDialog';   

export const Timeline = ({ date }) => {
    const timestampRef = useRef();

    const [barHeight, setBarHeight] = useState();
    const [nextPosition, setNextPosition] = useState();

    const [tasks, setTasks] = useState([]);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState();

    const toggleEdit = useCallback(() => setIsEditOpen((isEditOpen) => !isEditOpen), []);


    const toggleWithSetNote = (id, type) => () => {
        let note;
        switch (type) {
            case 'task':
                note = tasks.find(task => task.id === id);
                break;
            default:
                break;
        }
        setCurrentNote({ ...note, type });
    }

    useEffect(() => {
        if (currentNote) {
            toggleEdit();
        }
    }, [currentNote, toggleEdit]);

    useEffect(() => {
        if (nextPosition) {
            setPositions((positions) => [...positions, nextPosition]);
        }
    }, [nextPosition]);

    useEffect(() => {
        setBarHeight(timestampRef.current.getBoundingClientRect().height);

        const unsubscribeTasks = firebaseService.listenTasks((tasks) => {
            setTasks(tasks);
        }, [date]);

        return () => {
            unsubscribeTasks();
        }
    }, [date]);

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
        {currentNote && <EditDialog isOpen={isEditOpen} task={currentNote} onClose={toggleEdit} />}
        <div className="taskstable">
            {tasks.map((task, i) => <Task
                key={task.id}
                onClick={toggleWithSetNote}
                task={task}
            />)}
        </div>
        <div className="timeline">
            {timestamps}
        </div>
    </>;
};