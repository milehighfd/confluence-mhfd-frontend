import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";

import { Row, Col, Dropdown, Menu, Button, Input, Upload, Table, Form } from 'antd';
import DropdownMenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";

import { VALIDATION_PROJECT_CAPITAL } from "../../constants/validation";
import { NEW_PROJECT_FORM_COST, GOAL, REQUEST_FUNDING_YEAR } from "../../constants/constants";

import { ComponentType, CapitalTypes, ComponentCopyType, TotalType } from "../../Classes/MapTypes";
import mapFormContainer from "../../hoc/mapFormContainer";
import ProjectsHeader from "../Shared/ProjectsHeader/ProjectsHeader";

/* line to remove useEffect dependencies warning */
/* eslint-disable react-hooks/exhaustive-deps */

const { Dragger } = Upload;
const { TextArea } = Input;


// const requestFundingYear = [ 2020, 2021, 2022, 2023];
// const goal = [ "Reduce flood risk to Structures", "Stream bank or bed stabilization", "Create shared-use paths and recreation", "Vegetation Enhancements", "Include permanent water quality BMP"];

const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <span className="menu-item-text">1st menu item</span>
    </Menu.Item>
    <Menu.Item>
      <span className="menu-item-text">2nd menu item</span>
    </Menu.Item>
    <Menu.Item>
      <span className="menu-item-text">3rd menu item</span>
    </Menu.Item>
  </Menu>
);

const columns01 = ({ removeSelectedItem } : { removeSelectedItem : Function}) => [
  {
    title: 'Component',
    dataIndex: 'componentName',
    key: 'componentName',
    ellipsis: true,
  },
  {
    title: 'Jurisdiction',
    dataIndex: 'jurisdiction',
    key: 'jurisdiction',
    ellipsis: true,
  },
  {
    title: 'Cost',
    dataIndex: 'howCost',
    key: 'howCost',
    ellipsis: true,
  },

  {
    title: 'Study Name',
    dataIndex: 'studyName',
    key: 'studyName',
    ellipsis: true,
  },
  {
    key: 'action',
    textAlign: 'right',
    render: (text : any, record : any) => <span style={{cursor: 'pointer'}} onClick={() => removeSelectedItem(record.key)}><img src="/Icons/icon-16.svg" alt=""/></span>,
  },
];

const columns02 = ({ total, numberWithCommas } : { total : TotalType, numberWithCommas : Function}) => [
  {
    title: 'SUBTOTAL COST',
    dataIndex: 'Component',
    key: 'Component',
    width: '24%',
    ellipsis: true,
  },
  {
    dataIndex: 'Jurisdiction',
    key: 'Jurisdiction',
    width: '19%',
    ellipsis: true,
  },
  {
    title: <span className="numbers01-table">${numberWithCommas(total.subtotal)}</span>,
    dataIndex: 'Cost',
    key: 'Cost',
    width: '20%',
    ellipsis: true,
  },

  {
    title: 'Study Name',
    dataIndex: 'StudyName',
    key: 'StudyName',
    ellipsis: true,
  },
];

const data02 = ({ total, numberWithCommas, updateCostsDescription } : { total : TotalType, numberWithCommas : Function, updateCostsDescription : Function }) => [
  {
    key: '1',
    Component: 'Additional Cost',
    Jurisdiction: <></>,
    Cost: <><span>$</span><input id="additionalCost" value={numberWithCommas(total.additional.additionalCost)} onChange={(e) => updateCostsDescription(e)} className="input-span" style={{width: 80}} /></>,
    StudyName: <Input id='additionalCostDescription' placeholder="Enter Description" onChange={(e) => updateCostsDescription(e)} />,
  },
  {
    key: '2',
    Component: 'Overhead Cost',
    Jurisdiction:  <div id="overhead-cost">
      <Dropdown overlay={menu} trigger={['click']} getPopupContainer={() => document.getElementById("overhead-cost" ) as HTMLElement}>
        <span className="ant-dropdown-link" style={{cursor: 'pointer', color: '#11093c'}}>
          20%<img src="/Icons/icon-12.svg" alt=""/>
        </span>
      </Dropdown>
    </div>,
    Cost: <span>${numberWithCommas(total.overhead.overheadCost)}</span>,
    StudyName: <Input id='overheadCostDescription' placeholder="Enter Description" onChange={(e) => updateCostsDescription(e)} />,
  },
  {
    key: '3',
    Component: 'TOTAL COST',
    Jurisdiction: <span className="rr-tt">xxx</span>,
    Cost: <span className="numbers01-table">${numberWithCommas(total.total)}</span>,
    StudyName: <span className="rr-tt">xxx</span>,

  },
];

const validationSchema = VALIDATION_PROJECT_CAPITAL;

const ProjectCapitalForm = ({ selectedItems, isPolygon, setSelectedItems, saveNewCapitalForm, polygonRef } : CapitalTypes) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  const [title, setTitle] = useState('');
  const [formatSelectedItems, setFormatSelectedItems] = useState<Array<ComponentCopyType>>([]);
  const [total, setTotal] = useState(NEW_PROJECT_FORM_COST);
  const [mainImage, setMainImage] = useState([]);
  const [listFiles, setListFiles] = useState([]);

  useEffect(() => {
    const selectedItemsCopy = selectedItems.map((item : ComponentType) => {
      return {...item, key: item.componentId, howCost: '$'+numberWithCommas(item.howCost)}
    });
    setFormatSelectedItems(selectedItemsCopy);

    if(selectedItems.length) {
      const subtotal = selectedItems.map((item : ComponentType) => item.howCost).reduce((a : number, b : number) => a + b, 0);
      const ovhCost = subtotal * total.overhead.per;
      const pricing = subtotal + total.additional.additionalCost + ovhCost;
      const additional = { ...total.additional };
      const overhead = { ...total.overhead, overheadCost: ovhCost };
      setTotal({...total, subtotal, additional, overhead, total: pricing})
    } else {
      const additional = { ...total.additional, additionalCost: 0 };
      const overhead = { ...total.overhead, overheadCost: 0 };
      setTotal({...total, subtotal: 0, additional, overhead, total: 0 })
    }
  }, [selectedItems]);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      projectType: 'capital',
      description: '',
      localDollarsContributed: 0,
      mhfdFundingRequest: '',
      requestName: cad[2] ? cad[2] : '',
      requestFundingYear: '',
      goal: ''
    },
    validationSchema,
    onSubmit(values: {projectType: string, description: string, requestName: string, localDollarsContributed: number, requestFundingYear: string, mhfdFundingRequest: string, goal: string}) {
      saveNewCapitalForm(values, selectedItems, total, [...mainImage, ...listFiles]);
    }
  });

  const getPolygonButton = () => {
    const btn = polygonRef.current?.getElementsByTagName("button")[0];
    btn?.click();
  }

  const removeSelectedItem = (key : string) => {
    const items = [...selectedItems];
    const index = items.findIndex((item : ComponentType) => item.componentId === key);
    items.splice(index, 1);
    setSelectedItems(items);
  }

  const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const updateCostsDescription = (event : React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.id === 'additionalCostDescription') {
      const additional = {...total.additional, [event.target.id]: event.target.value}
      setTotal({...total, additional});
    } if(event.target.id === 'additionalCost') {
      const parsedValue = event.target.value.split(',').join("");
      const value = !isNaN(parseInt(parsedValue))?parseInt(parsedValue):0;
      const additional = {...total.additional, [event.target.id]: value};
      const newTotal = total.subtotal + value + total.overhead.overheadCost;
      setTotal({...total, total: newTotal, additional});
    } else if(event.target.id === 'overheadCostDescription') {
      const overhead = {...total.overhead, [event.target.id]: event.target.value};
      setTotal({...total, overhead});
    }
  }

  const dummyRequest = ({ onSuccess } : { onSuccess: Function}) => {
    setTimeout(() => onSuccess("ok"), 0);
  }

  return <>
    <div className="count-01">
      <ProjectsHeader requestName={values.requestName} handleChange={handleChange} />

      <div className="head-m project-comp table-ff">
        <div className="project-comp-btn">
          <h5>SELECTED STREAMS</h5>
          <div ref={polygonRef} />
          <span>|</span>
          <div id="demo-2">
            <input type="search" placeholder="Search" />
          </div>
          <button><img src="/Icons/icon-35.svg" alt="" /></button>
        </div>
        <span>TOTAL COST: ${numberWithCommas(total.total)}</span>
      </div>
      {!isPolygon ?
        <div className="head-m draw-section">
          <button onClick={getPolygonButton}><img src="/Icons/icon-08.svg" alt="" /></button>
          <h6>Click on the icon above and draw a polygon to select components</h6>
        </div>
        :
        <div className="table-create-pro">
          <Table columns={columns01({ removeSelectedItem })} dataSource={formatSelectedItems} pagination={false} />
        </div>
      }
      <div className="table-create-bottom">
        <Table columns={columns02({ total, numberWithCommas })} dataSource={data02({ total, numberWithCommas, updateCostsDescription })} pagination={false} />
      </div>
      <br></br>

      <Form onSubmit={handleSubmit}>
        <div className="label-npf">
          <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt="" /></label>
          <TextArea rows={4} placeholder="Enter description" name="description" onChange={handleChange}
          style={(errors.description && touched.description) ? {border: "solid red 1px"}:{}} />
        </div>
        <br></br>
        <div className="gutter-example user-tab all-npf">
          <div className="label-new-form">
            <h3>PROJECT INFORMATION</h3>
          </div>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">MHFD Funding Request<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input placeholder="Enter MHFD funding request" name="mhfdFundingRequest" onChange={handleChange}
                style={(errors.mhfdFundingRequest && touched.mhfdFundingRequest) ? {border: "solid red 1px"}:{}} />
            </Col>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Local Dollars Contribution<img src="/Icons/icon-19.svg" alt="" /></label>
              <Input placeholder="Enter local dollars" type={"number"} name="localDollarsContributed" onChange={handleChange}
                style={(errors.localDollarsContributed && touched.localDollarsContributed) ? {border: "solid red 1px"}:{}} />
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Requested Funding Year<img src="/Icons/icon-19.svg" alt="" /></label>
              <div id="capital-requested-funding-year">
                <Dropdown trigger={['click']} overlay={<DropdownMenuView values={values} items={REQUEST_FUNDING_YEAR} item={title} setItem={setTitle} field={'requestFundingYear'} />}
                  getPopupContainer={() => document.getElementById("capital-requested-funding-year" ) as HTMLElement}>
                  <Button className="btn-borde" style={(errors.requestFundingYear && touched.requestFundingYear && !values.requestFundingYear) ? {border: "solid red 1px"}:{}}>
                    {values.requestFundingYear ? REQUEST_FUNDING_YEAR.filter(element => element.id === +(values.requestFundingYear))[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </div>

            </Col>
            <Col className="gutter-row" span={12}>
              <label className="label-new-form" htmlFor="">Goal<img src="/Icons/icon-19.svg" alt="" /></label>
              <div id="capital-goal">
                <Dropdown trigger={['click']} overlay={<DropdownMenuView values={values} items={GOAL} item={title} setItem={setTitle} field={'goal'} />}
                  getPopupContainer={() => document.getElementById("capital-goal" ) as HTMLElement}>
                  <Button className="btn-borde" style={(errors.goal && touched.goal && !values.goal) ? {border: "solid red 1px"}:{}}>
                    {values.goal ? GOAL.filter(element => element.id === (values.goal))[0].name : '- Select -'} <img src="/Icons/icon-12.svg" alt="" />
                  </Button>
                </Dropdown>
              </div>

            </Col>
          </Row>
        </div>
        <div className="img-npf">
          <label className="label-new-form" htmlFor=""><h3>Upload Main Image</h3><img src="/Icons/icon-19.svg" alt="" /></label>
          <Dragger customRequest={dummyRequest} onChange={({file, fileList} : any) => setMainImage(fileList)}>
            <img src="/Icons/icon-17.svg" alt="" />
            <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
          </Dragger>
          {/* <div className="tag-upload">
            <Tag closable>
              Little Dry Creek_image-1.jpg
            </Tag>
          </div> */}
        </div>
        <div className="img-npf">
          <label className="label-new-form" htmlFor=""><h3>Upload Attachments</h3><img src="/Icons/icon-19.svg" alt="" /></label>
          <Dragger customRequest={dummyRequest} className="img-npf" onChange={({file, fileList} : any) => setListFiles(fileList)}>
            <img src="/Icons/icon-17.svg" alt="" />
            <p className="ant-upload-text">Attach Docs, PDFs, CSVs, ZIPs and other files</p>
          </Dragger>
          {/* <div className="tag-upload">
            <Tag closable>
              Little Dry Creek_image-2.csv
            </Tag>
          </div> */}
        </div>
        <div className="btn-footer" style={{ marginTop: '25px' }}>
          <Button style={{ width: '140px' }} className="btn-borde">Reset</Button>
          <Button style={{ width: '140px' }} className="btn-purple" block htmlType="submit" >Create Project</Button>
        </div>
      </Form>
    </div>
  </>
}

const layers = {
  components: true
}

export default mapFormContainer(ProjectCapitalForm, layers);
