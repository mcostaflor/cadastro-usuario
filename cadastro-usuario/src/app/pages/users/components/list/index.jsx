import React, { useEffect, useState } from 'react';

import { Typography, Button, Divider, Table, Space, Pagination, message, Empty, Spin } from 'antd';
import { ArrowLeftOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

import { MobileOnlyView, BrowserView } from 'react-device-detect';

import { userApi } from '../../../../api';

import { user } from '../../../../routes'
import { UserCard } from '../../../../components/user-card';

import { paginate } from '../../../../helpers/paginate';


import './index.scss';

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
    {
        render: userData => <Link to={user.page.replace(":id", userData.code)}>View</Link>,
    },
];

const PAGE_SIZE = 5;

export const Users = () => {
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);

    const history = useHistory();

    useEffect(() => {
        async function fetchUsers() {
            try {
                setIsLoadingUsers(true);
                const result = await userApi.list();
                setUsers(result);
            } catch (e) {
                message.error("Failed to fetch user list");
            } finally {
                setIsLoadingUsers(false);
            };
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleUserClicked = (code) => {
        history.push(user.page.replace(":id", code));
    };

    return (
        <div>
            <div className={'user-list__header'}>
                <Title level={2}>
                    Users
                </Title>
                <div className={'user-list__header__actions'}>
                    <Space size="small">
                        <Link to="/">
                            <Button
                                type="secondary"
                                shape="circle"
                                size="large"
                                icon={<ArrowLeftOutlined />}
                            />
                        </Link>
                        <Link to="/users/new">
                            <Button
                                type="primary"
                                shape="circle"
                                size="large"
                                icon={<UserAddOutlined />}
                                disabled={isLoadingUsers}
                                loading={isLoadingUsers}
                            />
                        </Link>
                    </Space>
                </div>
            </div>
            <Divider />
            <BrowserView>
                <Table
                    dataSource={users}
                    columns={columns}
                    size="middle"
                    loading={isLoadingUsers}
                    pagination={{
                        pageSize: PAGE_SIZE,
                        current: currentPage,
                        onChange: page => setCurrentPage(page),
                    }}
                />
            </BrowserView>
            <MobileOnlyView>
                {users.length > 0 ?
                    <>
                        <Pagination
                            current={currentPage}
                            total={users.length}
                            pageSize={PAGE_SIZE}
                            onChange={page => setCurrentPage(page)}
                            responsive
                            style={{
                                marginBottom: 24
                            }}
                        />
                        <div>
                            {paginate(users, currentPage, PAGE_SIZE).map((user, index) => (
                                <UserCard
                                    key={user.code + index}
                                    name={user.name + index}
                                    birthdate={user.birthdate}
                                    code={user.code}
                                    onClick={() => handleUserClicked(user.code)}
                                />
                            ))}
                        </div>
                    </>
                    :
                    <>
                        {isLoadingUsers ?
                            <Spin
                                size="large"
                            />
                            :
                            <Empty />
                        }
                    </>
                }
            </MobileOnlyView>
        </div>
    )
}
