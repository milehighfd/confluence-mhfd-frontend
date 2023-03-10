import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import { drag } from "d3";

const { Step } = Steps;
const ModalGraphic = ({ positionModalGraphic,
  dataProject}
  : {
    positionModalGraphic?: any,
    dataProject?:any,
  }) => {
    if (Object.keys(dataProject).length > 0) {
      return (
        <div className='modal-graphic' id='popup-phaseview' style={{ left: positionModalGraphic.left, top: positionModalGraphic.top }}>
          <p className="title">{dataProject.schedulePhase}</p>
          <p style={{ color: 'white' }}>{dataProject.d.rowLabel}</p>
          <hr></hr>
          <p>{`${dataProject.scheduleList-dataProject.actualNumber} Action Item of ${dataProject.scheduleList} Closed`}</p>
          <hr></hr>
          <p>Due on November 26, 2022.</p>
        </div>
      )
    }else{
      return (
        <div className='modal-graphic' id='popup-phaseview' style={{ left: positionModalGraphic.left, top: positionModalGraphic.top }}>
          <p className="title">-</p>
          <p style={{ color: 'white' }}>-</p>
          <hr></hr>
          <p>{`- Action Item of - Closed`}</p>
          <hr></hr>
          <p>Due on November 26, 2022.</p>
        </div>
      )
    }
  
}

export default ModalGraphic;