import React from 'react';
import { Typography, Button, Space, Divider } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import './index.scss';
import { Link, useHistory } from 'react-router-dom';

const { Title } = Typography;

export const UserEdit = () => {
    const history = useHistory();

    const handleSubmitButtonClicked = () => {
        history.push('/users');
    };

    return (
        <div>
            <div className={'user-edit__header'}>
                <Title level={2}>
                    Edit user
                </Title>
                <div className={'user-edit__header__actions'}>
                    <Space size="small">
                        <Button type="secondary" shape="circle" size="large" icon={<CloseOutlined />} onClick={handleSubmitButtonClicked} />
                        <Link to="/users">
                            <Button type="primary" shape="circle" size="large" icon={<CheckOutlined />} />
                        </Link>
                    </Space>
                </div>
                <Divider />
            </div>
        </div>
    )
}
