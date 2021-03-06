import React from "react";
import { Button, Input, Form } from 'antd';


import { useLocation } from "react-router-dom";
import { VALIDATION_PROJECT_SPECIAL } from "../../constants/validation";
import { useFormik } from "formik";
import mapFormContainer from "../../hoc/mapFormContainer";
import ProjectsHeader from "../Shared/ProjectsHeader/ProjectsHeader";
const validationSchema = VALIDATION_PROJECT_SPECIAL;
const { TextArea } = Input;

const ProjectSpecialForm = ({ createNewProjectForm, markerRef } : { createNewProjectForm : Function, markerRef: React.RefObject<HTMLButtonElement> }) => {
  const location = useLocation();
  const cad = location.pathname.split('/');

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      projectType: "special",
      description: '',
      requestName: cad[2] ? cad[2] : ''
    },
    validationSchema,
    onSubmit(values: {projectType: string, description: string, requestName: string}) {
      createNewProjectForm(values);
    }
  });

  return <>
      <div className="count-01">
        <ProjectsHeader requestName={values.requestName} handleChange={handleChange} />
        
        <div className="head-m project-comp">
          <div className="project-comp-btn">
              <h5>DESCRIPTION</h5>
              <button ref={markerRef}><img src="/Icons/icon-11.svg" style={{height: '19px'}} alt=""/></button>
              <span>|</span>
              <button><img src="/Icons/icon-35.svg" alt=""/></button>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="label-npf">
            <TextArea rows={4} placeholder="Add description..." name="description" onChange={handleChange}
              style={(errors.description && touched.description) ? {border: "solid red 1px"}:{}}/>
          </div>

          <br></br>
          <div className="btn-footer" style={{marginTop: '25px'}}>
              <Button style={{width: '140px'}} className="btn-borde">Reset</Button>
              <Button style={{width: '140px'}} className="btn-purple" block htmlType="submit" >Apply</Button>
          </div>
        </Form>
      </div>
    </>
}

const layers = {
  marker: true
}

export default mapFormContainer(ProjectSpecialForm, layers);
