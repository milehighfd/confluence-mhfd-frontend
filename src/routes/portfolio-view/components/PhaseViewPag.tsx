import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, LeftOutlined, MoreOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from 'Config/Server.config';
import SearchDropdown from "./SearchDropdown";
import moment from "moment";
import { getGroupList } from "./ListUtils";
import PhaseGroups from "./PhaseGroups";
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
const PhaseViewPag = ({
  rawData,
  groupsBy,
  setCurrentGroup,
  setSearchWord,
  searchWord,
  indexParent,
  searchRef,
  divRef,
  tableRef,
  tabKey,
  index,
  currentGroup,
  collapsePhase,
  setCollapsePhase,
  openTable,
  setOpenTable,
  favorites,
  email,
  setTollData,
  setOpenModalTollgate,
  setGrapphicOpen,
  setPositionModalGraphic,
  setDataModal,
  userName,
}: {
  rawData: any,
  groupsBy: any,
  setCurrentGroup: any,
  setSearchWord: any,
  searchWord: any,
  indexParent: any,
  searchRef: any,
  divRef: any,
  tableRef: any,
  tabKey: any,
  index: any,
  currentGroup: any,
  collapsePhase: any,
  setCollapsePhase: any,
  openTable: any,
  setOpenTable: any,
  favorites: any,
  email: any,  
  setTollData: any,
  setOpenModalTollgate: any,
  setGrapphicOpen: any,
  setPositionModalGraphic: any,
  setDataModal: any,
  userName: any,
}) => {
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
  const windowWidth: any = window.innerWidth;
  const labelWidth = windowWidth > 2000 && windowWidth <= 2999 ? 150 : windowWidth >= 3001 && windowWidth <= 3999 ? 185 : 95;
  const phaseRef = useRef<any[]>([]);
  let totalLabelWidth = phaseList.length * labelWidth;
  const [openPiney, setOpenPiney] = useState(false);
  const [popUpData, setPopUpData] = useState<any>({});

  useEffect(() => {
    let browser;
    function getUserBrowser() {
      if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        browser = 'Opera'
      }
      else if (navigator.userAgent.indexOf("Edg") != -1) {
        browser = 'Edge'
      }
      else if (navigator.userAgent.indexOf("Chrome") != -1) {
        browser = 'Chrome'
      }
      else if (navigator.userAgent.indexOf("Safari") != -1) {
        browser = 'Safari'
      }
      else if (navigator.userAgent.indexOf("Firefox") != -1) {
        browser = 'Firefox'
      }
      else {
        browser = 'unknown'
      }
    }
    getUserBrowser()
    setUserBrowser(browser)
    datasets.getData(`${SERVER.PROJECT_ACTION_ITEM}`, {
    }).then((e) => {
      setActionsDone(e);
    }).catch((e) => {
      console.log(e);
    })
  }, [tabKey, updateAction])

  useEffect(() => {
    let z = []
    datasets.postData(`${SERVER.PHASE_TYPE}`, { tabKey: tabKey })
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
              code_phase_type_id: x.code_phase_type_id
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
            setOpenModalTollgate={setOpenModalTollgate}
            setTollData={setTollData}
          />
        </div>
      </div>
    )}
    <Row>
      <Col xs={{ span: 10 }} lg={{ span: 5 }}>
        <div className="vertical-line"></div>
        <SearchDropdown rawData={rawData}
          groupsBy={groupsBy}
          setCurrentGroup={setCurrentGroup}
          setSearchWord={setSearchWord}
          searchWord={searchWord}
          fullData={rawData}></SearchDropdown>
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
                }
              }}
            >
              <div className="phaseview-title-label" style={{ width: totalLabelWidth, paddingRight: '13px' }} id="phaseviewTitlleWidth">
                {availableStatusList.map((item: any, index: number) => {
                  return <div style={{ display: 'flex', width: item[1], border: 'transparent', fontSize: '13px', fontFamily: 'Ubuntu', color: '#706b8a', alignItems: 'center' }}>
                    <hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>{item[0]}<hr className="hr2" style={{ width: item[1] / 2 - 48 }}></hr>
                  </div>
                })}
              </div>
              <div style={{ width: totalLabelWidth, paddingRight: '13px' }} className="phaseview-title" id="phaseviewTitlleWidth">
                {phaseList.map((item: any) => {
                  return <p style={{ width: labelWidth }}>{item.phase_name}</p>
                })}
              </div>
            </div>
          </div>
          <div className="header-timeline" style={{ borderTop: '1px solid #d4d2d9', width: '100%' }}></div>
        </div>
      </Col>
    </Row>
    {
      <div className="phase-groups">
        <div
          className="search"
          ref={el => searchRef.current[index] = el}
        >{
            detailGroup?.map((elem: any, index: number) => {
              const id = 'collapse' + index;
              return (
                <div id={elem.id} key={elem.id}>
                  <PhaseGroups
                    data={elem}
                    setCollapsePhase={setCollapsePhase}
                    collapsePhase={collapsePhase}
                    openTable={openTable}
                    setOpenTable={setOpenTable}
                    index={index}
                    currentGroup={currentGroup}
                    tabKey={tabKey}
                    favorites={favorites}
                    email={email}
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
                    setOpenPiney={setOpenPiney}
                    setGrapphicOpen={setGrapphicOpen}
                    setPositionModalGraphic={setPositionModalGraphic}
                    setDataModal={setDataModal}
                    userName={userName}
                    setPopUpData={setPopUpData}
                    headerRef={headerRef}
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