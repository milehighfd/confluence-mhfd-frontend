import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button, Tabs, Select } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Chat from "../Shared/Chat/Chat";
import DraftPanel from "../Shared/DraftPanel/DraftPanel";

import { PROJECT_TABS } from '../../constants/constants'
import { ProjectTabTypes } from "../../Classes/MapTypes";

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const { TabPane } = Tabs;
const { Option } = Select;

const workPlanGraphs = (saveDraftCard : Function) => (
  <Col span={6}>
    <div style={{ display: 'flex' }}>
      <h3 style={{ width: '50%' }}>Analysis</h3>
      <Select defaultValue="2021" style={{ width: '50%' }}>
        <Option value="2020">2020</Option>
        <Option value="2021">2021</Option>
        <Option value="2022">2022</Option>
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>
    </div>

    <div className="work-pc">
      <div className="wp-chart">
        <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt="" /></h5>
      </div>
      <div className="wp-chart">
        <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt="" /></h5>
      </div>
    </div>

    <div className="cost-wr" style={{padding: '20px 0px' }}>
      <Row>
        <Col className="cost-rows" style={{paddingRight: 8}}>
          <Button className="btn-00">Save Work Plan</Button>
          <Button onClick={() => saveDraftCard()} >
            Submit to Admin
          </Button>
        </Col>
      </Row>
    </div>
  </Col>
);

export default ({ panel, projectsByType, getUserProjects, saveDraftCard, getProjectWithFilters } : { panel : any, saveDraftCard : Function, getUserProjects : Function, projectsByType : any, getProjectWithFilters: Function}) => {
  const [visible, setVisible] = useState(false);
  const [panelState, setPanelState] = useState({});
  const [tabPosition, setTabPosition] = useState("0");
  const [projectType, setProjectType] = useState("capital");

  useEffect(() => {
    getProjectWithFilters();
  }, [getProjectWithFilters]);

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

  const workPlanGraphsCallback = workPlanGraphs(handleSaveDraftCard);
  
  return <>
    <Chat visible={visible} setVisible={setVisible} />
    <Layout>
      <NavbarView></NavbarView>
      <Layout>
        <SidebarView></SidebarView>
        <Layout style={{ margin: '20px' }}>
          <Row>
            <Col span={24}>
              <div className="count request" style={{ paddingBottom: '20px', height: 'calc(100vh - 78px)' }}>
                <Row>
                  <Col span={14}><h2 style={{ display: 'inline-block' }}>Boulder County Work Plan</h2> <Button className="btn-comment-01"><img src="/Icons/icon-09.svg" alt="" /> Invite</Button></Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button className="btn-request"><img src="/Icons/icon-01.svg" alt="" /></Button>
                    <Button className="btn-request"><img src="/Icons/icon-06.svg" alt="" /></Button>
                    <Button className="btn-comment" onClick={() => { setVisible(true); console.log('click ', visible); }}><img src="/Icons/icon-03.svg" alt="" /> Comments</Button>
                  </Col>
                </Row>

                <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
                  {PROJECT_TABS.map((tab: ProjectTabTypes, index: number) => {
                    return (
                      <TabPane tab={tab.name} key={'' + index}>
                        <DraftPanel
                          headers={tab}
                          panelState={panelState}
                          setPanelState={setPanelState}
                          workPlanGraphs={workPlanGraphsCallback}
                          handleSaveDraftCard={handleSaveDraftCard} />
                      </TabPane>
                    );
                  })}
                </Tabs>
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
