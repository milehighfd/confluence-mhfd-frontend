import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Input, Layout, Menu, Popover, Row, Select, Space, Tabs } from 'antd';
import { CalendarOutlined, CheckCircleFilled, CheckCircleOutlined, CheckCircleTwoTone, DownOutlined, HeartFilled, HeartOutlined, SettingFilled, ToTopOutlined, UpOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import Search from "./Search";
import TablePortafolio from "./TablePortfolio";
import PhaseView from "./PhaseView";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import CalendarView from "./CalendarView";
import Filters from "./Filters";
import ModalFields from "routes/list-view/components/ModalFields";
import ModalTollgate from "routes/list-view/components/ModalTollgate";
import { rawData } from "../constants/PhaseViewData";
import ModalGraphic from "./ModalGraphic";
import { getListProjects, getGroupList, DEFAULT_GROUP } from "./ListUtils";
import moment from 'moment';


const { TabPane } = Tabs;
const tabKeys = ['All','CIP', 'Restoration', 'Planning', 'DIP', 'R&D', 'Acquisition'];
// const popovers: any = [
//   <div className="popoveer-00"><b>All:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
//   <div className="popoveer-00"><b>Capital:</b> Master plans that identify problems and recommend improvements.</div>,
//   <div className="popoveer-00"><b>Restoration:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
//   <div className="popoveer-00"><b>Study:</b> Property with high flood risk or needed for improvements.</div>,
//   <div className="popoveer-00"><b>Acquisition:</b> Any other effort for which MHFD funds or staff time is requested.</div>,
//   <div className="popoveer-00"><b>R&D:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
//   <div className="popoveer-00"><b>DIP:</b> Master plans that identify problems and recommend improvements.</div>,
// ]
const PortafolioBody = () => {
  const [page, setPage] = useState(1);
  const pageSize = 25;
  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [tabKey, setTabKey] = useState<any>('All');
  const [openAction, setOpenAction] = useState(true);
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List');
  const [openTable, setOpenTable] = useState<any>([]);
  const [hoverTable, setHoverTable] = useState([0, 0, 0])
  const tableRef = useRef([]); 
  const searchRef = useRef([]); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [moveSchedule, setMoveSchedule] = useState('null'); 
  const [zoomTimeline, setZoomTimeline] = useState(0);
  const [openDrop, setOpenDrop] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(DEFAULT_GROUP);
  const [newData, setNewData] = useState<any>([]);
  const mainFilters = [
    // {label: 'MHFD Lead/PM', value: 'MHFD' },
    // {label: 'Service Area', value: 'Service' },
    // {label: 'County', value: 'County' },
    // {label: 'Consultant', value: 'Consultant' },
    // {label: 'Contractor', value: 'Contractor' },
    {label: 'Jurisdiction', value: 'jurisdiction'},
    {label: 'Status', value: 'status'},
    {label: 'County', value: 'county'}
  ];
  const groupsBy = [
    'Status',
    'Jurisdiction',
    'County',
    'Service Area',
    'Streams',
    'MHFD Lead/PM',
    'Consultant',
    'Contractor'
  ];
  // console.log('zoom',zoomTimeline);
  const [filtersGroups, setFiltersGroup] = useState({});
  const {
    boundsMap,
    filterProjectOptions,
  } = useMapState();
  const {
    getParamFilterProjects,
    setBoundMap
  } = useMapDispatch();

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

  const getData = async () => {
    let pjs = await getListProjects(currentGroup);
    console.log('pjs', pjs);
  }
  const getGroupLists = async () => {
    mainFilters.forEach(async (f) => {
      let gList = await getGroupList(f.value);
      setFiltersGroup({...filtersGroups, f: gList});
    });
  }
  useEffect( () => {  
    setBoundMap('-105.96857996935253,38.91703158891448,-103.60676985708743,40.405727514276464');
    return () => {
      // tableRef.current = null;
      // searchRef.current = null;
    }
  }, []);
  useEffect(() => {
    if (boundsMap !== '') {
      getParamFilterProjects(boundsMap);
    }
  }, [boundsMap]);
  useEffect(() => {
    if(searchRef.current.length) {
      searchRef.current.forEach(element => {
        let div: any = element;
        div.scrollTop = 0;  
      });
    }
  }, [optionSelect, tabKey]);
  useEffect(() => {
    getGroupList(currentGroup).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      console.log('groups', groups);
      // setNewData(updatedGroups);
      getListProjects(currentGroup).then((valuesList) => {
        const updatedGroups: any = [];
        groups.forEach((element: any, index: number) => {
          updatedGroups.push({
            id: `Title${index}`,
            headerLabel: element.name,
            date: moment('2022/08/11'),
            schedule: [
              {
                objectId: 10,
                type: 'title',
                categoryNo: 100,
                from: moment('2022/02/01 00:00:00'),
                to: moment('2022/06/01 00:00:00'),
                status: 'completed',
                name: element.name,
              }
            ],
          });
          if (valuesList[element.id]) {
            valuesList[element.id].forEach((elem: any, idx: number) => {
              updatedGroups.push({
                id: `${element.name}${idx}`,
                headerLabel: element.name,
                rowLabel: elem.description, //description
                date: moment('2022/08/11'),
                key: idx+elem.project_id,
                phase: elem?.project_status?.code_phase_type?.phase_name,
                mhfd: 'Jon Villines',
                mhfd_support:'Jane Smith',
                lg_lead:'Jane Smith',
                developer:'Robert Croquette',
                consultant:'Jon Villines',
                civil_contractor:'Robert Croquette',
                landscape_contractor:'Jane Smith',
                construction_start_date:'12/05/2022',
                local_government:'Broomfield',
                onbase: "234",
                total_funding:'1,350,000',
                project_sponsor:'Broomfield',
                type:"Restoration",
                status:'Not Started',
                serviceArea: elem?.serviceArea?.codeServiceArea?.service_area_name,
                county: 'Arapahoe',
                cost: '420,000',
                stream:'Big Dry Creek',
                contact: 'ICON',
                view: 'id',
                options:'red',
                schedule: [
                  {
                    objectId: 1,
                    type: 'rect',
                    categoryNo: 1,
                    from: moment('2022/06/22 07:30:00'),
                    to: moment('2022/07/01 08:30:00'),
                    status: 'completed',
                    name: 'Draft',
                    phase: 'Draft', 
                    tasks: 6,
                  },
                  {
                    objectId: 2,
                    type: 'rect',
                    categoryNo: 2,
                    from: moment('2022/07/02 00:00:00'),
                    to: moment('2022/07/21 07:00:00'),
                    status: 'completed',
                    name: 'Work Request',
                    phase: 'WorkRequest', 
                    tasks: 8
                  },
                  {
                    objectId: 3,
                    type: 'rect',
                    categoryNo: 3,
                    from: moment('2022/07/22 08:30:00'),
                    to: moment('2022/08/17 10:00:00'),
                    status: 'completed',
                    name: 'Work Plan',
                    phase: 'WorkPlan', 
                    tasks: 12
                  },
                  {
                    objectId: 4,
                    type: 'rect',
                    categoryNo: 4,
                    from: moment('2022/08/18 08:30:00'),
                    to: moment('2022/09/10 10:00:00'),
                    status: 'active',
                    name: 'Start Up',
                    phase: 'StartUp', 
                    tasks: 32
                  },
                  {
                    objectId: 5,
                    type: 'rect',
                    categoryNo: 5,
                    from: moment('2022/09/11 08:30:00'),
                    to: moment('2022/10/11 10:00:00'),
                    status: 'active',
                    name: 'Funding',
                    phase: 'Funding', 
                    tasks: 6
                  },
                  {
                    objectId: 6,
                    type: 'rect',
                    categoryNo: 6,
                    from: moment('2022/10/12 08:30:00'),
                    to: moment('2022/12/10 10:00:00'),
                    status: 'active',
                    name: 'Consultant Procurement',
                    phase: 'ConsultantProcurement', 
                    tasks: 12
                  },
                  {
                    objectId: 7,
                    type: 'rect',
                    categoryNo: 7,
                    from: moment('2022/12/11 00:00:00'),
                    to: moment('2023/01/20 00:00:00'),
                    status: 'notStarted',
                    name: 'Conceptual Design',
                    phase: 'ConceptualDesign', 
                    tasks: 15
                  },
                  {
                    objectId: 8,
                    type: 'rect',
                    categoryNo: 8,
                    from: moment('2023/01/21 00:00:00'),
                    to: moment('2023/03/01 00:00:00'),
                    status: 'notStarted',
                    name: 'Preliminary Design',
                    phase: 'PreliminaryDesign', 
                    tasks: 9
                  },
                  {
                    objectId: 9,
                    type: 'rect',
                    categoryNo: 9,
                    from: moment('2023/03/02 00:00:00'),
                    to: moment('2023/05/03 00:00:00'),
                    status: 'notStarted',
                    name: 'Final Design',
                    phase: 'FinalDesign', 
                    tasks: 2
                  },
                  {
                    objectId: 10,
                    type: 'rect',
                    categoryNo: 10,
                    from: moment('2023/05/04 00:00:00'),
                    to: moment('2023/06/15 00:00:00'),
                    status: 'notStarted',
                    name: 'Construction Contracting',
                    phase: 'ConstructionContracting', 
                    tasks: 7
                  },
                  {
                    objectId: 11,
                    type: 'rect',
                    categoryNo: 11,
                    from: moment('2023/06/16 00:00:00'),
                    to: moment('2023/07/29 00:00:00'),
                    status: 'notStarted',
                    name: 'Construction',
                    phase: 'Construction', 
                    tasks: 10
                  },
                  {
                    objectId: 12,
                    type: 'rect',
                    categoryNo: 12,
                    from: moment('2023/07/30 00:00:00'),
                    to: moment('2023/09/20 00:00:00'),
                    status: 'notStarted',
                    name: 'Documentation',
                    phase: 'Documentation', 
                    tasks: 10
                  },
                  {
                    objectId: 13,
                    type: 'rect',
                    categoryNo: 13,
                    from: moment('2023/09/21 00:00:00'),
                    to: moment('2023/10/20 00:00:00'),
                    status: 'notStarted',
                    name: 'Establishment',
                    phase: 'Establishment', 
                    tasks: 10
                  },
                  {
                    objectId: 14,
                    type: 'rect',
                    categoryNo: 14,
                    from: moment('2023/10/21 00:00:00'),
                    to: moment('2023/11/20 00:00:00'),
                    status: 'notStarted',
                    name: 'Close Out',
                    phase: 'CloseOut', 
                    tasks: 10
                  },
                  {
                    objectId: 15,
                    type: 'rect',
                    categoryNo: 15,
                    from: moment('2023/11/21 00:00:00'),
                    to: moment('2023/12/30 00:00:00'),
                    status: 'notStarted',
                    name: 'Closed',
                    phase: 'Closed', 
                    tasks: 10
                  },
                ],
              })
            });
          }
        });
        console.log('update d', updatedGroups);
        console.log('wad', rawData);
        setNewData(updatedGroups);
        const sortedData = updatedGroups.filter((elem: any) => elem.id.includes('Title'));
        setOpenTable(new Array(sortedData.length).fill(true));
      });
    });
  }, [currentGroup]);
  return <>
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic}/>}
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate visible={openModalTollgate}setVisible ={setOpenModalTollgate}/>
    <div>
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <h2 style={{width:'205px'}}>
              <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight" onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
                <div className="select-area">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%'}}>
                    South Watershed &nbsp;
                    {openDrop ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
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
            <Button className={openProjects ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenProjects(!openProjects)}}>
              {openProjects? <CheckCircleFilled style={{color:'#2ac499', fontSize: '16px'}}/>:<CheckCircleOutlined style={{color: '#251863', fontSize: '16px'}} />} My Projects
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className={openFavorites ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenFavorites(!openFavorites)}}>
              {openFavorites? <HeartFilled style={{color: '#f5575c', fontSize: '16px'}}/>:<HeartOutlined style={{color: '#251863', fontSize: '16px'}}  />} Favorites
            </Button>
            {/* <span style={{color:'#DBDBE1'}}>|</span> */}
            <Button className={openFilters ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenFilters(!openFilters)}}>
              <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center", backgroundColor: '#251863' }} src=""/>&nbsp;Filter
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
            displayedTabKey.map((tk: string, idx: number) => { return (
              <TabPane style={{marginBottom:'0px'}} tab={<span>{/*<Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style" style={{marginLeft:'-15px'}}>{tk} </Popover>*/} {tk}</span>} key={tk}>
                <div className="protafolio-body">
                  {openFilters && <Filters openFilters={openFilters} setOpenFilters={setOpenFilters}/>}
                <Row>
                  <Col xs={{ span: 10 }} lg={{ span: 5 }}>
                    <Search
                      searchRef={searchRef}
                      tableRef={tableRef}
                      setOpenTable={setOpenTable}
                      openTable={openTable}
                      hoverTable={hoverTable}
                      setHoverTable={setHoverTable}
                      phaseRef={phaseRef}
                      scheduleRef={scheduleRef}
                      rawData={newData}
                      index={idx}
                      groupsBy={groupsBy}
                      setCurrentGroup={setCurrentGroup}
                    />
                  </Col>
                  <Col xs={{span:34}} lg={{span:19}}>
                    {optionSelect === 'List' && <TablePortafolio rawData={newData} divRef={tableRef} searchRef={searchRef} openTable={openTable} hoverTable={hoverTable} setHoverTable={setHoverTable} tabKey={tabKey} index={idx}/>}
                    {optionSelect === 'Phase'  && <PhaseView rawData={rawData} openTable={openTable} phaseRef={phaseRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic} indexParent={idx}/>}
                    {optionSelect === 'Schedule'  && <CalendarView rawData={rawData} openTable={openTable} moveSchedule={zoomTimeline} scheduleRef={scheduleRef} searchRef={searchRef} graphicOpen={graphicOpen} setGrapphicOpen={setGrapphicOpen} positionModalGraphic={positionModalGraphic} setPositionModalGraphic={setPositionModalGraphic} index={idx}/>}
                  </Col>
                </Row>
                </div>
              </TabPane>
            )})
            }
          </Tabs>
        </div>
    </div>
  </>
};

export default PortafolioBody;