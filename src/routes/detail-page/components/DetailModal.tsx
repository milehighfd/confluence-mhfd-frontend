import React, { useRef, useState, useEffect } from "react";
import { Button, Carousel, Col, message, Modal, Popover, Progress, Row, Tabs, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import DetailInformationProject from "./DetailInformationProject";
import ComponentSolucions from "./ComponentSolucions";
import Roadmap from "./Roadmap";
import * as datasets from "../../../Config/datasets";
import Financials from "./Financials";
import Management from "./Management";
import Map from "./Map";
import Documents from "./Documents";
import { LeftCircleFilled, LeftOutlined, RightCircleFilled, RightOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";
import ImageModal from "Components/Shared/Modals/ImageModal";
import History from "./History";
import PineyView from "routes/portfolio-view/components/PineyView";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, PROBLEMS_MODAL } from "constants/constants";
import { useMapDispatch } from "hook/mapHook";
import { SERVER } from "Config/Server.config";
import { useDetailedState } from "hook/detailedHook";
import DetailInformationProblem from "./DetailInformationProblem";
import ProblemParts from "./ProblemParts";
import ComponentSolucionsByProblems from "./ComponentSolutionByProblems";
import LoadingViewOverall from "Components/Loading-overall/LoadingViewOverall";
import ProblemsProjects from "./ProblemsProjects";
import Vendors from "./Vendors";
import { getCounties, getCurrentProjectStatus, getServiceAreas, getSponsors, getStreams, getTotalEstimatedCost } from '../../../utils/parsers';
import { useLocation } from "react-router";
import GalleryDetail from "./GalleryDetail";
import moment from "moment";
import store from "store/index";
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
const { TabPane } = Tabs;
const tabKeys = ['Project Basics','Problem', 'Vendors', 'Component & Solutions', 'Project Roadmap', 'Graphical View', 'Project Financials', 'Project Management', 'Maps', 'Attachments'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const DetailModal = ({visible, setVisible, data, type}:{visible: boolean, setVisible: Function, data: any, type:string}) => { 
  const {
    getDetailedPageProblem,
    getDetailedPageProject,
    getComponentsByProblemId,
    resetDetailed,
    existDetailedPageProject,
    existDetailedPageProblem,
  } = useMapDispatch();
  const {
    detailed,
  } = useDetailedState();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const project_idS = query.get('project_id') || data?.project_id;
  const problem_idS = query.get('problem_id') || data?.problemid;
  const ciprRef = useRef(null);
  const cipjRef = useRef(null);
  const typeS = query.get('type') || type;   
  const [isLoading, setIsLoading] = useState(true);
  const [tabKey, setTabKey] = useState<any>('Project Basics');
  const [openSecction, setOpenSecction] = useState(0);
  const [projectType, setProjecttype] = useState('');
  const [projectTypeId, setProjecttypeId] = useState('');
  const [active, setActive] = useState(0);
  const [openPiney, setOpenPiney] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [scrollOpen, setscrollOpen] = useState(0)
  const [typeDetail, setTypeDetail] = useState('');
  const [problemPart, setProblemPart] = useState<any[]>([]);
  const [dataRoadmap, setDataRoadmap] = useState<any[]>([]);
  const [popUpData, setPopUpData] = useState<any>({});
  const [updateAction,setUpdateAction] = useState(false);
  const appUser = store.getState().profile;
  const [mapImage, setMapImage] = useState<any>(undefined);

  let divRef = useRef<null | HTMLDivElement>(null); 
  let carouselRef = useRef<undefined | any>(undefined);
  let displayedTabKey = tabKeys;
  let pageWidth  = document.documentElement.scrollWidth;
  useEffect(() => { 
    resetDetailed();  
    if (typeS === FILTER_PROBLEMS_TRIGGER) {
      console.log('PROBLEM')
      getDetailedPageProblem(problem_idS);
      getComponentsByProblemId({id: problem_idS, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(typeS);
      datasets.getData(SERVER.PROBLEM_PARTS_BY_ID + '/' + problem_idS, datasets.getToken()).then(data => {
        const t: any[] = [];
        data.data.forEach((element: any) => {
          element.forEach((d: any, idnex: number) => {
            t.push(d);
          })
        });
        t.sort((a: any, b: any) => {
          if (a.problem_type.localeCompare(b.problem_type) === 0) {
            if (a.problem_part_category.localeCompare(b.problem_part_category) === 0) {
              return a.problem_part_subcategory.localeCompare(b.problem_part_subcategory);
            }
            return a.problem_part_category.localeCompare(b.problem_part_category);
          }
          return a.problem_type.localeCompare(b.problem_type);
        });
        setProblemPart(t);
      });
    } else {
      console.log('PROJECT')
      const project_id = project_idS ? +project_idS : ( +problem_idS ? +problem_idS : 0) ;
      getDetailedPageProject(project_id);
      getComponentsByProblemId({id: data?.on_base || project_id || data?.id  || data?.cartodb_id, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(typeS);
    }
  }, []);
  useEffect(() => {
    const projectType = detailed?.code_project_type?.project_type_name;
    setProjecttypeId(detailed?.code_project_type_id)
    console.log(projectType, 'Project Type NAME')
    console.log('detailed', detailed, projectTypeId)
    setProjecttype(projectType);
    const roadmapData = [];
    if(Object.keys(detailed).length !== 0){
    roadmapData.push({
      id: `${detailed.project_id}`,
      project_id: detailed.project_id,
      code_project_type_id:detailed.code_project_type_id,
      headerLabel: detailed.project_name,
      rowLabel: detailed.project_name, //description
      date: moment('2022/08/11'),
      key: detailed.project_id,
      phase: getCurrentProjectStatus(detailed)?.code_phase_type?.phase_name,
      phaseId: getCurrentProjectStatus(detailed)?.code_phase_type_id,
      mhfd: detailed?.project_staffs && detailed?.project_staffs.length>0 ? detailed?.project_staffs.reduce((accumulator: string, pl: any) => {
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
      }, '') : [],
      mhfd_support: null,
      lg_lead: null,
      developer: null,
      consultant: detailed?.project_partners && detailed?.project_partners.length>0 ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
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
      }, '') : [], //'detailed?.consultants[0]?.consultant[0]?.business_name',
      civil_contractor: detailed?.project_partners && detailed?.project_partners.length>0 ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
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
      }, '') : [], // 'detailed?.civilContractor[0]?.business[0]?.business_name',
      landscape_contractor: detailed?.project_partners && detailed?.project_partners.length>0 ? detailed?.project_partners.reduce((accumulator: string, pl: any) => {
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
      }, ''): [], // 'detailed?.landscapeContractor[0]?.business[0]?.business_name',
      construction_start_date: detailed?.project_status?.code_phase_type?.code_phase_type_id === 125 ? detailed?.project_status?.planned_start_date : detailed?.project_status?.actual_start_date, //detailed?.construction_start_date,
      jurisdiction_id: detailed?.project_local_governments && detailed?.project_local_governments.length>0 ? detailed?.project_local_governments.reduce((accumulator: Array<string>, pl: any) => {
        const sa = pl?.CODE_LOCAL_GOVERNMENT?.code_local_government_id || '';
        let value = accumulator;
        if (sa) {
          value = [...value,sa];
        }  
        return value;
      }, ''):[], 
      county_id: detailed?.project_counties && detailed?.project_counties.length>0  ? detailed?.project_counties?.reduce((accumulator: Array<string>, pl: any) => {
        const county = pl?.CODE_STATE_COUNTY?.state_county_id || '';
        let value = accumulator;
        if (county) {
          value = [...value,county];
        }  
        return value;
      }, ''):[],
      servicearea_id: detailed?.project_service_areas && detailed?.project_service_areas.length>0 ? detailed?.project_service_areas.reduce((accumulator: Array<string>, pl: any) => {
        const sa = pl?.CODE_SERVICE_AREA?.code_service_area_id || '';
        let value = accumulator;
        if (sa) {
          value = [...value,sa];
        }  
        return value;
      }, ''): [],
      consultant_id: detailed?.project_partners && detailed?.project_partners.length>0 ? detailed?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
        const sa = pl?.business_associate?.business_associates_id || '';
        const sa1 = pl?.code_partner_type_id || '';
        let value = accumulator;
        if (sa && sa1 === 3) {
          value = [...value,sa];
        }  
        return value;
      }, ''): [],
      contractor_id: detailed?.project_partners && detailed?.project_partners.length>0 ? detailed?.project_partners.reduce((accumulator: Array<string>, pl: any) => {
        const sa = pl?.business_associate?.business_associates_id || '';
        const sa1 = pl?.code_partner_type_id || '';
        let value = accumulator;
        if ((sa && sa1 === 8) || (sa && sa1 === 9)) {
          value = [...value,sa];
        }  
        return value;
      }, ''): [],
      local_government:detailed?.project_local_governments && detailed?.project_local_governments.length>0 ? detailed?.project_local_governments.reduce((accumulator: string, pl: any) => {
        const sa = pl?.CODE_LOCAL_GOVERNMENT?.local_government_name || '';
        let value = accumulator;
        if (sa) {
          if (value) {
            value += ',';
          }
          value += sa;
        }  
        return value;
      }, ''): [],
      on_base: detailed?.onbase_project_number,
      total_funding: null,
      project_sponsor: detailed?.project_partners ? getSponsors(detailed.project_partners) : {},
      project_type:detailed?.code_project_type?.project_type_name,
      status: getCurrentProjectStatus(detailed)?.code_phase_type?.code_status_type?.status_name || '',
      project_status: detailed?.project_statuses ? detailed?.project_statuses.filter((ps:any) => ps?.code_phase_type?.code_status_type?.code_status_type_id > 4) : {},
      service_area: getServiceAreas(detailed?.project_service_areas || []),
      county: getCounties(detailed?.project_counties || []),
      estimated_cost: getTotalEstimatedCost(detailed?.project_costs),
      stream: getStreams(detailed?.project_streams || []).join(' , '),
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
          show: false,
          current:false
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
          tasks: 8,
          show: false,
          current:false
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
          tasks: 12,
          show: false,
          current:false
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
          tasks: 32,
          show: false,
          current:false
        },
      ],
    })
  }
    console.log('updated', roadmapData)
    setDataRoadmap(roadmapData)
  }, [detailed]);

 

  useEffect(()=>{
    let img = new Image();
    let mapCanvas: any;
    mapCanvas = document.querySelector('.mapboxgl-canvas');
    if (mapCanvas instanceof HTMLCanvasElement) {
      const urlOfMap = img.src = mapCanvas.toDataURL();
      setMapImage(urlOfMap);
      if (detailed?.problemname || detailed?.project_name) {
        setIsLoading(false);
      }else{
        setIsLoading(true);
      }
    } else {
      if (detailed?.problemname || detailed?.project_name) {
        setIsLoading(false);
      }else{
        setIsLoading(true);
      }
    }
  }, [detailed])

  const copyUrl = () => {   
    function handler (event: any){
      let origin = `${window.location.origin.toString()}/detailed-modal`;
      let url = '';
      if (typeS === FILTER_PROBLEMS_TRIGGER) {
        console.log('problem')
        url = `type=Problems&problem_id=${problem_idS}`;
      } else {
        console.log('project')
        url = `type=Projects&project_id=${project_idS}`;
      }
      event.clipboardData.setData('text/plain', origin + '?' + url);   
      event.preventDefault();
      document.removeEventListener('copy', handler, true);
    }
    document.addEventListener('copy', handler, true);
    document.execCommand('copy');
    message.success('Copied to Clipboard!');
  }

  const downloadPdf = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    let url: string;
    let fileName: string;
    let map:any;
    let roadMap:any;
   if (typeS === FILTER_PROBLEMS_TRIGGER) {
      url = `${process.env.REACT_APP_API_URI}/gallery/problem-by-id/${problem_idS}/pdf`;
      fileName = 'problem.pdf';
      let c: any = ciprRef.current;
      if (c) {
        map = await c.getCanvasBase64()
      }
    } else {
      url = `${process.env.REACT_APP_API_URI}/gallery/project-pdf/${data.project_id}`;
      fileName = 'project.pdf';
      let c: any = cipjRef.current;
      if (c) {
        map = await c.getCanvasBase64();
      }
    } 
    const roadMapSelector = document.getElementById('get-roadmap-content');
    const widthCustom = roadMapSelector?.scrollWidth ? roadMapSelector?.scrollWidth + 50 : 1250;
    const heightCustom = roadMapSelector?.scrollHeight ? roadMapSelector?.scrollHeight + 50 : 250;
    if (roadMapSelector) {
      roadMap = await toPng(roadMapSelector, {width: widthCustom, height: heightCustom, style: {overflow: 'visible'}});
    }
    
    let body = { mapImage: map, roadMap };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })
    .then( res => res.blob() )
    .then((r) => {
      var blob = new Blob([r], {type: 'application/pdf'});
      saveAs(blob, fileName)
    })
    .finally(() => {
      setIsLoading(false);
    })
  }
  // useEffect(() => {
  //   if(type === PROBLEMS_MODAL){
  //     existDetailedPageProblem(data.problemid);
  //   }else{
  //     existDetailedPageProject(data.project_id);
  //   }
  // },[])
  return (
    <>
    {isLoading && <LoadingViewOverall />}
    <ImageModal visible={openImage} setVisible={setOpenImage} type={typeS} active={active} setActive={setActive} copyUrl={copyUrl}/>
    <Modal
      className="detailed-modal modal-detailed-modal"
      style={{ top: 30 }}
      visible={visible || !!query.get('type')}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed" style={{overflowY:'hidden', maxHeight:"calc(100vh - 8vh)"}}>
        <Row className="detailed-h" gutter={[16, 8]} style={{background:'#f8f8fa'}}>
          <Col xs={{ span: 24 }} lg={typeS === FILTER_PROBLEMS_TRIGGER ? { span: 13}:{ span: 18}}>
            <div className="header-detail" style={{alignItems: 'normal'}}>
              <div style={detailed?.problemtype ? {width:'100%'} : {width:'76%'}}>
                <h1>{detailed?.problemname ? detailed?.problemname : detailed?.project_name}</h1>
                <p><span>{detailed?.problemtype ? (detailed?.problemtype + ' Problem') : (detailed?.code_project_type?.project_type_name + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? ( detailed?.jurisdiction + ', CO' ) : (getSponsors(detailed?.project_partners || []) || 'N/A')} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? (detailed?.county + ' County') : (getCounties(detailed?.project_counties || []) || 'N/A')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? (detailed?.servicearea + ' Service Area'):(getServiceAreas(detailed?.project_service_areas || []) || 'N/A')} </span></p>
              </div>
              {detailed?.problemtype ? 
                <></>:
                <div className="status-d" style={{display:'flex'}}>
                  <p>Status<br></br><span className="status-active" style={{marginRight:'20px'}}>{getCurrentProjectStatus(detailed)?.code_phase_type?.code_status_type?.status_name}</span></p>
                  <p style={{}}>Phase<br></br><span className="status-final">{ getCurrentProjectStatus(detailed)?.code_phase_type?.phase_name}</span></p>
                </div>
              }
            </div>
          </Col>
          <Col xs={{ span: 10 }} lg={typeS === FILTER_PROBLEMS_TRIGGER ? { span: 10}:{ span: 5}}>
            <div className="header-button">{
                detailed?.problemtype ? (<>
                  <div className="progress">
                    <div className="text-progress">
                      <p>Solution Status</p><p className="value">{detailed?.solutionstatus ? detailed.solutionstatus : 0}%</p>
                    </div>
                    <Progress percent={detailed?.solutionstatus ? detailed.solutionstatus : 0} />
                  </div>
                  <div className="detailed-mmm">
                    <p style={{marginTop:'-10px'}}>Cost</p>
                    <b>{ 
                      (detailed?.component_cost != null ?('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(detailed?.component_cost)): 'No Cost Data')}</b>
                  </div>
                </>
                ) : (
                  <div className="detailed-mmm">
                    <p style={{marginTop:'-10px'}}>Estimated Cost</p>
                    <b>{ 
    
                        (getTotalEstimatedCost(detailed?.project_costs || []) != null ?('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(getTotalEstimatedCost(detailed?.project_costs || []))): 'No Cost Data')}
                    </b>
                  </div>
                )
              }
              <Button className="btn-circle">
                <img src="/Icons/icon-01.svg" alt="" onClick={downloadPdf} style={{margin:'0px -0.5px'}}/>
              </Button>
              <Button style={{marginLeft:'10px'}}  className="btn-circle" onClick={copyUrl}>
                <img src="/Icons/icon-06.svg" alt="" />
              </Button>
            </div>
          </Col>
          <Col xs={{ span: 4 }} lg={{ span: 1 }}style={{ textAlign: 'right' }}>
            <Tooltip title="Close Window">
              <Button className="btn-transparent mobile-display" onClick={() => setVisible(false)}><img src="/Icons/icon-62.svg" alt="" height="15px" /></Button>
            </Tooltip>
          </Col>
        </Row>
        {!detailed?.problemtype && <div
          style={{display:'flex', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)', zIndex:'10000', paddingLeft:'20px', scrollBehavior: 'smooth', marginBottom:'1.5px'}}
        >
          <a href="#project-basics" onClick={()=>{setscrollOpen(0)}} className={openSecction === 0 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Project Basics</a>
          <a href="#problem" onClick={()=>{setscrollOpen(1)}} className={openSecction === 1 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Problem</a>
          <a href="#vendors" onClick={()=>{setscrollOpen(2)}} className={openSecction === 2 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Vendors</a>
          <a href="#component-solutions" onClick={()=>{setscrollOpen(3)}} className={openSecction === 3 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Proposed Actions</a>
          <a href="#project-roadmap" onClick={()=>{setscrollOpen(4)}} className={openSecction === 4 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Project Roadmap</a>
          {/* <a href="#graphical-view" style={{opacity:'0.25'}} className={openSecction === 5 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Graphical View</a> */}
          <a style={{opacity:'0.25'}} className={openSecction === 5 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Graph</a>
          <a href="#project-financials" onClick={()=>{setscrollOpen(6)}} className={openSecction === 6 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Project Financials</a>
          {/* <a href="#project-management" style={{opacity:'0.25'}} className={openSecction === 7 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Project Management</a> */}
          <a style={{opacity:'0.25'}} className={openSecction === 7 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Project Management</a>
          <a href="#maps" onClick={()=>{setscrollOpen(8)}} className={openSecction === 8 ? "header-body-modal header-body-modal-active" : "header-body-modal"}>Maps</a>
          <a href="#gallery" onClick={()=>{setscrollOpen(8)}} className={openSecction === 9 ? "header-body-modal header-body-modal-active" : "header-body-modal"}>Gallery</a>
          <a href="#attachments" onClick={()=>{setscrollOpen(9)}} className={openSecction === 10 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >Attachments</a>
          <a href="#history" onClick={()=>{setscrollOpen(10)}} className={openSecction === 11 ? "header-body-modal header-body-modal-active" : "header-body-modal"} >History</a>
        </div>}
        <Row
          className="detailed-b"
        >
          <Col xs={{ span: 24 }} lg={{ span: 17 }} style={detailed?.problemtype ? { borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' ,height:'calc(100vh - 138px)', overflowY:'auto', scrollBehavior:'smooth'}:{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' ,height:'calc(100vh - 200px)', overflowY:'auto', scrollBehavior:'smooth'}} className="carouse-detail body-detail-modal"
            onScrollCapture={(e)=>{
              let numberSecction = 0;
              if(pageWidth < 1900 && divRef.current){
                switch(true) {
                  case divRef.current?.scrollTop < 444 || scrollOpen === 0:
                    numberSecction= 0;
                    break;
                  case (divRef.current?.scrollTop > 444 &&  divRef.current?.scrollTop < 700) || scrollOpen === 1:
                    numberSecction= 1;
                    break;
                  case (divRef.current?.scrollTop > 700 &&  divRef.current?.scrollTop < 957) || scrollOpen === 2:
                    numberSecction= 2;
                    break;
                  case (divRef.current?.scrollTop > 957 &&  divRef.current?.scrollTop < 1214) || scrollOpen === 3:
                    numberSecction= 3;
                    break;
                  case (divRef.current?.scrollTop > 1214 &&  divRef.current?.scrollTop < 1442) || scrollOpen === 4:
                    numberSecction= 4;
                    break;
                    case (divRef.current?.scrollTop > 1442 &&  divRef.current?.scrollTop < 1908) || scrollOpen === 5:
                    numberSecction= 5;
                    break;
                  case (divRef.current?.scrollTop > 1908 &&  divRef.current?.scrollTop < 2497) || scrollOpen === 6:
                    numberSecction= 6;
                    break;
                  case (divRef.current?.scrollTop > 2497 &&  divRef.current?.scrollTop < 3616) || scrollOpen === 7:
                    numberSecction= 7;
                    break;
                  case (divRef.current?.scrollTop > 3616 &&  divRef.current?.scrollTop < 3695) || scrollOpen === 8:
                    numberSecction= 8;
                    break;
                  case (divRef.current?.scrollTop > 3695 &&  divRef.current?.scrollTop < 4000) || scrollOpen === 9:
                    numberSecction= 9;
                    break;
                  default:
                    numberSecction= 10;
                    break;
                }
              }
              if(pageWidth < 2550 && pageWidth >= 1900 && divRef.current){
                switch(true) {
                  case divRef.current?.scrollTop < 514:
                    numberSecction= 0;
                    break;
                  case divRef.current?.scrollTop > 514 &&  divRef.current?.scrollTop < 777:
                    numberSecction= 1;
                    break;
                  case divRef.current?.scrollTop > 777 &&  divRef.current?.scrollTop < 1042:
                    numberSecction= 2;
                    break;
                  case divRef.current?.scrollTop > 1042 &&  divRef.current?.scrollTop < 1306:
                    numberSecction= 3;
                    break;
                  case divRef.current?.scrollTop > 1306 &&  divRef.current?.scrollTop < 1442:
                    numberSecction= 4;
                    break;
                    case divRef.current?.scrollTop > 1442 &&  divRef.current?.scrollTop < 1549 :
                    numberSecction= 5;
                    break;
                  case divRef.current?.scrollTop > 1549  &&  divRef.current?.scrollTop < 2120 :
                    numberSecction= 6;
                    break;
                  case divRef.current?.scrollTop > 2120  &&  divRef.current?.scrollTop < 2725:
                    numberSecction= 7;
                    break;
                  case divRef.current?.scrollTop > 2725 &&  divRef.current?.scrollTop < 3880:
                    numberSecction= 8;
                    break;
                  case divRef.current?.scrollTop > 3880 &&  divRef.current?.scrollTop < 3977:
                    numberSecction= 9;
                    break;
                  default:
                    numberSecction= 10;
                    break;
                }
              }
              if(pageWidth >= 2550 && divRef.current){
                switch(true) {
                  case divRef.current?.scrollTop < 600:
                    numberSecction= 0;
                    break;
                  case divRef.current?.scrollTop > 600 &&  divRef.current?.scrollTop < 880:
                    numberSecction= 1;
                    break;
                  case divRef.current?.scrollTop > 880 &&  divRef.current?.scrollTop < 1168:
                    numberSecction= 2;
                    break;
                  case divRef.current?.scrollTop > 1168 &&  divRef.current?.scrollTop < 1433:
                    numberSecction= 3;
                    break;
                  case divRef.current?.scrollTop > 1433 &&  divRef.current?.scrollTop < 1730 :
                    numberSecction= 4;
                    break;
                    case divRef.current?.scrollTop > 1730  &&  divRef.current?.scrollTop < 2400 :
                    numberSecction= 5;
                    break;
                  case divRef.current?.scrollTop > 2400  &&  divRef.current?.scrollTop < 3027 :
                    numberSecction= 6;
                    break;
                  case divRef.current?.scrollTop > 3027  &&  divRef.current?.scrollTop < 4285:
                    numberSecction= 7;
                    break;
                  case divRef.current?.scrollTop > 4285 &&  divRef.current?.scrollTop < 4319:
                    numberSecction= 8;
                    break;
                  case divRef.current?.scrollTop > 4319 &&  divRef.current?.scrollTop < 4419 :
                    numberSecction= 9;
                    break;
                  default:
                    numberSecction= 10;
                    break;
                }
              }
              setOpenSecction(numberSecction);
            }}
            ref={divRef}
          >
            <div className="placeholder-carousel">

            </div>
            <div style={{background:'#f5f7ff', zIndex:'1', height:'266px', width:'100%', position:'absolute', top:'0'}} className='placeholder-carousel'>
            {/* <div className="detailed-c"></div> */}
            </div>
            <Carousel className="detail-carousel" ref={carouselRef} style={{zIndex:'3', height:'266px'}}>
              {detailed?.problemid ? (
                    <div className="detailed-c"> <img  src={"detailed/" + detailed?.problemtype + ".png"}/> </div>
                  ) : (
                    detailed?.attachments ? (detailed?.attachments.map((image: string, index: number) => {
                    return <div key={index} className="detailed-c" onClick={()=>{setOpenImage(true);setActive(0)}}>
                      <img width="100%" height="100%" src={image} alt=""/>
                    </div>
                  })
                      ) : (
                        projectType ?
                          (
                            <div className="detailed-c" onClick={()=>{setOpenImage(true); setActive(0)}}> <img  src={
                              projectType === 'Capital (CIP)' ? '/detailed/capital.png' :
                                projectType === 'Planning Study (Study)' ? '/detailed/study.png' :
                                projectType === 'Special' ? '/detailed/special.png' :
                                  projectType === 'Vegetation Management' ? '/detailed/vegetation-management.png' :
                                    projectType === 'Sediment Removal' ? '/detailed/sediment-removal.png' :
                                      projectType === 'Maintenance Restoration' ? '/detailed/restoration.png' :
                                        projectType === 'Minor Repairs' ? '/detailed/minor-repairs.png' :
                                          projectType === 'Routine Trash and Debris' ?'/detailed/debris-management.png': '/detailed/watershed-change.png'
                            }/> </div>
                          )
                          :
                          (<></>)
                        )
                       )
                  } 
            </Carousel>
            {typeS === FILTER_PROJECTS_TRIGGER && <><div className="img-carousel-detail">
              <img src="/picture/map-denver.png" alt="" style={{width:'100%', height:'100%', borderRadius:'10px'}} onClick={()=>{setOpenImage(true);setActive(2)}} />
            </div>
            <div className="detail-left">
              <LeftOutlined className="button-next" onClick={()=>{carouselRef.current.prev()}}/>
            </div>
            <div className="detail-right">
              <RightOutlined className="button-next" onClick={()=>{carouselRef.current.next() }}/>
            </div></>}
            <div className="detailed-info">
              {typeS === 'Problems' ?
                <>
                  <DetailInformationProblem />
                  <ProblemParts problemParts={problemPart}/>
                  <ComponentSolucionsByProblems />
                  <Map type={typeS} ref={ciprRef}/>
                  <br></br>
                  <br></br>
                </>:
                <>
                  <DetailInformationProject />
                  <ProblemsProjects/>
                  <Vendors/>
                  <ComponentSolucions />
                  <Roadmap data={dataRoadmap} setOpenPiney={setOpenPiney} openPiney={openPiney} setPopUpData={setPopUpData} updateAction={updateAction} setUpdateAction={setUpdateAction}/>
                  <br></br>
                  <Financials />
                  <br></br>
                  <Management />
                  <Map type={typeS} ref={cipjRef} />
                  <br></br>
                  <GalleryDetail/>
                  <br></br>
                  <Documents />
                  <History />
                </>
              }
            </div>
          </Col>
          <Col span={7} className="mobile-display" style={{height:'calc(100vh - 200px)', overflowY:'auto', scrollBehavior:'smooth'}}>
            {openPiney? <div className="piney-modal-detail"><PineyView setOpenPiney={setOpenPiney} data={popUpData} userName={appUser.userInformation?.name} setUpdateAction={setUpdateAction} updateAction={updateAction}/></div>
            :<TeamCollaborator />} 
          </Col>
        </Row>
      </div>
    </Modal>
    </>
    
  )
}

export default DetailModal;