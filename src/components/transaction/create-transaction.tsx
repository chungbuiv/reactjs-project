import { Button, Form, Input, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';

const { Header, Footer, Sider, Content } = Layout;

export default function CreateTransaction() {

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
                console.log(data);
            } catch (e) {
                console.log(e);
            }

        })();
    }, [saveState])


    function onFinish(args: any) {
        console.log(args);

        setSaveState({
            body: JSON.stringify(args)
        });
    }

    function onFinishFailed(...args: any) {
        console.log(args);
    }

    return (

        <>
            <div>Edit Profile</div>
            <div>
                <Layout>
                    <Header className="header" style={{ background: '#bac7d2' }}>
                        <div className="logo" />

                    </Header>
                    <Layout>

                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 580,
                                }}
                            >
                                <FormEdit onFinish={onFinish} onFinishFailed={onFinishFailed} />
                            </Content>
                        </Layout>

                        <Sider width={300} className="site-layout-background">
                            {/* {profile ? <UserProfile profile={profile} /> : null} */}
                        </Sider>
                    </Layout>
                </Layout>
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