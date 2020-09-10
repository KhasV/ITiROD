import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { MONTH_NAMES } from '../../constansts';
import { Button } from '../../components/Forms/Button/Button';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { Timeline } from '../../components/Timeline/Timeline';
import { convertToIsoDate } from '../../utils/date';

export const Day = () => {
    const { year, month, day } = useParams();
    const history = useHistory();
    const date = new Date(year, month - 1, day);

    const replaceDate = useCallback((date) => 
        history.replace(`/date/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    , [history]);

    const onRightArrowClick = useCallback(() => {
        date.setDate(date.getDate() + 1);
        replaceDate(date);
    }, [date, replaceDate]);

    const onLeftArrowClick = useCallback(() => {
        date.setDate(date.getDate() - 1);
        replaceDate(date);
    }, [date, replaceDate]);

    const onCircleClick = useCallback(() => {
        const now = new Date();
        replaceDate(now);
    }, [replaceDate]);

    const timelineDate = new Date(date);
    timelineDate.setDate(timelineDate.getDate() + 1);

    return (
        <>
            <Header />
            <Container>
                <header>
                    <section className="current-month">
                        <h1>{`${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`}</h1>
                    </section>
                    <section className="controls">
                        <Button onClick={onLeftArrowClick} rounded>{'<'}</Button>
                        <Button onClick={onCircleClick} rounded>{'0'}</Button>
                        <Button onClick={onRightArrowClick} rounded>{'>'}</Button>
                    </section>
                </header>
                <Timeline date={convertToIsoDate(timelineDate)} />
            </Container>
        </>
    );
}