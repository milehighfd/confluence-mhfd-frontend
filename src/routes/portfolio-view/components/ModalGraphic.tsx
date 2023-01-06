import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import { drag } from "d3";

const { Step } = Steps;
const ModalGraphic = ({positionModalGraphic}:{positionModalGraphic:any}) => {
  return(
    <div className='modal-graphic' id='popup-phaseview' style={{left:positionModalGraphic.left, top:positionModalGraphic.top}}>
      <p className="title">Work Request</p>
      <p style={{color:'white'}}>Niver Creek Upstream of Zuni Ave and Thompson Ct</p>
      <hr></hr>
      <p>1 Action Item of 5 Closed</p>
      <hr></hr>
      <p>Due on November 26, 2022.</p>
    </div>
  )
}

export default ModalGraphic;