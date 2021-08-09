import React from 'react';
import { Card, Space, Row, Typography, Col } from 'antd';

const { Text } = Typography;

const noop = () => { };

export const UserCard = ({ name, birthday, code, onClick }) => {
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
                {birthday &&
                    <Col xs={24}>
                        <Space size={4}>
                            <Text strong>
                                Birthday:
                            </Text>
                            <Text>
                                {birthday}
                            </Text>
                        </Space>
                    </Col>
                }
            </Row>
        </Card >
    )
};
