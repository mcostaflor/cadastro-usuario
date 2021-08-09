import React from 'react';
import { Card, Space, Row, Typography, Col } from 'antd';

const { Text } = Typography;

const noop = () => { };

export const UserCard = ({ name, birthdate, code, onClick }) => {
    return (
        <Card
            hoverable
            size="small"
            onClick={onClick || noop}
            style={{ marginBottom: 8 }}
        >
            <Row>
                <Col xs={24}>
                    <Space size={4}>
                        <Text strong>
                            Code:
                        </Text>
                        <Text>
                            {code}
                        </Text>
                    </Space>
                </Col>
                {name &&
                    <Col xs={24}>
                        <Space size={4}>
                            <Text strong>
                                Name:
                            </Text>
                            <Text>
                                {name}
                            </Text>
                        </Space>
                    </Col>
                }
                {birthdate &&
                    <Col xs={24}>
                        <Space size={4}>
                            <Text strong>
                                Birthdate:
                            </Text>
                            <Text>
                                {birthdate}
                            </Text>
                        </Space>
                    </Col>
                }
            </Row>
        </Card >
    )
};
