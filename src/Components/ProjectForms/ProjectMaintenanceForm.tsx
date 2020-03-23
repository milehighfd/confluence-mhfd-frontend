import React, { useState } from "react";
import { Row, Col, Dropdown, Menu, Button, Switch, Tag, Input, Upload, Form } from 'antd';

import { FRECUENCY, MAINTENANCE_ELIGIBILITY, RECURRENCE, PROJECT_MAINTENANCE_DEBRIS, PROJECT_MAINTENANCE_VEGETATION, PROJECT_MAINTENANCE_SEDIMENT, PROJECT_MAINTENANCE_MINOR_REPAIR, PROJECT_MAINTENANCE_RESTORATION } from "../../constants/constants";
import mapFormContainer from "../../hoc/mapFormContainer";
import { useLocation, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { VALIDATION_PROJECT_DEBRIS, VALIDATION_PROJECT_VEGETATION, VALIDATION_PROJECT_SEDIMENT, VALIDATION_PROJECT_MINOR_REPAIR, VALIDATION_PROJECT_RESTORATION } from "../../constants/validation";
import * as datasets from "../../Config/datasets"
import { SERVER } from "../../Config/Server.config";
import DropdownMenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";
const { Dragger } = Upload;
const { TextArea } = Input;


const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);



const ProjectMaintenanceForm = ({ saveNewProjectForm } : {saveNewProjectForm: Function}) => {
    const location = useLocation();
    const cad = location.pathname.split('/');
    const validationSchema = cad[2] === 'debrisManagement' ? VALIDATION_PROJECT_DEBRIS : cad[2] === 'vegetationManagement' ? VALIDATION_PROJECT_VEGETATION : 
            cad[2] === 'sedimentRemoval' ? VALIDATION_PROJECT_SEDIMENT : cad[2] === 'minorRepairs' ? VALIDATION_PROJECT_MINOR_REPAIR : VALIDATION_PROJECT_RESTORATION;
    const initialValues = cad[2] === 'debrisManagement' ? PROJECT_MAINTENANCE_DEBRIS : cad[2] === 'vegetationManagement' ? PROJECT_MAINTENANCE_VEGETATION : 
            cad[2] === 'sedimentRemoval' ? PROJECT_MAINTENANCE_SEDIMENT : cad[2] === 'minorRepairs' ? PROJECT_MAINTENANCE_MINOR_REPAIR : PROJECT_MAINTENANCE_RESTORATION;
    initialValues.requestName = cad[3];
    initialValues.projectSubtype = cad[2];
    const files: Array<any> = [];
    const [listFiles, setListFiles ] = useState(files);
    const [title, setTitle] = useState<string>('');
    
    const { values, handleSubmit, handleChange } = useFormik({
        initialValues,
        validationSchema,
        onSubmit(values: {projectType: string, projectSubtype: string, description: string, requestName: string, mhfdDollarRequest: number, publicAccess: boolean, frecuency?: string, maintenanceEligility: string, recurrence?: string}) {
            saveNewProjectForm(values, null, null, listFiles);
        }
    });

  return <>
    <Form onSubmit={handleSubmit}>
      <div className="count-01">
        <Row className="head-m">
          <Col className="directions01" span={24}>
            <span>Back</span>
            <span><img className="directions-img" src="/Icons/icon-12.svg" alt="" /></span>
            <span className="directions-page">{values.requestName}</span>
          </Col>
        </Row>

        <div className="head-m project-comp">
          <div className="project-comp-btn">
            <h5>ACTIVITY</h5>
            {/* <button><img src="/Icons/icon-08.svg" alt=""/></button> */}
            <div id="polygon" />
            <span>|</span>
            <div id="demo-2">
              <input type="search" placeholder="Search" />
            </div>
            <button><img src="/Icons/icon-35.svg" alt="" /></button>
          </div>
        </div>
        {values.projectSubtype !== 'restoration' ? (
          <><div className="input-maint">
            <label className="label-new-form" htmlFor="">#1</label>
            <Input size={"large"} placeholder="" />
          </div>
            <div className="input-maint">
              <label className="label-new-form" htmlFor="">#2</label>
              <Input size={"large"} placeholder="" /><img className="img-maint" src="/Icons/icon-16.svg" alt="" />
            </div></>
        ) : (
            <><div className="gutter-example user-tab all-npf">
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={menu}>
                    <Button>
                      Restoration Task <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              <Row gutter={16} className="input-maint">
                <Col className="gutter-row" span={12}>
                  <Dropdown overlay={menu}>
                    <Button>
                      Tree Thinning <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                  <img className="img-maint" src="/Icons/icon-16.svg" alt="" />
                </Col>
              </Row>
            </div>
            </>
          )}
        <div className="label-new-form">
          <h3>PROJECT INFORMATION</h3>
        </div>
        <div className="label-npf">
          <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt="" /></label>
          <TextArea rows={4} name="description" onChange={handleChange} />
        </div>
        <div className="gutter-example user-tab all-npf">
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">MHFD Dollars Requested<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input type="number" placeholder="MHFD dollars" name="mhfdDollarRequest" onChange={handleChange} /></Col>
            <Col className="gutter-row" span={12}>
              <div className="form01">
                <div className="form01-02"><h3>Public Access / Ownership <img src="/Icons/icon-19.svg" alt="" /></h3></div>
                <Switch checkedChildren="YES" unCheckedChildren="NO" defaultChecked={values.publicAccess} onChange={(event) => {
                  const auxTitle = event;
                  values.publicAccess = event;
                  setTitle(auxTitle.toString());
                }} />
              </div>
            </Col>
          </Row>
          <br></br>
          {(values.projectSubtype !== 'restoration', values.projectSubtype !== 'minorRepairs') ? (
            <Row gutter={16}>
              {values.projectSubtype === 'debrisManagement' ? (
                <Col className="gutter-row" span={12}>
                  <label className="label-new-form" htmlFor="">How is this site maintenance eligible?<img src="/Icons/icon-19.svg" alt="" /></label>
                  <Dropdown overlay={<DropdownMenuView values={values} items={MAINTENANCE_ELIGIBILITY} item={title} setItem={setTitle} field={'maintenanceEligility'} />}>
                    <Button>
                      {values.maintenanceEligility ? MAINTENANCE_ELIGIBILITY.filter(element => element.id === values.maintenanceEligility)[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </Col>
              ) : (
                  <Col className="gutter-row" span={12}>
                    <label className="label-new-form" htmlFor="">Recurrence<img src="/Icons/icon-19.svg" alt="" /></label>
                    <Dropdown overlay={<DropdownMenuView values={values} items={RECURRENCE} item={title} setItem={setTitle} field={'recurrence'} />}>
                      <Button>
                        {values.recurrence ? RECURRENCE.filter(element => element.id === values.recurrence)[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                      </Button>
                    </Dropdown>
                  </Col>
                )}
              <Col className="gutter-row" span={12}>
                <label className="label-new-form" htmlFor="">Frequency<img src="/Icons/icon-19.svg" alt="" /></label>
                <Dropdown overlay={<DropdownMenuView values={values} items={FRECUENCY} item={title} setItem={setTitle} field={'frecuency'} />}>
                  <Button>
                    {values.frecuency ? FRECUENCY.filter(element => element.id === values.frecuency)[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          ) : ''}
          {values.projectSubtype !== 'debrisManagement' ? (
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <label className="label-new-form" htmlFor="">How is this site maintenance eligible?<img src="/Icons/icon-19.svg" alt="" /></label>
                <Dropdown overlay={<DropdownMenuView values={values} items={MAINTENANCE_ELIGIBILITY} item={title} setItem={setTitle} field={'maintenanceEligility'} />}>
                  <Button>
                    {values.maintenanceEligility ? MAINTENANCE_ELIGIBILITY.filter(element => element.id === values.maintenanceEligility)[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          ) : ''}
        </div>
        <div className="img-npf">
          <label className="label-new-form" htmlFor=""><h3>Upload Main Image</h3><img src="/Icons/icon-19.svg" alt="" /></label>
          <Dragger multiple={false} onChange={(event)=>{
          }}>
            <img src="/Icons/icon-17.svg" alt="" />
            <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
          </Dragger>
          <div className="tag-upload">
            {/* <Tag closable>
              Little Dry Creek_image-1.jpg
                        </Tag> */}
          </div>
        </div>
        <div className="img-npf">
          <label className="label-new-form" htmlFor=""><h3>Upload Attachments</h3><img src="/Icons/icon-19.svg" alt="" /></label>
          <Dragger className="img-npf" onChange={(event)=>{
            console.log(event);
            setListFiles(event.fileList);
          }}>
            <img src="/Icons/icon-17.svg" alt="" />
            <p className="ant-upload-text">Attach Docs, PDFs, CSVs, ZIPs and other files</p>
          </Dragger>
          <div className="tag-upload">
            {/* <Tag closable>
              Little Dry Creek_image-2.csv
                        </Tag> */}
          </div>
        </div>
        <div className="btn-footer" style={{ marginTop: '25px' }}>
          <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
          <Button style={{ width: '140px' }} block htmlType="submit" className="btn-01">Create Project</Button>
        </div>
      </div>


    </Form>
  </>
}

export default mapFormContainer(ProjectMaintenanceForm, null);
