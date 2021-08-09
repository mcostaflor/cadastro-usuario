import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const localHistory = createBrowserHistory();

export const TestProviders = ({ children, history = localHistory }) => {
    return (
        <Router history={history}>
            {children}
        </Router>
    );
};