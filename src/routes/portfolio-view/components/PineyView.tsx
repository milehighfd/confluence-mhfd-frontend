import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";


const { Step } = Steps;
const PineyView = ({setOpenPiney}:{setOpenPiney:any}) => {
  const [editView, setEditView] = useState(false);
  const menu = (
    <Menu
      className="card-dropdown"
      items={[
        {
          key: '1',
          type: 'group',
          label: 'People',
          children: [
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
          ],
        },
      ]}
    />
  );
  return (
    <div className="piney-text">
      <div className="header-piney" style={{marginBottom:'20px'}}>
        <CloseOutlined onClick={()=>{setOpenPiney(false)}}/>
        <FormOutlined style={{fontSize:'20px'}} className={editView ? 'active-btn-piney':''} onClick={()=>{setEditView(!editView)}}/>
      </div>
      <div className="body-piney">
        <h1 style={{color:'#000000', fontSize:'16px', marginBottom:'15px'}}>Piney Creek Channel Restore</h1>
        <div className="body-piney-body">
          <span className="tag-blue">Funding Phase</span><span className="tag-blue">Capital</span>
          <p style={{marginTop:'20px', marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
          {editView? <><TextArea rows={4} style={{marginBottom:'15px'}}/></>:
            <p>The same screen can be built in a lot of different ways, but only a few of them will get your message accross correctly and result in an easy-to-use software or...<span style={{fontWeight:'700'}}>more</span></p>
          }
          <div className="form-text-calendar">
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>MHFD Lead</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
                {editView ?
                  <>
                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                    <Space style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 5px', width:'100%', justifyContent:'space-between'}}>
                      <div><img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span>Jon Villines</span></div>
                      <DownOutlined style={{color:'#251863'}} />
                    </Space>
                    </Dropdown>
                  </>
                  :<>
                    <img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span>Jon Villines</span>
                  </>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>Total Cost</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
                {editView ?
                  <input type="text" placeholder="$3,708,000" style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 5px', width:'100%'}}></input>
                  :<p>$3,708,000</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>Phase</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
                <span>Funding</span> <span className="tag-blue">20%</span>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>Start Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
                {editView ?
                  <DatePicker style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 5px', width:'100%' }} />
                  :<p>July 1, 2021</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>End Date</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
                {editView ?
                  <DatePicker style={{border:'1px solid #eae8f0', borderRadius:'15px', padding:'3px 5px', width:'100%' }} />
                  :<p>December 6, 2021</p>
                }
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 10 }} lg={{ span: 10 }}>
                <p>Duration</p>
              </Col>
              <Col xs={{ span: 10 }} lg={{ span: 14 }}>
              <ClockCircleOutlined />&nbsp; &nbsp;<span>5 months  5 days</span>
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
          <div className="checkbox-select">
            <p>Draft IGA</p>
            <Checkbox></Checkbox>
          </div>
          <div className="checkbox-select">
            <p>Sign IGA</p>
            <Checkbox></Checkbox>
          </div>
          <div className="checkbox-select">
            <p>Request Funding</p>
            <Checkbox></Checkbox>
          </div>
          <div className="checkbox-select">
            <p>Send Invoice</p>
            <Checkbox></Checkbox>
          </div>
          <div className="checkbox-select">
            <p>Pay Invoice</p>
            <Checkbox></Checkbox>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PineyView;