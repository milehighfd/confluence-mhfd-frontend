import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { AlertView } from "../../Alerts/AlertView";
import { ProjectInformation } from "../TypeProjectComponents/ProjectInformation";
import { UploadAttachment } from "../TypeProjectComponents/UploadAttachment";
import { LocationInformation } from "../TypeProjectComponents/LocationInformation";
import { useProjectState, useProjectDispatch } from '../../../hook/projectHook';
import CreateProjectMap from './../../CreateProjectMap/CreateProjectMap';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info">Master plans that set goals for the watershed and stream corridor, identify problems, and recommend improvements.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info"><b>Sponsor</b> is the Jurisdiction that requested the project.</div>);
const content04 = (<div className="popver-info"><b>Co-Sponsor</b> is any additional Jurisdiction that will be contributing funding to the project.</div>);
const content05 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content07 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content08 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content09 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

const stateValue = {
  visibleStudy: false
}
const genExtra = () => (
  <div className="tab-head-project">
    <div>Cherry Creek</div>
  </div>
);
const genExtra00 = () => (
  <div className="tab-head-project">
    <div>Lakewood Gulch</div>
  </div>
);


export const ModalStudy= ({visibleStudy, setVisibleStudy, nameProject, setNameProject, typeProject, status, setStatus}:
  {visibleStudy: boolean, setVisibleStudy: Function, nameProject: string , setNameProject: Function, typeProject:string, status:number, setStatus: Function }) => {
  const [state, setState] = useState(stateValue);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [description, setDescription] =useState('');
  const [disable, setDisable] = useState(false);
  const [serviceArea, setServiceArea] = useState('');
  const [country, setCountry] = useState('');
  const [isDraw, setIsDraw] = useState(false);
  const {changeDrawState} = useProjectDispatch();

  const [county, setCounty] = useState('');
  const [save, setSave] = useState(false);
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleStudy = true;
    setState(auxState);
  };

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
   // setVisibleStudy (false);
    setState(auxState);
    setVisibleAlert( true);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleStudy (false);
    setState(auxState);
  };

  const onClickDraw = () => {
    setIsDraw(!isDraw);
  }
  useEffect(()=>{
    changeDrawState(isDraw);
  },[isDraw]);

  return (
    <>
    {visibleAlert && <AlertView
      visibleAlert = {visibleAlert}
      setVisibleAlert ={setVisibleAlert}
      setSave = {setSave}
     />}
     <Modal
       centered
       visible={visibleStudy}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <CreateProjectMap type="STUDY"></CreateProjectMap>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 9 }} style={{textAlign:'right'}}>
                <label className="tag-name" style={{padding:'10px'}}>Study</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <ProjectInformation
              description = {description}
              setDescription = {setDescription}
            />
            <br/>

            {/*Second Section*/}
            <h5>2. SELECT STREAMS <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
              <Row className="streams">
                <Col xs={{ span: 24 }} lg={{ span: 11}}>Stream Name</Col>
                <Col xs={{ span: 24 }} lg={{ span: 5 }}>Length (mi)</Col>
                <Col xs={{ span: 24 }} lg={{ span: 8 }}>Drainage Area (sq mi)</Col>
              </Row>
            <div className={"draw "+(isDraw?'active':'')} onClick={onClickDraw}>
            <img src="" className="icon-draw active" style={{WebkitMask: 'url("/Icons/icon-08.svg") center center no-repeat'}}/>
              <p>Click on the icon and draw a polygon to select stream segments</p>
            </div>
            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition="right"
            >
              <Panel header="" key="1" extra={genExtra()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row style={{marginLeft:'-18px'}}>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}> <label>Aurora</label> <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>1.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <span className="amount">24.0 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                      <Timeline.Item color="purple">
                        <Row style={{marginLeft:'-18px'}}>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label> Araphoe County</label> <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>1.4 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }}>
                            <span className="amount">41.8 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel>
              <Panel header="" key="2" extra={genExtra00()}>
                <div className="tab-body-project streams">
                    <Timeline>
                      <Timeline.Item color="purple">
                        <Row>
                          <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}><label> Boulder</label> <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></Col>
                          <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}>3.2 mi</Col>
                          <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7 }} >
                            <span className="amount">41.8 sq mi</span>
                          </Col>
                          <Col xs={{ span: 24 }} lg={{ span: 1 }} xxl={{ span: 1 }}><Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button></Col>
                        </Row>
                      </Timeline.Item>
                    </Timeline>
                </div>
              </Panel>
            </Collapse>
            <hr/>
            <Row className="cost-project">
              <Col xs={{ span: 24 }} lg={{ span: 11 }} xxl={{ span: 11 }}>TOTAL</Col>
              <Col xs={{ span: 24 }} lg={{ span: 5 }} xxl={{ span: 5 }}><b>5.8mi</b></Col>
              <Col xs={{ span: 24 }} lg={{ span: 7 }} xxl={{ span: 7}}><b>141.1 sq mi</b></Col>
            </Row>
            <br/>

            {/*Section*/}
            <h5>3. GENERATE PROJECT <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>

            <LocationInformation
              setServiceArea = {setServiceArea}
              setCounty = {setCounty}
            />
            <br/>

            {/*Section*/}
            <UploadAttachment
              typeProject = {typeProject}
            />
          </div>
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk} disabled={disable}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
