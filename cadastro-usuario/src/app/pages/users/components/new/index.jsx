import React, { useState } from 'react';
import { Typography, Button, Divider, Space, Input, Form, DatePicker, Upload, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { userApi } from '../../../../api';
import { user } from '../../../../routes';
import { getBase64 } from '../../../../helpers/getBase64';

const { Title } = Typography;

export const UserCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const history = useHistory();

    const handleFormSubmit = async (values) => {
        async function saveUser() {

            const payload = {
                code: values.code,
                name: values.name,
                birthday: values.birthday,
                photo: values.photo?.fileList[0] ? await getBase64(values.photo?.fileList[0]?.originFileObj) : null,
            };

            try {
                setIsSubmitting(true);
                const { code } = await userApi.insert(payload);
                message.success("User inserted with success!");
                history.push(user.page.replace(":code", code));
            } catch (e) {
                message.error("Error inserting user, please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }

        saveUser();
    }

    const handlePhotoUpload = file => {
        return false;
    };

    return (
        <div>
            <div className={'user-create__header'}>
                <Title level={2} style={{ alignItems: 'center' }}>
                    Create new user
                </Title>
                <div className={'user-create__header__actions'}>
                    <Space size="small">
                        <Link to="/users">
                            <Button type="secondary" shape="circle" size="large" icon={<CloseOutlined />} />
                        </Link>
                        <Button
                            key="submit"
                            form="new-user-form"
                            htmlType="submit"
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<CheckOutlined />}
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        />
                    </Space>
                </div>
            </div>
            <Divider />
            <Form
                id="new-user-form"
                name="basic"
                layout="vertical"
                wrapperCol={{ span: 14 }}
                onFinish={handleFormSubmit}
            >
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[{ required: true, message: "Please fill user's code." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please user's name." }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Birthday"
                    name="birthday"
                    rules={[{ required: true, message: "Please fill user's birth date." }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Photo"
                    name="photo"
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={handlePhotoUpload}
                    >
                        <Button>Upload photo</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </div>
    )
}
