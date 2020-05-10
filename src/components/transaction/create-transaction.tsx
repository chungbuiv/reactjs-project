import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Redirect } from 'react-router-dom';

export default function CreateTransaction() {

    const [redirect, setRedirect] = useState<boolean>(false);
    const [saveState, setSaveState] = useState<{ body: string } | null>(null);

    useEffect(() => {
        (async () => {
            if (!saveState) {
                return;
            }
            try {
                const data = await fetchData('http://localhost:3000/transactions/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: saveState.body
                });
                setRedirect(true);
                notification.success({
                    message: 'Create Transaction',
                    description: "Transaction is updated successfully!",
                });
            } catch (e) {
                notification.error({
                    message: 'Create Transaction',
                    description: "Create transaction failed!",
                });
            }

        })();
    }, [saveState])


    function onFinish(args: any) {
        setSaveState({
            body: JSON.stringify(args)
        });
    }

    function onFinishFailed(...args: any) {
        notification.error({
            message: 'Create Transaction',
            description: "Create transaction failed!",
        });
    }

    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <div>Create Transaction</div>
            <div>
                <FormEdit onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div>
        </>
    );
}

interface FormEditProps {
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
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}
        >
            <Form.Item
                label="SUBJECT"
                name="subject"
                rules={[{ required: true, message: 'Please input your subject!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="REQUESTED DATE"
                name="requestedDate"
                rules={[{ required: true, message: 'Please input your requested date!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="LATEST UPDATE"
                name="latestUpdate"
                rules={[{ required: true, message: 'Please input your lastest update!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="STATUS"
                name="status"
                rules={[{ required: true, message: 'Please input your status!' }]}>
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