import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Dropdown, Menu, Button, Switch, Input, Table } from 'antd';
import DropdownMenuView from "../../Components/Shared/Project/DropdownMenu/MenuView";
import NavbarView from "../Shared/Navbar/NavbarView";
import SidebarView from "../Shared/Sidebar/SidebarView";
import Map from '../Map/Map';
import { MEDIUM_SCREEN, COMPLETE_SCREEN, EMPTY_SCREEN, NEW_PROJECT_FORM_COST } from "../../constants/constants";
import { MasterPlanOnly } from "../../Classes/Study/MasterPlanOnly";
import { useLocation, Redirect } from "react-router-dom";
import * as datasets from "../../Config/datasets";
import { SERVER } from "../../Config/Server.config";


const requestStartYear = [ 2020, 2021, 2022, 2023];
const goal = [ "Reduce flood risk to structures", "Stabilization", "Elminate roadway overtopping", "Increased Conveyance", "Peak flow reduction", "Water Quality", "Guide Development"];


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


const masterPlan = new MasterPlanOnly(); 
const send = {
  submit: false,
  optionSubmit : false
}

export default ({ problems, projects, components } : any) => {
  const location = useLocation();
  const cad = location.pathname.split('/');
  masterPlan.requestName = cad[2] ? cad[2] : '';
  const [projectMasterPlan, setProjectMasterPlan] = useState(masterPlan);
  const emptyStyle: React.CSSProperties = {};
  const [rotationStyle, setRotationStyle] = useState(emptyStyle);
  const [leftWidth, setLeftWidth] = useState(MEDIUM_SCREEN);
  const [rightWidth, setRightWitdh] = useState(MEDIUM_SCREEN);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [formatSelectedItems, setFormatSelectedItems] = useState<Array<[]>>([]);
  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [total, setTotal] = useState<any>(NEW_PROJECT_FORM_COST);
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

  useEffect(() => {
    const selectedItemsCopy = selectedItems.map((item : any) => {
      return {...item, key: item.componentId, howCost: '$'+numberWithCommas(item.howCost)}
    });
    setFormatSelectedItems(selectedItemsCopy);

    if(selectedItems.length) {
      const subtotal = selectedItems.map((item : any) => item.howCost).reduce((a : number, b : number) => a + b, 0);
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
  }, [selectedItems])

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

  if(submit.submit && submit.optionSubmit) {
    const valid = (
      projectMasterPlan.sponsor.length > 0 &&
      projectMasterPlan.requestName.length > 0 &&
      projectMasterPlan.coSponsor.length > 0 &&
      projectMasterPlan.requestedStartyear > 0 &&
      projectMasterPlan.goal.length > 0
    );
    if (valid) {
      
      const result = datasets.postData(SERVER.CREATE_PROJECT_STUDY_MASTER, projectMasterPlan, datasets.getToken()).then(res => {
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
                {/* <Map
                  leftWidth={leftWidth}
                  problems={problems}
                  projects={projects}
                  components={components}/> */}

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
                      <span className="directions-page">{projectMasterPlan.requestName}</span>
                    </Col>
                  </Row>

                    <div className="head-m project-comp">
                      <div className="project-comp-btn">
                        <h5>SELECTED STREAMS</h5>
                        {/* <button><img src="/Icons/icon-08.svg" alt=""/></button> */}
                        <div id="polygon" />
                        <span>|</span>
                        <form id="demo-2">
                        	<input type="search" placeholder="Search"/>
                        </form>
                        <button><img src="/Icons/icon-35.svg" alt=""/></button>
                      </div>
                        <span>Total Estimated Cost: ${numberWithCommas(total.total)}</span>
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

                    <div className="gutter-example user-tab all-npf">
                        <div className="label-new-form">
                          <h3>PROJECT INFORMATION</h3>
                        </div>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Sponsor<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input placeholder="Enter MHFD funding request" onChange={ (event) => {
                                        const auxProjectMasterPlan = {...projectMasterPlan};
                                        auxProjectMasterPlan.sponsor = event.target.value;
                                        setProjectMasterPlan(auxProjectMasterPlan);
                            }} /></Col>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Potential co-sponsor<img src="/Icons/icon-19.svg" alt=""/></label>
                          <Input placeholder="Enter local dollars" onChange={ (event) => {
                                        const auxProjectMasterPlan = {...projectMasterPlan};
                                        auxProjectMasterPlan.coSponsor = event.target.value;
                                        setProjectMasterPlan(auxProjectMasterPlan);
                            }} /></Col>
                        </Row>
                        <br></br>
                        <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                          <label className="label-new-form" htmlFor="">Requested Funding Year<img src="/Icons/icon-19.svg" alt=""/></label>
                            <Dropdown overlay={ <DropdownMenuView items={requestStartYear} item={projectMasterPlan} setItem={setProjectMasterPlan} field={'requestedStartyear'}/> }>
                              <Button>
                              {projectMasterPlan.requestedStartyear !== 0 ? projectMasterPlan.requestedStartyear : '- Select -'} <img src="/Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>
                          <Col className="gutter-row" span={12}>
                            <label className="label-new-form" htmlFor="">Goal<img src="/Icons/icon-19.svg" alt=""/></label>
                            <Dropdown overlay={ <DropdownMenuView items={goal} item={projectMasterPlan} setItem={setProjectMasterPlan} field={'goal'}/> }>
                              <Button>
                              {projectMasterPlan.goal ? projectMasterPlan.goal : '- Select -'} <img src="/Icons/icon-12.svg" alt=""/>
                              </Button>
                            </Dropdown>
                          </Col>
                        </Row>
                        <br></br>
                    </div>
                    <div className="btn-footer" style={{marginTop: '25px'}}>
                        <Button style={{width: '140px'}} className="btn-00">Reset</Button>
                        <Button style={{width: '140px'}} className="btn-01"onClick={ () => {
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
