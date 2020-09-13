import React from 'react';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { Calendar } from '../../components/Calendar/Calendar';
import './style.scss';

export const Home = () => {
    return (<> 
        <Header />
        <Container>
            <Calendar />
        </Container>
    </>);
}