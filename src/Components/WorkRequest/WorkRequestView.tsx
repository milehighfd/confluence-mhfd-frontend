import React, { useState, useEffect } from "react";
import { Row, Col, Button, Tabs } from 'antd';

import mapFormContainer from "../../hoc/mapFormContainer";
import DraftPanel from '../Shared/DraftPanel/DraftPanel';
import Chat from "../Shared/Chat/Chat";

import { PROJECT_TABS } from '../../constants/constants'
import { ProjectTabTypes } from "../../Classes/MapTypes";

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

const handleSaveDraftCard = () => {
  saveDraftCard(panelState, projectType);
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
        {PROJECT_TABS.map((tab : ProjectTabTypes, index : number) => {
          return (
            <TabPane tab={tab.name} key={'' + index}>
              <div className="work-request">
                <DraftPanel
                  headers={tab}
                  panelState={panelState}
                  setPanelState={setPanelState}
                  handleSaveDraftCard={handleSaveDraftCard} />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  </>
}

const layers = {
  polygons: true,
  components: true
}

export default mapFormContainer(WorkRequest, layers);