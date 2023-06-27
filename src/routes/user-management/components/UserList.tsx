import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Menu, Select, Table, Tabs } from 'antd';
import { ArrowDownOutlined, DownOutlined, MoreOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import { ColumnsType } from "antd/lib/table";
import ProfileUser from "./ProfileUser";
import { DATA_USER_ACTIVITY } from "../constants";
import * as datasets from "../../../Config/datasets";
import { OptionsFiltersUser, User } from "Classes/TypeList";
import { SERVER } from "Config/Server.config";
import { useUsersDispatch, useUsersState } from "hook/usersHook";
import { PAGE_USER } from "constants/constants";
import UserMngFilters from "./UserMngFilters";
import LoadingViewOverall from "Components/Loading-overall/LoadingViewOverall";

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
      sorter: (a, b) => (a.name.join(' ')).localeCompare((b.name.join(' '))),
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
      sorter: (a, b) => (a.designation).localeCompare((b.designation)),
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
    {
      title: <>Service Area</>,
      dataIndex: 'serviceArea',
      key: 'serviceArea',
      sorter: (a, b) => (a.serviceArea).localeCompare((b.serviceArea)),
    },
    {
      title: <>County</>,
      dataIndex: 'county',
      key: 'county',
      sorter: (a, b) => (a.county).localeCompare((b.county)), },
    {
      title: <>City</>,
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => (a.city).localeCompare((b.city)),
    },
    {
      title: <>Status</>,
      dataIndex: 'statusAccount',
      key: 'statusAccount',
      sorter: (a, b) => (a.statusAccount).localeCompare((b.statusAccount)),
      render: (statusAccount) => (
        <span className={'span-'+statusAccount}>
          <div className="circulo"/>{statusAccount}
        </span>
      ),
    },
    Table.EXPAND_COLUMN,
  ];
  const {
    userActivity
  } = useUsersState();
  const {
    saveUserActivated,
    saveUserPending,
    getAllUserActivity
  } = useUsersDispatch();
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [totalUsersDeleted, setTotalUsersDeleted] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<Array<User>>([]);
  const [userDeleted, setUserDeleted] = useState<Array<User>>([]);
  const [userActivatedState, setUserActivatedState] = useState<Array<User>>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const [messageError, setMessageError] = useState({ message: '', color: '#28C499' });

  const [optionUserActivated, setOptionUserActivated] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserPending, setOptionUserPending] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserDeleted, setOptionUserDeleted] = useState<OptionsFiltersUser>(PAGE_USER);
  const [userSelected, setUserSelected] = useState<any>();
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('Approved Users')
  const getUser = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
    datasets.getData(url, datasets.getToken()).then(res => {
      setIsLoading(false)
      const arrayUsers = res.users.map((elem: any) => {        
        return {
          ...elem,
          name: [elem.name, elem.email, elem.photo],
          statusAccount: elem.activated === true? 'Active': 'Inactive',
          serviceArea: elem.serviceArea !== null ? elem.serviceArea : '-',
          city: elem.city !== null ? elem.city : '-',
          county: elem.county !== null ? elem.county : '-',
          key:elem.user_id,
        }
      });
      if (res.users) {
        saveUser(res.users);
        setUser(arrayUsers);
        setTotal(res.totalPages * 10);
      }
    });
  }
let items = [
    { key: 'edit-user', label: 'Edit User' },
    //{ key: 'message-user', label: 'Message User' },
    { key: 'delete-user', label: 'Delete User' },
    { key: 'change-status', label: 'Approve User' },
  ];
  const menu = (record:any, onExpand:any)=> {
    switch (record.status) {
      case 'approved':
        items = [
          { key: 'edit-user', label: 'Edit User' },
          { key: 'delete-user', label: 'Delete User' },
        ];
        break;
      case 'deleted':
        items = [
          { key: 'change-status', label: 'Approve User' },
        ];
        break;
      case 'pending':
        items = [
          { key: 'edit-user', label: 'Edit User' },
          { key: 'change-status', label: 'Approve User' },
          { key: 'delete-user', label: 'Delete User' },  
        ];
        break;
    }

    return <Menu
      className="menu-login-dropdown"
      style={{ marginTop: '12px'}}
      items={items}
      onClick={({ key }) => {
        switch(key) {
          case 'edit-user':            
            setUserSelected(record);
            onExpand(record, key)
            break;
          {/*case 'message-user':
          break;*/}
          case 'delete-user':
            deleted(record.user_id)
            break;
          case 'change-status':
            changeStatus(record.user_id)
            break;
        }
      }}
    />
    };
  const urlOptions = (options: OptionsFiltersUser) => {
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '')
      + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : ''
      + '&sort=' + options.sort) + '&limit=' + 100000 + '&page=' + options.page;
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

  const updateError = (error: string) => {
    const auxMessageError = { ...messageError };
    auxMessageError.message = error;
    auxMessageError.color = 'red';
    setMessageError(auxMessageError);
    const timer = setTimeout(() => {
      const auxMessageError = { ...messageError };
      auxMessageError.message = '';
      auxMessageError.color = '#28C499';
      setMessageError(auxMessageError);
    }, 10000);
    return () => clearTimeout(timer);
  }

  const updateSuccessful = () => {
    const auxMessageError = { ...messageError };
    auxMessageError.message = 'Updating record data was successful';
    auxMessageError.color = '#28C499';
    setMessageError(auxMessageError);
    const timer = setTimeout(() => {
      const auxMessageError = { ...messageError };
      auxMessageError.message = '';
      auxMessageError.color = '#28C499';
      setMessageError(auxMessageError);
    }, 5000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    const resetOptions = {...PAGE_USER};
    searchUserActivated(resetOptions);
  }, []);
  useEffect(() => {
    const resetOptions = {...PAGE_USER};
    searchUserActivated(resetOptions);
    searchUserPending(resetOptions);
    searchUserDelete(resetOptions);
  }, [optionSelect]);

  const deleted = (record : number) => {    
    datasets.putData(SERVER.DELETE_USER + '/' + record, {record}, datasets.getToken()).then(res => { 
      if (res.message === 'SUCCESS') {        
        getAllUser();
        updateSuccessful();
      } else {
        if (res?.error) {
          updateError(res.error);
          console.log(res.error)
        }
        else {
          updateError(res);
        }
      }
    });
  }

  const changeStatus = (record : number) => {    
    datasets.putData(SERVER.CHANGE_USER_STATUS + '/' + record, {record}, datasets.getToken()).then(res => { 
      if (res.message === 'SUCCESS') {        
        getAllUser();
        updateSuccessful();
      } else {
        if (res?.error) {
          updateError(res.error);
          console.log(res.error)
        }
        else {
          updateError(res);
        }
      }
    });
    setIsLoading(false)
  }

  return <>
  {isLoading && <LoadingViewOverall />}
    <div>
      <div className="head-list">
        <div className="list-view-head" >
        <Select className="select-type" placeholder="Approved Users" placement="bottomLeft" style={{marginTop: '5px', marginLeft:'2px'}} value={optionSelect?? optionSelect} onChange={(e)=>{setOptionSelect(e); setIsLoading(true)}}>
            <Option value="Approved Users"><span style={{paddingLeft:'10px'}}>Approved Users</span></Option>
            <Option value="Pending User Requests"><span style={{paddingLeft:'10px'}}>Pending User Requests</span></Option>
            <Option value="Deleted Users"><span style={{paddingLeft:'10px'}}>Deleted Users</span></Option>
        </Select>
        </div>
        <div className='filter-user-management'>
          <UserMngFilters setIsLoading={setIsLoading} option={optionSelect === 'Approved Users' ? optionUserActivated : (optionSelect === 'Pending User Requests' ? optionUserPending : optionUserDeleted)} setOption={optionSelect === 'Approved Users' ? setOptionUserActivated : (optionSelect === 'Pending User Requests' ? setOptionUserPending : setOptionUserDeleted)} search={optionSelect === 'Approved Users' ? searchUserActivated : (optionSelect === 'Pending User Requests' ? searchUserPending : searchUserDelete)}
          reset={resetActivated} title={'activated'}/>
        </div>
        <div className="button-space">

        </div>
      </div>
      <div className="table-user-management">
        {optionSelect !== 'User Activity' ? <Table
          pagination={{ pageSize: 20 }}
          columns={columns}
          expandable={{
            expandedRowRender: record => {
            if(userSelected !== undefined){
            if(userSelected.user_id === record.user_id){
              return (
                <ProfileUser record={record} saveUser={getAllUser} />
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
          dataSource={optionSelect === 'Approved Users' ? userActivatedState:(optionSelect === 'Pending User Requests'? userPendingState:userDeleted )}
          sticky
        /> : ()=> {getAllUserActivity() 
          return <Table
          columns={columns2}
          dataSource={DATA_USER_ACTIVITY}
        /> }}
      </div>
    </div>
  </>
};

export default UserList;