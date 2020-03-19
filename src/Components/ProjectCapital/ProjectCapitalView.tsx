import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Dropdown, Menu, Button, Tag, Input, Upload, Table, Form } from 'antd';
// import * as Yup from "yup";
import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import DropdownMenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";
import Map from '../Map/Map';
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN, NEW_PROJECT_FORM_COST } from "../../constants/constants";
import { Capital } from "../../Classes/Capital";
import { Redirect, useLocation } from "react-router-dom";
import { SERVER } from "../../Config/Server.config";
import * as datasets from "../../Config/datasets";
import { useFormik } from "formik";
import { VALIDATION_PROJECT_CAPITAL } from "../../constants/validation";
import { FOOTER_PROJECT_CAPITAL } from "../../constants/constants";
import { NewProjectFormProps, ComponentType } from "../../Classes/MapTypes";

const { Dragger } = Upload;
const { TextArea } = Input;


const requestFundingYear = [ 2020, 2021, 2022, 2023];
const goal = [ "Reduce flood risk to Structures", "Stream bank or bed stabilization", "Create shared-use paths and recreation", "Vegetation Enhancements", "Include permanent water quality BMP"];

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

const columns01 = ({removeSelectedItem} : any) => [
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
    render: (text : any, record : any) => <a onClick={() => removeSelectedItem(record.key)}><img src="/Icons/icon-16.svg" alt=""/></a>,
  },
];

const columns02 = ({ total, numberWithCommas } : any) => [
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

const data02 = ({total, numberWithCommas, updatePercentageCosts} : any) => [
  {
    key: '1',
    Component: 'Additional Cost',
    Jurisdiction: <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      20% <img src="/Icons/icon-12.svg" alt=""/>
    </a>
    </Dropdown>,
    Cost: <span>${numberWithCommas(total.additional.cost)}</span>,
    StudyName: <Input placeholder="Enter Description" />,
  },
  {
    key: '2',
    Component: 'Overhead Cost',
    Jurisdiction: <Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      20%<img src="/Icons/icon-12.svg" alt=""/>
    </a>
    </Dropdown>,
    Cost: <span>${numberWithCommas(total.overhead.cost)}</span>,
    StudyName: <Input placeholder="Enter Description" />,
  },
];



const data03 = ({ total, numberWithCommas } : any) => [
  {
    key: '1',
    Component: 'TOTAL COST',
    Cost: <span className="numbers01-table">${numberWithCommas(total.total)}</span>,
  },
];

const footer = FOOTER_PROJECT_CAPITAL;
const validationSchema = VALIDATION_PROJECT_CAPITAL;
export default ({ problems, projects, components, getReverseGeocode, savePolygonCoordinates, saveNewProjectForm } : NewProjectFormProps) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  const [title, setTitle] = useState<string>('');
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [formatSelectedItems, setFormatSelectedItems] = useState<Array<[]>>([]);
  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [total, setTotal] = useState<any>(NEW_PROJECT_FORM_COST);
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

  useEffect(() => {
    const selectedItemsCopy = selectedItems.map((item : ComponentType) => {
      return {...item, key: item.componentId, howCost: '$'+numberWithCommas(item.howCost)}
    });
    setFormatSelectedItems(selectedItemsCopy);

    if(selectedItems.length) {
      const subtotal = selectedItems.map((item : ComponentType) => item.howCost).reduce((a : number, b : number) => a + b, 0);
      const atnCost = subtotal * total.additional.per;
      const ovhCost = subtotal * total.overhead.per;
      const pricing = subtotal + atnCost + ovhCost;
      const additional = { ...total.additional, cost: atnCost };
      const overhead = { ...total.overhead, cost: ovhCost };
      setTotal({...total, subtotal, additional, overhead, total: pricing})
    } else {
      const additional = { ...total.additional, cost: 0 };
      const overhead = { ...total.overhead, cost: 0 };
      setTotal({...total, subtotal: 0, additional, overhead, total: 0 })
    }
  }, [selectedItems]);

  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      description: '',
      localDollarsContributed: 0,
      mhfdFundingRequest: '',
      requestName: cad[2] ? cad[2] : '',
      requestFundingYear: 0,
      goal: ''
    },
    validationSchema,
    onSubmit(values: {description: string, requestName: string, localDollarsContributed: number, requestFundingYear: number, mhfdFundingRequest: string, goal: string}) {
      saveNewProjectForm(values, selectedItems, total);
    }
  });
  if(redirect) {
    return <Redirect to="/map" />
  }
  const getPolygonButton = () => {
    const div = document.getElementById('polygon');
    const btn = div?.getElementsByTagName("button")[0];
    btn?.click();
  }

  const removeSelectedItem = (key : string) => {
    const items = [...selectedItems];
    const index = items.findIndex((item : any) => item.componentId === key);
    items.splice(index, 1);
    setSelectedItems(items);
  }

  const numberWithCommas = (x : number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const updatePercentageCosts = () => {
    console.log('updating');
  }
  
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
              <Form onSubmit={handleSubmit}>
              <Row>
              <Col span={leftWidth}>
              <Map
                  leftWidth={leftWidth}
                  problems={problems}
                  projects={projects}
                  components={components}
                  setSelectedItems={setSelectedItems}
                  selectedItems={selectedItems}
                  setIsPolygon={setIsPolygon}
                  getReverseGeocode={getReverseGeocode}
                  savePolygonCoordinates={savePolygonCoordinates} />

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
                      <span className="directions-page">{values.requestName}</span>
                    </Col>
                  </Row>
                    <div className="head-m project-comp">
                      <div className="project-comp-btn">
                        <h5>SELECTED STREAMS</h5>
                        <div id="polygon" />
                        <span>|</span>
                        <form id="demo-2">
                        	<input type="search" placeholder="Search"/>
                        </form>
                        <button><img src="/Icons/icon-35.svg" alt=""/></button>
                      </div>
                        <span>TOTAL COST: ${numberWithCommas(total.total)}</span>
                    </div>
                    {!isPolygon ?
                      <div className="head-m draw-section">
                          <button onClick={getPolygonButton}><img src="/Icons/icon-08.svg" alt=""/></button>
                          <h6>Click on the icon above and draw a polygon to select components</h6>
                      </div>
                      :
                      <div className="table-create-pro">
                        <Table columns={columns01({removeSelectedItem})} dataSource={formatSelectedItems} pagination={false} />
                      </div>
                    }
                    <div className="table-create-bottom">
                      <Table columns={columns02({total, numberWithCommas})} dataSource={data02({total, numberWithCommas, updatePercentageCosts})} pagination={false} />
                      <Table className="footer-table" columns={footer} dataSource={data03({total, numberWithCommas})} pagination={false} />
                    </div>
                    <br></br>

                    <div className="label-npf">
                      <label className="label-new-form" htmlFor="">Description<img src="/Icons/icon-19.svg" alt=""/></label>
                      <TextArea rows={4} placeholder="Enter description" required name="description" onChange={handleChange} />
                    </div>
                    <br></br>
                    <div className="gutter-example user-tab all-npf">
                        <div className="label-new-form">
                          <h3>PROJECT INFORMATION</h3>
                        </div>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">MHFD Funding Request<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input placeholder="Enter MHFD funding request" required name="mhfdFundingRequest" onChange={handleChange} />
                          </Col>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Local Dollars Contribution<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input placeholder="Enter local dollars" required type={"number"} name="localDollarsContributed" onChange={handleChange} />
                          </Col>
                        </Row>
                        <br></br>
                        <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                          <label className="label-new-form" htmlFor="">Requested Funding Year<img src="/Icons/icon-19.svg" alt=""/></label>
                            <Dropdown overlay={ <DropdownMenuView values={values} items={requestFundingYear} item={title} setItem={setTitle} field={'requestFundingYear'}/> }>
                              <Button>
                              {values.requestFundingYear ? values.requestFundingYear : '- Select -'} <img src="/Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Goal<img src="/Icons/icon-19.svg" alt=""/></label>
                            <Dropdown overlay={ <DropdownMenuView values={values} items={goal} item={title} setItem={setTitle} field={'goal'}/> }>
                              <Button>
                              {values.goal ? values.goal : '- Select -'} <img src="/Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>
                        </Row>
                    </div>
                    <div className="img-npf">
                      <label className="label-new-form" htmlFor=""><h3>Upload Main Image</h3><img src="/Icons/icon-19.svg" alt=""/></label>
                      <Dragger>
                        <img src="/Icons/icon-17.svg" alt=""/>
                        <p className="ant-upload-text">Attach main image in PNG or JPEG format</p>
                      </Dragger>
                      <div className="tag-upload">
                        <Tag closable>
                          Little Dry Creek_image-1.jpg
                        </Tag>
                      </div>
                    </div>
                    <div className="img-npf">
                      <label className="label-new-form" htmlFor=""><h3>Upload Attachments</h3><img src="/Icons/icon-19.svg" alt=""/></label>
                      <Dragger className="img-npf">
                        <img src="/Icons/icon-17.svg" alt=""/>
                        <p className="ant-upload-text">Attach Docs, PDFs, CSVs, ZIPs and other files</p>
                      </Dragger>
                      <div className="tag-upload">
                        <Tag closable>
                            Little Dry Creek_image-2.csv
                        </Tag>
                      </div>
                    </div>
                    <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01" block htmlType="submit" >Create Project</Button>
                    </div>
                </div>
              </Col>
              </Row>
              </Form>
            </Layout>
          </Layout>
        </Layout>
        </>
}
