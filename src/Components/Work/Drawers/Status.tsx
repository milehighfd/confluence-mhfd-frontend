import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Dropdown, Menu } from 'antd';
import { CloseOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu className="menu-utilities">
    <Menu.Item key="0">
      <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
      <p>MHFD Staff approves the Work Request.</p>
    </Menu.Item>
    <Menu.Item key="1">
      <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
      <p>MHFD Staff are developing or reviewing the Work Request.</p>
    </Menu.Item>
  </Menu>
);

export default ({ visible, setVisible }: {
  visible: boolean,
  setVisible: Function,
}) => {

  return (
    <Drawer
      title={<h5>
        <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> STATUS</h5>
      }
      placement="right"
      closable={true}
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
      <textarea className="note" rows={8}>

      </textarea>

      <div className="footer-drawer">
        <Button className="btn-purple">Save</Button>
      </div>
    </Drawer>
  )
}
