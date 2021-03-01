import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Row, Col, Popover, Select, Table, Upload, Checkbox, Collapse, Timeline, Switch } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const content = (<div className="popver-info"> Projects that repair or restore existing infrastructure and are eligible for MHFD participation.</div>);
const content00 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content01 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content02 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content03 = (<div className="popver-info">The number of times per year the maintenance activity should be done.</div>);
const content04 = (<div className="popver-info">Is any part of the project on private property without an easement?</div>);
const content05 = (<div className="popver-info">The maintenance eligibility status for the project. </div>);
const content06 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);
const content07 = (<div className="popver-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>);

const stateValue = {
  visibleMaintenance: false
}

export const ModalMaintenance = ({visibleMaintenance, setVisibleMaintenance, nameProject, setNameProject, subType}:
  {visibleMaintenance: boolean, setVisibleMaintenance: Function, nameProject: string , setNameProject: Function, subType:string}) => {
  const [state, setState] = useState(stateValue);
  const showModal = () => {
    const auxState = {...state};
    auxState.visibleMaintenance = true;
    setState(auxState);
  };

  const onChange = (e: any)=>{
    setNameProject(e.target.value);
  };

  const handleOk = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleMaintenance(false);
    setState(auxState);
  };

  const handleCancel = (e: any) => {
    console.log(e);
    const auxState = {...state};
    setVisibleMaintenance(false);
    setState(auxState);
  };
  return (
    <>
     <Modal
       centered
       visible={visibleMaintenance}
       onOk={handleOk}
       onCancel={handleCancel}
       className="projects"
       width="1100px"
     >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <div>
            aqui va mapitash
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <div className="head-project">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 14 }}>
                <Input placeholder={nameProject} onChange={(nameProject)=> onChange(nameProject)} value= {nameProject} />
                <Button className="btn-transparent">
                  <img src="/Icons/icon-04.svg" alt="" height="18px" />
                </Button>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 10 }} style={{textAlign:'right'}}>
                <label className="tag-name">Maintenance</label>
                <label className="tag-name">{subType}</label>
                <Popover content={content}>
                  <img className="hh-img" src="/Icons/project/question.svg" alt="" height="18px" />
                </Popover>
              </Col>
            </Row>
          </div>

          <div className="body-project">

            {/*First Section*/}
            <h5>1. Project Information</h5>
            <label className="sub-title">Description <Popover content={content00}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
            <TextArea rows={4} placeholder="Add description"/>
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Service Area <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">County <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Frequency <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Access Control <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <p className="switch-option">Public Access / Ownership <span><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked /></span></p>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <label className="sub-title">Maintenance Eligibility <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" height="10px" /></Popover></label>
                <Select placeholder="Select a person" style={{width:'100%'}}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Col>
            </Row>
            <br/>


            {/*Second Section*/}
            <h5>2. Draw Activity <Button className="btn-transparent"><img src="/Icons/icon-08.svg" alt="" height="15px" /></Button></h5>
            <div className="draw">
              <img src="/Icons/icon-08.svg" alt="" height="22px" />
              <p>Click on the icon and draw a polygon to draw the activity area</p>
            </div>
            <br/>


            {/*Section*/}
            <h5>3. GENERATE PROJECT <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Button className="btn-green">Show Project</Button>
            <br/>


            {/*Section*/}
            <h5>4. Upload Attachments <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" height="14px" /></Popover></h5>
            <Upload>
             <Button>
              <img src="/Icons/icon-17.svg" alt="" height="20px" />
              <p>Attach main image in PNG or JPEG format</p>
             </Button>
           </Upload>
           <Row className="title-galery">
            <Col xs={{ span: 24 }} lg={{ span: 21 }} xxl={{ span: 21 }}>Uploaded</Col>
            <Col xs={{ span: 24 }} lg={{ span: 3 }} xxl={{ span: 3 }}>Cover Image</Col>
           </Row>

            <Row className="card-image">
              <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
                <img src="/Icons/project/jpg.svg" alt="" height="27px" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
                <p>Image-1.jpg</p>
                <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
                <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
                <Checkbox/>
              </Col>
            </Row>

            <Row className="card-image">
              <Col xs={{ span: 24 }} lg={{ span: 2 }} xxl={{ span: 1 }}>
                <img src="/Icons/project/png.svg" alt="" height="27px" />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 19 }} xxl={{ span: 20 }}>
                <p>Image-2.png</p>
                <label>16 Sep, 2020 at 11:05 • 4.8 MB</label>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span:3 }} xxl={{ span: 3 }}>
                <Button className="btn-transparent"><img src="/Icons/icon-16.svg" alt="" height="15px" /></Button>
                <Checkbox/>
              </Col>
            </Row>
          </div>
          <div className="footer-project">
            <Button className="btn-borde" onClick={handleCancel}>Cancel</Button>
            <Button className="btn-purple" onClick={handleOk}>Save Draft Project</Button>
          </div>
        </Col>
      </Row>
     </Modal>
    </>
  );
}
