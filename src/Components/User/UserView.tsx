import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Tabs, Menu, Pagination } from 'antd';
import NavbarView from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarContainer";
import Accordeon from './UserComponents/Accordeon';
import UserFilters from './UserFilters';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { OptionsFiltersUser, User } from "../../Classes/TypeList";

const { Content } = Layout;
const { TabPane } = Tabs;
const getUserActivated = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
  datasets.getData(url, datasets.getToken()).then(res => {
    if (res.users) {
      saveUser(res.users);
      setUser(res.users);
      setTotal(res.pages * 10);
    }
  });
}

const options = {
  page: 1,
  limit: 10,
  name: '',
  organization: '',
  serviceArea: '',
  designation: '',
  sort: 'name'
}
export default ({ saveUserActivated, saveUserPending }: { saveUserActivated: Function, saveUserPending: Function }) => {
  const [userActivatedState, setUserActivatedState] = useState<any>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<any>([]);
  const [optionUserActivated, setOptionUserActivated] = useState<OptionsFiltersUser>(options);
  const [optionUserPending, setOptionUserPending] = useState<OptionsFiltersUser>(options);
  const [title, setTitle] = useState('');
  let pndPos = 0; // momentary forced adition until getting the DB Structure
  let aprPos = 0; // momentary forced adition until getting the DB Structure

  useEffect(() => {
    saveUserState();
  }, []);

  const saveUserState = () => {
    getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + urlOptions(optionUserActivated), setTotalUsersActivated);
    getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + urlOptions(optionUserPending), setTotalUsersPending);
  }

  const urlOptions = (options: OptionsFiltersUser) => {
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '')
      + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : ''
      + '&sort=' + options.sort) + '&limit=' + options.limit + '&page=' + options.page;
  }

  const searchUserActivated = (option: OptionsFiltersUser) => {
    getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + urlOptions(option), setTotalUsersActivated);
  }
  const searchUserPending = (option: OptionsFiltersUser) => {
    getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + urlOptions(option), setTotalUsersPending);
  }
  const deleteUserActivated = (id: string) => {
    setTitle(id);
    datasets.putData(SERVER.CHANGE_USER_STATE + '/' + id, {}, datasets.getToken()).then(res => {
      if (res?._id) {
        setOptionUserActivated(options);
        setOptionUserPending(options);
        saveUserState();
      }
    });

  }
  return <>
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="layout user">
          <Content style={{ padding: '0 120px' }}>
            <div>
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Approved Users" key="1">
                      <UserFilters option={optionUserActivated} setOption={setOptionUserActivated} search={searchUserActivated} />

                      {userActivatedState.map((user: any, index: number) => {
                        aprPos++;
                        return (
                          <div key={index} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={aprPos} saveUser={saveUserState} deleteUser={deleteUserActivated} />
                          </div>
                        );
                      })}

                      <div className="pagi-00">
                        <Pagination defaultCurrent={optionUserActivated.page} total={totalUsersActivated} onChange={(page, pageSize) => {
                          const auxOption = {...optionUserActivated};
                          auxOption.page = page;
                          setOptionUserActivated(auxOption);
                          searchUserActivated(auxOption);
                        }} />
                      </div>
                    </TabPane>

                    <TabPane tab="Pending User Requests" key="2">
                      <UserFilters option={optionUserPending} setOption={setOptionUserPending} search={searchUserPending} />

                      {userPendingState.map((user: any, index: number) => {
                        pndPos++;
                        return (
                          <div key={index} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={pndPos} saveUser={saveUserState} deleteUser={deleteUserActivated} />
                          </div>
                        );
                      })}

                      <div className="pagi-00">
                        <Pagination defaultCurrent={optionUserPending.page} total={totalUsersPending} onChange={(page, pageSize) => {
                          const auxOption = {...optionUserPending};
                          auxOption.page = page;
                          setOptionUserPending(auxOption);
                          searchUserPending(auxOption);
                        }} />
                      </div>
                    </TabPane>

                    {/* <TabPane tab="User Activity" key="3">
                          <Button className="btn-down"><img src="/Icons/icon-15.svg" alt=""/></Button>
                          <Row className="activity-h">
                            <Col span={5}><Button>Data and Time <img src="Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>User <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>City <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>Change <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                          </Row>
                          {usersActivity.map((user: {date: String, name: String, city: String, change: String}, index: number) => {
                            return <ListUser user={user} key={index}/>
                          })}
                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={200} />
                          </div>
                        </TabPane> */}
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
