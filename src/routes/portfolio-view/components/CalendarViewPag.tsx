import React, { useEffect, useState } from 'react';
import { CalendarOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { SERVER } from 'Config/Server.config';
import * as datasets from 'Config/datasets';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import CalendarGroups from 'routes/portfolio-view/components//CalendarGroups';
import PineyView from 'routes/portfolio-view/components/PineyView';
import SearchDropdown from 'routes/portfolio-view/components//SearchDropdown';
import { handleAbortError } from 'store/actions/mapActions';
import LoadingViewOverall from 'Components/Loading-overall/LoadingViewOverall';
import { useProfileState } from 'hook/profileHook';

const CalendarViewPag = ({
  tabKey,
}: {
  tabKey: any,
}) => {
  const { currentGroup, zoomTimeline, zoomTimelineAux, zoomSelected, isLoading } = usePortflioState();
  const { setZoomTimeline, setZoomTimelineAux, setIsZoomWeekly,setIsZoomMonthly, setZoomSelected, setOpenModalTollgate, setIsLoading, setDatesData, getActionsDone} = usePortfolioDispatch();
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const [updateAction, setUpdateAction] = useState(false);
  const [editData,setEditData] = useState<any>({});
  const [openPiney, setOpenPiney] = useState(false);
  const appUser = useProfileState();
  const [disabledLG, setDisabledLG] = useState(appUser?.isLocalGovernment || appUser?.userInformation?.designation === 'government_staff');
  const pageWidth  = document.documentElement.scrollWidth;
  const windowWidth: any = window.innerWidth;
  const heightSearchHeader = document.getElementById('searchPortfolio')?.offsetHeight
  const heightSearchtest = document.getElementById('tabsPM')?.offsetHeight
  const heightSearch = (heightSearchtest && heightSearchHeader) && heightSearchtest - heightSearchHeader
  const marginReducerHeaderAxis = windowWidth >= 3001 && windowWidth <= 3999 ? '-5.3px' : '-5.9px';  
  useEffect(() => {
    getActionsDone();
  }, [tabKey, updateAction])

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
  return (
    <>
    {
      isLoading && <LoadingViewOverall />
    }
    {
      openPiney && (
      <div className="phaseview-body">
        <div className="piney-text">
          <PineyView
            setOpenPiney={setOpenPiney}
            setUpdateAction={setUpdateAction}
            updateAction={updateAction}
            isDetail={false}
          />
        </div>
      </div>
      )
    }
    <div className="dashed-line" id='todayLineDiv'></div> 
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        <SearchDropdown />
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        <div className="calendar-body" id="widthDivforChart">
          <Row id='zoomButtons' style={{ margin: '9px 10px', marginBottom: '-6px' }} className='zoom-buttons'>
            <Col xs={{ span: 10 }} lg={{ span: 12 }} className='calendar-header'>
              <div className='calendar-text-header'>
                <Button
                  className={zoomSelected === 'Weekly' ? "btn-view btn-view-active" : "btn-view"}
                  onClick={() => { setIsZoomWeekly(true); setZoomSelected('Weekly'); setZoomTimeline(0); setIsLoading(true)}}
                >
                  Daily
                </Button>
                <span style={{ marginRight: '0px', color: '#11093c', opacity: 0.6 }}> |</span>
                <Button
                  className={zoomSelected === 'Monthly' ? "btn-view btn-view-active" : "btn-view"}
                  onClick={() => { setIsZoomMonthly(true); setZoomSelected('Monthly'); setZoomTimeline(0); setIsLoading(true)}}
                >
                  Monthly
                </Button>
              </div>
            </Col>
            <Col xs={{ span: 10 }} lg={{ span: 12 }} style={openPiney ? (pageWidth > 1900 ? (pageWidth > 2550 ? ((pageWidth > 3800 ? { textAlign: 'end', paddingRight: '638px' } : { textAlign: 'end', paddingRight: '465px' })) : { textAlign: 'end', paddingRight: '396px' }) : { textAlign: 'end', paddingRight: '305px' }) : { textAlign: 'end', paddingRight: '15px' }} className='header-zoom'>
              <div>
                {
                  (openPiney && !disabledLG) &&
                  <>
                    <Button style={{ border: '1px solid transparent', background: 'none', color: '#11093C', opacity: '0.6', paddingRight: '10px', paddingTop: '0px', paddingBottom: '0px' }} onClick={() => { setDatesData(editData); setOpenModalTollgate(true); }}>
                      <CalendarOutlined /> Edit Dates
                    </Button>
                    <span style={{ marginRight: '10px', color: '#DBDBE1' }}></span>
                  </>
                }
              </div>
              {
                !openPiney && 
                <div className="btn-collapse">
                  <LeftOutlined onClick={(e) => {
                    e.stopPropagation();
                    setZoomTimeline(zoomTimeline -100)
                    setZoomTimelineAux(zoomTimelineAux -100)
                  }}
                  className="btn-arrow-porfolio"
                  />
                  <RightOutlined onClick={(e) => {
                      e.stopPropagation();
                      setZoomTimeline(zoomTimeline +100)
                      setZoomTimelineAux(zoomTimelineAux +100)
                    }}
                    className="btn-arrow-porfolio"
                  />
                </div>
              }
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
    <div
      className="search"
      style={{overflowY:'auto', height:heightSearch}}
    >
      {
        detailGroup?.map((elem: any, index: number) => {
          return (
            <div id={elem.id} key={elem.id}>
              <CalendarGroups
                data={elem}
                index={index}
                tabKey={tabKey}
                setOpenPiney={setOpenPiney}
                setEditData={setEditData}
                dataId={currentGroup === 'streams' && elem.value!==''? elem.value : elem.id}
              />
            </div>
          )
        })
      }
    </div>
  </>
  );
};

export default CalendarViewPag;
