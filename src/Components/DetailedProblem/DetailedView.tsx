import React, {useState} from "react";
import { Row, Col, Collapse, Dropdown, Menu, Button, Input, Progress, Carousel } from 'antd';


const { Panel } = Collapse;
const genExtra = () => (
<div className="divider">
  <div className="line-01"></div>
  <img src="/Icons/icon-20.svg" alt=""/>
</div>
);

const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3rd menu
      </a>
    </Menu.Item>
  </Menu>
);

export default () => {
 return <div className="detailed">
    <Row className="detailed-h" gutter={[16, 8]}>
      <Col span={13}>
        <h1>Little Dry Creek FloodPlain At Sheridan BLVD</h1>
        <p><span>Capital Project</span>   •   <span>Arvada, CO</span>   •   <span>Jefferson County</span>   •   <span>West Service Area</span></p>
      </Col>
      <Col span={5}>
        <div className="status-d">
          <label>Solution Status <b>60%</b></label>
          <Progress percent={50} size="small" status="active" />
        </div>
        {/*<div className="nn-hh">Project Status: Hydrology</div>*/}
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
                <Dropdown overlay={menu} className="btn-03">
                  <Button>
                    Dark Terrain <img src="/Icons/icon-12.svg" alt=""/>
                  </Button>
                </Dropdown>

                <div className="m-zoom">
                  <Button style={{borderRadius:'4px 4px 0px 0px'}}><img src="/Icons/icon-35.svg" alt="" width="12px"/></Button>
                  <Button style={{borderRadius:'0px 0px 4px 4px', borderTop: '1px solid rgba(37, 24, 99, 0.2)'}}><img src="/Icons/icon-36.svg" alt="" width="12px"/></Button>
                </div>

                <div className="m-foo">
                  <p><div style={{background:'#29c499', marginRight:'5px'}}></div> Problems</p>
                  <p><div style={{background:'#fac774', marginRight:'5px'}}></div> Projects</p>
                </div>
              </div>
            </Panel>
            <Panel header="Attachments" key="4" extra={genExtra()}>
              <div className="data-00">
                <div><img src="Icons/icon-63.svg" alt=""/> Little Dry Creek_image-1.jpg</div>
                <div><img src="Icons/icon-63.svg" alt=""/> Little Dry Creek_image-2.jpg</div>
              </div>
            </Panel>

            <Panel header="PROBLEM" key="5" extra={genExtra()}>
              <div className="detailed-info">
                <Row>
                  <Col span={4}>
                    <label><i>Name</i></label>
                  </Col>
                  <Col span={8}>
                    <p>8 structures in LDC floodplain @Alpha St</p>
                  </Col>
                  <Col span={4}>
                    <label><i>Priority</i></label>
                  </Col>
                  <Col span={8}>
                    <p>High Priority</p>
                  </Col>
                </Row>
              </div>
            </Panel>

            <Panel header="VENDORS" key="6" extra={genExtra()}>
            <div className="detailed-info">
              <Row>
                <Col span={4}>
                  <label><i>Contractor</i></label>
                </Col>
                <Col span={8}>
                  <p>Atkins</p>
                </Col>
                <Col span={4}>
                  <label><i>Consultant</i></label>
                </Col>
                <Col span={8}>
                  <p>Applegate Group</p>
                </Col>
              </Row>
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
              <img src="/Icons/icon-28.svg" alt="" height="35px"/>
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
              <img src="/Icons/icon-28.svg" alt="" height="35px"/>
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
              <img src="/Icons/icon-28.svg" alt="" height="35px"/>
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
              <img src="/Icons/icon-28.svg" alt="" height="35px"/>
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
                <img src="/Icons/icon-28.svg" alt="" height="35px"/>
              </Col>
              <Col span={13}>
                <Input placeholder="Add a comment..." />
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
