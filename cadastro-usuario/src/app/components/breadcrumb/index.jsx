import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbNameMap = {
    '/users': "Users",
    '/users/list': "List",
    '/users/new': "New",
    '/users/edit': "Edit",
};

export const Breadcrumbs = () => {
    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        console.log(url);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    console.log(pathSnippets);

    return (
        <Breadcrumb>
            {breadcrumbItems}
        </Breadcrumb>
    );
}
