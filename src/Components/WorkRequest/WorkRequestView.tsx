import React, { useState } from "react";
import { Row, Col, Button, Tabs, Input, Drawer } from 'antd';

import mapFormContainer from "../../hoc/mapFormContainer";
import DraftPanel from '../Shared/DraftPanel/DraftPanel';

import { DEFAULT_HEADERS, MAINTENANCE_HEADERS, SPECIAL_HEADERS } from '../../constants/constants'

const { TabPane } = Tabs;

export const WorkRequest = () => {
  const [visible, setVisible] = useState(false);

  const chat = (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      className="chat-r"
    >
      <h5>Team Collaborators</h5>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" />
        </Col>
        <Col span={13}>
          <h6>Jon Villines</h6>
          <p>Project Manager</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>MHFD</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" />
        </Col>
        <Col span={13}>
          <h6>Carolyn Roan</h6>
          <p>Floodplain Administration</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>City of Littleton</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" />
        </Col>
        <Col span={13}>
          <h6>Deb Ohlinger</h6>
          <p>People Manager</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>Olsson</span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <img src="/Icons/icon-28.svg" alt="" height="35px" />
        </Col>
        <Col span={13}>
          <h6>Amy Gabor</h6>
          <p>Project Engineer</p>
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <span>Olsson</span>
        </Col>
      </Row>
      <div className="chat-00">
        <div className="chat-head">
          Comments <img src="/Icons/icon-19.svg" alt="" height="20px" />
        </div>
        <div className="chat-body">
          <img src="/Icons/icon-61.svg" alt="" />
          <h6>Share your thoughts</h6>
          <p>
            Let everyone in your group know
            what you think about this listing
          </p>
        </div>
        <div className="chat-footer">
          <Row>
            <Col span={4}>
              <img src="/Icons/icon-28.svg" alt="" height="35px" />
            </Col>
            <Col span={13}>
              <Input placeholder="Add a comment..." />
            </Col>
            <Col span={7} style={{ textAlign: 'right' }}>
              <Button className="btn-send">SEND</Button>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  ); 

  return <>
    {chat}
    <div className="count request">
      <Row>
        <Col span={14}><h2>Boulder County Work Request</h2></Col>
        <Col span={10} style={{ textAlign: 'right' }}>
          <Button className="btn-request"><img src="/Icons/icon-01.svg" alt="" /></Button>
          <Button className="btn-request"><img src="/Icons/icon-02.svg" alt="" /></Button>
          <Button className="btn-comment" onClick={() => { setVisible(true); console.log('click ', visible); }}><img src="/Icons/icon-03.svg" alt="" /> Comments</Button>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" className="tabs-map">
        <TabPane tab="Capital" key="1">
          <DraftPanel headers={DEFAULT_HEADERS} />
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

        </TabPane>
        <TabPane tab="Study" key="2">
          <DraftPanel headers={DEFAULT_HEADERS} />

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
        </TabPane>
        <TabPane tab="Maintenance" key="3">
          <DraftPanel headers={MAINTENANCE_HEADERS} />

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
        </TabPane>
        <TabPane tab="Acquisition" key="4">
          <DraftPanel headers={SPECIAL_HEADERS} />

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
        </TabPane>
        <TabPane tab="Special" key="5">
          <DraftPanel headers={SPECIAL_HEADERS} />

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
        </TabPane>
      </Tabs>

    </div>
  </>
}

export default mapFormContainer(WorkRequest, null);