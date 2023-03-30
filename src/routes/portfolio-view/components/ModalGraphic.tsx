import React, { useEffect, useState } from "react";
import { Button, Calendar, Checkbox, Col, DatePicker, Dropdown, Input, Layout, Menu, message, Popover, Progress, Row, Select, Space, Steps, Table, Tabs, Tag } from 'antd';
import { NewProjectsFilter } from "../../../Components/FiltersProject/NewProjectsFilter/NewProjectsFilter";
import { ClockCircleOutlined, CloseOutlined, DownOutlined, FormOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import { drag } from "d3";
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";

const { Step } = Steps;
const ModalGraphic = ({ positionModalGraphic,
  dataProject}
  : {
    positionModalGraphic?: any,
    dataProject?:any,
  }) => {
    const [actualEndDate,setActualEndDate] = useState<any>()
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    if (Object.keys(dataProject).length > 0) {
      datasets.postData(`${SERVER.STATUS}`, { code_phase_type_id: dataProject.phase_id, project_id: dataProject.d.project_id })
        .then((rows) => {
          if (Object.keys(rows).length > 0) {
            if (rows[0].actual_end_date !== null) {
              let check1 = moment(rows[0].actual_end_date, 'YYYY-MM-DD');
              let monthEnd = check1.format('MM');
              monthEnd = monthNames[+monthEnd - 1];
              let dayEnd = check1.format('DD');
              let yearEnd = check1.format('YYYY');
              setActualEndDate(`Due on ${monthEnd} ${dayEnd}, ${yearEnd}.`)
            }
          }
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [])
    if (Object.keys(dataProject).length > 0) {
      return (
        <div className='modal-graphic' id='popup-phaseview' style={{ left: positionModalGraphic.left, top: positionModalGraphic.top }}>
          <p className="title">{dataProject.schedulePhase}</p>
          <p style={{ color: 'white' }}>{dataProject.d.rowLabel}</p>
          <hr></hr>
          <p>{dataProject.actualNumber<=1?`${dataProject.actualNumber} Action Item of ${dataProject.scheduleList} Remaining`:
          `${dataProject.actualNumber} Action Items of ${dataProject.scheduleList} Remaining`}</p>
          <hr></hr>
          <p>{!actualEndDate?'No data available.':actualEndDate}</p>
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
          <p>No data available.</p>
        </div>
      )
    }
  
}

export default ModalGraphic;