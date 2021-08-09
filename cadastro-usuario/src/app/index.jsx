import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home';
import { UsersPage } from './pages/users';
import { home, user } from './routes';

import './index.scss';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <ToastContainer />
                <Navbar />
                <Switch>
                    <Route exact path={home} render={() => <HomePage />} />
                    <Route path={user.list} render={() => <UsersPage />} />
                    <Redirect to={home} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
