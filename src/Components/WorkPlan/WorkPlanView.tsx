import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button, Tabs, Select } from 'antd';

import Navbar from "../Shared/Navbar/NavbarContainer";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Chat from "../Shared/Chat/Chat";
import DraftPanel from "../Shared/DraftPanel/DraftPanel";
import GraphRequestByJurisdiction from "./GraphRequestByJurisdiction";

import { PROJECT_TABS } from '../../constants/constants'
import { ProjectTabTypes } from "../../Classes/MapTypes";

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const { TabPane } = Tabs;
const { Option } = Select;

const workPlanGraphs = (saveDraftCard : Function) => (
  <Col span={6}>
    <div style={{ display: 'flex', height: 58 }}>
      <h3 style={{ width: '50%' }}>Analysis</h3>
      <Select defaultValue="2021" style={{ width: '50%' }}>
        <Option value="2020">2020</Option>
        <Option value="2021">2021</Option>
        <Option value="2022">2022</Option>
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>
    </div>

    {/* <div className="work-pc">
      <div className="wp-chart">
        <h5>Requests by Jurisdiction <img src="/Icons/icon-19.svg" alt="" /></h5>
      </div>
      <div className="wp-chart">
        <h5>Distribution Across Jurisdictions <img src="/Icons/icon-19.svg" alt="" /></h5>
      </div>
    </div> */}
    <GraphRequestByJurisdiction key="valueKey" />
  </Col>
);

export default ({ panel, projectsByType, getUserProjects, saveDraftCard, getProjectWithFilters } :
   { panel : any, saveDraftCard : Function, getUserProjects : Function, projectsByType : any, getProjectWithFilters: Function }) => {
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
      <Navbar/>
      <Layout>
        <SidebarView></SidebarView>
        <Layout className="work-p">
          <Row>
            <Col span={24}>
              <div className="request" style={{ paddingBottom: '20px', background:'#fff', padding: '20px'}}>
                <Row>
                  <Col span={14}><h2 style={{ display: 'inline-block' }}>Boulder County Work Plan</h2> <Button className="btn-opacity"><img src="/Icons/icon-09.svg" alt="" /> Invite</Button></Col>
                  <Col span={10} style={{ textAlign: 'right' }}>
                    <Button className="btn-transparent"><img src="/Icons/icon-01.svg" alt="" /></Button>
                    <Button className="btn-transparent"><img src="/Icons/icon-06.svg" alt="" /></Button>
                    <Button className="btn-opacity" onClick={() => { setVisible(true); console.log('click ', visible); }}><img src="/Icons/icon-03.svg" alt="" /> Comments</Button>
                  </Col>
                </Row>

                <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
                  {PROJECT_TABS.map((tab: ProjectTabTypes, index: number) => {
                    return (
                      <TabPane tab={tab.name} key={'' + index}>
                        <Row gutter={[8, 24]} className="work-plan">
                          <DraftPanel
                            headers={tab}
                            panelState={panelState}
                            setPanelState={setPanelState}
                            workPlanGraphs={workPlanGraphsCallback}
                            workPlanWrapper={true}
                            handleSaveDraftCard={handleSaveDraftCard} />
                        </Row>
                        <Row>
                          <div className="cost-wr" style={{padding: '20px 0px 0px 0px' }}>
                            <Row>
                              <Col className="cost-rows" style={{paddingRight: '8px', textAlign: 'right', marginTop: '-30px'}}>
                                <Button style={{marginTop: '0px'}} className="btn-borde">Save Work Plan</Button>
                                <Button className="btn-purple" style={{marginTop: '0px'}} onClick={() => saveDraftCard()} >
                                  Submit to Admin
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Row>
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
