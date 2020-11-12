import React, { useState, useEffect } from "react";
import { Row, Col, Dropdown, Button, Input, Table, Form } from 'antd';
import mapFormContainer from "../../hoc/mapFormContainer";
import { NEW_PROJECT_FORM_COST, GOAL_STUDY, REQUEST_START_YEAR, PROJECT_STUDY_MASTER, PROJECT_STUDY_FHAD } from "../../constants/constants";
import { ComponentType, StudyTypes, ComponentCopyType } from "../../Classes/MapTypes";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { VALIDATION_PROJECT_MASTER_PLAN_ONLY, VALIDATION_PROJECT_FHAD } from "../../constants/validation";
import DropdownMenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";
import ProjectsHeader from "../Shared/ProjectsHeader/ProjectsHeader";

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const columns01 = ({ removeSelectedItem } : { removeSelectedItem : Function}) => [
  {
    title: 'Stream Name',
    dataIndex: 'componentName',
    key: 'componentName',
    ellipsis: true,
  },
  {
    title: 'Length (miles)',
    dataIndex: 'jurisdiction',
    key: 'jurisdiction',
    ellipsis: true,
  },
  {
    title: 'DrainageArea',
    dataIndex: 'howCost',
    key: 'howCost',
    ellipsis: true,
  },
  {
    key: 'action',
    textAlign: 'right',
    render: (text : any, record : any) => <span style={{cursor: 'pointer'}} onClick={() => removeSelectedItem(record.key)}><img src="/Icons/icon-16.svg" alt=""/></span>,
  },
];



const ProjectStudyForm = ({ selectedItems, setSelectedItems, saveNewStudyForm, polygonRef, isPolygon } : StudyTypes) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  const validationSchema = cad[2] === 'masterPlan' ? VALIDATION_PROJECT_MASTER_PLAN_ONLY : VALIDATION_PROJECT_FHAD;
  const initialValues = cad[2] === 'masterPlan' ? PROJECT_STUDY_MASTER : PROJECT_STUDY_FHAD;
  initialValues.requestName = cad[3];
  initialValues.projectSubtype = cad[2];

  const [title, setTitle] = useState<string>('');
  const [formatSelectedItems, setFormatSelectedItems] = useState<Array<ComponentCopyType>>([]);
  const [total, setTotal] = useState(NEW_PROJECT_FORM_COST);

  useEffect(() => {
    const selectedItemsCopy = selectedItems.map((item : ComponentType) => {
      return {...item, key: item.componentId, howCost: '$'+numberWithCommas(item.howCost)}
    });
    setFormatSelectedItems(selectedItemsCopy);

    if(selectedItems.length) {
      const subtotal = selectedItems.map((item : ComponentType) => item.howCost).reduce((a : number, b : number) => a + b, 0);
      const pricing = subtotal;
      setTotal({...total, subtotal, total: pricing})
    } else {
      setTotal({...total, subtotal: 0, total: 0 })
    }
  }, [selectedItems]);

  const removeSelectedItem = (key : string) => {
    const items = [...selectedItems];
    const index = items.findIndex((item : ComponentType) => item.componentId === key);
    items.splice(index, 1);
    setSelectedItems(items);
  }

  const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getPolygonButton = () => {
    const btn = polygonRef.current?.getElementsByTagName("button")[0];
    btn?.click();
  }

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema,
        onSubmit(values: {projectType: string, projectSubtype: string, sponsor: string, requestName: string, coSponsor: string, requestedStartyear: string, goal?: string}) {
          saveNewStudyForm(values);
        }
  });

  return <>
    <div className="count-01">
      <ProjectsHeader requestName={values.requestName} handleChange={handleChange} />

      <div className="head-m project-comp">
        <div className="project-comp-btn">
          <h5>SELECTED STREAMS</h5>
          {/* <button><img src="/Icons/icon-08.svg" alt=""/></button> */}
          <div ref={polygonRef} />
          <span>|</span>
          <form id="demo-2">
            <input type="search" placeholder="Search" />
          </form>
          <button><img src="/Icons/icon-35.svg" alt="" /></button>
        </div>
        <span>Total Estimated Cost: ${numberWithCommas(total.total)}</span>
      </div>
      {!isPolygon ?
        <div className="head-m draw-section">
          <button onClick={getPolygonButton}><img src="/Icons/icon-08.svg" alt="" /></button>
          <h6>Click on the icon above and draw a polygon to select streams</h6>
        </div>
        :
        <div className="table-create-pro">
          <Table columns={columns01({ removeSelectedItem })} dataSource={formatSelectedItems} pagination={false} />
        </div>
      }

      <Form onSubmit={handleSubmit}>
        <div className="gutter-example user-tab all-npf">
          <div className="label-new-form">
            <h3>PROJECT INFORMATION</h3>
          </div>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Sponsor<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input placeholder="Sponsor" name="sponsor" onChange={handleChange}
                style={(errors.sponsor && touched.sponsor ) ? {border: "solid red 1px"}:{}}/></Col>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Potential Co-Sponsor<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input placeholder="Potential Co-Sponsor" name="coSponsor" onChange={handleChange}
                style={(errors.coSponsor && touched.coSponsor ) ? {border: "solid red 1px"}:{}}/></Col>
          </Row>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Requested Start Year<img src="/Icons/icon-19.svg" alt="" /></label>
              <div id="study-requested-start-year">
                <Dropdown overlay={<DropdownMenuView values={values} items={REQUEST_START_YEAR} item={title} setItem={setTitle} field={'requestedStartyear'} />}
                  getPopupContainer={() => document.getElementById("study-requested-start-year" ) as HTMLElement}>
                  <Button className="btn-borde" style={(errors.requestedStartyear && touched.requestedStartyear && !values.requestedStartyear) ? {border: "solid red 1px"}:{}}>
                    {values.requestedStartyear ? REQUEST_START_YEAR.filter(element => element.id === +(values.requestedStartyear))[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </div>
            </Col>
            {values.projectSubtype === 'masterPlan' ? (
              <Col className="gutter-row" span={12}>
                <label className="label-new-form" htmlFor="">Goal<img src="/Icons/icon-19.svg" alt="" /></label>
                <div id="study-goal">
                  <Dropdown overlay={<DropdownMenuView values={values} items={GOAL_STUDY} item={title} setItem={setTitle} field={'goal'} />}
                    getPopupContainer={() => document.getElementById("study-goal" ) as HTMLElement}>
                    <Button className="btn-borde" style={(errors.goal && touched.goal && !values.goal) ? {border: "solid red 1px"}:{}}>
                      {values.goal ? GOAL_STUDY.filter(element => element.id === values.goal)[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            ) : ''}
          </Row>
        </div>
        <div className="btn-footer" style={{ marginTop: '25px' }}>
          <Button style={{ width: '140px' }} className="btn-borde">Reset</Button>
          <Button style={{ width: '140px' }} block htmlType="submit" className="btn-purple">Apply</Button>
        </div>
      </Form>
    </div>
  </>
}

const layers = {
  study: true
}

export default mapFormContainer(ProjectStudyForm, layers);
