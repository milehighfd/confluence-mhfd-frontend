import React, {useState} from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Drawer, Select, Carousel } from 'antd';

import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const genExtra = () => (
<div className="divider">
  <div className="line-01"></div>
  <img src="/Icons/icon-20.svg" alt=""/>
</div>
);

export default () => {
 return <div className="detailed">
    <Row className="detailed-h" gutter={[16, 8]}>
      <Col span={14}>
        <h1>Little Dry Creek FloodPlain At Sheridan BLVD</h1>
        <p><span>Capital Project</span>   •   <span>Arvada, CO</span>   •   <span>Jefferson County</span>   •   <span>West Service Area</span></p>
      </Col>
      <Col span={4}>
        <div className="status-d">
          <label>Solution Status <b>60%</b></label>
          <Progress percent={50} size="small" status="active" />
        </div>
      </Col>
      <Col span={3} style={{textAlign: 'center'}}>
        <div className="detailed-mm"><b>$1,230,500</b></div>
      </Col>
      <Col span={3} style={{textAlign: 'right'}}>
        <Button><img src="/Icons/icon-01.svg" alt=""/></Button>
        <Button><img src="/Icons/icon-06.svg" alt=""/></Button>
        <Button><img src="/Icons/icon-62.svg" alt="" height="15px"/></Button>
      </Col>
    </Row>
    <Row className="detailed-b">
      <Col span={17} style={{borderRight: '1.5px solid rgba(61, 46, 138, 0.07)'}}>
        <Carousel autoplay>
          <div>
            <div className="detailed-c"></div>
          </div>
          <div>
            <div className="detailed-c"></div>
          </div>
          <div>
            <div className="detailed-c"></div>
          </div>
          <div>
            <div className="detailed-c"></div>
          </div>
        </Carousel>

        <div className="detailed-info">
          <Row>
            <Col span={4}>
              <label><i>Stream</i></label>
            </Col>
            <Col span={8}>
              <p>Little Dry Creek (ADCO)</p>
            </Col>
            <Col span={4}>
              <label><i>Priority</i></label>
            </Col>
            <Col span={8}>
              <p style={{color: 'red'}}>High Priority</p>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <label><i>Start Year</i></label>
            </Col>
            <Col span={8}>
              <p>2009</p>
            </Col>
            <Col span={4}>
              <label><i>Source</i></label>
            </Col>
            <Col span={8}>
              <p>MHFD Master Plan</p>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <label><i>Source Name</i></label>
            </Col>
            <Col span={8}>
              <p>Little Dry Creek & Tributaries MDP</p>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <label><i>Description</i></label>
            </Col>
            <Col span={20}>
              <p>Channel restoration to increase conveyance and stabilize Little Dry Creek from Alpha Street to city boundary.
              Roadway crossing improvements at Alpha St, Beta Ave. Pedestrian crossing in park.</p>
            </Col>
          </Row>
        </div>

        <div className="tabs-detailed">
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Mitigation Types" key="1" extra={genExtra()} >
              <Row>
                <Col span={12}><img src="Icons/chart-01.png" alt="" height="333px"/></Col>
                <Col span={12}><img src="Icons/chart-02.png" alt="" height="333px"/></Col>
              </Row>
            </Panel>
            <Panel header="Component & solutions" key="2" extra={genExtra()}>
            <Row className="solution-h">
              <Col span={8}><Button>Component <img src="Icons/icon-14.svg" alt=""/></Button></Col>
              <Col span={4}><Button>Cost <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
              <Col span={4}><Button>Status <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
              <Col span={8}><Button>Solution Type <img src="/Icons/icon-14.svg" alt=""/></Button></Col>
            </Row>

            <Row className="solution-b">
              <Col span={8}>Alpha St culvert</Col>
              <Col span={4}>$500,000</Col>
              <Col span={4}>Active</Col>
              <Col span={8}>Increased Conveyance - Crossing</Col>
            </Row>
            <Row className="solution-b">
              <Col span={8}>Beta Ave culvert</Col>
              <Col span={4}>$1,200,000</Col>
              <Col span={4}>Active</Col>
              <Col span={8}>Increased Conveyance - Crossing</Col>
            </Row>
            <Row className="solution-b">
              <Col span={8}>Channel imp - LDC @Alpha St</Col>
              <Col span={4}>$700,000</Col>
              <Col span={4}>Active</Col>
              <Col span={8}>Increased Conveyance - Crossing</Col>
            </Row>
            <Row className="solution-b">
              <Col span={8}>Pedestrian bridge in park</Col>
              <Col span={4}>$250,000</Col>
              <Col span={4}>Active</Col>
              <Col span={8}>Increased Conveyance - Crossing</Col>
            </Row>
            <Row className="solution-b">
              <Col span={8}><b>Total Estimated Cost</b></Col>
              <Col span={4}><b>$2,650,000</b></Col>
            </Row>

            </Panel>
            <Panel header="Map" key="3" extra={genExtra()}>
              <div className="detailed-map">

              </div>
            </Panel>
            <Panel header="Attachments" key="3" extra={genExtra()}>
              <div className="data-00">
                <div><img src="Icons/icon-63.svg" alt=""/> Little Dry Creek_image-1.jpg</div>
                <div><img src="Icons/icon-63.svg" alt=""/> Little Dry Creek_image-2.jpg</div>
              </div>
            </Panel>
          </Collapse>
        </div>

      </Col>
      <Col span={7}>
        <div className="chat-r">
          <h5>Team Collaborators</h5>
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="41px"/>
            </Col>
            <Col span={13}>
              <h6>Jon Villines</h6>
              <p>Project Manager</p>
            </Col>
            <Col span={7} style={{textAlign: 'right'}}>
              <span>MHFD</span>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="41px"/>
            </Col>
            <Col span={13}>
              <h6>Carolyn Roan</h6>
              <p>Floodplain Administration</p>
            </Col>
            <Col span={7} style={{textAlign: 'right'}}>
              <span>City of Littleton</span>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="41px"/>
            </Col>
            <Col span={13}>
              <h6>Deb Ohlinger</h6>
              <p>People Manager</p>
            </Col>
            <Col span={7} style={{textAlign: 'right'}}>
              <span>Olsson</span>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="41px"/>
            </Col>
            <Col span={13}>
              <h6>Amy Gabor</h6>
              <p>Project Engineer</p>
            </Col>
            <Col span={7} style={{textAlign: 'right'}}>
              <span>Olsson</span>
            </Col>
          </Row>
          <div className="chat-00">
            <div className="chat-head">
              Comments <img src="/Icons/icon-19.svg" alt="" height="20px"/>
            </div>
            <div className="chat-body">
              <img src="/Icons/icon-61.svg" alt=""/>
              <h6>Share your thoughts</h6>
              <p>
                Let everyone in your group know
                what you think about this listing
              </p>
            </div>
            <div className="chat-footer">
            <Row>
              <Col span={4}>
                <img src="/Icons/icon-28.svg" alt="" height="41px"/>
              </Col>
              <Col span={13}>
                <Input placeholder="Add a coment..." />
              </Col>
              <Col span={7} style={{textAlign: 'right'}}>
                <Button className="btn-send">SEND</Button>
              </Col>
            </Row>
            </div>
          </div>

        </div>
      </Col>
    </Row>
 </div>
};
