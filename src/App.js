import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import { SignIn } from './pages/SignIn/SignIn';
import { Register } from './pages/Register/Register';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { firebaseService } from './services/index';
import { Home } from './pages/Home/Home';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseService.initialize((user) => {
      setUser(user);
      setIsLoading(false);
    }, () => {
      setUser(null);
      setIsLoading(false);
    });
  }, []);

  return (
    !isLoading ?
      (
        <UserContext.Provider value={{user, setUser}}>
          <Router>
            <Switch>
              <Route path="/login" component={SignIn} />
              <Route path="/register" component={Register} />
              {!user ? <Redirect to="/login" /> : <Route exact path="/" component={Home} />}
            </Switch>
          </Router>
        </UserContext.Provider>
      )
      : <Loader />);
}

export default App;
