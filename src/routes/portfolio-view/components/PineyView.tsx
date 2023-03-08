import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, InfoCircleOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import { drag } from "d3";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

const { Step } = Steps;
const PineyView = ({setOpenPiney,data}:{setOpenPiney:any,data?:any}) => {
  const dateFormatList = ['MM/DD/YYYY', 'MM/DD/YY'];
  const [openDrop, setOpenDrop] = useState(false);
  const [editView, setEditView] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState({
    draft:true,
    sign:false,
    request: false,
    send: false,
    pay: false,
  });
  const menu = (
    <Menu
      className="card-dropdown"
      items={[
        {
          key: '1-1',
          label: <>
            <img src="/picture/user.png" height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Jon Villines</span>
          </>,
        },
        {
          key: '1-2',
          label: <>
            <img src="/picture/user01.png"height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Jane Smith </span>
          </>,
        },
        {
          key: '1-3',
          label: <>
            <img src="/picture/user02.png"height={30} width="30" style={{marginRight:'5px'}}/>
            <span style={{fontSize:'14px'}}>Robert Croquette  </span>
          </>,
        },
      ]}
    />
  );
  const [actionList, setActionList] = useState<any>([])

  useEffect(() => {   
    datasets.postData(`${SERVER.PHASE_TYPE}/phases`, { code_phase_type_id: data.phase_id })
      .then((rows) => {
        setActionList(rows.map((x:any) =>{          
          return x.action_item_name
        }))
      })
      .catch((e) => {
        console.log(e);
      })      
  }, [data])
  return (
    <>
      <div className="header-piney" style={{marginBottom:'20px'}}>
        <CloseOutlined onClick={()=>{setOpenPiney(false)}}/>
        <FormOutlined style={{fontSize:'20px'}} className={editView ? 'active-btn-piney active-btn-piney-edit':'active-btn-piney-edit'} onClick={()=>{setEditView(!editView)}}/>
      </div>
      <div className="body-piney">
        <h1 style={{ color: '#000000', fontSize: '16px', marginBottom: '15px' }}>{data.project_name}</h1>
        <div style={{ marginBottom: '7px' }}>
          <span className="tag-blue">{data.phase}</span>
          </div>
        <div style={{ marginBottom: '25px' }}>
          <span className="tag-blue">{data.project_type}</span>
        </div>
        <div className="body-piney-body">
          <p style={{ marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
          {editView? <><TextArea rows={4} style={{marginBottom:'15px'}}/></>:
            <p>The same screen can be built in a lot of different ways, but only a few of them will get your message accross correctly and result in an easy-to-use software or...<span style={{fontWeight:'700'}}>more</span></p>
          }
          <div className="form-text-calendar">
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>MHFD Lead/PM</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {/* {editView ?
                  <>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']} getPopupContainer={(trigger:any) => trigger.parentNode} onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
                      <Space style={{border:'1px solid #eae8f0', borderRadius:'17.5px', padding:'3px 5px', width:'100%', justifyContent:'space-between'}}>
                        <div><img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span>Jon Villines</span></div>
                        {openDrop ? <UpOutlined style={{color:'#251863'}} /> : < DownOutlined style={{color:'#251863'}} />}
                      </Space>
                    </Dropdown>
                  </>
                  : */}
                  <>
                    <img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span  style={{opacity:'0.5'}}>Jon Villines</span>
                  </>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Total Est. Cost <InfoCircleOutlined style={{color:'rgb(205 203 214)'}}/></p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {/* {editView ?
                  <input type="text" placeholder="$3,708,000" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%'}} className='input-focus'></input>
                  : */}
                  <p>$3,708,000</p>
                {/* } */}
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Phase</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                <span style={{opacity:'0.5'}}>Funding</span> &nbsp;<span className="tag-blue">20%</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Start Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList}/>
                  :<p>July 1, 2021</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
                {editView ?
                  <DatePicker className="date-piney-picker" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 8px', width:'100%' }} format={dateFormatList} />
                  :<p>December 6, 2021</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Duration</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{opacity:'0.5'}}/>&nbsp; &nbsp;<span  style={{opacity:'0.5'}}>5 months  5 days</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 11 }}>
                <p>Remaining Time</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 13 }}>
              <ClockCircleOutlined style={{opacity:'0.5'}}/>&nbsp; &nbsp;<span  style={{opacity:'0.5'}}>5 months  5 days</span>
              </Col>
            </Row>
          </div>
          <p style={{marginTop:'10px', marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Action Items</p>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 4 }}>
                <p style={{fontSize:'12px', fontWeight:'700', paddingTop:'2px'}}>20%</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 20 }}>
                <Progress percent={20} />
              </Col>
            </Row>                       
            {actionList.map((x:any) =>{
              return (<div className={checkboxValue.draft ? "checkbox-select-active checkbox-select":"checkbox-select"} onClick={(e)=>{setCheckboxValue({...checkboxValue, draft: !checkboxValue.draft })}}>
              <p>{x}</p>
              <Checkbox checked={checkboxValue.draft} onChange={(e)=>{setCheckboxValue({...checkboxValue, draft: !checkboxValue.draft })}}></Checkbox>
            </div>)
            })}            
        </div>
      </div>
    </>
  )
};

export default PineyView;