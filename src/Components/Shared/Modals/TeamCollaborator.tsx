import React from 'react';
import { Row, Col, Input, Button } from 'antd';

export default () => {
  return <div className="chat-r">
    <h5>Team Collaborators</h5>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6>TBD</h6>
        <p>Project Manager</p>
      </Col>
      <Col span={7} style={{ textAlign: 'right' }}>
        <span>MHFD</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6>TBD</h6>
        <p>Floodplain Administration</p>
      </Col>
      <Col span={7} style={{ textAlign: 'right' }}>
        <span>City of Littleton</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6>TBD</h6>
        <p>People Manager</p>
      </Col>
      <Col span={7} style={{ textAlign: 'right' }}>
        <span>Olsson</span>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <img src="/Icons/icon-28.svg" alt="" height="35px" />
      </Col>
      <Col span={13}>
        <h6>TBD</h6>
        <p>Project Engineer</p>
      </Col>
      <Col span={7} style={{ textAlign: 'right' }}>
        <span>Olsson</span>
      </Col>
    </Row>
    <div className="chat-00">
      <div className="chat-head">
        Comments <img src="/Icons/icon-19.svg" alt="" height="20px" />
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
            <img src="/Icons/icon-28.svg" alt="" height="35px" />
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
  </div>
}
