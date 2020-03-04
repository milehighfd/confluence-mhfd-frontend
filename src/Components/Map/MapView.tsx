import React, {useState} from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../../constants/constants";
import SortMenuView from "../SortMenu/SortMenuView";
import GenericTabView from "../GenericTab/GenericTabView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;

const cardInformationProblems: Array<any> = [
  {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "High Priority", field7: "80%"
  }
];

const cardInformationProjects: Array<any> = [
  {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "Maintenance", field7: "80%"
  }, {
    image: "/Icons/eje.png", field1: "West Tollagate Creek GSB Drops", field2: "Westminster", field3: "$400,500",
    field4: 5, field5: "Components", field6: "Study", field7: "80%"
  }
];

const accordionRow: Array<any> = [
  {
    color: "green", image: "/Icons/icon-19.svg", field1: "Component 1", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }, {
    color: "gray", image: "/Icons/icon-19.svg", field1: "Component 2", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }, {
    color: "green", image: "/Icons/icon-19.svg", field1: "Component 3", field2: "Westminter", field3: "$200,000", field4: "Project XYZ"
  }
];

const tags: Array<any> = [
  <Tag closable >
     $600K - $1.2M
  </Tag>,
  <Tag closable >
     Active
  </Tag>,
  <Tag closable >
     Stream Restoration
  </Tag>,
  <Tag closable >
     Maintenance
  </Tag>,
  <Tag closable >
     Westminster
  </Tag>,
  <Tag closable >
     Components
  </Tag>
]

export default () => {
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const updateWidth = () => {
    if (leftWidth === MEDIUM_SCREEN) {
      setLeftWidth(COMPLETE_SCREEN);
      setRightWitdh(EMPTY_SCREEN);
      setRotationStyle({transform: 'rotate(180deg)'});
    } else {
      setLeftWidth(MEDIUM_SCREEN);
      setRightWitdh(MEDIUM_SCREEN);
      setRotationStyle(emptyStyle);
    }
  }
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
            <Row>
              <Col span={leftWidth}>
                <div className="map">
                  <div className="m-head">
                    <Search
                      placeholder="Search..."
                      onSearch={value => console.log(value)}
                      style={{ width: 200 }}
                    />
                    <Button className="btn-01"><img src="/Icons/icon-04.svg" alt=""/></Button>
                    <Dropdown overlay={MapFilterView} className="btn-02">
                      <Button>
                        <img src="/Icons/icon-05.svg" alt=""/>
                      </Button>
                    </Dropdown>
                  </div>

                  <Dropdown overlay={MapTypesView} className="btn-03">
                    <Button>
                      Dark Terrain <img src="/Icons/icon-12.svg" alt=""/>
                    </Button>
                  </Dropdown>

                  <div className="m-footer">
                    <h5>NFHL 100 year floodplain</h5>
                    <hr/>
                    <p><div style={{background:'#99C9FF'}}></div> 6 - 12 inches</p>
                    <p><div style={{background:'#4B9CFF'}}></div> 12 - 18 inches</p>
                    <p><div style={{background:'#4C81C4'}}></div> 18 - 24 inches</p>
                    <p><div style={{background:'#4A6A9C'}}></div> +24 inches</p>
                    <p><div style={{background:'#8FA7C8', height: '2px', marginTop: '7px'}}></div> Stream Channel</p>
                    <p><div style={{background:'#ffffff', border: '1px dashed'}}></div> Service Area (Watershed)</p>
                  </div>

                  <div className="m-zoom">
                    <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt=""/></Button>
                    <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt=""/></Button>
                  </div>
                </div>
                <Button className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt=""/>
                </Button>
              </Col>
              <Col span={rightWidth}>
                <div className="count">
              {/*<Collapse accordion>
                <Panel header="" key="1">*/}
                  <Row className="head-m">
                    <Col span={12}>
                    <Dropdown overlay={SortMenuView}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Westminter, CO  <img src="/Icons/icon-12.svg" alt=""/>
                      </a>
                    </Dropdown>
                    </Col>
                    <Col style={{textAlign: 'right'}} span={12}>
                      <ButtonGroup>
                        <Button className="btn-mm">
                          <img className="img-h" src="/Icons/icon-30.svg" alt=""/>
                          <img className="img-a" src="/Icons/icon-32.svg" alt=""/>
                        </Button>
                        <Button>
                          <img className="img-h" src="/Icons/icon-31.svg" alt=""/>
                          <img className="img-a" src="/Icons/icon-33.svg" alt=""/>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  <div className="head-filter">
                    <Row type="flex" justify="space-around" align="middle">
                      <Col span={16}>
                        <Search
                          placeholder="Search..."
                          onSearch={value => console.log(value)}
                          style={{ width: 200 }}
                        />
                      </Col>
                      <Col  style={{textAlign: 'right'}} span={8}>
                        <Dropdown overlay={SortMenuView}>
                          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Sort by Cost <img src="Icons/icon-14.svg" alt=""/>
                          </a>
                        </Dropdown>
                        <Button><img src="Icons/icon-29.svg" alt=""/> Filters (4)</Button>
                      </Col>
                    </Row>
                  </div>

                  <Tabs defaultActiveKey="1" className="tabs-map">
                    <TabPane tab="Problems" key="1">
                      <GenericTabView type="Problems" totalElements={cardInformationProblems.length} cardInformation={cardInformationProblems} accordionRow={accordionRow}/>
                    </TabPane>

                    <TabPane tab="Projects" key="2">
                    <GenericTabView type="Projects" totalElements={cardInformationProjects.length} cardInformation={cardInformationProjects} accordionRow={accordionRow}/>
                    </TabPane>
                  </Tabs>
                {/*</Panel>
                </Collapse>*/}
                </div>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
