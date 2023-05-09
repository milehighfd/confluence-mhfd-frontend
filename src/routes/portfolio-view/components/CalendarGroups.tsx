import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { usePortflioState } from 'hook/portfolioHook';
import CalendarBody from 'routes/portfolio-view/components/CalendarBody';

const { Panel } = Collapse;

const CalendarGroups = ({
  data,
  groupCollapsed,
  setCollapsePhase,
  collapsePhase,
  setOpenTable,
  openTable,
  index,
  tabKey,
  divRef,
  searchRef,
  tableRef,
  totalLabelWidth,
  scheduleList,
  phaseList,
  statusCounter,
  setTollData,
  setOpenModalTollgate,
  actionsDone,
  setOpenPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  moveSchedule,
  scheduleRef,
  isZoomToday,
  setIsZoomToday,
  isZoomWeekly,
  setIsZoomWeekly,
  isZoomMonthly,
  setIsZoomMonthly,
  zoomTimeline,
  setZoomTimeline,
  editData,
  setEditData,
  zoomSelected,
  setZoomSelected,
  setPopUpData,
  filterPagination,
  setFilterPagination,
  updatedGroup,
  secondaryUpdatedGroup,
  updateFavorites,
  setUpdateFavorites,
  dataId,
}: {
  data: any,
  groupCollapsed: any,
  setCollapsePhase: any,
  collapsePhase: any,
  setOpenTable: any,
  openTable: any,
  index: any,
  tabKey: any,
  divRef: any,
  searchRef: any,
  tableRef: any,
  totalLabelWidth: any,
  scheduleList: any,
  phaseList: any,
  statusCounter: any,
  setTollData: any,
  setOpenModalTollgate: any,
  actionsDone: any,
  setOpenPiney: any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  moveSchedule: any,
  scheduleRef: any,
  isZoomToday: any,
  setIsZoomToday: any,
  isZoomWeekly: any,
  setIsZoomWeekly: any,
  isZoomMonthly: any,
  setIsZoomMonthly: any,
  zoomTimeline: any,
  setZoomTimeline: any,
  editData: any,
  setEditData: any,
  zoomSelected: any,
  setZoomSelected: any,
  setPopUpData: any,
  filterPagination: any,
  setFilterPagination: any,
  updatedGroup: any,
  secondaryUpdatedGroup: any,
  updateFavorites: any,
  setUpdateFavorites: any,
  dataId: any,
}) => {
  const { currentGroup } = usePortflioState();

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
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
    <div  className="table-body2" id={data.id} key={data.id} style={{overflowY:'hidden', overflowX: 'hidden'}}>
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
          <div className="header-group">
            <div style={{display: 'flex', maxWidth: '79%', alignItems: 'center'}}>
            <span style={{width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',}}>{`${data.value==='NoGroupAvailable'?'No Group Available':data.value} (${counter})`}</span>
           </div>
           <div className="btn-collapse" onClick={(e) => {e.stopPropagation(); }}>
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
          <CalendarBody
            groupCollapsed={groupCollapsed}
            dataId={data}
            tabKey={tabKey}
            next={next}
            prev={prev}
            setNext={setNext}
            setPrev={setPrev}
            openTable={openTable}
            setOpenTable={setOpenTable}
            index={index}
            divRef={divRef}
            searchRef={searchRef}
            tableRef={tableRef}
            totalLabelWidth={totalLabelWidth}
            scheduleList={scheduleList}
            phaseList={phaseList}
            statusCounter={statusCounter}
            setTollData={setTollData}
            setOpenModalTollgate={setOpenModalTollgate}
            actionsDone={actionsDone}
            setOpenPiney={setOpenPiney}
            setGrapphicOpen={setGrapphicOpen}
            setPositionModalGraphic={setPositionModalGraphic}
            setDataModal={setDataModal}
            moveSchedule={moveSchedule}
            scheduleRef={scheduleRef}
            groupName={data.value}
            isZoomToday={isZoomToday}
            setIsZoomToday={setIsZoomToday}
            isZoomWeekly={isZoomWeekly}
            setIsZoomWeekly={setIsZoomWeekly}
            isZoomMonthly={isZoomMonthly}
            setIsZoomMonthly={setIsZoomMonthly}
            zoomTimeline={zoomTimeline}
            setZoomTimeline={setZoomTimeline}
            editData={editData}
            setEditData={setEditData}
            zoomSelected={zoomSelected}
            setZoomSelected={setZoomSelected}
            setPopUpData={setPopUpData}
            filterPagination={filterPagination}
            setFilterPagination={setFilterPagination}
            updatedGroup={updatedGroup}
            secondaryUpdatedGroup={secondaryUpdatedGroup}
            updateFavorites={updateFavorites}
            setUpdateFavorites={setUpdateFavorites}
            counter={counter}
            page={page}
            setPage={setPage}
          ></CalendarBody>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default CalendarGroups;