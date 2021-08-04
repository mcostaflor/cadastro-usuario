import React from 'react';
import { Typography, Button, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import './index.scss';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export const UserCreate = () => {


    return (
        <div>
            <div className={'user-create__header'}>
                <Title level={2} style={{ alignItems: 'center' }}>
                    Create new user
                </Title>
                <div className={'user-create__header__actions'}>
                    <Link to="/users">
                        <Button type="secondary" shape="circle" size="large" icon={<CloseOutlined />} />
                    </Link>
                </div>
            </div>
            <Divider />
        </div>
    )
}
