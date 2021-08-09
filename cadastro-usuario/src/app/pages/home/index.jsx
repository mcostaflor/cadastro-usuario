import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import { PageLayout } from '../../components/page-layout';
import { HomeCard } from './components/home-card';
import { user } from '../../routes/index';

const { Title } = Typography;

export const HomePage = () => {
    return (
        <PageLayout>
            <Title level={1}>
                Home
            </Title>
            <Divider />
            <Row>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <HomeCard
                        id="home-card"
                        icon={"users"}
                        title="Users"
                        body="Manage system users"
                        route={user.list}
                    />
                </Col>
            </Row>
        </PageLayout>
    )
}
