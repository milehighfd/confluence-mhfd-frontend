import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from "antd/lib/table";
import { MoreOutlined } from "@ant-design/icons";
import { dataTable, dataTable00, dataTable01, dataTable02 } from "../constants/constants";
const TablePortafolio = () => {
  interface DataType {
    key: string;
    phase: string;
    serviceArea: string;
    county: string;
    cost: string;
    contact: string;
    view:string;
    options: string;
  }
  const columnsHeader: ColumnsType<DataType> = [
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'name',
    },
    {
      title: 'Service Area',
      dataIndex: 'serviceArea',
      key: 'age',
    },
    {
      title: 'County',
      dataIndex: 'county',
      key: 'address',
    },
    {
      title: 'Estimate Cost',
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span>${text}</span>;},
    },
    {
      title: 'Contract',
      key: 'contact',
      dataIndex: 'contact'
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <Button className="btn-transparent transparent-btn" style={{color:'transparent'}}>view</Button>
      ),
    },
    {
      title: '',
      key: 'options',
      render: (_, record) => (
        <MoreOutlined />
      ),
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'phase',
      key: 'name',
    },
    {
      title: '',
      dataIndex: 'serviceArea',
      key: 'age',
    },
    {
      title: '',
      dataIndex: 'county',
      key: 'address',
    },
    {
      title: '',
      key: 'cost',
      dataIndex: 'cost',
      render: text => {return text === '0' ? <span className="tag">No Cost</span> : <span>${text}</span>;},
    },
    {
      title: '',
      key: 'contact',
      dataIndex: 'contact'
    },
    {
      title: '',
      key: 'view',
      render: (_, record) => (
        <Button className="btn-purple">View</Button>
      ),
    },
    {
      title: '',
      key: 'options',
      render: (_, record) => (
        <MoreOutlined />
      ),
    },
  ];
  return <div className="table-body">
    <Table columns={columnsHeader} dataSource={dataTable00} className="table-portafolio header-table" />
    <Table columns={columns} dataSource={dataTable} className="table-portafolio" />
    <Table columns={columns} dataSource={dataTable01} className="table-portafolio" />
    <Table columns={columns} dataSource={dataTable02} className="table-portafolio" />
  </div>
};

export default TablePortafolio;