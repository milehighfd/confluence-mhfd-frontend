import React, { useState, useEffect } from "react";
import {Layout, Row, Col, Tabs, Menu, Pagination} from 'antd';
import NavbarView from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarContainer";
import Accordeon from './ApprovedUsers/Accordeon';
import UserFilters from './UserFilters';
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
const {Content} = Layout;
const { TabPane } = Tabs;
const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const dropdownMenu = ({handleDropdowns, index, id} : any) => (
  <Menu className="js-mm-00">
    <Menu.Item key="1" onClick={() => handleDropdowns('1st menu item', index, id)}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
      1st menu item
      </a>
    </Menu.Item>
    <Menu.Item key="2" onClick={() => handleDropdowns('2nd menu item', index, id)}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
      2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item key="3" onClick={() => handleDropdowns('3rd menu item', index, id)}>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
      3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const getUserActivated = (saveUser: Function, setUser: Function, url: string, setTotal: Function) => {
  datasets.getData(url, datasets.getToken()).then(res => {
    if(res.users) {
      saveUser(res.users);
      setUser(res.users);
      setTotal(res.pages * 10);
    }
  });
}

const options = {
  name: '',
  organization: '',
  serviceArea: '',
  designation: ''
}
export default ({ saveUserActivated, saveUserPending } : {saveUserActivated: Function, saveUserPending: Function}) => {
  const [userActivatedState, setUserActivatedState] = useState<any>([]);
  const [totalUsersActivated, setTotalUsersActivated] = useState<number>(0);
  const [totalUsersPending, setTotalUsersPending] = useState<number>(0);
  const [userPendingState, setUserPendingState] = useState<any>([]);
  const [optionUserActivated, setOptionUserActivated] = useState(options);
  const [optionUserPending, setOptionUserPending] = useState(options);
  let pndPos = 0; // momentary forced adition until getting the DB Structure
  let aprPos = 0; // momentary forced adition until getting the DB Structure

  useEffect(() => {
    getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS, setTotalUsersActivated);
    getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS + '?pending=false', setTotalUsersPending);
  }, []);
  const handleDropdowns = (value : string, index : number, id : string) => {
    const user = [...userActivatedState];
    if(id === 'organization') user[index].profile[id] = value;
    else user[index].areas[id] = value;
    setUserActivatedState(user);
  }

  const saveUserState = (approved : boolean) => {
    const user = [...userActivatedState];
    setOptionUserActivated(options);
    getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS, setTotalUsersActivated);
    getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS + '?pending=false', setTotalUsersPending);
  }

  // const saveUserPendingState = (approved : boolean) => {
  //   setOptionUserActivated(options);
  //   getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS, setTotalUsersActivated);
  //   getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS + '?pending=false', setTotalUsersPending);
  // }

  const urlOptions = (options: {name: string, organization: string, serviceArea: string, designation: string}) => {
    return 'name=' + (options.name ? options.name : '') + '&organization=' + (options.organization ? options.organization : '') 
          + '&serviceArea=' + (options.serviceArea ? options.serviceArea : '') + '&designation=' + (options.designation ? options.designation : '');
  }

  const searchUserActivated = (option: {name: string, organization: string, serviceArea: string, designation: string}) => {
    const searchOption = urlOptions(option);
    getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS + '?' + searchOption, setTotalUsersActivated);
  }

  const searchUserPending = (option: {name: string, organization: string, serviceArea: string, designation: string}) => {
    const searchOption = urlOptions(option);
    getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS + '?pending=false&' + searchOption, setTotalUsersPending);
  }
  const deleteUserActivated = (id: string) => {
    datasets.putData(SERVER.CHANGE_USER_STATE + '/' + id, {},datasets.getToken()).then(res => {
      if(res?._id) {
        setOptionUserActivated(options);
        setOptionUserPending(options);
        getUserActivated(saveUserActivated, setUserActivatedState, SERVER.LIST_USERS, setTotalUsersActivated);
        getUserActivated(saveUserPending, setUserPendingState, SERVER.LIST_USERS + '?pending=false', setTotalUsersPending);
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
                          <UserFilters menu={menu} option={optionUserActivated} setOption={setOptionUserActivated} search={searchUserActivated} />

                          {userActivatedState.map((user : any, index : number) => {
                              aprPos++;
                              return (
                                <div key={index} style={{marginBottom: 10}}>
                                  <Accordeon
                                    menu={dropdownMenu}
                                    user={user}
                                    index={index}
                                    pos={aprPos}
                                    saveUser={saveUserState}
                                    handleDropdowns={handleDropdowns}
                                    deleteUser={deleteUserActivated} />
                                </div>
                              );
                          })}

                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={totalUsersActivated} />
                          </div>
                        </TabPane>

                        <TabPane tab="Pending User Requests" key="2">
                        <UserFilters menu={menu} option={optionUserPending} setOption={setOptionUserPending} search={searchUserPending} />

                          {userPendingState.map((user : any, index : number) => {
                            if(!user.approved) {
                              pndPos++;
                              return (
                                <div key={index} style={{marginBottom: 10}}>
                                  <Accordeon
                                    menu={dropdownMenu}
                                    user={user}
                                    index={index}
                                    pos={pndPos}
                                    saveUser={saveUserState}
                                    handleDropdowns={handleDropdowns}
                                    deleteUser={deleteUserActivated} />
                                </div>
                              );
                            }
                          })}

                        <div className="pagi-00">
                          <Pagination defaultCurrent={1} total={totalUsersPending} />
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
