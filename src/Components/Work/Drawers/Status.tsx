import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Dropdown, Menu } from 'antd';
import { CloseOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu className="menu-utilities">
    <Menu.Item key="0">
      <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
      <label>MHFD Staff approves the Work Request.</label>
    </Menu.Item>
    <Menu.Item key="1">
      <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
      <label>MHFD Staff are developing or reviewing the Work Request.</label>
    </Menu.Item>
  </Menu>
);

export default () => {
  const [visible, setVisible] = useState(false);
   const showDrawer = () => {
     setVisible(true);
   };
   const onClose = () => {
     setVisible(false);
   };
  return (
    <>
    <Button onClick={showDrawer} >
      Drawer
    </Button>
    <Drawer
      title={<h5>
              <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> STATUS
              <Button className="btn-transparent"><CloseOutlined /></Button>
             </h5>}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <h6>Status Management</h6>
      <p>Work Request Status <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>

      <Dropdown overlay={menu} trigger={['click']}>
        <Button className="ant-dropdown-link">
          -Select- <DownOutlined />
        </Button>
      </Dropdown>

      <p>Notes <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
      <div className="note">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur.</div>

      <div className="footer-drawer">
        <Button className="btn-purple">Save</Button>
      </div>
    </Drawer>
  </>
  )
}
