import React, { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Forms/Input/Input';
import { Button } from '../../components/Forms/Button/Button';
import './style.scss';
import { firebaseService } from '../../services';
import { useHistory } from 'react-router-dom';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const onLogin = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                await firebaseService.register(email, firstname, lastname, password);
                history.replace('/');
            } catch (e) {
                setError(e.message);
            }
        } else {
            setError('Passwords are not equal');
        }
    }

    return (
        <>
            <Header title="Registration" />
            <Container>
                <form className="register-form" onSubmit={onLogin}>
                    <Input variant="filled" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input variant="filled" placeholder="Fisrtname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <Input variant="filled" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <Input variant="filled" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    <Input variant="filled" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                    {error && <div className="error">{error}</div>}
                    <Button color="green">Sign Up</Button>
                </form>
            </Container>
        </>
    );
};