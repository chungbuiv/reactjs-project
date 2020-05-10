import { MailOutlined, ScheduleOutlined, LikeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Analysis } from "../../models/analysis";

export function AnalysisInfo() {

    const [analysis, setAnalysis] = useState<Analysis[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/analysis');
                data[0].icon = MailOutlined;
                data[1].icon = LikeOutlined;
                data[2].icon = ScheduleOutlined;
                setAnalysis(data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div>
            <Row gutter={16}>
                {analysis.map((item) => {
                    return (
                        <Col span={8} key={item.id}>
                            <Card>
                                <Statistic
                                    value={item.value}
                                    title={item.title}
                                    valueStyle={{ fontSize: '40px' }}
                                    prefix={<item.icon />}
                                />
                            </Card>
                        </Col>
                    ); 
                })}
            </Row>
        </div>
    );
}