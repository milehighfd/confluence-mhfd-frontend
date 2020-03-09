import React, { useState, useEffect } from "react";
import {Layout, Row, Col, Tabs, Input, Menu, Dropdown, Button, Icon, Collapse, Radio, Switch, Table, Divider, Tag, Pagination} from 'antd';
import NavbarView from "../Navbar/NavbarContainer";
import SidebarView from "../Sidebar/SidebarContainer";
import Accordeon from './ApprovedUsers/Accordeon';
import UserFilters from './UserFilters';

const {Content} = Layout;
const { TabPane } = Tabs;
const { Search } = Input;
const { Panel } = Collapse;
const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="user" />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2">
      <Icon type="user" />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3">
      <Icon type="user" />
      3rd menu item
    </Menu.Item>
  </Menu>
);

const dropdownMenu = ({handleDropdowns, index, id} : any) => (
  <Menu>
    <Menu.Item key="1" onClick={() => handleDropdowns('1st menu item', index, id)}>
      <Icon type="user" />
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" onClick={() => handleDropdowns('2nd menu item', index, id)}>
      <Icon type="user" />
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" onClick={() => handleDropdowns('3rd menu item', index, id)}>
      <Icon type="user" />
      3rd menu item
    </Menu.Item>
  </Menu>
);

const genExtra = () => (
  <Row className="user-head" type="flex" justify="space-around" align="middle">
    <Col span={19}>
      <h6>1. Ronnie Gougers</h6>
      <span>(Organization - Service Area - User Designation)</span>
    </Col>
    <Col span={3} style={{textAlign: 'right'}}>
      <div>
        <Switch defaultChecked />
      </div>
    </Col>
    <Col span={1} style={{textAlign: 'right'}}><img src="Icons/icon-20.svg" alt=""/></Col>
  </Row>
);

export default ({ users, saveUserState, deleteUser } : any) => {
  const [userState, setUserState] = useState<any>([]);
  let pndPos = 0; // momentary forced adition until getting the DB Structure
  let aprPos = 0; // momentary forced adition until getting the DB Structure

  useEffect(() => {
    setUserState(users);
  }, [users])

  const handleDropdowns = (value : string, index : number, id : string) => {
    const user = [...userState];
    if(id === 'organization') user[index].profile[id] = value;
    else user[index].areas[id] = value;
    setUserState(user);
  }

  const handleRadioButton = (e : any, index : number) => {
    const user = [...userState];
    user[index][e.target.name] = e.target.value;
    setUserState(user);
  }

  const saveUser = (approved : boolean, index : number) => {
    const user = [...userState];
    user[index]['approved'] = approved;
    setUserState(user);
    saveUserState(user);
  }

  return <>
    <Layout>
      <NavbarView></NavbarView>
        <Layout>
            <SidebarView></SidebarView>
            <Layout className="layout user">
              <Content style={{ padding: '0 132.7px' }}>
                <div>
                  <Row>
                    <Col span={24}>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="Approved Users" key="1">
                          <UserFilters menu={menu} />

                          {userState.map((user : any, index : number) => {
                            if(user.approved) {
                              aprPos++;
                              return (
                                <div key={index} style={{marginBottom: 10}}>
                                  <Accordeon 
                                    menu={dropdownMenu}
                                    user={user}
                                    index={index}
                                    pos={aprPos}
                                    handleDropdowns={handleDropdowns}
                                    handleRadioButton={handleRadioButton}
                                    saveUser={saveUser}
                                    deleteUser={deleteUser} />
                                </div>
                              );
                            }
                          })}
                          
                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={200} />
                          </div>
                        </TabPane>

                        <TabPane tab="Pending User Requests" key="2">
                        <UserFilters menu={menu} />

                          {userState.map((user : any, index : number) => {
                            if(!user.approved) {
                              pndPos++;
                              return (
                                <div key={index} style={{marginBottom: 10}}>
                                  <Accordeon 
                                    menu={dropdownMenu}
                                    user={user}
                                    index={index}
                                    pos={pndPos}
                                    handleDropdowns={handleDropdowns}
                                    handleRadioButton={handleRadioButton}
                                    saveUser={saveUser}
                                    deleteUser={deleteUser} />
                                </div>
                              );
                            }
                          })}

                        <div className="pagi-00">
                          <Pagination defaultCurrent={1} total={200} />
                        </div>
                        </TabPane>

                        <TabPane tab="User Activity" key="3">
                          <Button className="btn-down"><img src="/Icons/icon-15.svg" alt=""/></Button>
                          <Row className="activity-h">
                            <Col span={5}><Button>Data and Time <img src="Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>User <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>City <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                            <Col span={5}><Button>Change <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <Row className="activity-b">
                            <Col span={5}>09/16/2019, 06:17PM</Col>
                            <Col span={5}>Jovanna Maiani</Col>
                            <Col span={5}>Westminster</Col>
                            <Col span={5}><a href="">User Login</a></Col>
                          </Row>

                          <div className="pagi-00">
                            <Pagination defaultCurrent={1} total={200} />
                          </div>
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
