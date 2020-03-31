import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Tabs, Menu, Pagination } from 'antd';
import NavbarView from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarContainer";
import Accordeon from './UserComponents/Accordeon';
import UserFilters from './UserFilters';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { OptionsFiltersUser, User } from "../../Classes/TypeList";
import { PAGE_USER } from "../../constants/constants";

const { Content } = Layout;
const { TabPane } = Tabs;
const getUser = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
  datasets.getData(url, datasets.getToken()).then(res => {
    if (res.users) {
      saveUser(res.users);
      setUser(res.users);
      setTotal(res.pages * 10);
    }
  });
}

export default ({ saveUserActivated, saveUserPending }: { saveUserActivated: Function, saveUserPending: Function }) => {
  const [userActivatedState, setUserActivatedState] = useState<Array<User>>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<Array<User>>([]);
  const [optionUserActivated, setOptionUserActivated] = useState<OptionsFiltersUser>(PAGE_USER);
  const [optionUserPending, setOptionUserPending] = useState<OptionsFiltersUser>(PAGE_USER);
  const [title, setTitle] = useState('');
  let pndPos = 0; // momentary forced adition until getting the DB Structure
  let aprPos = 0; // momentary forced adition until getting the DB Structure

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    getUser(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + urlOptions(optionUserActivated), setTotalUsersActivated);
    getUser(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + urlOptions(optionUserPending), setTotalUsersPending);
  }

  const urlOptions = (options: OptionsFiltersUser) => {
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '')
      + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : ''
      + '&sort=' + options.sort) + '&limit=' + options.limit + '&page=' + options.page;
  }

  const searchUserActivated = (option: OptionsFiltersUser) => {
    getUser(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS_ACTIVATED + urlOptions(option), setTotalUsersActivated);
  }
  const searchUserPending = (option: OptionsFiltersUser) => {
    getUser(saveUserPending, setUserPendingState, SERVER.LIST_USERS_PENDING + urlOptions(option), setTotalUsersPending);
  }
  const deleteUserActivated = (id: string) => {
    setTitle(id);
    datasets.putData(SERVER.CHANGE_USER_STATE + '/' + id, {}, datasets.getToken()).then(res => {
      if (res?._id) {
        getAllUser();
      }
    });

  }
  const resetActivated = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserActivated(resetOptions);
    searchUserActivated(resetOptions);
    console.log(optionUserActivated);
    
  }
  const resetPending = () => {
    const resetOptions = {...PAGE_USER};
    setOptionUserPending(resetOptions);
    searchUserPending(resetOptions);
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
                      <UserFilters option={optionUserActivated} setOption={setOptionUserActivated} search={searchUserActivated} reset={resetActivated}/>

                      {userActivatedState.map((user: User, index: number) => {
                        aprPos++;
                        return (
                          <div key={index} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={(((optionUserActivated.page - 1) * 10) + aprPos)} saveUser={getAllUser} deleteUser={deleteUserActivated} />
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
                      <UserFilters option={optionUserPending} setOption={setOptionUserPending} search={searchUserPending} reset={resetPending}/>

                      {userPendingState.map((user: User, index: number) => {
                        pndPos++;
                        return (
                          <div key={index} style={{ marginBottom: 10 }}>
                            <Accordeon user={user} pos={((optionUserPending.page - 1) * 10) + pndPos} saveUser={getAllUser} deleteUser={deleteUserActivated} />
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
