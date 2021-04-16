import React, { useState, useEffect } from "react";
import { Drawer, Row, Col, Input, Button, Dropdown, Menu, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default ({visible, setVisible}: {
  visible: boolean,
  setVisible: Function,
}) => {
  return (
    <Drawer
      title={<h5>
              <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> FILTER
              <Button className="btn-transparent"><CloseOutlined /></Button>
             </h5>}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="work-utilities"
    >
      <div className="filter-plan">
        <div className="head-f-p">JURISDICTION</div>
        <div className="body-f-p">
          <p>Boulder <span><Checkbox/></span></p>
          <p>Erie <span><Checkbox/></span></p>
          <p>Lafayette <span><Checkbox/></span></p>
          <p>Louisville <span><Checkbox/></span></p>
          <p>Superior <span><Checkbox/></span></p>
          <p>Unincorporated Boulder County <span><Checkbox/></span></p>
        </div>
      </div>

      <div className="filter-plan">
        <div className="head-f-p">SERVICE AREA</div>
        <div className="body-f-p">
          <p>North <span><Checkbox/></span></p>
          <p>Cherry Creek <span><Checkbox/></span></p>
          <p>Boulder Creek <span><Checkbox/></span></p>
          <p>West <span><Checkbox/></span></p>
          <p>Sand Creek <span><Checkbox/></span></p>
        </div>
      </div>
      <div className="footer-drawer">
        <Button className="btn-purple">Apply</Button>
      </div>
    </Drawer>
  )
}
