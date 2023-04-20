import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LeftOutlined, MoreOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
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
  favorites,
  email,
  divRef,
  searchRef,
  tableRef,
  tabKeyId,
  headerRef,
}: {
  data: any,
  setCollapsePhase: any,
  collapsePhase: any,
  setOpenTable: any,
  openTable: any,
  index: any,
  currentGroup: any,
  tabKey: any,
  favorites: any,
  email: any,
  divRef: any,
  searchRef: any,
  tableRef: any,
  tabKeyId: any,
  headerRef: any,
}) => {
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const getActiveKeys = () => {
    const indices = openTable.reduce(
      (out: string | any[], bool: any, index: any) => bool ? out.concat(index) : out,
      []
    );
    return indices;
  }

  return <>
    <div  className="table-body2" id={data.id} key={data.id}>
      <Collapse
        //defaultActiveKey={['0', '1', '2']}
        activeKey={getActiveKeys()}
        onChange={
          () => {
            setCollapsePhase(!collapsePhase)            
            const newOpenTable = [...openTable];
            newOpenTable[index] = !openTable[index] as any;
            setOpenTable(newOpenTable);
          }
        } className=''
      >
   
        <Panel header={
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              className="line-table"
              onMouseEnter={e => {
                //setHoverTable(-1)
              }}
            ></div>
            {data.value}
            <div style={{ display: 'flex', marginLeft: 'auto', gap: '5px', alignItems:'center' }}>
              <LeftOutlined onClick={(e) => {
                e.stopPropagation();
                setPrev(true);
              }} />
              <RightOutlined onClick={(e) => {
                e.stopPropagation();
                setNext(true);
              }} />

            </div>
          </div>
        } key={index}>
          <TableBody
            currentGroup={currentGroup}
            dataId={data.id}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            email={email}
            openTable={openTable}
            setOpenTable={setOpenTable}
            index={index}
            divRef={divRef}
            searchRef={searchRef}
            tableRef={tableRef}
            tabKeyId={tabKeyId}
            headerRef={headerRef}
          ></TableBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default TableGroups;