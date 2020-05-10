import { Button, Form, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Transaction } from '../../models/transaction';
import { Redirect } from 'react-router-dom';

export default function EditTransaction(props: any) {

    const transactionId = props.match.params.id;
    const [redirect, setRedirect] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [saveState, setSaveState] = useState<{ id: string, body: string } | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/transactions/' + transactionId);
                setTransaction(data);
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
                const data = await fetchData('http://localhost:3000/transactions/' + transactionId, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: saveState.body
                });
                setRedirect(true);
                notification.success({
                    message: 'Edit Transaction',
                    description: "Transaction is updated successfully!",
                });
            } catch (e) {
                console.log(e);
                notification.error({
                    message: 'Edit Transaction',
                    description: "Update transaction failed!",
                });
            }
        })();
    }, [saveState]);

    function onFinish(args: any) {
        console.log(args);

        setSaveState({
            id: transaction!.id,
            body: JSON.stringify(args)
        });
    }

    function onFinishFailed(...args: any) {
        console.log(args);
        notification.error({
            message: 'Edit Transaction',
            description: "Update transaction failed!",
        });
    }

    return (
        <>
            {redirect ? <Redirect to="/" /> : null}
            <div>Edit Transaction</div>
            {transaction ? <div>
                <FormEdit initialValues={transaction} onFinish={onFinish} onFinishFailed={onFinishFailed} />
            </div> : <p>Loading...</p>}
        </>
    );

}

interface FormEditProps {
    initialValues: Transaction;
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