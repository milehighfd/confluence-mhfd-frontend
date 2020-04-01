import React, { useState } from "react";
import { Row, Col, Button, Input, Form } from 'antd';
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { VALIDATION_PROJECT_ACQUISITION } from "../../constants/validation";
import mapFormContainer from "../../hoc/mapFormContainer";
import ProjectsHeader from "../Shared/ProjectsHeader/ProjectsHeader";

const { TextArea } = Input;
const validationSchema = VALIDATION_PROJECT_ACQUISITION;

const ProjectAcdquisitionForm = ({ createNewProjectForm } : any) => {

  const location = useLocation();
  const cad = location.pathname.split('/');

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: {
      projectType: "propertyAcquisition",
      description: '',
      localDollarsContributed: 0,
      requestName: cad[2] ? cad[2] : '',
      mhfdDollarRequest: 0
    },
    validationSchema,
    onSubmit(values: {projectType: string, description: string, requestName: string, localDollarsContributed: number, mhfdDollarRequest: number}) {
      createNewProjectForm(values);
    }
  });
  
  return <>
    <div className="count-01">
      <ProjectsHeader requestName={values.requestName} handleChange={handleChange} />

      <div className="head-m project-comp">
        <div className="project-comp-btn">
          <h5>DESCRIPTION</h5>
          <button id='marker'><img src="/Icons/icon-10.svg" style={{ height: '19px' }} alt="" /></button>
          <span>|</span>
          <button><img src="/Icons/icon-35.svg" alt="" /></button>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="label-npf">
          <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt="" /></label>
          <TextArea rows={4} placeholder="Add description..." name="description" onChange={handleChange} 
            style={(errors.description && touched.description) ? {border: "solid red 1px"}:{}}/>
        </div>
        <br></br>
        <div className="gutter-example user-tab all-npf">
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">MHFD Dollars Request<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input type={"number"} placeholder="Enter MHFD dollars" name="mhfdDollarRequest" onChange={handleChange} 
                style={(errors.mhfdDollarRequest && touched.mhfdDollarRequest) ? {border: "solid red 1px"}:{}}/></Col>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Local Dollars Contribution<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input type={"number"} placeholder="Enter local government contribution" name="localDollarsContributed" onChange={handleChange} 
                style={(errors.localDollarsContributed && touched.localDollarsContributed) ? {border: "solid red 1px"}:{}}/></Col>
          </Row>
        </div>
        <div className="btn-footer" style={{ marginTop: '25px' }}>
          <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
          <Button style={{ width: '140px' }} className="btn-01" block htmlType="submit" >Apply</Button>
        </div>
      </Form>
    </div>
  </>
}

const layers = {
  marker: true,
  acquisition: true
}

export default mapFormContainer(ProjectAcdquisitionForm, layers);
