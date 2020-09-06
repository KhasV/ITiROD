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

export const Tasks = () => {
    const period = new URLSearchParams(useLocation().search).get('period');
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [tasks, setTasks] = useState(null);

    const toggleCreateTask = useCallback(() => setIsCreateTaskOpen(isCreateTaskOpen => !isCreateTaskOpen), []);
 
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

    const removeTask = (id) => () => {
        firebaseService.removeTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <>
            <Header />
            <Container flex>
                <CreateDialog onClose={toggleCreateTask} isOpen={isCreateTaskOpen} />
                <section className="tasks">
                <Button color="blue" borderless fullwidth onClick={toggleCreateTask}>New task</Button>
                    {Object.entries(groupByDate(tasks)).map(([date, groupedTasks], index) => {
                        const mappedTasks = groupedTasks.map((task, i) => 
                        <Task
                            key={task.id}
                            removeTask={removeTask}
                            {...task}
                        />);
                        return  <Separator key={index} title={date}>{mappedTasks}</Separator>
                    }
                    )}

                </section>
            </Container>
        </>
    );
};