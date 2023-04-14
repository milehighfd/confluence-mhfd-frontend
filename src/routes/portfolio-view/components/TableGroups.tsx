import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import TableBody from "./TableBody";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const TableGroups = ({
  data,
  setCollapsePhase,
  collapsePhase,
  setOpenTable,
  openTable,
  index,
  currentGroup,
  tabKey,
}: {
  data: any,
  setCollapsePhase: any, 
  collapsePhase: any,
  setOpenTable: any, 
  openTable: any,
  index: any,
  currentGroup: any,
  tabKey: any,
}) => { 
  
  const getActiveKeys = () => {
    const indices = openTable.reduce(
      (out: string | any[], bool: any, index: any) => bool ? out.concat(index) : out, 
      []
    );
    return indices;
  }  
  
  return <>
    <div id={data.id} key={data.id}>
      <Collapse 
        defaultActiveKey={['0', '1', '2']}
        //activeKey={getActiveKeys()}
        onChange={
          () => {
            setCollapsePhase(!collapsePhase)
            // setTimeout(()=>{
            const newOpenTable = [...openTable];            
            newOpenTable[index] = !openTable[index] as any;
            setOpenTable(newOpenTable);
            // },70)
          }
        } className=''/*{openTable[0] && index === 0? "collapse-first":""}*/
        >
        <Panel  header={<div  onMouseEnter={(e: any) => {
          //setHoverTable(-1)
        }}>{data.value}</div>} key={index}>
          <TableBody currentGroup={currentGroup} dataId={data.id} tabKey={tabKey}></TableBody>          
        </Panel>
      </Collapse>
    </div>
  </>
};

export default TableGroups;