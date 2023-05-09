import { CalendarOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SERVER } from 'Config/Server.config';
import { Button, Col, Row } from 'antd';
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { getUserBrowser } from "utils/utils";
import * as datasets from "../../../Config/datasets";
import CalendarGroups from "./CalendarGroups";
import { getGroupList } from "./ListUtils";
import PineyView from "./PineyView";
import SearchDropdown from "./SearchDropdown";
import { usePortflioState } from '../../../hook/portfolioHook';

const CalendarViewPag = ({
  rawData,
  indexParent,
  phaseRef,
  searchRef,
  divRef,
  tableRef,
  tabKey,
  index,
  collapsePhase,
  setCollapsePhase,
  openTable,
  setOpenTable,
  favorites,
  setTollData,
  setOpenModalTollgate,
  setOpenPiney,
  openPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  moveSchedule,
  scheduleRef,
  userName,
  filterPagination,
  setFilterPagination,
  updatedGroup,
  secondaryUpdatedGroup,
  updateFavorites,
  setUpdateFavorites,
}: {
  rawData: any,
  indexParent: any,
  phaseRef: any,
  searchRef: any,
  divRef: any,
  tableRef: any,
  tabKey: any,
  index: any,
  collapsePhase: any,
  setCollapsePhase: any,
  openTable: any,
  setOpenTable: any,
  favorites: any,
  setTollData: any,
  setOpenModalTollgate: any,
  setOpenPiney: any,
  openPiney:any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  moveSchedule: any,
  scheduleRef: any,
  userName: any,
  filterPagination: any,
  setFilterPagination: any,
  updatedGroup: any,
  secondaryUpdatedGroup: any,
  updateFavorites: any,
  setUpdateFavorites: any,
}) => {
  const { currentGroup } = usePortflioState();

  const [phaseList, setPhaseList] = useState<any>([]);
  const [availableStatusList, setAvailableStatusList] = useState<any>([]);
  const [statusCounter, setStatusCounter] = useState(0);
  const [scheduleList, setScheduleList] = useState<any>({});
  const [statusList, setStatusList] = useState<any>([]);
  const [actionsDone, setActionsDone] = useState<any>({});
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const [userBrowser, setUserBrowser] = useState<any>()
  const [updateAction, setUpdateAction] = useState(false);
  const [isZoomToday, setIsZoomToday] = useState<any>(false);
  const [isZoomWeekly, setIsZoomWeekly] = useState<any>(false);
  const [isZoomMonthly, setIsZoomMonthly] = useState<any>(false);
  const [editData,setEditData] = useState<any>({});
  const [zoomSelected, setZoomSelected] = useState('Today');
  const [popUpData, setPopUpData] = useState<any>({});
  const [zoomTimeline, setZoomTimeline] = useState(0);
  const headerRef = useRef<null | HTMLDivElement>(null);
  let pageWidth  = document.documentElement.scrollWidth;
  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  let totalLabelWidth = phaseList.length * labelWidth;
  let heightSearchBody = document.getElementById("rc-tabs-0-panel-CIP")?.offsetHeight
  let heightSearchBody2 = document.getElementById("rc-tabs-1-panel-CIP")?.offsetHeight
  let heightSearchHeader = document.getElementById('searchPortfolio')?.offsetHeight
  let heightSearchtest = document.getElementById('tabsPM')?.offsetHeight
  let heightSearchB = (heightSearchBody ? heightSearchBody: heightSearchBody2)
  let heightSearch = (heightSearchtest && heightSearchHeader) && heightSearchtest-heightSearchHeader
  let marginReducerHeaderAxis =
    (windowWidth >= 3001 && windowWidth <= 3999 ? '-5.3px' :
      (windowWidth >= 2550 && windowWidth <= 3000 ? '-5.9px' :
        (windowWidth >= 1450 && windowWidth <= 1500 ? '-5.9px' :
          (windowWidth >= 1501 && windowWidth <= 1700 ? '-5.9px' :
            (windowWidth >= 2001 && windowWidth <= 2549 ? '-5.9px' :
              (windowWidth >= 1199 && windowWidth <= 1449 ? '-5.9px' : '-5.9px'))))));

  useEffect(() => {
    setUserBrowser(getUserBrowser());
    const controller = new AbortController();
    datasets.getData(
      `${SERVER.PROJECT_ACTION_ITEM}`,
      datasets.getToken(),
      controller.signal
    ).then((e) => {
      setActionsDone(e);
    }).catch((e) => {
      console.log(e);
    });
    return () => {
      controller.abort();
    };
  }, [tabKey, updateAction])

  useEffect(() => {
    let z = [];
    const controller = new AbortController();
    datasets.postData(
      `${SERVER.PHASE_TYPE}`,
      { tabKey: tabKey },
      datasets.getToken(),
      controller.signal
    )
      .then((rows) => {        
        setPhaseList(rows)
        setStatusCounter(rows.length)
        let counter = 0;
        z = rows.map((x: any) => {
          counter++;
          return (
            {
              categoryNo: counter,
              from: moment(null),
              to: moment(null),
              status: x?.code_status_type?.status_name,
              name: x.phase_name,
              phase: x.phase_name,
              tasks: x.code_rule_action_items.length,
              phase_id: x.code_phase_type_id,
              tasksData: x.code_rule_action_items,
              duration: x.duration,
              duration_type: x.duration_type,
              code_phase_type_id: x.code_phase_type_id,
              code_status_type_id: x.code_status_type?.code_status_type_id,
            })
        })
        setScheduleList(z);
        const y = rows.map((x: any) => {
          return x.code_status_type;
        })
        setStatusList(y)
        setUpdatePhaseList(!updatePhaseList)
        return rows
      })
      .catch((e) => {
        console.log(e);
      })
    return () => {
      controller.abort();
    };
  }, [actionsDone])

  useEffect(() => {
    const z: any = [];
    statusList.map((img: any) => {
      if (z.indexOf(img.status_name) === -1) {
        z.push(img.status_name)
      }
    });
    const counts = z.map((item1: any) => ([
      item1,
      (statusList.filter((item: any) => item.status_name === item1).length) * labelWidth
    ]));
    setAvailableStatusList(counts)
  }, [updatePhaseList])

  useEffect(() => {
    getGroupList(currentGroup).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    })
  }, [currentGroup])

  return <>
    {openPiney && (
      <div className="phaseview-body">
        <div className="piney-text">
          <PineyView
            setOpenPiney={setOpenPiney}
            data={popUpData}
            userName={userName}
            setUpdateAction={setUpdateAction}
            updateAction={updateAction}
            isDetail={false}
            setOpenModalTollgate={setOpenModalTollgate}
            setTollData={setTollData}
          />
        </div>
      </div>
    )}
    <Row>
      <Col xs={ { span: 10 }} lg={{ span: 5 }}>
        <SearchDropdown rawData={rawData}
          fullData={rawData}
          setOpenTable={setOpenTable}></SearchDropdown>
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        <div className="calendar-body" id="widthDivforChart">
          <Row id='zoomButtons' style={{ margin: '9px 10px', marginBottom: '-6px' }} className='zoom-buttons'>
            <Col xs={{ span: 10 }} lg={{ span: 12 }} className='calendar-header'>
              <div className='calendar-text-header'>
                <Button
                  className={zoomSelected === 'Today' ? "btn-view btn-view-active" : "btn-view"}
                  onClick={() => { setIsZoomToday(true); setZoomSelected('Today'); setZoomTimeline(0) }}
                >
                  Today
                </Button>
                <span style={{ marginRight: '0px', color: '#11093c', opacity: 0.6 }}> |</span>
                <Button
                  className={zoomSelected === 'Weekly' ? "btn-view btn-view-active" : "btn-view"}

                  onClick={() => { setIsZoomWeekly(true); setZoomSelected('Weekly'); setZoomTimeline(0) }}
                >
                  Daily
                </Button>
                <span style={{ marginRight: '0px', color: '#11093c', opacity: 0.6 }}> |</span>
                <Button
                  className={zoomSelected === 'Monthly' ? "btn-view btn-view-active" : "btn-view"}

                  onClick={() => { setIsZoomMonthly(true); setZoomSelected('Monthly'); setZoomTimeline(0) }}
                >
                  Monthly
                </Button>
              </div>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 12 }} style={openPiney ? (pageWidth > 1900 ? (pageWidth > 2550 ? ((pageWidth > 3800 ? { textAlign: 'end', paddingRight: '638px' } : { textAlign: 'end', paddingRight: '465px' })) : { textAlign: 'end', paddingRight: '396px' }) : { textAlign: 'end', paddingRight: '305px' }) : { textAlign: 'end', paddingRight: '15px' }} className='header-zoom'>
              <div>
                {openPiney ? <><Button style={{ border: '1px solid transparent', background: 'none', color: '#11093C', opacity: '0.6', paddingRight: '10px', paddingTop: '0px', paddingBottom: '0px' }} onClick={() => { setTollData(editData); setOpenModalTollgate(true); }}>
                  <CalendarOutlined /> Edit Dates
                </Button>
                  <span style={{ marginRight: '10px', color: '#DBDBE1' }}></span>
                </> : ''}
              </div>
              {!openPiney && 
                <div className="btn-collapse" >
                  <LeftOutlined onClick={(e) => {
                    e.stopPropagation();
                    setZoomTimeline(zoomTimeline +50)
                  }}
                  className="btn-arrow-porfolio"
                  />
                  <RightOutlined onClick={(e) => {
                    e.stopPropagation();
                    setZoomTimeline(zoomTimeline -50)
                  }}
                  className="btn-arrow-porfolio"
                  />
                </div>}
            </Col>
          </Row>
          <Row>
          <div style={{ width: '100%', marginBottom: marginReducerHeaderAxis }}>
            <div style={{ overflowX: 'hidden', overflowY: 'hidden', marginLeft: '-1px' }} id="timeline-chart-axis" />
          </div>
          </Row>
        </div>
      </Col>
    </Row>
    {
      <div
        className="search"
        ref={el => searchRef.current[index] = el}
        style={{overflowY:'auto', height:heightSearch}}
      >{
          detailGroup?.map((elem: any, index: number) => {
            const id = 'collapse' + index;
            return (
              <div id={elem.id} key={elem.id}>
                <CalendarGroups
                  data={elem}
                  groupCollapsed={detailGroup}
                  setCollapsePhase={setCollapsePhase}
                  collapsePhase={collapsePhase}
                  openTable={openTable}
                  setOpenTable={setOpenTable}
                  index={index}
                  tabKey={tabKey}
                  favorites={favorites}
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
                  userBrowser={userBrowser}
                  setOpenPiney={setOpenPiney}
                  setGrapphicOpen={setGrapphicOpen}
                  setPositionModalGraphic={setPositionModalGraphic}
                  setDataModal={setDataModal}
                  moveSchedule={moveSchedule}
                  scheduleRef={scheduleRef}
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
                  dataId={currentGroup === 'streams' && elem.value!==''? elem.value : elem.id}
                />
              </div>
            )
          })
        }
      </div>
    }
  </>
};

export default CalendarViewPag;
