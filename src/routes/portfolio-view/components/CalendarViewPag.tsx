import React, { useEffect, useState } from 'react';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { usePortflioState } from 'hook/portfolioHook';
import CalendarGroups from 'routes/portfolio-view/components//CalendarGroups';
import PineyView from 'routes/portfolio-view/components/PineyView';
import SearchDropdown from 'routes/portfolio-view/components//SearchDropdown';
import { handleAbortError } from 'store/actions/mapActions';

const CalendarViewPag = ({
  tabKey,
  index,
  openTable,
  setOpenTable,
  setTollData,
  setOpenModalTollgate,
  setOpenPiney,
  openPiney,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  scheduleList,
  setScheduleList,
  updatedGroup,
  secondaryUpdatedGroup,
}: {
  tabKey: any,
  index: any,
  openTable: any,
  setOpenTable: any,
  setTollData: any,
  setOpenModalTollgate: any,
  setOpenPiney: any,
  openPiney:any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  scheduleList: any,
  setScheduleList: any,
  updatedGroup: any,
  secondaryUpdatedGroup: any,
}) => {
  const { currentGroup } = usePortflioState();

  const [phaseList, setPhaseList] = useState<any>([]);
  const [statusCounter, setStatusCounter] = useState(0);
  const [actionsDone, setActionsDone] = useState<any>({});
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const [updateAction, setUpdateAction] = useState(false);
  const [isZoomToday, setIsZoomToday] = useState<any>(false);
  const [isZoomWeekly, setIsZoomWeekly] = useState<any>(false);
  const [isZoomMonthly, setIsZoomMonthly] = useState<any>(false);
  const [editData,setEditData] = useState<any>({});
  const [zoomSelected, setZoomSelected] = useState('Today');
  const [popUpData, setPopUpData] = useState<any>({});
  const [zoomTimeline, setZoomTimeline] = useState(0);
  let pageWidth  = document.documentElement.scrollWidth;
  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  let totalLabelWidth = phaseList.length * labelWidth;
  let heightSearchHeader = document.getElementById('searchPortfolio')?.offsetHeight
  let heightSearchtest = document.getElementById('tabsPM')?.offsetHeight
  let heightSearch = (heightSearchtest && heightSearchHeader) && heightSearchtest-heightSearchHeader
  let marginReducerHeaderAxis =
    (windowWidth >= 3001 && windowWidth <= 3999 ? '-5.3px' :
      (windowWidth >= 2550 && windowWidth <= 3000 ? '-5.9px' :
        (windowWidth >= 1450 && windowWidth <= 1500 ? '-5.9px' :
          (windowWidth >= 1501 && windowWidth <= 1700 ? '-5.9px' :
            (windowWidth >= 2001 && windowWidth <= 2549 ? '-5.9px' :
              (windowWidth >= 1199 && windowWidth <= 1449 ? '-5.9px' : '-5.9px'))))));

  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      `${SERVER.PROJECT_ACTION_ITEM}`,
      datasets.getToken(),
      controller.signal
    ).then((e) => {
      setActionsDone(e);
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [tabKey, updateAction])

  useEffect(() => {
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
        const z = rows.map((x: any, index: number) => {
          return (
            {
              categoryNo: index,
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
        setUpdatePhaseList(!updatePhaseList);
      })
      .catch(handleAbortError)
    return () => {
      controller.abort();
    };
  }, [actionsDone])

  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      SERVER.GET_LIST_GROUPS(currentGroup),
      datasets.getToken(),
      controller.signal
    ).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [currentGroup]);
  console.log('Rendering CalendarViewPag');
  return <>
    {openPiney && (
      <div className="phaseview-body">
        <div className="piney-text">
          <PineyView
            setOpenPiney={setOpenPiney}
            data={popUpData}
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
        <SearchDropdown
          setOpenTable={setOpenTable}
        />
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
            <div style={{ overflowX: 'hidden', overflowY: 'hidden', marginLeft: '1px' }} id="timeline-chart-axis" />
          </div>
          </Row>
        </div>
      </Col>
    </Row>
    {
      <div
        className="search"
        style={{overflowY:'auto', height:heightSearch}}
      >{
          detailGroup?.map((elem: any, index: number) => {
            return (
              <div id={elem.id} key={elem.id}>
                <CalendarGroups
                  data={elem}
                  openTable={openTable}
                  setOpenTable={setOpenTable}
                  index={index}
                  tabKey={tabKey}
                  scheduleList={scheduleList}
                  statusCounter={statusCounter}
                  setTollData={setTollData}
                  setOpenModalTollgate={setOpenModalTollgate}
                  actionsDone={actionsDone}
                  setOpenPiney={setOpenPiney}
                  setGrapphicOpen={setGrapphicOpen}
                  setPositionModalGraphic={setPositionModalGraphic}
                  setDataModal={setDataModal}
                  isZoomToday={isZoomToday}
                  isZoomWeekly={isZoomWeekly}
                  setIsZoomWeekly={setIsZoomWeekly}
                  isZoomMonthly={isZoomMonthly}
                  setIsZoomMonthly={setIsZoomMonthly}
                  zoomTimeline={zoomTimeline}
                  setEditData={setEditData}
                  zoomSelected={zoomSelected}
                  setPopUpData={setPopUpData}
                  updatedGroup={updatedGroup}
                  secondaryUpdatedGroup={secondaryUpdatedGroup}
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
