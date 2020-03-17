import React, { useState } from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Breadcrumb, Switch, Tabs, Select, Tag, Card, Input, Progress, Timeline, Upload, message, Table } from 'antd';

import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Map from '../Map/Map';
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN } from "../../constants/constants";
import { Debris } from "../../Classes/Maintenance/Debris";
import MenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";
import { useLocation, Redirect } from "react-router-dom";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";
import { UploadFile } from "../Shared/UploadFiles/UploadFile";
import { Files } from "../Shared/UploadFiles/File";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../Shared/UploadFiles/apollo";

const { Dragger } = Upload;
const { TextArea } = Input;

const maintenanceEligibility = [ "Capital Project", "MEP", "Grandfathered", "Not Eligible", "I don't know"];
const frequency = [ "Cycle per year", "Cycle per month", "Cycle per week"];

const send = {
  submit: false,
  optionSubmit : false
}

// const debris = 
export default ({ problems, projects, components }: any) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  const debris = new Debris();
  debris.requestName = cad[2] ? cad[2] : '';
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const [selectedItems, setSelectedItems] = useState<Array<[]>>([]);
  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [projectDebris, setProjectDebris] = useState(debris);
  const [submit, setSubmit] = useState(send);
  const [redirect, setRedirect] = useState(false);

  const updateWidth = () => {
    if (leftWidth === MEDIUM_SCREEN) {
      setLeftWidth(COMPLETE_SCREEN);
      setRightWitdh(EMPTY_SCREEN);
      setRotationStyle({ transform: 'rotate(180deg)' });
    } else {
      setLeftWidth(MEDIUM_SCREEN);
      setRightWitdh(MEDIUM_SCREEN);
      setRotationStyle(emptyStyle);
    }
  }
  if(submit.submit) {
    const valid = (
      projectDebris.description.length > 0 &&
      projectDebris.frequency && 
      projectDebris.maintenanceEligibility !== 'Maintenance eligible' &&
      projectDebris.mhfdDollarRequest > 0 &&
      projectDebris.requestName.length > 0
    );
    if (valid) {
      
      const result = datasets.postData(SERVER.CREATEPROJECTDEBRIS, projectDebris, datasets.getToken()).then(res => {
        if(res) {
          setRedirect(true);
        }
      })
    } else {
      const auxSubmit = {...submit};
      auxSubmit.optionSubmit = false;
      setSubmit(auxSubmit);
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
        <Layout className="map-00" style={{ height: 'calc(100vh - 58px)' }}>
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
                <img style={rotationStyle} src="/Icons/icon-34.svg" alt="" width="18px" />
              </Button>
            </Col>
            <Col span={rightWidth}>
              <div className="count-01">
                <Row className="head-m">
                  <Col className="directions01" span={24}>
                    <span>Back</span>
                    <span><img className="directions-img" src="/Icons/icon-12.svg" alt="" /></span>
                    <span className="directions-page">{projectDebris.requestName}</span>
                  </Col>
                </Row>

                <div className="head-m project-comp">
                  <div className="project-comp-btn">
                    <h5>ACTIVITY</h5>
                    <div id="polygon" />
                    <span>|</span>
                    <button><img src="/Icons/icon-35.svg" alt="" /></button>
                  </div>
                </div>
                <div className="input-maint">
                  <label className="label-new-form" htmlFor="">#1</label>
                  <Input size={"large"} placeholder="" />
                </div>
                <div className="input-maint">
                  <label className="label-new-form" htmlFor="">#2</label>
                  <Input size={"large"} placeholder="" /><img className="img-maint" src="/Icons/icon-16.svg" alt="" />
                </div>
                <br></br>

                <div className="label-npf">
                <div className="label-new-form">
                    <h3>PROJECT INFORMATION</h3>
                  </div>
                  <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt="" /></label>
                  <TextArea rows={4} placeholder={'Add description...'} onChange={(event) => {
                    const auxProjectDebris = {...projectDebris};
                    auxProjectDebris.description = event.target.value;
                    setProjectDebris(auxProjectDebris);
                  }} />
                </div>

                <br></br>

                <div className="gutter-example user-tab all-npf">
                  <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                      <label className="label-new-form" htmlFor="">MHFD Dollars Requested<img src="/Icons/icon-19.svg" alt="" /></label>
                      <Input type={"number"} placeholder="MHFD dollars" onChange={ (event) => {
                        const auxProjectDebris = {...projectDebris};
                        auxProjectDebris.mhfdDollarRequest = (Number)(event.target.value);
                        setProjectDebris(auxProjectDebris);
                      }} /></Col>
                    <Col className="gutter-row" span={12}>
                      <div className="form01">
                        <div className="form01-02"><h3>Public Access / Ownership <img src="/Icons/icon-19.svg" alt="" /></h3></div>
                        <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked={projectDebris.ownership} onChange={ (event) => {
                          const auxProjectDebris = {...projectDebris};
                          auxProjectDebris.ownership = event;
                          setProjectDebris(auxProjectDebris);
                        }} />
                      </div>
                    </Col>
                  </Row>
                  <br></br>
                  <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                      <label className="label-new-form" htmlFor="">How is this site maintenance eligible?<img src="/Icons/icon-19.svg" alt="" /></label>
                      <Dropdown overlay={<MenuView items={maintenanceEligibility} item={projectDebris} setItem={setProjectDebris} field={'maintenanceEligibility'}/>}>
                        <Button>
                          {projectDebris.maintenanceEligibility} <img src="/Icons/icon-12.svg" alt="" />
                        </Button>
                      </Dropdown>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <label className="label-new-form" htmlFor="">Frequency<img src="/Icons/icon-19.svg" alt="" /></label>
                      <Dropdown overlay={<MenuView items={frequency} item={projectDebris} setItem={setProjectDebris} field={'frequency'}/>}>
                        <Button>
                          {projectDebris.frequency} <img src="/Icons/icon-12.svg" alt="" />
                        </Button>
                      </Dropdown>
                    </Col>
                  </Row>
                </div>
                <div className="img-npf">
                  <label className="label-new-form" htmlFor=""><h3>Upload Main Image</h3><img src="/Icons/icon-19.svg" alt="" /></label>
                  {/* <ApolloProvider client={client}>
                    <UploadFile />
                    <Files />
                  </ApolloProvider> */}
                  
                  <Dragger>
                    <img src="/Icons/icon-17.svg" alt="" />
                    <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
                  </Dragger>
                  <div className="tag-upload">
                    <Tag closable>
                      Little Dry Creek_image-1.jpg
                        </Tag>
                  </div>
                </div>
                <div className="img-npf">
                  <label className="label-new-form" htmlFor=""><h3>Upload Attachments</h3><img src="/Icons/icon-19.svg" alt="" /></label>
                  <Dragger className="img-npf">
                    <img src="/Icons/icon-17.svg" alt="" />
                    <p className="ant-upload-text">Attach Docs, PDFs, CSVs, ZIPs and other files</p>
                  </Dragger>
                  <div className="tag-upload">
                    <Tag closable>
                      Little Dry Creek_image-2.csv
                        </Tag>
                  </div>
                </div>
                <div className="btn-footer" style={{ marginTop: '25px' }}>
                  <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
                  <Button style={{ width: '140px' }} className="btn-01" onClick={ () => {
                    const auxSubmit = {...submit};
                    auxSubmit.submit = true;
                    auxSubmit.optionSubmit = true;
                    setSubmit(auxSubmit);
                  }}>Create Project</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Layout>
  </>
}
