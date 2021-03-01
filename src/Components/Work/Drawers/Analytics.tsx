import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Menu, Select } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
const { Option } = Select;

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
              <Select defaultValue="2021" style={{ width: 75 }}>
                <Option value="jack">2022</Option>
                <Option value="lucy">2023</Option>
                <Option value="Yiminghe">2024</Option>
              </Select>
              <Button className="btn-transparent"><CloseOutlined /></Button>
             </h5>}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <h6>Requests by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph"></div>

      <h6>Dollars Requested by County <img src="/Icons/icon-19.svg" alt="" height="10px" /></h6>
      <div className="graph"></div>
    </Drawer>
  </>
  )
}
