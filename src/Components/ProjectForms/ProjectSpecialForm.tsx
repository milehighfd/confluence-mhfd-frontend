import React from "react";
import { Row, Col, Button, Input, Form } from 'antd';


import { useLocation } from "react-router-dom";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";
import { VALIDATION_PROJECT_SPECIAL } from "../../constants/validation";
import { useFormik } from "formik";
import mapFormContainer from "../../hoc/mapFormContainer";
const validationSchema = VALIDATION_PROJECT_SPECIAL;
const { TextArea } = Input;

const ProjectSpecialForm = ({ saveNewProjectWithCoords } : any) => {
  const location = useLocation();
  const cad = location.pathname.split('/');

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      projectType: "special",
      description: '',
      requestName: cad[2] ? cad[2] : ''
    },
    validationSchema,
    onSubmit(values: {projectType: string, description: string, requestName: string}) {
      saveNewProjectWithCoords(values);
    }
  });

  return <>
      <div className="count-01">
        <Row className="head-m">
            <Col className="directions01" span={24}>
            <span>Back</span>
            <span><img className="directions-img" src="/Icons/icon-12.svg" alt=""/></span>
            <span className="directions-page">{values.requestName}</span>
            </Col>
        </Row>
        <div className="head-m project-comp">
          <div className="project-comp-btn">
              <h5>DESCRIPTION</h5>
              <button id='marker'><img src="/Icons/icon-11.svg" style={{height: '19px'}} alt=""/></button>
              <span>|</span>
              <button><img src="/Icons/icon-35.svg" alt=""/></button>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="label-npf">
            <TextArea rows={4} placeholder="Add description..." required name="description" onChange={handleChange}/>
          </div>

          <br></br>
          <div className="btn-footer" style={{marginTop: '25px'}}>
              <Button style={{width: '140px'}} className="btn-00">Reset</Button>
              <Button style={{width: '140px'}} className="btn-01" block htmlType="submit" >Apply</Button>
          </div>
        </Form>
      </div>
    </>
}

const layers = {
  marker: true
}

export default mapFormContainer(ProjectSpecialForm, layers);
