import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tabs, Input } from 'antd';

import mapFormContainer from "../../hoc/mapFormContainer";
import DraftPanel from '../Shared/DraftPanel/DraftPanel';
import Chat from "../Shared/Chat/Chat";

import { PROJECT_TABS } from '../../constants/constants'

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const { TabPane } = Tabs;

export const WorkRequest = ({ panel, saveDraftCard, getUserProjects, projectsByType } : { panel : any, saveDraftCard : Function, getUserProjects : Function, projectsByType : any}) => {
  const [visible, setVisible] = useState(false);
  const [panelState, setPanelState] = useState({});
  const [tabPosition, setTabPosition] = useState("0");
  const [projectType, setProjectType] = useState("capital");

  useEffect(() => {
    getUserProjects();
  }, [projectsByType, getUserProjects]);

  useEffect(() => {
    getProjectsByType(projectType);
  }, [panel]);

  useEffect(() => {
    if (tabPosition === "0") {
      getProjectsByType('capital');
    } else if (tabPosition === "1") {
      getProjectsByType('study');
    } else if (tabPosition === "2") {
      getProjectsByType('maintenance');
    }
  }, [tabPosition]);

const getProjectsByType = (type: string) => {
  if (panel && panel[type]) {
    setPanelState(panel[type]);
    setProjectType(type);
  }
}

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
        {PROJECT_TABS.map((tab : any, index : number) => {
          return (
            <TabPane tab={tab.name} key={'' + index}>
              <DraftPanel 
                headers={tab}
                panelState={panelState} 
                setPanelState={setPanelState}  />
            </TabPane>
          );
        })}
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
            <Button onClick={() => saveDraftCard(panelState, projectType)}>Submit to Admin</Button>
          </Col>
        </Row>
      </div>

    </div>
  </>
}

export default mapFormContainer(WorkRequest, null);