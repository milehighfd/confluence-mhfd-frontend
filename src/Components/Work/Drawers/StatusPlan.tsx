import React, { useState } from "react";
import { Drawer, Button, Dropdown, Menu, List } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu className="menu-utilities">
    <Menu.Item key="0">
      <h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> Approved</h6>
      <p>MHFD Staff approves the Work Request.</p>
    </Menu.Item>
    <Menu.Item key="1">
      <h6><i className="mdi mdi-circle" style={{color:'#FFC664'}}></i> Under Review</h6>
      <p>MHFD Managers are currently reviewing the Work Plan proposal submitted by Staff.</p>
    </Menu.Item>
    <Menu.Item key="1">
      <h6><i className="mdi mdi-circle" style={{color:'#D1D1D1'}}></i> Not Initiated</h6>
      <p>MHFD Manager have not received the Work Plan proposal. </p>
    </Menu.Item>
  </Menu>
);

const data = [
  {
    title: 'City of Boulder',
    description:'Submitted 5/27/2020 • Thomas Jefferson, County Manager'
  },
  {
    title: 'City of Lafayette',
    description:'Pending • Thomas Jefferson, County Manager'
  },
  {
    title: 'Town of Jamestown',
    description:'Submitted 5/27/2020 • Thomas Jefferson, County Manager'
  },
  {
    title: 'Town of Lyons ',
    description:'Submitted 5/27/2020 • Thomas Jefferson, County Manager'
  },
];

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

      <p>Work Request <img src="/Icons/icon-19.svg" alt="" height="10px" /></p>
      <List
         itemLayout="horizontal"
         dataSource={data}
         renderItem={item => (
           <List.Item className="menu-utilities">
             <List.Item.Meta
               title={<h6><i className="mdi mdi-circle" style={{color:'#29C499'}}></i> {item.title}</h6>}
               description={
                 <p style={{width:'100%'}}>
                  {item.description}
                  <img src="/Icons/icon-64.svg" alt="" height="8px" style={{opacity:'0.3'}}/>
                 </p>
               }
             />
           </List.Item>
         )}
       />

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
