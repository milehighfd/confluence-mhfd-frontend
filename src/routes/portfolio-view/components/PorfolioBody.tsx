import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Row, Tabs } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, DownOutlined, HeartFilled, HeartOutlined,  UpOutlined } from "@ant-design/icons";
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
import { getListProjects, getGroupList, DEFAULT_GROUP, optionsProjects } from "./ListUtils";
import moment from 'moment';
import LoadingViewOverall from "Components/Loading-overall/LoadingViewOverall";
import store from "../../../store";
import { FilterByGroupName } from './FilterByGroupField';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import { getCounties, getServiceAreas, getSponsors, getStreams, getTeam, getTotalEstimatedCost } from '../../../utils/parsers';

const { TabPane } = Tabs;
//const tabKeys = ['All','CIP', 'Restoration', 'Planning', 'DIP', 'R&D', 'Acquisition'];
//const tabKeysIds = [ 0, 5, 7, 1, 6, 15, 13];
const BOUNDSMAP = `${-105.3236683149282},${39.274174328991904},${-104.48895750946532},${40.26156304805423}`;
let isInit = true;
let previousFilterBy = '';
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
  const {
    setFilterProjectOptions,
    resetFiltercomponentOptions,
    getParamFilterProjectsNoBounds,
    setBoundMap,
    resetFilterProjectOptionsEmpty
  } = useMapDispatch();
  const [tabKeys, setTabKeys] = useState<any>(['All','CIP', 'Restoration', 'Planning', 'DIP', 'R&D', 'Acquisition']);
  const [tabKeysIds, setTabKeysIds] = useState<any>([ 0, 5, 7, 1, 6, 15, 13]);
  const [filterby, setFilterby] = useState('');
  const [applyFilter, setApplyFilter] = useState(0);
  const [filterValue, setFilterValue] = useState(-1);
  const [filtername, setFiltername] = useState('Mile High Flood District');
  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [tabKey, setTabKey] = useState<any>('All');
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List');
  const [openTable, setOpenTable] = useState<any>([]);
  const [hoverTable, setHoverTable] = useState<number>()
  const tableRef = useRef([]); 
  const searchRef = useRef([]); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [zoomTimeline] = useState(0);
  const [openDrop, setOpenDrop] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(DEFAULT_GROUP);
  const [newData, setNewData] = useState<any>([]);
  const [completeData, setCompleteData] = useState<any>([]);
  const [phaseData, setPhaseData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [sortValue, setSortValue] = useState({columnKey: null, order: undefined});
  const appUser = store.getState().profile;
  const [currentUserId, setCurrentUserId] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);
  const [collapsePhase, setCollapsePhase] = useState(false);
  const [dataModal,setDataModal] = useState<any>([]);
  const [openPiney, setOpenPiney] = useState(false);

  const [favorites, setFavorites] = useState<any>([]);
  
  useEffect(()=>{
    // getParamFilterProjectsNoBounds();
    if (searchWord) {
      let currentNewData = [...newData].filter((d: any) => d.id.includes('Title') || d.rowLabel.toLowerCase().includes(searchWord.toLowerCase()));
      currentNewData = currentNewData.filter((d:any, idx:number) => (d.id.includes('Title') && (currentNewData[idx+1] ? currentNewData[idx+1].id.includes('Title') : true)) ?  false : true );
      setNewData(currentNewData);
      const sortedData = currentNewData.filter((elem: any) => elem.id.includes('Title'));
      setOpenTable(new Array(sortedData.length).fill(true));
    } else {
      setNewData(completeData);
      const sortedData = [...newData].filter((elem: any) => elem.id.includes('Title'));
      setOpenTable(new Array(sortedData.length).fill(true));
    }
    setTimeout(()=>{
      isInit = false;
      resetFilterProjectOptionsEmpty();
    }, 1000);
    return () => {
      resetFiltercomponentOptions();
    }
  }, []);




  useEffect(() => {    
    if (appUser.userInformation?.user_id) {
      setCurrentUserId(appUser.userInformation?.user_id);      
    }   
  }, [appUser]);

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
  const {
    filterProjectOptions,
    filterProjectOptionsNoFilter,
    filterComponentOptions,
  } = useMapState();
  const menu = (
    <FilterByGroupName 
      setFilterby={setFilterby}
      setFiltervalue={setFilterValue}
      setFiltername={setFiltername}
    />
  );

  // useEffect( () => {  
  //   setBoundMap('-105.96857996935253,38.91703158891448,-103.60676985708743,40.405727514276464');
  //   return () => {
  //     resetFiltercomponentOptions();
  //   }
  // }, []);
  
  const apply = useCallback((values: any, field: string, resetFilterBy: string) => {
    let options = isInit ? {...filterProjectOptionsNoFilter} : {...filterProjectOptions};
    
    if (!(resetFilterBy === 'projecttype' && tabKey !== 'All') && resetFilterBy !== '') {
      options[resetFilterBy] = '';
    }
    
    if ('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field
    || 'consultant' === field || 'contractor' === field || 'jurisdiction' === field 
    || 'mhfdmanager' === field) {
        let newValue = '';
        if ('workplanyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
        }
        newValue = values;
        options[field] = newValue;
    } else {
        if ('completedyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
            options[field] = values;
        } else if ('streamname' === field) {
          if (values === '') {
            options[field] = values;
          } else {
            options[field] = [values];
          }
        } else if ('totalcost' === field) {
          options[field] = [values[0], values[values.length - 1]];
        } else if (field) {
            options[field] = values;
        }
    }
    setFilterProjectOptions(options);
    // if(originpage === 'portfolio' && setApplyFilter) {
    //   setApplyFilter(Math.random());
    // } else {
    //   getGalleryProjects();
    // }
    options.servicearea = options.servicearea;
    options.county = options.county;
    getParamFilterProjectsNoBounds(options);
}, [filterProjectOptions]);

  useEffect(() => {
    if (filterValue != -1) {
      apply([filterValue], filterby, previousFilterBy);
      previousFilterBy = filterby;
    } else {
      apply([], filterby, previousFilterBy);
      previousFilterBy = filterby;
    }
  } ,[filterby, filterValue]);
  useEffect(() => {
    const currentId: number = tabKeysIds[tabKeys.indexOf(tabKey)] || 0;
    if (currentId == 0) {
      apply([], 'projecttype', '');
    } else {
      apply([currentId], 'projecttype', '');
    }
  } ,[ tabKey ]);
  
  // useEffect(() => {
  //   if(searchRef.current.length) {
  //     searchRef.current.forEach(element => {
  //       let div: any = element;
  //       div.scrollTop = 0;  
  //     });
  //   }
  // }, [optionSelect, tabKey]);

  const callGetGroupList = (sortValue: any, withFavorites: any) => {

    let optionsfiltersoptions = isInit ? filterProjectOptionsNoFilter : filterProjectOptions;
    const optionsfilters = optionsProjects( optionsfiltersoptions, filterComponentOptions, '' , false);    
    //console.log("Filter")
    //console.log(optionsfilters)
    setIsLoading(true);
    getGroupList(currentGroup).then((valuesGroups) => {
      const groups = valuesGroups.groups;
      const currentId: number = tabKeysIds[tabKeys.indexOf(tabKey)] || 0;
      // setNewData(updatedGroups);
      //getListProjects(currentGroup, currentId, sortValue, withFavorites, currentUserId, filterValue, filterby, optionsfilters).then((valuesList) => {       
      getListProjects(currentGroup, currentId, sortValue, withFavorites, currentUserId, -1, '', optionsfilters).then((valuesList) => {
        const updatedGroups: any = [];
        //console.log("valuesList")
        //console.log(valuesList)
        groups.forEach((element: any, index: number) => {
          //console.log("ELEMENT")
          //console.log(element);
          if (valuesList[element.id]) {
          updatedGroups.push({
            id: `Title${element.id}`,
            headerLabel: element.value,
            date: moment('2022/08/11'),
            schedule: [
              {
                objectId: 10,
                type: 'title',
                categoryNo: 100,
                from: moment('2022/02/01 00:00:00'),
                to: moment('2022/06/01 00:00:00'),
                status: 'completed',
                name: element.value,
              }
            ],
          });
            valuesList[element.id].forEach((elem: any, idx: number) => {
              // if(idx > 20) return;            
              updatedGroups.push({
                id: `${element.value}${idx}`,
                project_id: elem.project_id,
                code_project_type_id:elem.code_project_type_id,
                headerLabel: element.value,
                rowLabel: elem.description, //description
                date: moment('2022/08/11'),
                key: elem.project_id + element.id,
                phase: elem?.project_status?.code_phase_type?.phase_name,
                mhfd:  elem?.project_staffs.reduce((accumulator: string, pl: any) => {
                  const sa = pl?.mhfd_staff?.full_name || '';
                  const sa1 = pl?.code_project_staff_role_type_id || '';
                  let value = accumulator;
                  if (sa && sa1 === 1) {
                    if (value) {
                      value += ',';
                    }
                    value += sa;
                  }  
                  return value;
                }, ''),
                mhfd_support: null,
                lg_lead: null,
                developer: null,
                consultant:  elem?.project_partners.reduce((accumulator: string, pl: any) => {
                  const sa = pl?.business_associate?.business_name || '';
                  const sa1 = pl?.code_partner_type_id || '';
                  let value = accumulator;
                  if (sa && sa1 === 3) {
                    if (value) {
                      value += ',';
                    }
                    value += sa;
                  }  
                  return value;
                }, ''), //'elem?.consultants[0]?.consultant[0]?.business_name',
                civil_contractor: elem?.project_partners.reduce((accumulator: string, pl: any) => {
                  const sa = pl?.business_associate?.business_name || '';
                  const sa1 = pl?.code_partner_type_id || '';
                  let value = accumulator;
                  if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
                    if (value) {
                      value += ',';
                    }
                    value += sa;
                  }  
                  return value;
                }, ''), // 'elem?.civilContractor[0]?.business[0]?.business_name',
                landscape_contractor: elem?.project_partners.reduce((accumulator: string, pl: any) => {
                  const sa = pl?.business_associate?.business_name || '';
                  const sa1 = pl?.code_partner_type_id || '';
                  let value = accumulator;
                  if (sa && sa1 === 9) {
                    if (value) {
                      value += ',';
                    }
                    value += sa;
                  }  
                  return value;
                }, ''), // 'elem?.landscapeContractor[0]?.business[0]?.business_name',
                construction_start_date: elem?.project_status?.code_phase_type?.code_phase_type_id === 125 ? elem?.project_status?.planned_start_date : elem?.project_status?.actual_start_date, //elem?.construction_start_date,
                jurisdiction_id: elem?.project_local_governments.reduce((accumulator: Array<string>, pl: any) => {
                  const sa = pl?.CODE_LOCAL_GOVERNMENT?.code_local_government_id || '';
                  let value = accumulator;
                  if (sa) {
                    value = [...value,sa];
                  }  
                  return value;
                }, ''), 
                county_id: elem?.project_counties?.reduce((accumulator: Array<string>, pl: any) => {
                  const county = pl?.CODE_STATE_COUNTY?.state_county_id || '';
                  let value = accumulator;
                  if (county) {
                    value = [...value,county];
                  }  
                  return value;
                }, ''),
                servicearea_id: elem?.project_service_areas.reduce((accumulator: Array<string>, pl: any) => {
                  const sa = pl?.CODE_SERVICE_AREA?.code_service_area_id || '';
                  let value = accumulator;
                  if (sa) {
                    value = [...value,sa];
                  }  
                  return value;
                }, ''),
                consultant_id: elem?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
                  const sa = pl?.business_associate?.business_associates_id || '';
                  const sa1 = pl?.code_partner_type_id || '';
                  let value = accumulator;
                  if (sa && sa1 === 3) {
                    value = [...value,sa];
                  }  
                  return value;
                }, ''),
                contractor_id: elem?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
                  const sa = pl?.business_associate?.business_associates_id || '';
                  const sa1 = pl?.code_partner_type_id || '';
                  let value = accumulator;
                  if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
                    value = [...value,sa];
                  }  
                  return value;
                }, ''),
                isFavorite : favorites.some((element: { project_id: number; }) => {
                  if (element.project_id === elem.project_id) {
                    return true;
                  }              
                  return false;
                }),
                local_government: elem?.project_local_governments.reduce((accumulator: string, pl: any) => {
                  const sa = pl?.CODE_LOCAL_GOVERNMENT?.local_government_name || '';
                  let value = accumulator;
                  if (sa) {
                    if (value) {
                      value += ',';
                    }
                    value += sa;
                  }  
                  return value;
                }, ''),
                on_base: elem?.onbase_project_number,
                total_funding: null,
                project_sponsor: getSponsors(elem.project_partners),
                project_type:elem?.project_status?.code_phase_type?.code_project_type?.project_type_name,
                status: elem?.project_status?.code_phase_type?.code_status_type?.status_name || '',
                service_area: getServiceAreas(elem?.project_service_areas || []),
                county: getCounties(elem?.project_counties || []),
                estimated_cost: getTotalEstimatedCost(elem?.project_costs),
                stream: getStreams(elem?.project_streams || []).join(' , '),
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
                  {
                    objectId: 16,
                    type: 'rect',
                    categoryNo: 16,
                    from: moment('2023/11/21 00:00:00'),
                    to: moment('2023/12/30 00:00:00'),
                    status: 'notStarted',
                    name: 'Closed',
                    phase: 'Closed', 
                    tasks: 10
                  },
                  {
                    objectId: 17,
                    type: 'rect',
                    categoryNo: 17,
                    from: moment('2023/11/21 00:00:00'),
                    to: moment('2023/12/30 00:00:00'),
                    status: 'notStarted',
                    name: 'Closed',
                    phase: 'Closed', 
                    tasks: 10
                  },
                  {
                    objectId: 18,
                    type: 'rect',
                    categoryNo: 18,
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
        setNewData(updatedGroups);
        setCompleteData(updatedGroups);
        setListLoaded(!listLoaded);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        const sortedData = updatedGroups.filter((elem: any) => elem.id.includes('Title'));
        setOpenTable(new Array(sortedData.length).fill(true));
      });
    });
  }



  useEffect(() => {
    callGetGroupList(sortValue, openFavorites);  
    apply(null, '', '');
  }, [ applyFilter,currentGroup]);
  
  useEffect(() => {
    datasets.getData(SERVER.FAVORITES, datasets.getToken()).then(result => {
      setFavorites(result);    
    })    
  }, [listLoaded]);
  useEffect(() => {
    const z = [...completeData].map((x: any)  => {  return {...x, isFavorite : favorites.some((element: { project_id: number; }) => (element.project_id === x.project_id))}})     
    setNewData(z)
    setCompleteData(z)
  }, [favorites]);

  const parseDataToString = (data: any) => {
    if (data == null) return '';
    return data;
  }

  function sort(order: any, columnKey: any, tabkey: any , filterby: any, filterValue: any, filtername: any) {  

    let numAscending: any[] = [];
    let filteredData = [];
    let filteredData2: any[] = [];
    let filteredTitles = [];    
      filterby = filterby+"_id"
    
    let filterWord : any[] = []; 
    let filterHeart : any[] = [];     
    
    if (searchWord) {
      let currentNewData = [...completeData].filter((d: any) => d.id.includes('Title') || d.rowLabel.toLowerCase().includes(searchWord.toLowerCase()));
      currentNewData = currentNewData.filter((d:any, idx:number) => (d.id.includes('Title') && (currentNewData[idx+1] ? currentNewData[idx+1].id.includes('Title') : true)) ?  false : true );
      filterWord = currentNewData;
    } else {
      filterWord = completeData;
    }
    if (filterValue!==-1) {      
        filteredData2 = [...filterWord].filter(name => name.id.includes('Title') 
        || name[filterby].includes(filterValue));               
    } else{
      filteredData2 = [...filterWord]
    }
    if (tabkey!==0) {
      filteredData = [...filteredData2].filter(name => name.id.includes('Title') 
        || name.code_project_type_id===tabkey);  
    } else{
      filteredData = [...filteredData2]
    }
    if (columnKey + '' === 'on_base' || columnKey + '' === 'estimated_cost') {
      if (order + '' === 'ascend'){      
        numAscending = filteredData.sort((a: any, b: any) => a[columnKey] - b[columnKey]);       
      }else if (order + '' === 'descend')     {
        numAscending = filteredData.sort((a: any, b: any) => b[columnKey] - a[columnKey]);
      }else{
        numAscending = filteredData;
      }
    } else {
      if(order + '' === 'ascend'){
        numAscending = filteredData.sort((a: any, b: any) => parseDataToString(a[columnKey]).localeCompare(parseDataToString(b[columnKey])));
      } else if (order+'' === 'descend')     {
        numAscending = filteredData.sort((a: any, b: any) => parseDataToString(b[columnKey]).localeCompare(parseDataToString(a[columnKey]))
    );
      }else{
        numAscending = filteredData;
      }
    }
    if(openFavorites){
      filterHeart = [...numAscending].filter((x: any) => x.isFavorite || x.id.includes('Title'))
    }else{
      filterHeart = numAscending;
    }
    filteredTitles = [...filterHeart].filter(name => {
      const countTitles = [...filterHeart].filter(item  => item.headerLabel === name.headerLabel);
      const count = countTitles.length;
      if (name.id.includes('Title') && count === 1) {
        return false
      } else{
        return true
      }
    });

    const prevData = filteredTitles.map((elem: any) => {
      return {
        ...elem,
        schedule: elem.schedule.filter((val: any) => val.phase !== 'Draft' && val.phase !== 'WorkRequest')
      }
    });
    const sortedData = prevData.filter((elem: any) => elem.id.includes('Title'));
    const phaseD = sortedData.map((elem: any) => {
      return {
        ...elem,
        values: prevData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
      }
    });    
    setPhaseData(phaseD)
    
    return filteredTitles;
  }
  

  useEffect(()=>{     
    let tabkey1 = tabKeysIds[tabKeys.indexOf(tabKey)] || 0;    
    let numAscending = [];
    numAscending = (sort(sortValue.order,sortValue.columnKey,tabkey1,filterby,filterValue,filtername));
    setNewData(numAscending)
    console.log(tabKey)
  }, [sortValue, tabKey, filterby, filterValue, filtername, listLoaded, searchWord, openFavorites,completeData]);

  function enterPhase (){
    setSortValue({
      columnKey: null, order: undefined
    });
    setOptionSelect('Phase')
    setTabKey('CIP');
  }
  function enterList (){
    setOptionSelect('List')
  }
  function changeTabkey (key : any){
    setOpenPiney(false)
    setTabKey(key)
  }
  function openFavs (){
    console.log("ASDASd")
    setOpenPiney(false)    
    console.log(openPiney)
    setOpenFavorites(!openFavorites)   
  }
  return <>
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic} dataProject={dataModal}/>}
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate visible={openModalTollgate}setVisible ={setOpenModalTollgate}/>
    <div>
      {isLoading && <LoadingViewOverall />}
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <h2 style={{maxWidth:'351px'}}>
              <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight" onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
                <div className="select-area">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%', display:'flex', alignItems:'baseline'}}>
                    {<h2 style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{filterby === 'county' ? filtername + " County" : (filterby === 'servicearea' ? filtername + " Service Area" : filtername)}</h2>} &nbsp;
                    {openDrop ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
                  </a>
                </div>
              </Dropdown>
            </h2>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'center'}}>
            <Button className={optionSelect=== 'List' ? "btn-view btn-view-active": "btn-view"} onClick={()=>{enterList()}}>
              List
            </Button>
            <Button className={optionSelect=== 'Phase' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{enterPhase()}}>
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
            <Button className={openFavorites ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{openFavs()}}>
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
        <Tabs destroyInactiveTabPane={true} defaultActiveKey={displayedTabKey[1]}
          activeKey={tabKey}
          onChange={(key) => changeTabkey(key)} className="tabs-map">
          {
            displayedTabKey.map((tk: string, idx: number) => { return (
              <TabPane style={{marginBottom:'0px'}} tab={<span>{/*<Popover content={popovers[tabKeys.indexOf(tk)]} placement="topLeft" overlayClassName="tabs-style" style={{marginLeft:'-15px'}}>{tk} </Popover>*/} {tk}</span>} key={tk} disabled = {optionSelect === 'Phase' && tk === 'All'?true:false}>
                <div className="protafolio-body">
                  {openFilters && <Filters openFilters={openFilters} setOpenFilters={setOpenFilters} setApplyFilter={setApplyFilter} filtersObject={ {filterby, filterValue, tabKey}}/>}
                <Row>
                  <Col xs={{ span: 10 }} lg={{ span: 5 }}>
                    <Search
                      searchWord={searchWord}
                      searchRef={searchRef}
                      tableRef={tableRef}
                      setOpenTable={setOpenTable}
                      openTable={openTable}
                      hoverTable={hoverTable}
                      setHoverTable={setHoverTable}
                      phaseRef={phaseRef}
                      scheduleRef={scheduleRef}
                      rawData={newData}
                      setCompleteData={setCompleteData}
                      setNewData={setNewData}
                      index={idx}
                      groupsBy={groupsBy}
                      setCurrentGroup={setCurrentGroup}
                      setSearchWord={setSearchWord}
                      fullData={newData}
                      email={appUser.userInformation?.email}
                      setCollapsePhase={setCollapsePhase}
                      optionSelect={optionSelect}
                      collapsePhase={collapsePhase}
                    />
                  </Col>
                    <Col xs={{ span: 34 }} lg={{ span: 19 }}>
                      {optionSelect === 'List' && <TablePortafolio
                        rawData={newData}
                        divRef={tableRef}
                        searchRef={searchRef}
                        openTable={openTable}
                        hoverTable={hoverTable}
                        setHoverTable={setHoverTable}
                        tabKey={tabKey}
                        index={idx}
                        setSortValue={setSortValue}
                      />
                      }
                      {optionSelect === 'Phase' && <PhaseView
                        rawData={phaseData}
                        openTable={openTable}
                        phaseRef={phaseRef}
                        searchRef={searchRef}
                        graphicOpen={graphicOpen}
                        setGrapphicOpen={setGrapphicOpen}
                        positionModalGraphic={positionModalGraphic}
                        setPositionModalGraphic={setPositionModalGraphic}                        
                        indexParent={idx}
                        tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                        userName={appUser.userInformation?.name}
                        setDataModal={setDataModal}
                        openPiney = {openPiney}
                        setOpenPiney = {setOpenPiney}
                        collapsePhase = {collapsePhase}
                      />
                      }
                    {optionSelect === 'Schedule'  && <CalendarView 
                    rawData={newData} 
                    openTable={openTable} 
                    moveSchedule={zoomTimeline} 
                    scheduleRef={scheduleRef} 
                    searchRef={searchRef} 
                    graphicOpen={graphicOpen} 
                    setGrapphicOpen={setGrapphicOpen} 
                    positionModalGraphic={positionModalGraphic} 
                    setPositionModalGraphic={setPositionModalGraphic} 
                    index={idx}
                    />}
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