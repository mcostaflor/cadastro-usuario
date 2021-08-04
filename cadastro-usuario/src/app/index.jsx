import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home';
import { UsersPage } from './pages/users';

import './index.scss';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" render={() => <HomePage />} />
                    <Route path="/users" render={() => <UsersPage />} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
