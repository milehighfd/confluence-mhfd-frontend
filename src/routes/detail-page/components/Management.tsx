import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Steps, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, EditOutlined, PlusOutlined, TableOutlined } from "@ant-design/icons";

const { Step } = Steps;
const Management = () => {
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <h3 style={{marginBottom:'15px', marginTop:'20px'}}>PROJECT MANAGEMENT</h3>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{alignSelf: 'center'}}>
          <div className="line-01"></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <p>Phase</p>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Draft</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row><Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <p>Work Request (WR)</p>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 5 }}>
            <div className="phaseview-timeline">
              <Steps>
                <Step status="finish" icon={<span className="border-active"><span className="active">1</span></span>}/>
              </Steps>
            </div>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{textAlign: 'end'}}>
          <Button style={{marginRight:'10px'}}><EditOutlined />Settings</Button>
          <Button style={{marginRight:'10px'}}><TableOutlined />Density</Button>
          <Button className="btn-purple"><PlusOutlined />Item</Button>
        </Col>
      </Row>
    </>
  )
}

export default Management;