import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, MinusCircleTwoTone, MoreOutlined, PlusCircleTwoTone, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import type { MenuProps } from 'antd';
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];
const UserList = () => {
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
  const columns: ColumnsType<DataType|any> = [
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
  const items = [
    { key: 'edit-user', label: 'Edit User' },
    { key: 'message-user', label: 'Message User' },
    { key: 'delete-user', label: 'Delete User' },
  ];
  const menu = (record:any, onExpand:any)=> (
    <Menu
      className="menu-login-dropdown"
      style={{ marginTop: '12px'}}
      items={items}
      onClick={({ key }) => {
        switch(key) {
          case 'edit-user':
            onExpand(record, key)
            break;
          case 'message-user':
            break;
          case 'delete-user':
            break;
        }
      }}
    />
  );
  return <>
    <div>
      <Row>
        <Col xs={{ span: 9}} lg={{ span: 5 }}>
          <div className="list-view-head" >
            <Select className="select-type" placeholder="Approved Users" placement="bottomLeft" style={{marginRight:'10px', marginTop: '5px', width:'92%', marginLeft:'2px'}} value={optionSelect?? optionSelect} onChange={(e)=>{console.log(e);setOptionSelect(e)}}>
                <Option value="Approved Users"><span style={{paddingLeft:'10px'}}>Approved Users</span></Option>
                <Option value="Pending User Requests"><span style={{paddingLeft:'10px'}}>Pending User Requests</span></Option>
                <Option value="Deleted Users"><span style={{paddingLeft:'10px'}}>Deleted Users</span></Option>
                {/* <Option value="User Activity">User Activity</Option> */}
            </Select>
          </div>
          </Col>
          {optionSelect !== 'User Activity' && <>
         <Col  xs={{ span: 30}} lg={{ span: 16 }} style={{textAlign:'end', zIndex:'2'}}>
          <div  className='filter-user-management'>
            <Input
              style={{ width: '30%', marginRight:'10px', height: '40px', borderRadius:'5px'}}
              placeholder="Search by Name"
              prefix={<SearchOutlined />}
            />
            <Select placeholder="Organization" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
                <Option value="Organization">Organization</Option>
            </Select>
            <Select placeholder="Service Area" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
                <Option value="Service Area">Service Area</Option>
            </Select>
            <Select placeholder="User Designation" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
                <Option value="User Designation">User Designation</Option>
            </Select>
            <Button className="btn-purple" onClick={()=>{setOpenFilters(true)}} style={{height:'40px', width:'8%'}}>
              Reset
            </Button>
          </div>
          
          </Col>
          <Col  xs={{ span: 9}} lg={{ span: 3 }} style={{textAlign:'end'}}>
          {/* <Button className="btn-purple" onClick={()=>{setOpenFilters(true)}} style={{marginTop: '8px', height:'38px'}}>
            <PlusOutlined />
            Add New User
          </Button> */}
        </Col> </>}
      </Row>
      <div className="table-user-management">
        {optionSelect !== 'User Activity' ?  <Table
          pagination={{ pageSize: 20 }}
          columns={columns}
          expandable={{
            expandedRowRender: record => (
              <ProfileUser record={record}/>
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined onClick={(e:any) => onExpand(record, e)} />
              ) : (
                <Dropdown overlay={menu(record, onExpand)} placement="bottomRight" >
                  <MoreOutlined />
                </Dropdown>
              )
          }}
          // expandable={{
          //   expandedRowRender: record => <ProfileUser record={record}/>,
          // }}
          dataSource={DATA_USER_LIST}
        /> : <Table
          columns={columns2}
          dataSource={DATA_USER_ACTIVITY}
        /> }
      </div>
    </div>
  </>
};

export default UserList;