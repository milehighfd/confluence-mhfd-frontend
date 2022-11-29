import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Space, Tabs } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, DownOutlined, HeartOutlined, SettingFilled, ToTopOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import Search from "./Search";
import TablePortafolio from "./TablePortfolio";
import PhaseView from "./PhaseView";
import ActionItems from "./ActionItems";
import CalendarView from "./CalendarView";
import Filters from "./Filters";
import ModalFields from "routes/list-view/components/ModalFields";
import ModalTollgate from "routes/list-view/components/ModalTollgate";

const { TabPane } = Tabs;
const tabKeys = ['All','Capital', 'Study', 'Maintenance', 'Acquisition', 'Special', 'DIP'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const PortafolioBody = () => {
  const [tabKey, setTabKey] = useState<any>('All');
  const [openAction, setOpenAction] = useState(true);
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List');
  const [openTable, setOpenTable] = useState([true, true, true]);
  const [hoverTable, setHoverTable] = useState([0, 0, 0])
  const tableRef = useRef<null | HTMLDivElement>(null); 
  const searchRef = useRef<null | HTMLDivElement>(null); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [moveSchedule, setMoveSchedule] = useState('null'); 
  const [zoomTimeline, setZoomTimeline] = useState(0);
  console.log('zoom',zoomTimeline);
  

  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: 'MHFD Lead/PM',
          className:'menu-drop-sub-sub',
          children: [
            {
              key: '1-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '1-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '1-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '2',
          label: 'Service Area',
          children: [
            {
              key: '2-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '2-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '2-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '3',
          label: 'County',
          children: [
            {
              key: '3-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '3-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '3-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '4',
          label: 'Jurisdiction',
          children: [
            {
              key: '4-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '4-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '4-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '5',
          label: 'Consultant',
          children: [
            {
              key: '5-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '5-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '5-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
        {
          key: '6',
          label: 'Contractor ',
          children: [
            {
              key: '6-1',
              label: <div className="menu-drop-sub">Jon Villines</div>,
            },
            {
              key: '6-2',
              label: <div className="menu-drop-sub">David Skoudas</div>,
            },
            {
              key: '6-3',
              label: <div className="menu-drop-sub">Mary Powell</div>,
            },
          ],
        },
      ]}
    />
  );
  return <>
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate visible={openModalTollgate}setVisible ={setOpenModalTollgate}/>
    <div>
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <h2 style={{width:'205px'}}>
              <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight">
                <div className="select-area">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%'}}>
                    South Watershed &nbsp;<DownOutlined style={{fontSize:'14px'}}/>
                  </a>
                </div>
              </Dropdown>
            </h2>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'center'}}>
            <Button className={optionSelect=== 'List' ? "btn-view btn-view-active": "btn-view"} onClick={()=>{setOptionSelect('List')}}>
              List
            </Button>
            <Button className={optionSelect=== 'Phase' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{setOptionSelect('Phase')}}>
              Phase
            </Button>
            <Button className={optionSelect=== 'Schedule' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{setOptionSelect('Schedule')}}>
              Schedule
            </Button>

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'right'}}>
            <Button className="btn-filter-k ">
              <CheckCircleOutlined style={{color: '#cdcbd6', fontSize: '16px'}} /> My Projects
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className="btn-filter-k">
              <HeartOutlined style={{color: '#cdcbd6', fontSize: '16px'}}  /> Favorites
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className={openFilters ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenFilters(true)}}>
              <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center", backgroundColor: '#bfbcc9' }} src=""/>&nbsp;Filter
            </Button>
            {/* <Button className=" btn-filter-k" onClick={()=>{setOpenFilters(true)}}>
              <ToTopOutlined style={{fontSize: '16px', color: '#706b8a'}}/>
            </Button> */}
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
          </Col>
        </Row>
      </div>
      <div className="work-body portafolio">
        <div style={{position: 'absolute',right: '5px', zIndex:'3'}}>
          {/* {optionSelect === 'List' &&
            <Button  style={{border:'1px solid transparent', color:'#29C499'}} onClick={()=>{setOpenModalTable(true)}}>
              <SettingFilled />
              Customize table
            </Button>
          } */}
          {(optionSelect === 'Phase' || optionSelect === 'Schedule') && <div>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Completed</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Active</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Not Started</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Overdue</span>
                </span>
                  {/* <Button style={{paddingLeft:'0px',border: '1px solid transparent', color: '#11093C', opacity: '0.6', paddingRight: '10px'}} onClick={() => {setOpenModalTollgate(true)}}>
                    <CalendarOutlined /> Edit Dates
                  </Button>
                  
                  {optionSelect === 'Schedule' && <><span style={{marginRight:'10px', color:'#DBDBE1'}}> |</span>
                  <ZoomInOutlined style={{marginRight:'12px', color: '#11093C', opacity: '0.6'}} onClick={() => setZoomTimeline(zoomTimeline -1)}/>
                  <ZoomOutOutlined  style={{color: '#11093C', opacity: '0.6', marginRight:'15px'}} onClick={() => setZoomTimeline(zoomTimeline +1)}/></>} */}
              </div>}
        </div>
        <Tabs defaultActiveKey={displayedTabKey[1]}
          activeKey={tabKey}
            onChange={(key) => setTabKey(key)} className="tabs-map">
            {
              displayedTabKey.map((tk: string) => (
                <TabPane style={{marginBottom:'0px'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
                  <div className="protafolio-body">
                    {openFilters && <Filters openFilters={openFilters} setOpenFilters={setOpenFilters}/>}
                  <Row>
                    <Col xs={{ span: 10 }} lg={{ span: 5 }}>
                      <Search searchRef={searchRef} tableRef={tableRef} setOpenTable={setOpenTable} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable} phaseRef={phaseRef} scheduleRef={scheduleRef}/>
                    </Col>
                    <Col xs={{span:34}} lg={{span:19}}>
                      {optionSelect === 'List' && <TablePortafolio divRef={tableRef} searchRef={searchRef} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable}/>}
                      {optionSelect === 'Phase'  && <PhaseView openTable={openTable} phaseRef={phaseRef} searchRef={searchRef}/>}
                      {optionSelect === 'Schedule'  && <CalendarView openTable={openTable} moveSchedule={zoomTimeline} scheduleRef={scheduleRef} searchRef={searchRef}/>}
                    </Col>
                  </Row>
                  </div>
                </TabPane>
              ))
            }
          </Tabs>
        </div>
    </div>
  </>
};

export default PortafolioBody;