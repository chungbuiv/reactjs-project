import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchData } from '../../datasource/fetchData';
import { Transaction } from '../../models/transaction';

export function TransactionList() {

    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'subject',
            title: 'SUBJECT',
            dataIndex: 'subject',
        },
        {
            key: 'requestedDate',
            title: 'REQUESTED DATE',
            dataIndex: 'requestedDate'
        },
        {
            key: 'latestUpdate',
            title: 'LATEST UPDATE',
            dataIndex: 'latestUpdate'
        },
        {
            key: 'status',
            title: 'STATUS',
            dataIndex: 'status',
        },
        {
            title: '',
            key: 'id',
            dataIndex: 'id',
            width: '10%',
            render: (id: string) => <a href={"/transactions/" + id}>Open</a>,
        },
    ];

    const [transactions, setTransactions] = useState<Transaction[] | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData('http://localhost:3000/transactions');
                setTransactions(data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <div>
            <Table rowKey="id" columns={columns} dataSource={transactions as Transaction[]}></Table>
        </div>
    );
}
