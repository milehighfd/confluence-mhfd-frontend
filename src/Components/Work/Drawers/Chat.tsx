import React, { useState } from "react";
import { Drawer, Row, Col, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default () => {
  const [visible, setVisible] = useState(false);
   const showDrawer = () => {
     setVisible(true);
   };
  return (
    <>
    <Button onClick={showDrawer} >
      Drawer
    </Button>
    <Drawer
      title={<h5>
              <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> CHAT
              <Button className="btn-transparent"><CloseOutlined /></Button>
             </h5>}
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="chat-r work-utilities"
    >
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
        </Col>
        <Col span={13}>
          <h6>Jon Villines</h6>
          <p>Project Manager</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>MHFD</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
        </Col>
        <Col span={13}>
          <h6>Carolyn Roan</h6>
          <p>Floodplain Administration</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>City of Littleton</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
        </Col>
        <Col span={13}>
          <h6>Deb Ohlinger</h6>
          <p>People Manager</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>Olsson</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
        </Col>
        <Col span={13}>
          <h6>Amy Gabor</h6>
          <p>Project Engineer</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>Olsson</span>
        </Col>
      </Row>
      <div className="chat-00">
        <div className="chat-head">
          Comments <img src="/Icons/icon-19.svg" alt="" height="15px" />
        </div>
        <div className="chat-body">
          <img src="/Icons/icon-61.svg" alt="" />
          <h6>Share your thoughts</h6>
          <p>
            Let everyone in your group know
            what you think about this listing
        </p>
        </div>
        <div className="chat-footer">
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="35px" style={{borderRadius: '50%'}}/>
            </Col>
            <Col span={13}>
              <Input placeholder="Add a comment..." />
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button className="btn-send">SEND</Button>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  </>
  )
}
