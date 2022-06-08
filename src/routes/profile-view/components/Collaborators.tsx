import React from 'react';
import { Col, Row, Collapse, Popover } from 'antd';

const content = (<div className="popoveer-00">View Projects within the Area of Interest, as defined by the "Default Map Zoom Area" in the "Edit Profile" section</div>);

const genExtra = () => (
    <img src="/Icons/icon-20.svg" alt=""/>
  );
const Collaborators = () => {
  const { Panel } = Collapse;

  return <Col style={{paddingLeft: '15px', height: '100%'}} span={7} className="mobile-display">
    <Row style={{background: '#fff', height: '100%', borderTop: '17px solid #f5f7ff'}}>
      <Col className="profile-pad" style={{ width: '100%' }}>
        <h2>Project Collaborators <Popover content={content}><img src="/Icons/icon-19.svg" alt="" style={{marginTop:'-3px', cursor: 'pointer'}} /></Popover></h2>
        <Collapse accordion
          bordered={false}
          defaultActiveKey={['1']}
          className="site-collapse-custom-collapse">
          <Panel header="Project 1" key="1" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>TBD</h6>
                  <p>Project Manager</p>
                </Col>
                <Col span={7} style={{textAlign: 'right'}}>
                  <span>MHFD</span>
                </Col>
              </Row>
            </div>
          </Panel>
          <Panel header="Project 2" key="2" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>TBD</h6>
                  <p>Project Manager</p>
                </Col>
                <Col span={7} style={{textAlign: 'right'}}>
                  <span>MHFD</span>
                </Col>
              </Row>
            </div>
          </Panel>
          <Panel header="Project 3" key="3" className="site-collapse-custom-panel" extra={genExtra()}>
            <div className="chat-r pad-collab">
              <Row>
                <Col span={3}>
                  <img src="/Icons/icon-28.svg" alt="" height="35px"/>
                </Col>
                <Col span={14}>
                  <h6>TBD</h6>
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

export default Collaborators;
