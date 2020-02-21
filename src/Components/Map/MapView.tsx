import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
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
              <Col span={12}>
              <Collapse accordion>
                <Panel header="" key="1">
                  <Row>
                    <Col span={12}>
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Hover me <Icon type="down" />
                      </a>
                    </Dropdown>
                    </Col>
                    <Col span={12}>
                      <ButtonGroup>
                        <Button>Cancel</Button>
                        <Button>OK</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Panel>
                </Collapse>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
