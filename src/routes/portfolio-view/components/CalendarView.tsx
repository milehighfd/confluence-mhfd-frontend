import React, { useEffect, useState } from "react";
import { Button, Calendar, Col, Input, Layout, message, Popover, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';


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
    <h1 style={{marginLeft:'20px'}}>Showing 12 Projects</h1>
    <div style={{overflowY:'scroll'}}>
      <img src="/picture/Maps.png" alt="" width="100%" />
    </div>
    
  </div>
};

export default CalendarView;