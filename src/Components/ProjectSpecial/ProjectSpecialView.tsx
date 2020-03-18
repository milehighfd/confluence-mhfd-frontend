import React, { useState } from "react";
import { Layout, Row, Col, Button, Input } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Map from '../Map/Map';
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../../constants/constants";
import { Special } from "../../Classes/Special";
import { useLocation, Redirect } from "react-router-dom";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";

const { TextArea } = Input;
const special = new Special();
const send = {
  submit: false,
  optionSubmit : false
}

export default ({ problems, projects, components } : any) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  special.requestName = cad[2] ? cad[2] : '';
  const [projectSepcial, setProjectSpecial] = useState(special);
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
      projectSepcial.description.length > 0 &&
      projectSepcial.requestName.length > 0
    );
    if (valid) {
      
      const result = datasets.postData(SERVER.CREATEPROJECTSPECIAL, projectSepcial, datasets.getToken()).then(res => {
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
                      <span className="directions-page">{projectSepcial.requestName}</span>
                    </Col>
                  </Row>
                  <div className="head-m project-comp">
                      <div className="project-comp-btn">
                        <h5>DESCRIPTION</h5>
                        <button><img src="/Icons/icon-11.svg" style={{height: '19px'}} alt=""/></button>
                        <span>|</span>
                        <button><img src="/Icons/icon-35.svg" alt=""/></button>
                      </div>
                    </div>
                    <div className="label-npf">
                      <TextArea rows={4} placeholder="Add description..." onChange={ (event) => {
                                const auxProjectSpecial = {...projectSepcial};
                                auxProjectSpecial.description = event.target.value;
                                setProjectSpecial(auxProjectSpecial);
                      }} />
                    </div>

                    <br></br>
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
