import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Forms/Input/Input';
import { Button } from '../../components/Forms/Button/Button';
import './style.scss';
import { firebaseService } from '../../services';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();
    const { user } = useContext(UserContext);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await firebaseService.authenticate(email, password);
            history.replace('/');
        } catch (e) {
            setError(e.message);
        }
    }

    useEffect(() => {
        if (user) {
            history.replace('/');
        }
    }, [user, history]);

    return (
        <>
            <Header title="Sign In" />
            <Container>
                <form className="signin-form" onSubmit={onLogin}>
                    <Input variant="filled" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input variant="filled" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}type="password" />
                    {error && <div className="error">{error}</div>}
                    <Button color="green">Sign In</Button>
                </form>
            </Container>
        </>
    );
};