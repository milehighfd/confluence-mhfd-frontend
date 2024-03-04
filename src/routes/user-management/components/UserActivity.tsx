import React, { useEffect } from 'react';
import { Col, Row, Table } from 'antd';
import moment from 'moment';
import { ArrowDownOutlined} from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { useUsersDispatch, useUsersState } from 'hook/usersHook';

const UserActivity = () => {
  const columns2: ColumnsType<any> = [
    { title: 'Date and', dataIndex: 'registerDate', key: 'registerDate', sorter: (a, b) => a.registerDate.length - b.registerDate.length,},
    { title: 'User', dataIndex: 'user', key: 'user', sorter: (a, b) => a.user.length - b.user.length,},
    { title: 'City', dataIndex: 'city', key: 'city', sorter: (a, b) => a.city.length - b.city.length,},
    { title: 'Change', dataIndex: 'activityType', key: 'activityType',
    render: (activityType) => (
      <span className="span-activityType">
        {activityType}
      </span>
    ),
    sorter: (a, b) => a.activityType.length - b.activityType.length,
    },
  ];
  const { userActivity } = useUsersState();
  const { getUserActivity } = useUsersDispatch();

  const titleCase = (str:any)=> {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  };

  userActivity.data.forEach((element: any) => {
    const completeName = (element.firstName + " " + element.lastName);
    const activitytype: any = element.activityType!==undefined ?element.activityType:'-';
    element.city = element.city ? element.city : '-';
    element.activityType = titleCase(activitytype.replaceAll('_', ' '));
    element.user = completeName.includes('MHFD') ? completeName: titleCase(completeName);
    element.registerDate = moment(new Date('' + element.registerDate)).format('MM/DD/YYYY hh:mm A');
  });

  const pagination = {
    current: + userActivity.currentPage,
    pageSize: 20,
    total: userActivity.totalPages*20
  };

  const handleTableChange = (pagination: any, sorter: any) => {
    getUserActivity(getUrlOptionsUserActivity(pagination, sorter));
  };

  const getUrlOptionsUserActivity = (pagination: {current: number, pageSize: number}, sorter: {field?: string, order?: string}) => {
    return 'page=' + pagination.current + '&limit=' + pagination.pageSize + (sorter?.order ? ('&sort=' + sorter.field + '&sorttype=' + (sorter.order === "descend" ? 'DESC': 'ASC')): '&sort=registerDate&sorttype=DESC')
  }

  useEffect(() => {
    getUserActivity(getUrlOptionsUserActivity({current: 1, pageSize: 20}, {}));
  }, [])

  return (
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
          showSorterTooltip={false}
          columns={columns2}
          rowKey={record => record.id}
          dataSource={userActivity.data}
          pagination={pagination} onChange={(pagination, _, sort) => handleTableChange(pagination, sort)}
        />
      </div>
    </div>
  );
};

export default UserActivity;
