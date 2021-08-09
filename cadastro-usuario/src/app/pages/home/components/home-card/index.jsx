import React from 'react';
import { Card } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const HomeCard = ({ id, title, body, route, icon }) => {
    const getIcon = () => {
        switch (icon) {
            case 'users':
                return <UserAddOutlined />
            default:
                return null;
        };
    };

    return (
        <Link to={route}>
            <Card size="small" title={<>{getIcon()} {title}</>} hoverable data-testid={id} id={id} name={id}>
                {body}
            </Card>
        </Link>
    )
};