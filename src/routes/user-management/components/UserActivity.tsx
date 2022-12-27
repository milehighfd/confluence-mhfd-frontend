import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";
import { useUsersDispatch, useUsersState } from "hook/usersHook";
import moment from "moment";

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
    { title: <>Date and Time <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'registerDate', key: 'registerDate' },
    { title: <>User <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'user', key: 'user' },
    { title: <>City <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'city', key: 'city' },
    { title: <>Change <ArrowDownOutlined className="ico-arrow"/></>, dataIndex: 'activityType', key: 'activityType' },
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
  const {
    userActivity
  } = useUsersState();
  const {
    saveUserActivated,
    saveUserPending,
    getUserActivity,
    getAllUserActivity
  } = useUsersDispatch();
  const [tabKey, setTabKey] = useState<any>('Users Management');
  const [openAction, setOpenAction] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('Approved Users')

  
  userActivity.data.forEach((element: any) => {
    element.user = element.firstName + " " + element.lastName;
    element.registerDate = moment(new Date('' + element.registerDate)).format('MM/DD/YYYY hh:mm A');
  });
  const pagination = {
    current: + userActivity.currentPage,
    pageSize: 20,
    total: userActivity.totalPages*20
  };
  const handleTableChange = (pagination: any, filters: {}, sorter: any) => {
    getUserActivity(getUrlOptionsUserActivity(pagination, sorter));
  };
  const getUrlOptionsUserActivity = (pagination: {current: number, pageSize: number}, sorter: {field?: string, order?: string}) => {
    return 'page=' + pagination.current + '&limit=' + pagination.pageSize + (sorter?.order ? ('&sort=' + sorter.field + '&sorttype=' + (sorter.order === "descend" ? 'DESC': 'ASC')): '&sort=registerDate&sorttype=DESC')
  }
  console.log('useractiviy',userActivity);

  useEffect(() => {
    getUserActivity(getUrlOptionsUserActivity({current: 1, pageSize: 20}, {}));
  }, [])

  return <>
    <div>
      <Row>
        <Col xs={{ span: 9}} lg={{ span: 5 }}>
          <div className="list-view-head" style={{paddingTop:'10px', paddingLeft:'15px'}} >
            <h2 style={{color:'rgb(29, 22, 70)'}}className="title">User Activity</h2>
          </div>
          </Col>
      </Row>
      <div className="table-user-management">
        <Table
          columns={columns2}
          // dataSource={DATA_USER_ACTIVITY}
          rowKey={record => record.registerDate}
          dataSource={userActivity.data}
          pagination={pagination} onChange={(pagination, filters, sort) => handleTableChange(pagination, filters, sort)}
        />
      </div>
    </div>
  </>
};

export default UserActivity;