import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];
const UserActivity = () => {
  interface DataType {
    key: React.Key;
    name: string[];
    role: string;
    serviceArea: string;
    county: string;
    city: string;
    status: string;
    actions: string;
  }
  const roleSpan = (role:string) => {
    let span = ''
    switch(role) {
      case 'Super Admin': {
        span ='admin';
        break;
      }
      case 'MHFD Senior Manager': {
        span ='manager';
        break;
      }
      case 'Local Gov': {
        span ='gov';
        break;
      }
      default : {
        span ='admin';
        break;
      }
    }
    return span;
  }
  const columns2: ColumnsType<any> = [
    { title: <>Date and Time <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'dateTime', key: 'dateTime' },
    { title: <>User <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'user', key: 'user' },
    { title: <>City <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'city', key: 'city' },
    { title: <>Change <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'change', key: 'change' },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: <>Name <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="user-tab">
          <div style={{marginRight:'5px'}}>
            <img src={name[2] !== '' ? name[2] :"/picture/Avatar1.svg"} alt="" height="34px" />
          </div>
          <div>
            <p style={{fontSize:'12px', marginBottom:'0px', fontWeight:'500', paddingLeft:'5px'}}>{name[0]}</p>
            <p style={{fontSize:'12px', marginBottom:'0px', opacity: '0.6', paddingLeft:'5px'}}>{name[1]}</p>
          </div>
        </div>
      ),
    },
    {
      title: <>Role <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span className={'span-' + roleSpan(role)}>
          {role}
        </span> 
      ),
    },
    { title: <>Service Area <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'serviceArea', key: 'serviceArea' },
    { title: <>County <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'county', key: 'county' },
    { title: <>City <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'city', key: 'city' },
    {
      title: <>Status <ArrowDownOutlined className="ico-arrow"/></>,
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={'span-' + status}>
          <div className="circulo"/>{status}
        </span>
      ),
    },
    // { title: 'Actions', dataIndex: 'actions', key: 'actions' },
    Table.EXPAND_COLUMN,
  ];
  const [tabKey, setTabKey] = useState<any>('Users Management');
  const [openAction, setOpenAction] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('Approved Users')
  return <>
    <div>
      <Row>
        <Col xs={{ span: 9}} lg={{ span: 5 }}>
          <div className="list-view-head" >
            User Activity
          </div>
          </Col>
      </Row>
      <div className="table-user-management">
        <Table
          columns={columns2}
          dataSource={DATA_USER_ACTIVITY}
        />
      </div>
    </div>
  </>
};

export default UserActivity;