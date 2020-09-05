import React, { useContext } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { firebaseService } from '../../services';
import { UserContext } from '../../contexts/UserContext';

export const Header = ({ title }) => {

    const onLogout = () => firebaseService.logout();

    return <header>
        {!user ? <>
            <h1>{title}</h1>
            <ul className="links">
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
            </ul>
        </> :
            <div className="header-logged">
                <div className="home"><Link to="/">Home</Link></div>
                <section className="user" onClick={onLogout}>Logout ({user.displayName})</section>
                <ul className="tasks links">
                    <li><Link to="/tasks">All tasks</Link></li>
                    <li><Link to="/tasks?period=year">Year</Link></li>
                    <li><Link to="/tasks?period=month">Month</Link></li>
                    <li><Link to="/tasks?period=week">Week</Link></li>
                </ul>
            </div>}
    </header>;
};