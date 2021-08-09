import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Divider, Modal, Upload, Form, Input, DatePicker, message, Spin } from 'antd';
import { ArrowLeftOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';

import { user } from '../../../../routes';

import './index.scss';
import { userApi } from '../../../../api';

const { Title } = Typography;

export const UserEdit = () => {
    const { id } = useParams();

    const history = useHistory();

    const [userData, setUserData] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState();
    const [isDeleting, setIsDeleting] = useState();

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoadingUser(true);
                const user = await userApi.get(id);
                setUserData(user);
            } catch (e) {
                message.error("Failed to fetch user, please try again.");
            } finally {
                setIsLoadingUser(false);
            };
        };

        getUser();
    }, [id, history]);

    const handleSubmitButtonClicked = (values) => {
        async function saveUser() {
            const payload = {
                code: values.code,
                name: values.name,
                birthDate: values.birthDate,
                photo: values.photo?.file || null,
            };

            try {
                setIsSubmitting(true);
                const { userId } = await userApi.update(id, payload);
                message.success("User saved with success!");
                history.push(user.page.replace(":id", userId));
            } catch (e) {
                message.error("Error saving user, please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }

        saveUser();
    };

    const handleDeleteUser = () => {
        async function deleteUser() {
            try {
                setIsDeleting(true);
                await userApi.delete(id);
                message.success("User was deleted with success!");
                history.push(user.list);
            } catch (e) {
                message.error("Error deleting user, please try again.")
            } finally {
                setIsDeleting(false);
            }
        };

        deleteUser();
    }

    return (
        <div>
            <div className={'user-edit__header'}>
                <Title level={2}>
                    Edit user
                </Title>
                <div className={'user-edit__header__actions'}>
                    <Space size="small">
                        <Link to={user.page.replace(":id", id)}>
                            <Button type="secondary" shape="circle" size="large" icon={<ArrowLeftOutlined />} />
                        </Link>
                        <Button 
                            type="secondary" 
                            danger 
                            shape="circle" 
                            size="large" 
                            icon={<DeleteOutlined />} 
                            onClick={() => setIsDeleteModalVisible(true)} 
                            loading={isLoadingUser || isSubmitting}
                            disabled={isLoadingUser || isSubmitting}
                        />
                        <Button
                            form="new-user-form"
                            htmlType="submit"
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<CheckOutlined />}
                            onClick={handleSubmitButtonClicked}
                            loading={isLoadingUser || isSubmitting}
                            disabled={isLoadingUser || isSubmitting}
                        />
                    </Space>
                </div>
            </div>
            <Divider />
            {isLoadingUser ?
                <Spin size="large" />
                :
                <Form
                    id="new-user-form"
                    name="basic"
                    layout="vertical"
                    wrapperCol={{ span: 14 }}
                    onFinish={handleSubmitButtonClicked}
                    initialValues={{
                        code: userData?.code,
                        name: userData?.name,
                        birthDate: userData?.birthDate,
                        photo: userData?.photo,
                    }}
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
                        label="Birthdate"
                        name="birthdate"
                        rules={[{ required: true, message: "Please fill user's birth date." }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Photo"
                        name="photo"
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            beforeUpload={() => false}
                        >
                            <Button>Upload photo</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            }
            <Modal
                visible={isDeleteModalVisible}
                onOk={handleDeleteUser}
                onCancel={() => setIsDeleteModalVisible(false)}
                okButtonProps={{
                    danger: true,
                    loading: isDeleting,
                    disabled: isDeleting,
                }}
                okText={isDeleting ? "Deleting" : "Delete"}
                centered
            >
                Are you sure you want to delete this user?
            </Modal>
        </div>
    )
}
