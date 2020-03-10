import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline,Checkbox, Select, Radio, Table} from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import CardInformationView from "../CardInformation/CardInformationView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";


const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

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

const columns01 = [
  {
    title: '',
    dataIndex: 'Comp',
    key: 'Comp',
    ellipsis: true,
  },
  {
    title: 'Teams',
    dataIndex: 'Teams',
    key: 'Teams',
    ellipsis: true,
  },
  {
    title: 'Favorited',
    dataIndex: 'Favorited',
    key: 'Favorited',
    ellipsis: true,
  },

  {
    title: 'Jurisdiction',
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    ellipsis: true,
  },
  {
    title: 'Drafts',
    dataIndex: 'Drafts',
    key: 'Drafts',
    ellipsis: true,
  },
];

const pagination = { position: 'none' };
const data01 = [
  {
    key: '1',
    Comp: 'Capital',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '2',
    Comp: 'Maintenance',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '3',
    Comp: 'Study',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '4',
    Comp: 'Acquisition',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
  {
    key: '5',
    Comp: 'Special',
    Teams: '7',
    Favorited: '3',
    Jurisdiction: '4',
    Drafts: '2',
  },
];

export default () => {
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
              <Row className="profile-header">
                <Col span={15} className="profile-info">
                  <img className="profile-img" src="/Icons/icon-28.svg" alt=""/>
                  <div className="profile-dat">
                    <div className="profile-name">
                      <h3>Elaine Thompson</h3>
                      <span>District Manager</span>
                    </div>
                    <div className="profile-contact">
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-10.svg" alt=""/>
                      </Button>
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-10.svg" alt=""/>
                      </Button>
                      <Button type="default" shape="circle">
                        <img src="/Icons/icon-10.svg" alt=""/>
                      </Button>
                    </div>
                  </div>
                  <div className="profile-prot">
                      <Button>Aurora</Button>
                      <Button>Westminster</Button>
                  </div>
                  <div>
                 
                </div>
                </Col>
                <Col span={9}>
                    <div className="profile-table">
                      <Table size={"small"} columns={columns01} dataSource={data01} pagination={false} />
                    </div>
                </Col>
                <div className="profile-divider"></div>
              </Row>
              <Row>
                <Col className="profile-tabs" span={15}>
                  <Tabs style={{padding:'0 53px'}} defaultActiveKey="1" className="tabs-map">
                      <TabPane tab="Problems" key="1">
                      <Row style={{background: '#fff'}} className="card-map" gutter={[16, 16]}>
                        {cardInformationProblems.map((data: any) => {
                              return <CardInformationView data={data} type={"Problems"} />
                        })}
                      </Row>
                      </TabPane>
                      <TabPane tab="Projects" key="2">
                        {cardInformationProjects.map((data: any) => {
                          return <CardInformationView data={data} type={"Projects"} />
                        })}
                      </TabPane>
                  </Tabs>
                </Col>
                <Col span={9}></Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
