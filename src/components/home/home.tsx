import { Button, Layout } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AnalysisInfo } from '../analysis/analysis-info';
import { TransactionList } from '../transaction/transaction-list';

export function Home() {

    const history = useHistory();
    function createTransaction() {
        history.push('/create-transaction');
    }

    return (
        <div>
            <AnalysisInfo></AnalysisInfo>
            <Button type="primary" style={{ textAlign: 'left' }} onClick={createTransaction}>Create transaction</Button>
            <TransactionList></TransactionList>
        </div>
    );
}