import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PageLayout } from '../../components/page-layout';
import { UserEdit } from './components/edit';
import { Users } from './components/list';
import { UserCreate } from './components/new';
import { UserPage } from './components/page';

import './index.scss';

export const UsersPage = () => {
    const { path } = useRouteMatch();

    return (
        <PageLayout>
            <div className={'users-page__content'}>
                <Switch>
                    <Route exact path={`${path}`}>
                        <Users />
                    </Route>
                    <Route exact path={`${path}/new`}>
                        <UserCreate />
                    </Route>
                    <Route exact path={`${path}/:code`}>
                        <UserPage />
                    </Route>
                    <Route exact path={`${path}/:code/edit`}>
                        <UserEdit />
                    </Route>
                    <Redirect to={`${path}`} />
                </Switch>
            </div>
        </PageLayout>
    )
}
