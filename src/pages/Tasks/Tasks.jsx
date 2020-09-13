import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import './style.scss';
import { firebaseService } from '../../services';
import { groupByDate, convertToIsoDate } from '../../utils/date';
import { Task } from './Task';
import { Separator } from './Separator';
import { CreateDialog } from '../../components/Modal/CreateDialog';
import { Button } from '../../components/Forms/Button/Button';
import { EditDialog } from '../../components/Modal/EditDialog';

export const Tasks = () => {
    const period = new URLSearchParams(useLocation().search).get('period');
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [tasks, setTasks] = useState(null);
    const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const toggleCreateTask = useCallback(() => setIsCreateTaskOpen(isCreateTaskOpen => !isCreateTaskOpen), []);
    const toggleEditTask = useCallback(() => setIsEditTaskOpen(isEditTaskOpen => !isEditTaskOpen), []); 
 
    useEffect(() => {
        const date = new Date();
        let startDate, endDate;

        switch (period) {
            case 'week':
                startDate = new Date(date.setDate(date.getDate() - date.getDay() + 1));
                endDate = new Date(date.setDate(date.getDate() - date.getDay() + 7));
                break;
            case 'month':
                startDate = new Date(date.getFullYear(), date.getMonth(), 0);
                endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
                break;
            case 'year':
                startDate = new Date(date.getFullYear(), 0, 1);
                endDate = new Date(date.getFullYear() + 1, 0, 0);
                break;
            default:
                break;
        }
        const unsubscribe = firebaseService.listenTasks((tasks) => {
            setTasks(tasks);
        }, period && [convertToIsoDate(startDate), convertToIsoDate(endDate)]);
        return () => unsubscribe();
    }, [period]);

    useEffect(() => {
        if (currentTask) {
            toggleEditTask();
        }
    }, [currentTask, toggleEditTask]);

    const editTask = (id) => () => {
        setCurrentTask({ ...tasks.find(task => task.id === id), type: 'task' });
    }

    const removeTask = (id) => () => {
        firebaseService.removeTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    const onCheckboxClick = (id) => () => {
        firebaseService.updateTask(id, { completed: !tasks.find(task => task.id === id).completed });
    }

    const notCompletedTasks = tasks && tasks.filter(task => !task.completed);

    const completedTasks = tasks && tasks.filter(task => task.completed);

    const todayTasks = tasks && tasks.filter(task => task.date === convertToIsoDate(new Date()));

    return (
        <>
            <Header />
            <Container flex>
                <CreateDialog onClose={toggleCreateTask} isOpen={isCreateTaskOpen} />
                {currentTask && <EditDialog onClose={toggleEditTask} isOpen={isEditTaskOpen} task={currentTask} />}
                <section className="tasks">
                    <Button color="blue" borderless fullwidth onClick={toggleCreateTask}>New task</Button>
                    <Separator title="Today's tasks">
                        {todayTasks && todayTasks.map(task => 
                        <Task
                            editTask={editTask}
                            key={task.id}
                            onCheckboxClick={onCheckboxClick}
                            removeTask={removeTask}
                            {...task}
                        />)}
                    </Separator>
                    {notCompletedTasks && Object.entries(groupByDate(notCompletedTasks)).map(([date, groupedTasks], index) => {
                        const mappedTasks = groupedTasks.map((task, i) => 
                        <Task
                            editTask={editTask}
                            key={task.id}
                            onCheckboxClick={onCheckboxClick}
                            removeTask={removeTask}
                            {...task}
                        />);
                        return  <Separator key={index} title={date}>{mappedTasks}</Separator>
                    }
                    )}
                    <Separator title="Completed">
                        {completedTasks && completedTasks.map(task => 
                            <Task
                                editTask={editTask}
                                key={task.id}
                                removeTask={removeTask}
                                onCheckboxClick={onCheckboxClick}
                                {...task}
                            />)}
                    </Separator>
                </section>
            </Container>
        </>
    );
};