import React, { useState, useEffect } from 'react';
import { CalendarCell } from './CalendarCell';
import './style.scss';
import { evalMonthDays, convertToIsoDate } from '../../utils/date';
import { Button } from '../Forms/Button/Button';
import { MONTH_NAMES, WEEK_NAMES } from '../../constansts';
import { useHistory } from 'react-router-dom';
import { firebaseService } from '../../services';

const filterCells = (days, items, name) => days.filter(({ day, active }) =>
    items.find(item => active && +item.date.slice(8) === day))
    .forEach(day => day['has' + name] = true);

export const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const history = useHistory();
    const [tasks, setTasks] = useState(null);
    const [events, setEvents] = useState(null);
    const [reminders, setReminders] = useState(null);

    useEffect(() => {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const unsubscribeTasks = firebaseService.listenTasks((tasks) => {
            setTasks(tasks);
        }, [convertToIsoDate(startDate), convertToIsoDate(endDate)]);

        const unsubscribeEvents = firebaseService.listenEvents((events) => {
            setEvents(events);
        }, [convertToIsoDate(startDate), convertToIsoDate(endDate)]);

        const unsubscribeReminders = firebaseService.listenReminders((reminders) => {
            setReminders(reminders);
        }, [convertToIsoDate(startDate), convertToIsoDate(endDate)]);

        return () => {
            unsubscribeTasks();
            unsubscribeEvents();
            unsubscribeReminders();
        }
    }, [date]);

    const onRightArrowClick = () => {
        date.setMonth(date.getMonth() + 1, 1);
        setDate(new Date(date));
    };

    const onLeftArrowClick = () => {
        date.setMonth(date.getMonth() - 1, 1);
        setDate(new Date(date));
    };

    const onCircleClick = () => {
        const now = new Date();
        setDate(now);
    };

    const onDayClick = (active, day) => () => {
        history.push(`/date/${date.getFullYear()}/${active ?
            date.getMonth() + 1 : (day >= 28 ? date.getMonth() : date.getMonth() + 2)}/${day}`);
    };

    const days = evalMonthDays(date);

    if (tasks) {
        filterCells(days, tasks, 'Task');
    }

    if (reminders) {
        filterCells(days, reminders, 'Reminder');   
    }

    if (events) {
        filterCells(days, events, 'Event');
    }

    return <div className="calendar">
        <header>
            <section className="current-month">
                <h1>{`${date.getFullYear()} ${MONTH_NAMES[date.getMonth()]}`}</h1>
            </section>
            <section className="controls">
                <Button onClick={onLeftArrowClick} rounded>{'<'}</Button>
                <Button onClick={onCircleClick} rounded>{'0'}</Button>
                <Button onClick={onRightArrowClick} rounded>{'>'}</Button>
            </section>
        </header>
        <div className="days">
            {WEEK_NAMES.map((name, i) => <div className="week-title" key={i}>{name}</div>)}
            {days.map(({ day, active, hasEvent, hasReminder, hasTask }, i) =>
                <CalendarCell
                    key={i}
                    day={day}
                    active={active}
                    hasEvent={hasEvent}
                    hasTask={hasTask}
                    hasReminder={hasReminder}
                    onDayClick={onDayClick(active, day)}
                />)
            }
        </div>
    </div>
}