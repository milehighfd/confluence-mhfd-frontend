import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, MinusCircleTwoTone, MoreOutlined, PlusCircleTwoTone, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import { ColumnsType } from "antd/lib/table";
import type { MenuProps } from 'antd';
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY, DATA_USER_LIST } from "../constants";
import * as datasets from "../../../Config/datasets";
import { OptionsFiltersUser, User } from "Classes/TypeList";
import { SERVER } from "Config/Server.config";
import { useUsersDispatch, useUsersState } from "hook/usersHook";
import { PAGE_USER } from "constants/constants";
import UserFilters from "Components/User/UserFilters";
import UserMngFilters from "./UserMngFilters";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];

const titleCase = (str:any)=> {
  str = str.replaceAll('_', ' ');
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

const getUser = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
  datasets.getData(url, datasets.getToken()).then(res => {
    console.log(res.users)
    const arrayUsers = res.users.map((elem: any) => {
      return {
        ...elem,
        name: [elem.name, elem.email, elem.photo],
        statusAccount: elem.activated === true? 'Active': 'Inactive',
        serviceArea: elem.serviceArea !== null ? elem.serviceArea : '-',
        city: elem.city !== null ? elem.city : '-',
        county: elem.county !== null ? elem.county : '-',
        key:elem.user_id,
        //designation: titleCase(elem.designation)
      }
    });
     console.log('arry',arrayUsers)
    if (res.users) {
      saveUser(res.users);
      setUser(arrayUsers);
      setTotal(res.totalPages * 10);
    }
  });
}

const UserList = () => {
  interface DataType {
    key: React.Key;
    name: string[];
    designation: string;
    serviceArea: string;
    county: string;
    city: string;
    status: string;
    actions: string;
    statusAccount: string
  }
  const roleSpan = (role:string) => {
    let span = ''
    titleCase(role)
    switch(role) {
      case 'admin': {
        span ='admin';
        break;
      }
      case 'consultant': {
        span ='manager';
        break;
      }
      case 'government_staff': {
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
    { title: <>Date and Time <ArrowDownOutlined/></>, dataIndex: 'dateTime', key: 'dateTime' },
    { title: <>User <ArrowDownOutlined/></>, dataIndex: 'user', key: 'user' },
    { title: <>City <ArrowDownOutlined/></>, dataIndex: 'city', key: 'city' },
    { title: <>Change <ArrowDownOutlined/></>, dataIndex: 'change', key: 'change' },
  ];
  const columns: ColumnsType<DataType|any> = [
    {
      title: <>Name</>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name - b.name,
      render: (name) => (
        <div className="user-tab">
          <div style={{marginRight:'5px'}}>
            <img src={name[2] !== null ? name[2] :"/picture/Avatar1.svg"} alt="" height="34px" />
          </div>
          <div>
            <p className="name-user-list">{name[0]}</p>
            <p className="oganization-user-list">{name[1]}</p>
          </div>
        </div>
      ),
    },
    {
      title: <>Role</>,
      dataIndex: 'designation',
      key: 'designation',
      sorter: (a, b) => a.designation - b.designation,
      render: (designation) => (
        <span className={'span-' + roleSpan(designation)}>
          {designation === 'admin' ? 'MHFD Senior Manager':
          designation === 'consultant' ? 'Consultant/Contractor':
          designation === 'government_staff' ? 'Local Government':
          designation === 'staff' ? 'MHFD Staff': designation
          }
        </span> 
      ),
    },
    { title: <>Service Area</>, dataIndex: 'serviceArea', key: 'serviceArea',sorter: (a, b) => a.serviceArea - b.serviceArea, },
    { title: <>County</>, dataIndex: 'county', key: 'county', sorter: (a, b) => a.county - b.county, },
    { title: <>City</>, dataIndex: 'city', key: 'city', sorter: (a, b) => a.city - b.city, },
    {
      title: <>Status</>,
      dataIndex: 'statusAccount',
      key: 'statusAccount',
      sorter: (a, b) => a.statusAccount - b.statusAccount,
      render: (statusAccount) => (
        <span className={'span-'+statusAccount}>
          <div className="circulo"/>{statusAccount}
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
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [totalUsersDeleted, setTotalUsersDeleted] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<Array<User>>([]);
  const [userDeleted, setUserDeleted] = useState<Array<User>>([]);
  const [userActivatedState, setUserActivatedState] = useState<Array<User>>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);

  const [optionUserActivated, setOptionUserActivated] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserPending, setOptionUserPending] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserDeleted, setOptionUserDeteled] = useState<OptionsFiltersUser>(PAGE_USER);

  const [tabKey, setTabKey] = useState<any>('Users Management');
  const [openAction, setOpenAction] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [userSelected, setUserSelected] = useState<any>();
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('Approved Users')
  const items = [
    { key: 'edit-user', label: 'Edit User' },
    { key: 'message-user', label: 'Message User' },
    { key: 'delete-user', label: 'Delete User' },
  ];
  const menu = (record:any, onExpand:any)=> {
    // console.log(record);
    return <Menu
      className="menu-login-dropdown"
      style={{ marginTop: '12px'}}
      items={items}
      onClick={({ key }) => {
        switch(key) {
          case 'edit-user':
            console.log('key', record)
            setUserSelected(record);
            onExpand(record, key)
            break;
          case 'message-user':
            break;
          case 'delete-user':
            console.log('DELETE')
            break;
        }
      }}
    />
    };
  const urlOptions = (options: OptionsFiltersUser) => {
    // console.log('options',options, totalUsersActivated)
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '')
      + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : ''
      + '&sort=' + options.sort) + '&limit=' + 100 + '&page=' + options.page;
  }
  const getAllUser = () => {
    getUser(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + 'status=approved&' + urlOptions(optionUserActivated), setTotalUsersActivated);
    getUser(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + 'status=pending&' + urlOptions(optionUserPending), setTotalUsersPending);
    getUser(saveUserPending, setUserDeleted, SERVER.LIST_USERS_ACTIVATED + 'status=deleted&' + urlOptions(optionUserDeleted), setTotalUsersDeleted);
  }
  const searchUserActivated = (option: OptionsFiltersUser) => {
    getUser(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + 'status=approved&' + urlOptions(option), setTotalUsersActivated);
  }
  const searchUserPending = (option: OptionsFiltersUser) => {
    getUser(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + 'status=pending&' + urlOptions(option), setTotalUsersPending);
  }
  const searchUserDelete = (option: OptionsFiltersUser) => {
    getUser(saveUserPending, setUserDeleted, SERVER.LIST_USERS_ACTIVATED + 'status=deleted&' + urlOptions(option), setTotalUsersDeleted);
  }
  const resetActivated = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserActivated(resetOptions);
    searchUserActivated(resetOptions);
  }
  const deleteUserActivated = (id: string) => { 
    datasets.putData(SERVER.CHANGE_USER_STATE + '/' + id, {}, datasets.getToken()).then(res => {
      if (res?.user_id) {
        getAllUser();
      }
    });

  }
  const deleteUserDatabase = (id: String) => {
    datasets.deleteData(SERVER.DELETE_USER + '/' + id, datasets.getToken()).then(res => {
      getAllUser();
    })
  }

  useEffect(() => {
    const resetOptions = {...PAGE_USER};
    searchUserActivated(resetOptions);
    // console.log('activity1',userActivatedState)
  }, []);
  useEffect(() => {
    const resetOptions = {...PAGE_USER};
    searchUserActivated(resetOptions);
    searchUserPending(resetOptions);
    searchUserDelete(resetOptions);
    // console.log('activity2',userActivatedState)
  }, [optionSelect]);

  // console.log(optionSelect)
  return <>
    <div>
      <div className="head-list">
        <div className="list-view-head" >
        <Select className="select-type" placeholder="Approved Users" placement="bottomLeft" style={{marginTop: '5px', marginLeft:'2px'}} value={optionSelect?? optionSelect} onChange={(e)=>{setOptionSelect(e)}}>
            <Option value="Approved Users"><span style={{paddingLeft:'10px'}}>Approved Users</span></Option>
            <Option value="Pending User Requests"><span style={{paddingLeft:'10px'}}>Pending User Requests</span></Option>
            <Option value="Deleted Users"><span style={{paddingLeft:'10px'}}>Deleted Users</span></Option>
            {/* <Option value="User Activity">User Activity</Option> */}
        </Select>
        </div>
        <div  className='filter-user-management'>
          <UserMngFilters option={optionUserActivated} setOption={setOptionUserActivated} search={searchUserActivated}
          reset={resetActivated} title={'activated'}/>
          {/* <Input
            style={{ width: '30%', marginRight:'10px', height: '40px', borderRadius:'5px'}}
            placeholder="Search by Name"
            prefix={<SearchOutlined />}
          /> */}
          {/* <Select placeholder="Organization" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
              <Option value="Organization">Organization</Option>
          </Select> */}
          {/* <Select placeholder="Service Area" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
              <Option value="Service Area">Service Area</Option>
          </Select>
          <Select placeholder="User Designation" placement="bottomLeft" style={{marginRight:'10px', width: '19%', textAlign: 'initial', height:'36px'}} >
              <Option value="User Designation">User Designation</Option>
          </Select> */}
          {/* <Button className="btn-purple" onClick={()=>{setOpenFilters(true)}} style={{height:'40px', width:'8%'}}>
            Reset
          </Button> */}
        </div>
        <div className="button-space">

        </div>
      </div>
      <div className="table-user-management">
        {optionSelect !== 'User Activity' ?  <Table
          pagination={{ pageSize: 20 }}
          columns={columns}
          expandable={{
            expandedRowRender: record => {
            // console.log('entra record',userSelected);
            if(userSelected !== undefined){
            if(userSelected.user_id === record.user_id){
              return (
                <ProfileUser record={record} saveUser={getAllUser} deleteUser={deleteUserActivated} type="/deleted"
                deleteUserDatabase={deleteUserDatabase} />
              )
            }}
            },
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded && userSelected.user_id === record.user_id? (
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
          dataSource={optionSelect === 'Approved Users' ? userActivatedState:(optionSelect === 'Pending User Requests'? userPendingState:userDeleted )}
        /> : ()=> {getAllUserActivity() 
          // console.log('userActivity',userActivity);
          return <Table
          columns={columns2}
          dataSource={DATA_USER_ACTIVITY}
        /> }}
      </div>
    </div>
  </>
};

export default UserList;