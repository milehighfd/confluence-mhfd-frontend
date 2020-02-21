import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const menu = (
  <Menu>
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

export default () => {
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
            <Row>
              <Col span={12}>Aquí va el mapitash :v</Col>
              <Col style={{padding:'20px 0px'}} span={12}>
              {/*<Collapse accordion>
                <Panel header="" key="1">*/}
                  <Row className="head-m">
                    <Col span={12}>
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Westminter, CO  <img src="icons/icon-12.svg" alt=""/>
                      </a>
                    </Dropdown>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={12}>
                      <ButtonGroup>
                        <Button className="btn-mm"><img src="icons/icon-30.svg" alt=""/></Button>
                        <Button><img src="icons/icon-33.svg" alt=""/></Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  <div className="head-filter">
                    <Row>
                      <Col span={18}>
                        <Search
                          placeholder="Search..."
                          onSearch={value => console.log(value)}
                          style={{ width: 200 }}
                        />
                      </Col>
                      <Col style={{textAlign: 'right'}} span={3}>
                        <Dropdown overlay={menu}>
                          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Hover me <Icon type="down" />
                          </a>
                        </Dropdown>
                      </Col>
                      <Col style={{textAlign: 'right'}} span={3}>
                        <Button type="primary">Primary</Button>
                      </Col>
                    </Row>
                  </div>

                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1">
                      <div className="hastag">
                        <h6>Showing 67 Problems:</h6>
                        <Tag closable >
                           $600K - $1.2M
                        </Tag>
                        <Tag closable >
                           Active
                        </Tag>
                        <Tag closable >
                           Stream Restoration
                        </Tag>
                      </div>
                      <Row>
                        <Col span={8}>
                          <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                          >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                      Tab 2
                    </TabPane>
                  </Tabs>

                {/*</Panel>
                </Collapse>*/}
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
