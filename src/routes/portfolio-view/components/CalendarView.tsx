import React, { useEffect, useState } from "react";
import { Button, Calendar, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { CalendarOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";


const { Step } = Steps;
const CalendarView = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return <div className="calendar-body">
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
      <Col xs={{ span: 10 }} lg={{ span: 12 }}>
        <div>
          <Button style={{border: '1px solid transparent', color: '#11093C', opacity: '0.6', paddingRight: '8px'}}>
            <CalendarOutlined /> Edit Dates
          </Button>
          <span style={{marginRight:'8px', color:'#DBDBE1'}}>|</span>
          <ZoomInOutlined style={{marginRight:'8px', color: '#11093C', opacity: '0.6'}}/>
          <ZoomOutOutlined  style={{color: '#11093C', opacity: '0.6'}}/>
        </div>
      </Col>
    </Row>
    <div style={{overflowY:'scroll'}}>
      <img src="/picture/Maps.png" alt="" width="100%" />
    </div>
    
  </div>
};

export default CalendarView;