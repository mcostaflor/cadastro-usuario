import React, { useEffect, useState } from 'react';

import { Typography, Space, Button, Divider, Avatar, message, Spin } from 'antd';
import { ArrowLeftOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { userApi } from '../../../../api';
import { user } from '../../../../routes';

const { Title, Text } = Typography;

export const UserPage = ({ match }) => {
    const [userData, setUserData] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoadingUser(true);
                const user = await userApi.get(id);
                setUserData(user);
            } catch (e) {
                message.error("Failed to fetch user, please try again.");
                history.push(user.list);
            } finally {
                setIsLoadingUser(false);
            };
        };

        getUser();
    }, [id, history]);

    return (
        <>
            <div className={'user-create__header'}>
                <Title level={2} style={{ alignItems: 'center' }}>
                    User
                </Title>
                <div className={'user-create__header__actions'}>
                    <Space size="small">
                        <Link to="/users">
                            <Button type="secondary" shape="circle" size="large" icon={<ArrowLeftOutlined />} />
                        </Link>
                        <Link to={`/users/${id}/edit`}>
                            <Button type="secondary" shape="circle" size="large" icon={<EditOutlined />} loading={isLoadingUser} disabled={isLoadingUser} />
                        </Link>
                    </Space>
                </div>
            </div>
            <Divider />
            {userData &&
                <Space size={10} direction="vertical">
                    <Avatar size={64} icon={<UserOutlined />} src={userData?.photo} />
                    <Space size={2} direction="vertical">
                        <Text strong>
                            Code
                        </Text>
                        <Text>
                            {userData.code}
                        </Text>
                    </Space>
                    <Space size={2} direction="vertical">
                        <Text strong>
                            Name
                        </Text>
                        <Text>
                            {userData.name}
                        </Text>
                    </Space>
                    <Space size={2} direction="vertical">
                        <Text strong>
                            Birthdate
                        </Text>
                        <Text>
                            {userData.birthDate}
                        </Text>
                    </Space>
                </Space>
            }
            {isLoadingUser &&
                <Spin
                    size={"large"}
                />
            }
        </>
    );
};