import React from "react";
import { Row, Col, Collapse, Button, Input, Progress, Carousel, message } from 'antd';

import DetailedMap from "../Map/DetailedMap";

import {
  getProjectBasics,
  mitigationPanel,
  componentSolutionsPanel,
  problemPanel, vendorsPanel, genExtra } from "../../utils/detailedUtils";
import { firstLetterUppercase, numberWithCommas } from "../../utils/utils";

import { ProjectTypes } from "../../Classes/MapTypes";
import { SERVER } from "../../Config/Server.config";

const { Panel } = Collapse;

const capitalComponentsContext = (component : Function, projectType : string) => {
  if (projectType === 'capital') {
    return component;
  }
  return;
}

export default ({ setVisible, data } : { setVisible : Function, data : ProjectTypes }) => {
  const {
    county,
    finalCost,
    components,
    requestName,
    projectType,
    coordinates,
    estimatedCost,
  } = data;

  const renderCapitalComponents = (component : Function) => {
    return capitalComponentsContext(component(data), projectType as string);
  }

  const copyUrl = (id: string) => {
    function handler (event: any){
      event.clipboardData.setData('text/plain', SERVER.SHARE_MAP_PROJECT + '/' + id);
      event.preventDefault();
      document.removeEventListener('copy', handler, true);
    }
    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
    message.success('copied to clipboard!');
  }
  return (
    <div className="detailed">
      <Row className="detailed-h" gutter={[16, 8]}>
        <Col span={13}>
          <h1>{requestName}</h1>
          <p>
            <span>{firstLetterUppercase(projectType as string)} </span>   •
          <span> Arvada, CO</span>   •
          <span> {county ? county : 'No'} County</span>   •
          <span> West Service Area</span>
          </p>
        </Col>
        <Col span={5}>
          <div className="status-d">
            <label>Solution Status <b>60%</b></label>
            <Progress percent={50} size="small" status="active" />
          </div>
          {/*<div className="nn-hh">Project Status: Hydrology</div>*/}
        </Col>
        <Col span={3} style={{ textAlign: 'center' }}>
          <div className="detailed-mm">
            <b>${numberWithCommas(estimatedCost ? estimatedCost : finalCost as any)}</b>
          </div>
        </Col>
        <Col span={3} style={{ textAlign: 'right' }}>
          <Button className="disabled-btn"><img src="/Icons/icon-01.svg" alt="" /></Button>
          <Button><img src="/Icons/icon-06.svg" alt="" onClick={() => copyUrl(data._id as string)} /></Button>
          <Button onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
        </Col>
      </Row>
      <Row className="detailed-b">
        <Col span={17} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }}>
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

          {getProjectBasics(data as any)}

          <div className="tabs-detailed">
            <Collapse defaultActiveKey={['1']}>
              {renderCapitalComponents(mitigationPanel)}
              {/* {renderCapitalComponents(componentSolutionsPanel)} */}
              {renderCapitalComponents(problemPanel)}
              {renderCapitalComponents(vendorsPanel)}

              <Panel header="Map" key="3" extra={genExtra()}>
                <div className="detailed-map">
                  <DetailedMap
                    coordinates={JSON.parse((coordinates ? coordinates: '[[-104.9070096657899,39.88842619958655],[-104.72306671700684,39.93973005898144],[-104.71609918106799,39.80069322535405],[-104.95299540298578,39.774994077663706],[-104.9070096657899,39.88842619958655]]') as string)}
                    components={components ? components: '' as any}
                    />
                </div>
              </Panel>
              <Panel header="Attachments" key="4" extra={genExtra()}>
                <div className="data-00">
                  <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-1.jpg</div>
                  <div><img src="/Icons/icon-63.svg" alt="" /> Little Dry Creek_image-2.jpg</div>
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
                <img src="/Icons/icon-28.svg" alt="" height="35px" />
              </Col>
              <Col span={13}>
                <h6>TBD</h6>
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
                <h6>TBD</h6>
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
                <h6>TBD</h6>
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
                <h6>TBD</h6>
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

          </div>
        </Col>
      </Row>
    </div>
  );
};
