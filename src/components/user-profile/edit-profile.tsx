import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Profile } from '../../models/profile';
import { Redirect } from 'react-router-dom';

export default function EditProfile() {

    const [redirect, setRedirect] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [saveState, setSaveState] = useState<{ id: string, body: string } | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/profile');
                setProfile(data);
            } catch (e) {
                console.log(e);
            }

        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (!saveState) {
                return;
            }
            try {
                const data = await fetchData('http://localhost:3000/profile', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: saveState.body
                });
                setRedirect(true);
                notification.success({
                    message: 'Edit Profile',
                    description: "User profile is updated successfully!",
                });
            } catch (e) {
                notification.error({
                    message: 'Edit Profile',
                    description: "Update profile failed!",
                });
            }

        })();
    }, [saveState])

    function onFinish(args: any) {
        console.log(args);

        setSaveState({
            id: profile!.id,
            body: JSON.stringify(args)
        });
    }

    function onFinishFailed(...args: any) {
        notification.error({
            message: 'Edit Profile',
            description: "Update profile failed!",
        });
    }

    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <div>Edit Profile</div>
            {profile ? <div>
                <FormEdit initialValues={profile} onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div> : <p>Loading...</p>}
        </>
    );
}

interface FormEditProps {
    initialValues: Profile;
    onFinish: (formValue: any) => void;
    onFinishFailed: (error: any) => void;
}

function FormEdit(props: FormEditProps) {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={props.initialValues}
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input your title!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Roles"
                name="roles"
                rules={[{ required: true, message: 'Please input your roles!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Bio"
                name="bio">
                <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}