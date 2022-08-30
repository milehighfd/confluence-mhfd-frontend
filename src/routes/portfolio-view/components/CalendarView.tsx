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
  return <div className="phaseview-body">
    <h1>Showing 12 Projects</h1>
  </div>
};

export default CalendarView;