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
            <div style={{ marginTop: '24px' }}>
                <Button type="primary" onClick={createTransaction}>Create Transaction</Button>
            </div>
            <TransactionList></TransactionList>
        </div>
    );
}