import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'antd';
import { SERVER } from 'Config/Server.config';
import moment from 'moment';
import * as datasets from 'Config/datasets';
import PhaseGroups from 'routes/portfolio-view/components/PhaseGroups';
import PineyView from 'routes/portfolio-view/components/PineyView';
import SearchDropdown from 'routes/portfolio-view/components/SearchDropdown';
import { getUserBrowser } from 'utils/utils';
import { usePortflioState } from '../../../hook/portfolioHook';

const PhaseViewPag = ({
  rawData,
  searchRef,
  tabKey,
  index,
  collapsePhase,
  setCollapsePhase,
  openTable,
  setOpenTable,
  setTollData,
  setOpenModalTollgate,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  filterPagination,
  updateFavorites,
  setUpdateFavorites,
}: {
  rawData: any,
  searchRef: any,
  tabKey: any,
  index: any,
  collapsePhase: any,
  setCollapsePhase: any,
  openTable: any,
  setOpenTable: any,
  setTollData: any,
  setOpenModalTollgate: any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  filterPagination: any,
  updateFavorites: any,
  setUpdateFavorites: any,
}) => {
  const {
    currentGroup
  } = usePortflioState();

  const [phaseList, setPhaseList] = useState<any>([]);
  const [availableStatusList, setAvailableStatusList] = useState<any>([]);
  const [statusCounter,setStatusCounter] = useState(0);
  const [scheduleList, setScheduleList] = useState<any>({});
  const [statusList, setStatusList] = useState<any>([]);
  const [actionsDone,setActionsDone] = useState<any>({});
  const [updatePhaseList, setUpdatePhaseList] = useState(false);
  const [detailGroup, setDetailGroup] = useState<any>(null);
  const [userBrowser, setUserBrowser] = useState<any>()
  const [updateAction,setUpdateAction] = useState(false);
  const headerRef = useRef<null | HTMLDivElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const phaseHeaderRef = useRef<null | HTMLDivElement>(null);
  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  const phaseRef = useRef<any[]>([]);
  let totalLabelWidth = phaseList.length * labelWidth;
  const [openPiney, setOpenPiney] = useState(false);
  const [popUpData, setPopUpData] = useState<any>({});

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
    let z = []
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
    }
  }, [actionsDone])
  useEffect(() => {
    const z: any = [];
    statusList.map((img: any) => {
      if (z.indexOf(img.status_name) === -1) {
        z.push(img.status_name)
      }
    });
    const counts = z.map((item1: any) => {
      const elements = statusList.filter((item: any) => item.status_name === item1);
      return [
        item1,
        (elements.length) * labelWidth,
        elements[0].code_status_type_id
      ]
    });
    setAvailableStatusList(counts)
  }, [updatePhaseList])

  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      SERVER.GET_LIST_GROUPS(currentGroup),
      datasets.getToken(),
      controller.signal
    ).then((valuesGroups) => {
      setDetailGroup(valuesGroups.groups)
    }).catch((e) => {
      console.log(e);
    });
    return () => {
      controller.abort();
    };
  }, [currentGroup]);
  let drr = phaseHeaderRef.current;
  let myDiv = drr?.querySelector('.container-phase');
  let widthMax = myDiv? myDiv.clientWidth : 0;

  return <>
    {openPiney && (
      <div className="phaseview-body">
        <div className="piney-text">
          <PineyView
            setOpenPiney={setOpenPiney}
            data={popUpData}
            setUpdateAction={setUpdateAction}
            updateAction={updateAction}
            setOpenModalTollgate={setOpenModalTollgate}
            setTollData={setTollData}
            isDetail={false}
          />
        </div>
      </div>
    )}
    <div className="scroll-custom" style={{width:`${widthMax - 5}px`}}  ref={scrollRef}
        onScrollCapture={(e: any) => {
          let dr: any = scrollRef.current;
          if (scrollRef.current) {
            if(phaseRef.current){
              phaseRef.current.forEach((elem: any, index:number) => {
                phaseRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
              })
            }
            if (headerRef.current) {
              headerRef.current.scrollTo(dr.scrollLeft, headerRef.current?.scrollTop);
            }
          }
        }}
      >
        <div className="scroll-bar" style={{ width: `${totalLabelWidth - 5}px`}}></div>
      </div>  
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        <div className="vertical-line"></div>
        <SearchDropdown rawData={rawData}
          fullData={rawData}
          setOpenTable={setOpenTable}></SearchDropdown>
      </Col>
      <Col xs={{ span: 34 }} lg={{ span: 19 }}>
        <div className="phaseview-body">
          <div className="phaseview-content">
            <div
              className="header-title"
              ref={headerRef}
              onScrollCapture={(e: any) => {
                let dr: any = headerRef.current;
                if (headerRef.current) {                  
                  if(phaseRef.current){
                    phaseRef.current.forEach((elem: any, index:number) => {
                      phaseRef.current[index].scrollTo(dr.scrollLeft, dr.scrollTop);
                    })
                  }
                  if (scrollRef.current) {
                    scrollRef.current.scrollTo(dr.scrollLeft, 0);
                  }                                 
                }
              }}
            >
              <div className="phaseview-title-label" style={{ width: totalLabelWidth, paddingRight: '13px' }} id="phaseviewTitlleWidth">
                {
                  availableStatusList.map((item: any, index: number) => (
                    <p key={item[2]} style={index === 0 ? { display: 'flex', width: item[1], border: 'transparent' } : { display: 'flex', width: item[1] }}>
                      <hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>{item[0]}<hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                    </p>
                  ))
                }
              </div>
              <div style={{ width: totalLabelWidth, paddingRight: '13px' }} className="phaseview-title" id="phaseviewTitlleWidth">
                {phaseList.map((item: any) => {
                  return <p key={item.code_phase_type_id} style={{ width: labelWidth }}>{item.phase_name}</p>
                })}
              </div>
            </div>
          </div>
          <div className="header-timeline" style={{ borderTop: '1px solid #d4d2d9', width: '100%' }}></div>
        </div>
      </Col>
    </Row>
    {
      <div className="phase-groups" ref={phaseHeaderRef}>
        <div
          className="search"
          ref={el => searchRef.current[index] = el}
        >{
            detailGroup?.map((elem: any, index: number) => {
              return (
                <div id={elem.id} key={elem.id}>
                  <PhaseGroups
                    data={elem}
                    setCollapsePhase={setCollapsePhase}
                    collapsePhase={collapsePhase}
                    openTable={openTable}
                    setOpenTable={setOpenTable}
                    index={index}
                    tabKey={tabKey}
                    phaseRef={phaseRef}
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
                    setPopUpData={setPopUpData}
                    headerRef={headerRef}
                    filterPagination={filterPagination}
                    updateFavorites={updateFavorites}
                    setUpdateFavorites={setUpdateFavorites}
                    dataId={currentGroup === 'streams' && elem.value!==''? elem.value : elem.id}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    }
  </>
};

export default PhaseViewPag;
