import React, { useState } from "react";
import { Layout, Row, Col, Button, Input } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Map from '../Map/Map';
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../../constants/constants";
import { Acquisition } from "../../Classes/Acquisition";
import { useLocation, Redirect } from "react-router-dom";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";

const { TextArea } = Input;
const acquisition = new Acquisition();
const send = {
  submit: false,
  optionSubmit : false
}

export default ({ problems, projects, components } : any) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  acquisition.requestName = cad[2] ? cad[2] : '';
  const [projectAcquisition, setProjectAcquisition] = useState(acquisition);
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const [selectedItems, setSelectedItems] = useState<Array<[]>>([]);
  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [submit, setSubmit] = useState(send);
  const [redirect, setRedirect] = useState(false);

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

  if(submit.submit && submit.optionSubmit) {
    const valid = (
      projectAcquisition.description.length > 0 &&
      projectAcquisition.localDollarsContributed > 0 && 
      projectAcquisition.requestName.length > 0 &&
      projectAcquisition.mhfdDollarRequest > 0
    );
    if (valid) {
      
      const result = datasets.postData(SERVER.CREATEPROJECTACQUISITION, projectAcquisition, datasets.getToken()).then(res => {
        if(res) {
          setRedirect(true);
        }
        submit.optionSubmit = false;
      })
    }
  }
  if(redirect) {
    return <Redirect to="/map" />
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
                  problems={problems}
                  projects={projects}
                  components={components}
                  setSelectedItems={setSelectedItems}
                  setIsPolygon={setIsPolygon} />

                <Button id="resizable-btn" className="btn-coll" onClick={updateWidth}>
                  <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px"/>
                </Button>
              </Col>
              <Col span={rightWidth}>
                <div className="count-01">
                  <Row className="head-m">
                    <Col className="directions01" span={24}>
                      <span>Back</span>
                      <span><img className="directions-img" src="/Icons/icon-12.svg" alt=""/></span>
                      <span className="directions-page">{projectAcquisition.requestName}</span>
                    </Col>
                  </Row>
                  <div className="head-m project-comp">
                      <div className="project-comp-btn">
                        <h5>DESCRIPTION</h5>
                        <button><img src="/Icons/icon-10.svg" style={{height: '19px'}} alt=""/></button>
                        <span>|</span>
                        <button><img src="/Icons/icon-35.svg" alt=""/></button>
                      </div>
                    </div>
                    <div className="label-npf">
                      <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt=""/></label>
                      <TextArea rows={4} placeholder="Add description..." onChange={ (event) => {
                                const auxProjectAcquisition = {...projectAcquisition};
                                auxProjectAcquisition.description = event.target.value;
                                setProjectAcquisition(auxProjectAcquisition);
                      }} />
                    </div>

                    <br></br>

                    <div className="gutter-example user-tab all-npf">
                        
                        <Row gutter={16}>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">MHFD Dollars Request<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input type={"number"} placeholder="Enter MHFD dollars" onChange={ (event) => {
                                const auxProjectAcquisition = {...projectAcquisition};
                                auxProjectAcquisition.mhfdDollarRequest = (Number)(event.target.value);
                                setProjectAcquisition(auxProjectAcquisition);
                            }} /></Col>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Local Dollars Contribution<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input type={"number"} placeholder="Enter local government contribution" onChange={ (event) => {
                                const auxProjectAcquisition = {...projectAcquisition};
                                auxProjectAcquisition.localDollarsContributed = (Number)(event.target.value);
                                setProjectAcquisition(auxProjectAcquisition);
                            }} /></Col>
                        </Row>
                    </div>
                    <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01" onClick={ () => {
                            const auxSubmit = {...submit};
                            auxSubmit.submit = true;
                            auxSubmit.optionSubmit = true;
                            setSubmit(auxSubmit);
                        }} >Apply</Button>
                    </div>
                </div>
              </Col>
              </Row>
            </Layout>
          </Layout>
        </Layout>
        </>
}
