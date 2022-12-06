import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
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
import ModalGraphic from "./ModalGraphic";


const { TabPane } = Tabs;
const tabKeys = ['All','Capital', 'Restoration', 'Study', 'Acquisition', 'R&D', 'DIP'];
const popovers: any = [
  <div className="popoveer-00"><b>All:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Capital:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Restoration:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Study:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Any other effort for which MHFD funds or staff time is requested.</div>,
  <div className="popoveer-00"><b>R&D:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>DIP:</b> Master plans that identify problems and recommend improvements.</div>,
]
const PortafolioBody = () => {
  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
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
  // console.log('zoom',zoomTimeline);
  
  let rawData = [
    {
      id: 'Title0',
      headerLabel: 'Centennial',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 10,
          type: 'title',
          categoryNo: 100,
          from: moment('2022/06/01 00:00:00'),
          to: moment('2022/06/01 00:00:00'),
          status: 'completed',
          name: 'Centennial',
        }
      ],
    },
    {
      id: 'Centennial1',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek GSB Drops  ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 100059,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'completed',
          name: 'Work Request',
        },
        {
          objectId: 100059,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/07/22 08:30:00'),
          to: moment('2022/08/17 10:00:00'),
          status: 'completed',
          name: 'Start Up',
        },
        {
          objectId: 100059,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/06/22 07:30:00'),
          to: moment('2022/07/01 08:30:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 100059,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/18 08:30:00'),
          to: moment('2022/11/10 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
    {
      id: 'Centennial2',
      headerLabel: 'Centennial',
      rowLabel: 'North Outfall - Phase III ',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 8905,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/24 07:00:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 8905,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/09/08 10:00:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 8905,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/25 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Initial Funding',
        },
        {
          objectId: 8905,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'completed',
          name: 'Consultant Procurement',
        },
      ],
    },
    {
      id: 'Centennial3',
      headerLabel: 'Centennial',
      rowLabel: 'Niver Detention Dam - EAP... ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31599,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31599,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31599,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31599,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Centennial4',
      headerLabel: 'Centennial',
      rowLabel: 'Barr Creek - E470 to Quebec ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 98000,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/11 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'active',
          name: 'Substantial Completion',
        },
        {
          objectId: 98000,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/08/29 10:00:00'),
          status: 'active',
          name: 'Closed',
        },
        {
          objectId: 98000,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/22 07:30:00'),
          to: moment('2022/08/10 08:30:00'),
          status: 'notStarted',
          name: 'Construction',
        },
        {
          objectId: 98000,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/06/24 08:30:00'),
          to: moment('2022/07/10 10:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
      ],
    },
    {
      id: 'Centennial5',
      headerLabel: 'Centennial',
      rowLabel: 'Niver Creek Trib M - Thornton ',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 189990,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/01 00:00:00'),
          to: moment('2022/07/20 07:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
        {
          objectId: 189990,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/10/02 10:00:00'),
          status: 'active',
          name: 'Start-Up ',
        },
        {
          objectId: 189990,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/21 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Work Request',
        },
        {
          objectId: 189990,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
    {
      id: 'Centennial6',
      headerLabel: 'Centennial',
      rowLabel: 'Big Dry Creek (ARAPCO) ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 6800,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/27 00:00:00'),
          to: moment('2022/08/12 07:00:00'),
          status: 'active',
          name: 'Draft ',
        },
        {
          objectId: 6800,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/28 10:00:00'),
          status: 'active',
          name: 'Work Request',
        },
        {
          objectId: 6800,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/08/29 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 6800,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Preliminary Design',
        },
      ],
    },
    {
      id: 'Centennial7',
      headerLabel: 'Centennial',
      rowLabel: 'West Tollgate Creek ',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 6810,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/27 00:00:00'),
          to: moment('2022/08/12 07:00:00'),
          status: 'active',
          name: 'Draft ',
        },
        {
          objectId: 6810,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/28 10:00:00'),
          status: 'active',
          name: 'Work Request',
        },
        {
          objectId: 6810,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/08/29 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 6810,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Preliminary Design',
        },
      ],
    },
    {
      id: 'Title1',
      headerLabel: 'Commerce City',
      date: moment('2022/08/11'),
      schedule: [{
        objectId: 10,
        type: 'title',
        categoryNo: 100,
        from: moment('2022/07/01 00:00:00'),
        to: moment('2022/11/01 00:00:00'),
        status: 'completed',
        name: 'Commerce City',
      }],
    },
    {
      id: 'CommerceCity1',
      headerLabel: 'Commerce City',
      rowLabel: 'North Outfall - Phase IV',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 8915,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/02 00:00:00'),
          to: moment('2022/07/24 07:00:00'),
          status: 'active',
          name: 'Draft',
        },
        {
          objectId: 8915,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/09/08 10:00:00'),
          status: 'delayed',
          name: 'Conceptual Design',
        },
        {
          objectId: 8915,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/25 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Initial Funding',
        },
        {
          objectId: 8915,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'completed',
          name: 'Consultant Procurement',
        },
      ],
    },
    {
      id: 'CommerceCity2',
      headerLabel: 'Commerce City',
      rowLabel: 'Snyder Creek - E470 to Quebec',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31299,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31299,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31299,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31299,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Title2',
      headerLabel: 'Denver',
      date: moment('2022/08/11'),
      schedule: [{
        objectId: 10,
        type: 'title',
        categoryNo: 100,
        from: moment('2022/06/01 00:00:00'),
        to: moment('2022/10/01 00:00:00'),
        status: 'completed',
        name: 'Denver',
      }],
    },
    {
      id: 'Denver1',
      headerLabel: 'Denver',
      rowLabel: 'Piney Creek Channel Restore',
      date: moment('2022/08/19'),
      schedule: [
        {
          objectId: 31589,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/08/11 00:00:00'),
          to: moment('2022/08/21 07:00:00'),
          status: 'delayed',
          name: 'Draft',
        },
        {
          objectId: 31589,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/08/22 08:30:00'),
          to: moment('2022/08/31 10:00:00'),
          status: 'completed',
          name: 'Preliminary Design',
        },
        {
          objectId: 31589,
          type: 'rect',
          categoryNo: 2,
          from: moment('2022/09/01 07:30:00'),
          to: moment('2022/09/10 08:30:00'),
          status: 'completed',
          name: 'Final Design',
        },
        {
          objectId: 31589,
          type: 'rect',
          categoryNo: 3,
          from: moment('2022/09/11 08:30:00'),
          to: moment('2022/09/22 10:00:00'),
          status: 'active',
          name: 'Construction Contracting',
        },
      ],
    },
    {
      id: 'Denver2',
      headerLabel: 'Denver',
      rowLabel: 'No Name Creek Regional ',
      date: moment('2022/08/11'),
      schedule: [
        {
          objectId: 98090,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/11 00:00:00'),
          to: moment('2022/07/21 07:00:00'),
          status: 'active',
          name: 'Substantial Completion',
        },
        {
          objectId: 98090,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/11 08:30:00'),
          to: moment('2022/08/29 10:00:00'),
          status: 'active',
          name: 'Closed',
        },
        {
          objectId: 98090,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/22 07:30:00'),
          to: moment('2022/08/10 08:30:00'),
          status: 'notStarted',
          name: 'Construction',
        },
        {
          objectId: 98090,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/06/20 08:30:00'),
          to: moment('2022/07/10 10:00:00'),
          status: 'notStarted',
          name: 'Draft',
        },
      ],
    },
    {
      id: 'Denver3',
      headerLabel: 'Denver',
      rowLabel: 'East Tollgate Creek',
      date: moment('2022/08/15'),
      schedule: [
        {
          objectId: 181190,
          type: 'rect',
          categoryNo: 0,
          from: moment('2022/07/01 00:00:00'),
          to: moment('2022/07/20 07:00:00'),
          status: 'notStarted',
          name: 'Work-Request',
        },
        {
          objectId: 181190,
          type: 'rect',
          categoryNo: 5,
          from: moment('2022/08/27 08:30:00'),
          to: moment('2022/10/02 10:00:00'),
          status: 'active',
          name: 'Start Up',
        },
        {
          objectId: 181190,
          type: 'rect',
          categoryNo: 1,
          from: moment('2022/07/21 07:30:00'),
          to: moment('2022/08/12 08:30:00'),
          status: 'delayed',
          name: 'Work Request',
        },
        {
          objectId: 181190,
          type: 'rect',
          categoryNo: 4,
          from: moment('2022/08/13 08:30:00'),
          to: moment('2022/08/26 10:00:00'),
          status: 'active',
          name: 'Work Plan',
        },
      ],
    },
  ];
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
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic}/>}
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
        <div style={{position: 'absolute',right: '5px', zIndex:'3', marginTop:'15px'}}>
          {/* {optionSelect === 'List' &&
            <Button  style={{border:'1px solid transparent', color:'#29C499'}} onClick={()=>{setOpenModalTable(true)}}>
              <SettingFilled />
              Customize table
            </Button>
          } */}
          {(optionSelect === 'Phase' || optionSelect === 'Schedule') && <div>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Done</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'15px'}}>Current</span>
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
                <TabPane style={{marginBottom:'0px'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style" style={{marginLeft:'-15px'}}>{tk} </Popover> </span>} key={tk}>
                  <div className="protafolio-body">
                    {openFilters && <Filters openFilters={openFilters} setOpenFilters={setOpenFilters}/>}
                  <Row>
                    <Col xs={{ span: 10 }} lg={{ span: 5 }}>
                      <Search searchRef={searchRef} tableRef={tableRef} setOpenTable={setOpenTable} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable} phaseRef={phaseRef} scheduleRef={scheduleRef} rawData={rawData}/>
                    </Col>
                    <Col xs={{span:34}} lg={{span:19}}>
                      {optionSelect === 'List' && <TablePortafolio divRef={tableRef} searchRef={searchRef} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable}/>}
                      {optionSelect === 'Phase'  && <PhaseView openTable={openTable} phaseRef={phaseRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic}/>}
                      {optionSelect === 'Schedule'  && <CalendarView rawData={rawData} openTable={openTable} moveSchedule={zoomTimeline} scheduleRef={scheduleRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic}/>}
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