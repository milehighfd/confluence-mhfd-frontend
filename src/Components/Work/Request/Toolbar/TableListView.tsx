import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';

const TableListView = () => {
    const typeStatus = (status: string) => {
        let text = '';
        switch (status) {
            case "Submitted": {
                text = 'span-submitted';
                break;
            }
            case "Active": {
                text = 'span-active';
                break;
            }
            case "Requested": {
                text = 'span-requested';
                break;
            }
        }
        return text;
    }
    interface DataType {
        key: React.Key;
        name: string;
        status: string;
        requestor: string;
        cost: string;
        actions: number;
        type: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Project Name',
            dataIndex: 'name',
            width: '276px',
            fixed: true,
            render: (name: any) =>
                <div style={{ fontSize: "15px", fontWeight: 'bold' }}>
                    <span className='name'>{name}</span>
                </div>,
            sorter: {
                compare: (a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name),
            },            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '80px',
            render: (status: any) =>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span className={typeStatus(status)}>{status}</span>
                </div>,
            sorter: {
                compare: (a: { status: string; }, b: { status: string; }) => a.status.localeCompare(b.status),
            },
        },
        {
            title: 'Requestor',
            dataIndex: 'requestor',
            width: '94px',
            sorter: {
                compare: (a: { requestor: string; }, b: { requestor: string; }) => a.requestor.localeCompare(b.requestor),
            },
        },
        {
            title: 'Past',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2023',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2024',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2025',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2026',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: '2027',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
        {
            title: 'Total',
            dataIndex: 'cost',
            width: '64px',
            sorter: {
                compare: (a: { cost: string; }, b: { cost: string; }) => a.cost.localeCompare(b.cost),
            },
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Active',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 4,
            type: 'Restoration',
        },
        {
            key: '2',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 3,
            type: 'Capital',
        },
        {
            key: '3',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Requested',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 12,
            type: 'Vegetation Management',
        },
        {
            key: '4',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Active',
            requestor: 'Litleton',
            cost: '$12,300',
            actions: 5,
            type: 'Capital',
        },
        {
            key: '5',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 6,
            type: 'Acquiston',
        },
        {
            key: '6',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Active',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 12,
            type: 'Research & Development',
        },
        {
            key: '7',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Submitted',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 9,
            type: 'Research & Development',
        },
        {
            key: '8',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Active',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 32,
            type: 'Capital',
        },
        {
            key: '9',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Commerce City',
            cost: '$253,200',
            actions: 16,
            type: 'Restoration',
        },
        {
            key: '10',
            name: 'Hidden Lake Drainageway @ Arvada Center',
            status: 'Requested',
            requestor: 'Boulder',
            cost: '$450,000',
            actions: 7,
            type: 'Maintenance',
        },
        {
            key: '11',
            name: 'Cherry Creek @ Lincoln 2019',
            status: 'Submitted',
            requestor: 'Thornton',
            cost: '$30,000',
            actions: 78,
            type: 'Sediment Management',
        },
        {
            key: '12',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 42,
            type: 'Special',
        },
        {
            key: '13',
            name: 'South Englewood Basin Tributary @ City of E...',
            status: 'Submitted',
            requestor: 'Littleton',
            cost: '$12,300',
            actions: 36,
            type: 'Capital',
        },

    ];

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='table-map-list'>

            <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} scroll={{ x: 1000, y:400 }} sticky />

        </div>

    )
};

export default TableListView;