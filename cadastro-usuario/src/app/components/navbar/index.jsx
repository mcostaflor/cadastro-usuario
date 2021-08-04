import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';

export const Navbar = () => {
    const history = useHistory();

    return (
        <Menu mode="horizontal" theme="dark">
            <Menu.Item onClick={() => {
                history.push('/');
            }}>
                Home
            </Menu.Item>
            <Menu.Item onClick={() => {
                history.push('/users');
            }}>
                Users
            </Menu.Item>
        </Menu>
    )
}
