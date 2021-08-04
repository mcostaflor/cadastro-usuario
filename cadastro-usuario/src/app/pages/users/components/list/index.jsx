import React, { useEffect, useState } from 'react';
import { Typography, Button, Divider, Table } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import './index.scss';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const columns = [
    {
        title: 'Id',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Birthdate',
        dataIndex: 'birthdate',
        key: 'birthdate',
    },
];

const mockData = [
    {
        code: 50230,
        name: 'Matheus Flor',
        birthdate: '06/26/1997',
    }
];

export const UserList = () => {
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            setIsLoadingUsers(true);
        } catch (e) {
            
        } finally {
            setTimeout(() => {
                setIsLoadingUsers(false);
                setUsers(mockData.concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData).concat(mockData));
            }, 2000);
        }
    }, [])

    return (
        <div>
            <div className={'user-list__header'}>
                <Title level={2}>
                    Users
                </Title>
                <div className={'user-list__header__actions'}>
                    <Link to="/users/new">
                        <Button type="primary" shape="circle" size="large" icon={<UserAddOutlined />} />
                    </Link>
                </div>
            </div>
            <Divider />
            <Table
                dataSource={users}
                columns={columns}
                size="middle"
                loading={isLoadingUsers}
                pagination={{
                    pageSize: 5,
                }}
            />
        </div>
    )
}
