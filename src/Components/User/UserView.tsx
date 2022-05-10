import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Tabs, Pagination, Button, Table } from 'antd';
import Navbar from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Accordeon from './UserComponents/Accordeon';
import UserFilters from './UserFilters';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { OptionsFiltersUser, User, UserActivities } from "../../Classes/TypeList";
import { PAGE_USER, COLUMNS_USER_ACTIVITY } from "../../constants/constants";

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const { Content } = Layout;
const { TabPane } = Tabs;
const getUser = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
  datasets.getData(url, datasets.getToken()).then(res => {
    if (res.users) {
      saveUser(res.users);
      setUser(res.users);
      setTotal(res.totalPages * 10);
    }
  });
}

export default ({ saveUserActivated, saveUserPending, userActivity, getUserActivity, getAllUserActivity, getUserInformation, user } :
  { saveUserActivated: Function, saveUserPending: Function, userActivity: UserActivities, getUserActivity: Function, getAllUserActivity: Function, getUserInformation: Function, user: User }) => {
  const [userActivatedState, setUserActivatedState] = useState<Array<User>>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [totalUsersDeleted, setTotalUsersDeleted] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<Array<User>>([]);
  const [userDeleted, setUserDeleted] = useState<Array<User>>([]);
  const [optionUserActivated, setOptionUserActivated] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserPending, setOptionUserPending] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserDeleted, setOptionUserDeteled] = useState<OptionsFiltersUser>(PAGE_USER);
  let pndPos = 0; // momentary forced adition until getting the DB Structure
  let aprPos = 0; // momentary forced adition until getting the DB Structure
  let delPos = 0;
  useEffect(() => {
    getAllUser();
  }, []);
  useEffect(() => {
    getUserActivity(getUrlOptionsUserActivity({current: 1, pageSize: 20}, {}));
  }, [])

  const getAllUser = () => {
    getUser(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + 'status=approved&' + urlOptions(optionUserActivated), setTotalUsersActivated);
    getUser(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + 'status=pending&' + urlOptions(optionUserPending), setTotalUsersPending);
    getUser(saveUserPending, setUserDeleted, SERVER.LIST_USERS_ACTIVATED + 'status=deleted&' + urlOptions(optionUserDeleted), setTotalUsersDeleted);
  }

  const urlOptions = (options: OptionsFiltersUser) => {
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '')
      + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : ''
      + '&sort=' + options.sort) + '&limit=' + options.limit + '&page=' + options.page;
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
  const deleteUserActivated = (id: string) => {
    datasets.putData(SERVER.CHANGE_USER_STATE + '/' + id, {}, datasets.getToken()).then(res => {
      if (res?._id) {
        getAllUser();
      }
    });

  }
  const deleteUserDatabase = (id: String) => {
    datasets.deleteData(SERVER.DELETE_USER + '/' + id, datasets.getToken()).then(res => {
      getAllUser();
    })
  }
  const resetActivated = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserActivated(resetOptions);
    searchUserActivated(resetOptions);
  }
  const resetPending = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserPending(resetOptions);
    searchUserPending(resetOptions);
  }
  const resetDeleted = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserDeteled(resetOptions);
    searchUserDelete(resetOptions);
  }
  userActivity.data.forEach(element => {
    element.name = element.firstName + " " + element.lastName;
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
  return <>
    <Layout>
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="layout user">
          <Content style={{ padding: '0 120px' }}>
            <div>
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Approved Users" key="1">
                      <UserFilters option={optionUserActivated} setOption={setOptionUserActivated} search={searchUserActivated}
                        reset={resetActivated} title={'activated'}/>
                      {userActivatedState.map((user: User, index: number) => {
                        aprPos++;
                        return (
                          <div key={user._id} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={(((optionUserActivated.page - 1) * 10) + aprPos)}
                              saveUser={getAllUser} deleteUser={deleteUserActivated} type="/deleted"
                              deleteUserDatabase={deleteUserDatabase} />
                          </div>
                        );
                      })}

                      <div className="pagi-00">
                        <Pagination current={optionUserActivated.page} total={totalUsersActivated} onChange={(page, pageSize) => {
                          const auxOption = {...optionUserActivated};
                          auxOption.page = page;
                          setOptionUserActivated(auxOption);
                          searchUserActivated(auxOption);
                        }} />
                      </div>
                    </TabPane>

                    <TabPane tab="Pending User Requests" key="2">
                      <UserFilters option={optionUserPending} setOption={setOptionUserPending} search={searchUserPending}
                        reset={resetPending} title={'pending'}/>
                      {userPendingState.map((user: User, index: number) => {
                        pndPos++;
                        return (
                          <div key={user._id} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={((optionUserPending.page - 1) * 10) + pndPos}
                              saveUser={getAllUser} deleteUser={deleteUserActivated} type="/approved"
                              deleteUserDatabase={deleteUserDatabase} />
                          </div>
                        );
                      })}

                      <div className="pagi-00">
                        <Pagination current={optionUserPending.page} total={totalUsersPending} onChange={(page, pageSize) => {
                          const auxOption = {...optionUserPending};
                          auxOption.page = page;
                          setOptionUserPending(auxOption);
                          searchUserPending(auxOption);
                        }} />
                      </div>
                    </TabPane>
                    <TabPane tab="Deleted Users" key="4">
                      <UserFilters option={optionUserDeleted} setOption={setOptionUserDeteled} search={searchUserDelete}
                        reset={resetDeleted} title={'deleted'}/>
                      {userDeleted.map((user: User, index: number) => {
                        delPos++;
                        return (
                          <div key={user._id} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={((optionUserDeleted.page - 1) * 10) + delPos}
                              saveUser={getAllUser} deleteUser={deleteUserActivated} type="/approved"
                              deleteUserDatabase={deleteUserDatabase} />
                          </div>
                        );
                      })}

                      <div className="pagi-00">
                        <Pagination current={optionUserDeleted.page} total={totalUsersDeleted} onChange={(page, pageSize) => {
                          const auxOption = {...optionUserDeleted};
                          auxOption.page = page;
                          setOptionUserDeteled(auxOption);
                          searchUserDelete(auxOption);
                        }} />
                      </div>
                    </TabPane>

                    <TabPane tab="User Activity" key="3">
                          <Button className="btn-transparent" onClick={() => {
                            getAllUserActivity();
                          }}>
                            <img src="/Icons/icon-15.svg" alt=""/>
                          </Button>
                          <Table columns={COLUMNS_USER_ACTIVITY} rowKey={record => record.registerDate} dataSource={userActivity.data}
                            pagination={pagination} onChange={(pagination, filters, sort) => handleTableChange(pagination, filters, sort)}/>
                    </TabPane>
                  </Tabs>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </>
}
