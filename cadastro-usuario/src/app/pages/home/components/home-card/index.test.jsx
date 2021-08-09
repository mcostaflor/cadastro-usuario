import React from 'react';

import { render, screen } from '@testing-library/react';
import { HomeCard } from '.';
import { TestProviders } from '../../../../utils/test/providers';

import userEvent from '@testing-library/user-event';

import { createBrowserHistory } from 'history';

import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

describe('Home Card', () => {
    const history = {
        ...createBrowserHistory(),
        push: jest.fn(),
    };

    const renderComponent = props => render(<TestProviders history={history}><HomeCard {...props}/></TestProviders>);

    it('should render title and body', async () => {
        renderComponent({ title: "Card Title", body: "Card body", route: "/test-route" });
        
        expect(await screen.findByText("Card Title")).toBeInTheDocument();
        expect(await screen.findByText("Card body")).toBeInTheDocument();
    });

    it('should redirect to route when clicked', async () => {
        renderComponent({ title: "Card Title", body: "Card body", route: "/test-route", id: "test-card" });
        
        var testCard = screen.getByTestId('test-card');
        userEvent.click(testCard);

        expect(history.push).toHaveBeenCalledWith("/test-route");
    });
});