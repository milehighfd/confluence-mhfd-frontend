import React, { useEffect, useState } from "react";
import { Button, Calendar, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, CloseOutlined, FormOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
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
      <h1 style={{color:'#000000', fontSize:'16px', marginBottom:'15px'}}>Piney Creek Channel Restore</h1>
      <span className="tag-blue">Funding Phase</span><span className="tag-blue">Capital</span>
      <p style={{marginTop:'20px', marginBottom:'5px', fontWeight:'700', opacity:'0.6'}}>Notes</p>
      <p>The same screen can be built in a lot of different ways, but only a few of them will get your message accross correctly and result in an easy-to-use software or...<span style={{fontWeight:'700'}}>more</span></p>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>MHFD Lead</p>
        </Col>
        <Col xs={{ span: 10 }} lg={{ span: 12 }}>
          <p>Jon Villines</p>
        </Col>
      </Row>
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