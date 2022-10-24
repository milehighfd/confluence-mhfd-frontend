import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, Input, Layout, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CloseOutlined, FormOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import ModalTollgate from "routes/list-view/components/ModalTollgate";


const { Step } = Steps;
const CalendarView = () => {
  const [current, setCurrent] = useState(0);
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [openPiney, setOpenPiney] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return <div className="calendar-body">
    <ModalTollgate visible={openModalTollgate}setVisible ={setOpenModalTollgate}/>
    {openPiney && <div className="piney-text">
      <div className="header-piney" style={{marginBottom:'20px'}}>
        <CloseOutlined onClick={()=>{setOpenPiney(false)}}/>
        <FormOutlined style={{fontSize:'20px'}}/>
      </div>
      <div className="body-piney">
        <h1 style={{color:'#000000', fontSize:'16px', marginBottom:'15px'}}>Piney Creek Channel Restore</h1>
        <span className="tag-blue">Funding Phase</span><span className="tag-blue">Capital</span>
        <p style={{marginTop:'20px', marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
        <p>The same screen can be built in a lot of different ways, but only a few of them will get your message accross correctly and result in an easy-to-use software or...<span style={{fontWeight:'700'}}>more</span></p>
        <div className="form-text-calendar">
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 10 }}>
              <p>MHFD Lead</p>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 14 }}>
            <img src="/picture/user.png" alt="" height="24px" style={{borderRadius: '50%'}}/> <span>Jon Villines</span>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 10 }}>
              <p>Total Cost</p>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 14 }}>
              <p>$3,708,000</p>
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
              <p>July 1, 2021</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 10 }}>
              <p>End Date</p>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 14 }}>
              <p>December 6, 2021</p>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10 }} lg={{ span: 10 }}>
              <p>Duration</p>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 14 }}>
            <ClockCircleOutlined />&nbsp; &nbsp;  <span>5 months  5 days</span>
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
    </div>}
    <Row style={{margin:'15px 10px'}}>
      <Col xs={{ span: 10 }} lg={{ span: 12 }}>
        <div>
          <span className="span-dots-heder">
            <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
            <span style={{marginLeft:'1px', marginRight:'15px'}}>Completed</span>
          </span>
          <span className="span-dots-heder">
            <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
            <span style={{marginLeft:'1px', marginRight:'15px'}}>Active</span>
          </span>
          <span className="span-dots-heder">
            <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
            <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
          </span>
          <span className="span-dots-heder">
            <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
            <span style={{marginLeft:'1px', marginRight:'15px'}}>Delayed</span>
          </span>
        </div>
      </Col>
      <Col xs={{ span: 10 }} lg={{ span: 12 }} style={openPiney ? {textAlign:'end', paddingRight:'280px'} : {textAlign:'end', paddingRight:'15px'}}>
        <div>
          <Button style={{border: '1px solid transparent', color: '#11093C', opacity: '0.6', paddingRight: '8px'}} onClick={() => {setOpenModalTollgate(true)}}>
            <CalendarOutlined /> Edit Dates
          </Button>
          <span style={{marginRight:'8px', color:'#DBDBE1'}}>|</span>
          <ZoomInOutlined style={{marginRight:'8px', color: '#11093C', opacity: '0.6'}}/>
          <ZoomOutOutlined  style={{color: '#11093C', opacity: '0.6'}}/>
        </div>
      </Col>
    </Row>
    <div style={{overflowY:'scroll'}}>
      <img src="/picture/Maps.png" alt="" width="100%" onClick={() => {setOpenPiney(true)}}/>
    </div>
    
  </div>
};

export default CalendarView;