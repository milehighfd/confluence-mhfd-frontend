import React, {useState} from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline } from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";
import Map from './Map';
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

export default ({ polygons, components } : any) => {
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const [listDescription, setListDescription] = useState(false);

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
                <Map 
                  leftWidth={leftWidth} 
                  polygons={polygons}
                  components={components} />

                <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
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
                        <Button className="btn-mm" onClick={() => {
                          setListDescription(true);
                        }}>
                          <img className="img-h" src="/Icons/icon-30.svg" alt=""/>
                          <img className="img-a" src="/Icons/icon-32.svg" alt=""/>
                        </Button>
                        <Button onClick={() => {
                          setListDescription(false);
                        }}>
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
                      <GenericTabView listDescription={listDescription} type="Problems" totalElements={cardInformationProblems.length} cardInformation={cardInformationProblems} accordionRow={accordionRow}/>
                    </TabPane>

                    <TabPane tab="Projects" key="2">
                    <GenericTabView listDescription={listDescription} type="Projects" totalElements={cardInformationProjects.length} cardInformation={cardInformationProjects} accordionRow={accordionRow}/>
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
