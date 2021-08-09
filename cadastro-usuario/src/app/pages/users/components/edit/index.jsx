import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Divider, Modal, Upload, Form, Input, DatePicker, message, Spin } from 'antd';
import { ArrowLeftOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import { user } from '../../../../routes';

import './index.scss';
import { userApi } from '../../../../api';
import { getBase64 } from '../../../../helpers/getBase64';
import { base64ToFile } from '../../../../helpers/base64ToFile';

const { Title } = Typography;

export const UserEdit = () => {
    const { code } = useParams();

    const history = useHistory();

    const [userData, setUserData] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState();
    const [isDeleting, setIsDeleting] = useState();

    const [userPhoto, setUserPhoto] = useState(null);
    const [userPhotoUrl, setUserPhotoUrl] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoadingUser(true);
                const user = await userApi.get(code);
                setUserData(user);
            } catch (e) {
                message.error("Failed to fetch user, please try again.");
            } finally {
                setIsLoadingUser(false);
            };
        };

        getUser();
    }, [code, history]);

    useEffect(() => {
        setUserPhoto(userData?.photo ? base64ToFile(userData?.photo, "photo.png") : null);
    }, [userData]);

    useEffect(() => {
        async function setPhotoUrl() {
            setUserPhotoUrl(userPhoto ? await getBase64(userPhoto) : null);
        };

        setPhotoUrl();
    }, [userPhoto]);

    const handleSubmitButtonClicked = (values) => {
        async function saveUser() {
            const payload = {
                name: values.name,
                birthday: values.birthday,
                photo: userPhoto ? await getBase64(userPhoto) : null,
            };

            try {
                setIsSubmitting(true);
                const { code: userCode } = await userApi.update(code, payload);
                message.success("User saved with success!");
                history.push(user.page.replace(":code", userCode));
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
                await userApi.delete(code);
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

    const handleBeforeUpload = file => {
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            message.error(`${file.name} is not a png or jpeg file`);
        }

        setUserPhoto(file);

        return file.type === 'image/png' || file.type === 'image/jpeg' ? false : Upload.LIST_IGNORE;
    };

    return (
        <div>
            <div className={'user-edit__header'}>
                <Title level={2}>
                    Edit user
                </Title>
                <div className={'user-edit__header__actions'}>
                    <Space size="small">
                        <Link to={user.page.replace(":code", code)}>
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
                            form="edit-user-form"
                            htmlType="submit"
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<CheckOutlined />}
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
                    id="edit-user-form"
                    name="basic"
                    layout="vertical"
                    wrapperCol={{ span: 14 }}
                    onFinish={handleSubmitButtonClicked}
                    initialValues={{
                        name: userData?.name,
                        birthday: moment(userData?.birthday),
                    }}
                >
                    <Form.Item
                        label="Name:"
                        name="name"
                        rules={[{ required: true, message: "Please user's name." }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Birthday:"
                        name="birthday"
                        rules={[{ required: true, message: "Please fill user's birth date." }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Photo:"
                        name="photo"
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={handleBeforeUpload}
                            showUploadList={false}
                            defaultFileList={userPhoto ? [userPhoto] : []}
                        >
                            {userPhoto ? <img src={userPhotoUrl} alt="user" style={{ width: '100%', height: '100%' }} /> : <Button>Upload photo</Button>}
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
