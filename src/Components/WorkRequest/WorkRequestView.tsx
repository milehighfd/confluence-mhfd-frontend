import React, { useState } from "react";
import { Row, Col, Button, Tabs, Input } from 'antd';

import mapFormContainer from "../../hoc/mapFormContainer";
import DraftPanel from '../Shared/DraftPanel/DraftPanel';

import { DEFAULT_HEADERS, MAINTENANCE_HEADERS, SPECIAL_HEADERS } from '../../constants/constants'
import Chat from "../Shared/Chat/Chat";

const { TabPane } = Tabs;

export const WorkRequest = () => {
  const [visible, setVisible] = useState(false);
  const [tabPosition, setTabPosition] = useState("1");

  return <>
    <Chat visible={visible} setVisible={setVisible} />
    <div className="count request">
      <Row>
        <Col span={14}><h2>Boulder County Work Request</h2></Col>
        <Col span={10} style={{ textAlign: 'right' }}>
          <Button className="btn-request"><img src="/Icons/icon-01.svg" alt="" /></Button>
          <Button className="btn-request"><img src="/Icons/icon-02.svg" alt="" /></Button>
          <Button className="btn-comment" onClick={() => setVisible(true)}><img src="/Icons/icon-03.svg" alt="" /> Comments</Button>
        </Col>
      </Row>

      <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
        <TabPane tab="Capital" key="1">
          <DraftPanel headers={DEFAULT_HEADERS} />
        </TabPane>
        <TabPane tab="Study" key="2">
          <DraftPanel headers={DEFAULT_HEADERS} />
        </TabPane>
        <TabPane tab="Maintenance" key="3">
          <DraftPanel headers={MAINTENANCE_HEADERS} />
        </TabPane>
        <TabPane tab="Acquisition" key="4">
          <DraftPanel headers={SPECIAL_HEADERS} />
        </TabPane>
        <TabPane tab="Special" key="5">
          <DraftPanel headers={SPECIAL_HEADERS} />
        </TabPane>
      </Tabs>

      <div className="cost-wr">
        <Row gutter={[16, 24]} style={{ padding: '0px 20px' }}>
          <Col span={6}><h5>TOTAL REQUESTED</h5></Col>
          <Col span={6}><Input placeholder="Total cost" /></Col>
          <Col span={6}><Input placeholder="Total cost" /></Col>
          <Col span={6}><Input placeholder="Total cost" /></Col>
        </Row>
        <Row gutter={[16, 24]} style={{ padding: '0px 20px' }}>
          <Col span={6}><h5>Target Cost</h5></Col>
          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
          <Col span={6}><Input className="input-pp" placeholder="Enter target cost" /></Col>
        </Row>
        <Row gutter={[16, 24]} style={{ padding: '0px 20px' }}>
          <Col span={6}><h5>Differential</h5></Col>
          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
          <Col span={6}><Input className="input-rr" placeholder="XXX Difference" /></Col>
        </Row>
        <Row style={{ padding: '0px 20px' }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button>Submit to Admin</Button>
          </Col>
        </Row>
      </div>

    </div>
  </>
}

export default mapFormContainer(WorkRequest, null);