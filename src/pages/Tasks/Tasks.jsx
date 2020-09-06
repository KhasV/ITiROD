import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import './style.scss';
import { firebaseService } from '../../services';
import { groupByDate, convertToIsoDate } from '../../utils/date';
import { Task } from './Task';
import { Separator } from './Separator';

export const Tasks = () => {
    const period = new URLSearchParams(useLocation().search).get('period');
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
    const [tasks, setTasks] = useState(null);
 
    useEffect(() => {
        const date = new Date();
        let startDate, endDate;

        switch (period) {
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

    return (
        <>
            <Header />
            <Container flex>
                <section className="tasks">
                    {Object.entries(groupByDate(tasks)).map(([date, groupedTasks], index) => {
                        const mappedTasks = groupedTasks.map((task, i) => 
                        <Task
                            key={task.id}
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