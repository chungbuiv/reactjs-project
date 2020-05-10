import { MailOutlined, ScheduleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Analysis } from "../../models/analysis";

const colorsAry = ['#3f8600', '#cf1322', '#0a61bf'];

const iconsAry = [MailOutlined, ShoppingOutlined, ScheduleOutlined];

export function AnalysisInfo() {

    const [analysis, setAnalysis] = useState<Analysis[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/analysis');
                for (var i = 0; i < data.length; i++) {
                    data[i].color = colorsAry[i];
                    data[i].icon = iconsAry[i];
                }
                setAnalysis(data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div className="site-statistic-demo-card">
            <Row gutter={16}>
                {analysis.map((item) => {
                    return (
                        <Col span={8} key={item.id}>
                            <Card>
                                <Statistic
                                    value={item.value}
                                    title={item.title}
                                    valueStyle={{ fontSize: '40px', color: item.color }}
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