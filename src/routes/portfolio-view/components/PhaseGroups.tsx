import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LeftOutlined, MoreOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import PhaseBody from "./PhaseBody";
import PineyView from "./PineyView";

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
const PhaseGroups = ({
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
  phaseRef,
  totalLabelWidth,
  scheduleList,
  phaseList,
  statusCounter,
  setTollData,
  setOpenModalTollgate,
  actionsDone,
  userBrowser,
  setOpenPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  userName,
  setPopUpData,
  headerRef,
  filterPagination,
  setFilterPagination,
  updateFavorites,
  setUpdateFavorites,
  dataId,
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
  phaseRef: any,
  totalLabelWidth: any,
  scheduleList: any,
  phaseList: any,
  statusCounter: any,
  setTollData: any,
  setOpenModalTollgate: any,
  actionsDone: any,
  userBrowser: any,
  setOpenPiney: any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  userName: any,
  setPopUpData: any,
  headerRef: any,
  filterPagination: any,
  setFilterPagination: any,
  updateFavorites: any,
  setUpdateFavorites: any,
  dataId: any,
}) => {
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    if(currentGroup !== 'streams'){
      datasets.postData(SERVER.GET_COUNT_PMTOOLS_PAGE(currentGroup, dataId) + `?code_project_type_id=${tabKey}`, filterPagination).then((res: any) => {
        setCounter(res.count)
      })
    }    
  },[tabKey,filterPagination])
  const getActiveKeys = () => {
    const indices = openTable.reduce(
      (out: string | any[], bool: any, index: any) => bool ? out.concat(index) : out,
      []
    );
    if(Number(counter) === 0) {
      return false;
    }
    return indices;
  }
  let limitPage = Number(counter) % 20 > 0 ?  Math.floor(Number(counter) / 20 + 1) : Number(counter) / 20;
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
        collapsible={Number(counter) ===0 ? "disabled" :"header"}
      >   
        <Panel header={
          <div  className="header-group">
            <div style={{display: 'flex', maxWidth: '79%', alignItems: 'center'}}>
              <span style={{width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',}}>{`${data.value==='NoGroupAvailable'?'No group Available':data.value} (${counter})`}</span>
            </div>
            <div className="btn-collapse">
              <LeftOutlined onClick={(e) => {
                e.stopPropagation();
                setPrev(true);
              }}
              className="btn-arrow-porfolio"
              style={page === 1 ? {color:'#2518633d', cursor: 'default'}:{}} 
              />
              <RightOutlined onClick={(e) => {
                e.stopPropagation();
                setNext(true);
              }}
              className="btn-arrow-porfolio"
              style={page === limitPage || Number(counter) === 0 ? {color:'#2518633d', cursor: 'default'}:{}}
              />
            </div>
          </div>
        } key={index}>
          <PhaseBody
            currentGroup={currentGroup}
            dataId={data}
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
            phaseRef={phaseRef}
            totalLabelWidth={totalLabelWidth}
            scheduleList={scheduleList}
            phaseList={phaseList}
            statusCounter={statusCounter}
            setTollData={setTollData}
            setOpenModalTollgate={setOpenModalTollgate}
            actionsDone={actionsDone}
            userBrowser={userBrowser}
            setGrapphicOpen={setGrapphicOpen}
            setPositionModalGraphic={setPositionModalGraphic}
            setDataModal={setDataModal}
            groupName={data.value}
            userName={userName}
            setOpenPiney={setOpenPiney}
            setPopUpData={setPopUpData}
            headerRef={headerRef}
            filterPagination={filterPagination}
            setFilterPagination={setFilterPagination}
            updateFavorites={updateFavorites}
            setUpdateFavorites={setUpdateFavorites}
            counter={counter}
            page={page}
            setPage={setPage}
          ></PhaseBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default PhaseGroups;