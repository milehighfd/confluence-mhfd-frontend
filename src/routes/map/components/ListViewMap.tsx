import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { WINDOW_WIDTH } from "constants/constants";
import React from "react";


const ListViewMap = () => {
  const columns: ColumnsType<any>  = [
    {
      title: 'Project Name',
      width: WINDOW_WIDTH > 1900 ? '368px':'220px',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      sorter: (a, b) => a.name - b.name,
      render: (text: any) => <p className="project-name">{text}</p>,
    },
    {
      title: 'Type',
      width: WINDOW_WIDTH > 1900 ? '188px':'147px',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: WINDOW_WIDTH > 1900 ? '106px':'86px',
      sorter: (a, b) => a.status - b.status,
      render: (text: any) => <span className={"status-projects-"+ (text.toLowerCase())}>{text}</span>,
    },
    {
      title: 'Phase',
      dataIndex: 'phase',
      key: 'phase',
      width: WINDOW_WIDTH > 1900 ? '125px':'100px',
      sorter: (a, b) => a.phase - b.phase,
    },
    {
      title: 'Stream',
      dataIndex: 'stream',
      key: 'stream',
      width: WINDOW_WIDTH > 1900 ? '153px':'131px',
      sorter: (a, b) => a.stream - b.stream,
    },
    {
      title: 'Sponsor',
      dataIndex: 'sponsor',
      key: 'sponsor',
      width: WINDOW_WIDTH > 1900 ? '125px':'110px',
      sorter: (a, b) => a.sponsor - b.sponsor,
    },
    {
      title: 'Est. Cost',
      dataIndex: 'cost',
      key: 'cost',
      width: WINDOW_WIDTH > 1900 ? '109px':'108px',
      sorter: (a, b) => a.cost - b.cost,
    },
  ];
  const data = [
    {
      name:'Hidden Lake Drainageway @ Arvada Center',
      type:'Restoration',
      status:'Active',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$253,200',
    },
    {
      name:'Cherry Creek @ Lincoln 2019',
      type:'Capital',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$450,000',
    },
    {
      name:'South Englewood Basin Tributary @ City of E...',
      type:'Vegetation Management',
      status:'Requested',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$30,000',
    },
    {
      name:'Hidden Lake Drainageway @ Arvada Center',
      type:'Capital',
      status:'Active',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$12,300',
    },
    {
      name:'Cherry Creek @ Lincoln 2019',
      type:'Acquiston',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$253,200',
    },
    {
      name:'South Englewood Basin Tributary @ City of E...',
      type:'Research & Development',
      status:'Active',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$450,000',
    },
    {
      name:'Hidden Lake Drainageway @ Arvada Center',
      type:'Research & Development',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$30,000',
    },
    {
      name:'Cherry Creek @ Lincoln 2019',
      type:'Capital',
      status:'Active',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$12,300',
    },
    {
      name:'South Englewood Basin Tributary @ City of E...',
      type:'Restoration',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$253,200',
    },
    {
      name:'Hidden Lake Drainageway @ Arvada Center',
      type:'Maintenance',
      status:'Requested',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$450,000',
    },
    {
      name:'Cherry Creek @ Lincoln 2019',
      type:'Sediment Management',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$30,000',
    },
    {
      name:'South Englewood Basin Tributary @ City of E...',
      type:'Special',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$12,300',
    },
    {
      name:'South Englewood Basin Tributary @ City of E...',
      type:'Capital',
      status:'Submitted',
      phase:'Construction',
      stream:'Happy Canyon Creek',
      sponsor:'Commerce City',
      cost:'$12,300',
    },
  ]
  return (
    <Table columns={columns} dataSource={data} scroll={{x: WINDOW_WIDTH>1900? 1174: 996, y: 'calc(100vh - 315px)' }} pagination={false} className="table-list-map"/>
  )
};

export default ListViewMap;