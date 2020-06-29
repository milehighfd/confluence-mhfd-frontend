import React from 'react';
import { Col, Row, Collapse, Popover } from 'antd';

const content = (<div className="popoveer-00">View Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

const genExtra = () => (
    <img src="/Icons/icon-20.svg" alt=""/>
  );
export default () => {
    const { Panel } = Collapse;

    return <Col style={{paddingLeft: '15px', height: '100%'}} span={7}>
    <Row style={{background: '#fff', height: '100%', borderTop: '17px solid rgba(37, 24, 99, 0.06)'}}>
      <Col className="profile-pad">
        <h2>Project Collaborators <Popover content={content}><img src="/Icons/icon-19.svg" alt="" style={{marginTop:'-3px', cursor: 'pointer'}} /></Popover></h2>
        <Collapse accordion
          bordered={false}
          defaultActiveKey={['1']}
          className="site-collapse-custom-collapse">
          <Panel header="West Tollgate Creek GSB Drops" key="1" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>Jon Villines</h6>
                  <p>Project Manager</p>
                </Col>
                <Col span={7} style={{textAlign: 'right'}}>
                  <span>MHFD</span>
                </Col>
              </Row>
            </div>
          </Panel>
          <Panel header="Piney Creek Channel Restoration" key="2" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>Jon Villines</h6>
                  <p>Project Manager</p>
                </Col>
                <Col span={7} style={{textAlign: 'right'}}>
                  <span>MHFD</span>
                </Col>
              </Row>
            </div>
          </Panel>
          <Panel header="Murphy Creek Bank Stabilization" key="3" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>Jon Villines</h6>
                  <p>Project Manager</p>
                </Col>
                <Col span={7} style={{textAlign: 'right'}}>
                  <span>MHFD</span>
                </Col>
              </Row>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </Row>
</Col>
}
