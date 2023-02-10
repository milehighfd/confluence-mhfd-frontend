import React, { useRef, useState, useEffect } from "react";
import { Button, Carousel, Col, Modal, Popover, Progress, Row, Tabs, Tooltip } from "antd";
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
  const [isLoading, setIsLoading] = useState(true);
  const [tabKey, setTabKey] = useState<any>('Project Basics');
  const [openSecction, setOpenSecction] = useState(0);
  const [projectType, setProjecttype] = useState('');
  const [active, setActive] = useState(0);
  const [openPiney, setOpenPiney] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [typeDetail, setTypeDetail] = useState('');
  const [problemPart, setProblemPart] = useState<any[]>([]);
  let divRef = useRef<null | HTMLDivElement>(null); 
  let carouselRef = useRef<undefined | any>(undefined);
  let displayedTabKey = tabKeys;
  let pageWidth  = document.documentElement.scrollWidth;

  useEffect(() => {
    resetDetailed();
    if (type === FILTER_PROBLEMS_TRIGGER) {
      getDetailedPageProblem(data.problemid);
      getComponentsByProblemId({id: data.problemid, typeid: 'problemid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(type);
      datasets.getData(SERVER.PROBLEM_PARTS_BY_ID + '/' + data.problemid, datasets.getToken()).then(data => {
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
      const project_id = data.project_id ? data.project_id : ( data.id ? data.id : 0);
      getDetailedPageProject(project_id);
      getComponentsByProblemId({id: data.on_base || data.id, typeid: 'projectid', sortby: 'type', sorttype: 'asc'});
      setTypeDetail(type);
    }
  }, []);
  useEffect(() => {
    const projectType = detailed?.project_status?.code_phase_type?.code_project_type?.project_type_name;
    setProjecttype(projectType);
  }, [detailed]);

  useEffect(()=>{
    if(detailed?.problemname || detailed?.project_name){
      setIsLoading(false)
    }else{
      setIsLoading(true)
    }
  }, [detailed])
  useEffect(() => {
    if(type === PROBLEMS_MODAL){
      existDetailedPageProblem(data.problemid);
    }else{
      existDetailedPageProject(data.project_id);
    }
    
  },[])
  return (
    <>
    {isLoading && <LoadingViewOverall />}
    <ImageModal visible={openImage} setVisible={setOpenImage} type={type} active={active} setActive={setActive}/>
    <Modal
      className="detailed-modal"
      style={{ top: 30 }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{background:'#f8f8fa'}}>
          <Col xs={{ span: 24 }} lg={type === FILTER_PROBLEMS_TRIGGER ? { span: 13}:{ span: 18}}>
            <div className="header-detail" style={{alignItems: 'normal'}}>
              <div>
                <h1>{detailed?.problemname ? detailed?.problemname : detailed?.project_name}</h1>
                <p><span>{detailed?.problemtype ? (detailed?.problemtype + ' Problem') : (detailed?.project_status?.code_phase_type?.code_project_type?.project_type_name + ' Project')}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? ( detailed?.jurisdiction + ', CO' ) : (detailed?.sponsor && detailed?.sponsor.length > 0 && detailed?.sponsor[0].business_associate?.business_associate_name ? detailed?.sponsor[0].business_associate.business_associate_name:'N/A')} </span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? (detailed?.county + ' County') : (detailed?.codeStateCounty?.county_name + ' County' )}</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> {detailed?.problemtype ? (detailed?.servicearea + ' Service Area'):(detailed?.codeServiceArea?.service_area_name + ' Service Area')} </span></p>
              </div>
              {detailed?.problemtype ? 
                <></>:
                <div className="status-d" style={{display:'flex'}}>
                  <p>Status<br></br><span className="status-active" style={{marginRight:'20px'}}>{detailed?.project_status?.code_phase_type?.code_status_type?.status_name}</span></p>
                  <p style={{}}>Phase<br></br><span className="status-final">{detailed?.project_status?.code_phase_type?.phase_name}</span></p>
                </div>
              }
            </div>
          </Col>
          <Col xs={{ span: 10 }} lg={type === FILTER_PROBLEMS_TRIGGER ? { span: 10}:{ span: 5}}>
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
                      (detailed?.sumCost != null ?('$' + new Intl.NumberFormat("en-EN",{maximumFractionDigits:0}).format(detailed?.sumCost)): 'No Cost Data')}</b>
                  </div>
                )
              }
              <Button className="btn-circle">
                <img src="/Icons/icon-01.svg" alt="" />
              </Button>
              <Button style={{marginLeft:'10px'}}  className="btn-circle">
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
          <a href="#project-basics" className={openSecction === 0 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(0)}}>Project Basics</a>
          <a href="#problem" className={openSecction === 1 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(1)}}>Problem</a>
          <a href="#vendors" className={openSecction === 2 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(2)}}>Vendors</a>
          <a href="#component-solutions" className={openSecction === 3 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(3)}}>Component & Solutions</a>
          <a href="#project-roadmap" className={openSecction === 4 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(4)}}>Project Roadmap</a>
          <a href="#graphical-view" style={{opacity:'0.25'}} className={openSecction === 5 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(5)}}>Graphical View</a>
          <a href="#project-financials" className={openSecction === 6 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(6)}}>Project Financials</a>
          <a href="#project-management" style={{opacity:'0.25'}} className={openSecction === 7 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(7)}}>Project Management</a>
          <a href="#maps" className={openSecction === 8 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(8)}}>Maps</a>
          <a href="#attachments" className={openSecction === 9 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(9)}}>Attachments</a>

          <a href="#history" className={openSecction === 10 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(10)}}>History</a>
        </div>}
        <Row
          className="detailed-b"
        >
          <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' ,height:'calc(100vh - 200px)', overflowY:'auto', scrollBehavior:'smooth'}} className="carouse-detail"
            onScrollCapture={(e)=>{
              let numberSecction = 0;
              if(pageWidth < 1900){
                if(divRef.current &&  divRef.current?.scrollTop > 450){
                  numberSecction= 1;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 550){
                  numberSecction= 2;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 650){
                  numberSecction= 3;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 900){
                  numberSecction= 4;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1200){
                  numberSecction= 5;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1650){
                  numberSecction= 6;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 2050){
                  numberSecction= 7;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3000){
                  numberSecction= 8;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3450){
                  numberSecction= 9;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3500){
                  numberSecction= 10;
                }
              }
              if(pageWidth < 2550 && pageWidth >= 1900){
                if(divRef.current &&  divRef.current?.scrollTop > 550){
                  numberSecction= 1;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 650){
                  numberSecction= 2;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 750){
                  numberSecction= 3;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1100){
                  numberSecction= 4;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1440){
                  numberSecction= 5;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1888){
                  numberSecction= 6;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 2440){
                  numberSecction= 7;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3555){
                  numberSecction= 8;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3767){
                  numberSecction= 9;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 3870){
                  numberSecction= 10;
                }
              }
              if(pageWidth >= 2550){
                if(divRef.current &&  divRef.current?.scrollTop > 600){
                  numberSecction= 1;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 750){
                  numberSecction= 2;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 900){
                  numberSecction= 3;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1257){
                  numberSecction= 4;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 1650){
                  numberSecction= 5;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 2250){
                  numberSecction= 6;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 2850){
                  numberSecction= 7;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 4179){
                  numberSecction= 8;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 4400){
                  numberSecction= 9;
                }
                if(divRef.current &&  divRef.current?.scrollTop > 4560){
                  numberSecction= 10;
                }
              }
              setOpenSecction(numberSecction);
            }}
            ref={divRef}
          >
            <div style={{background:'#f5f7ff', position:'absolute', zIndex:'1', height:'266px', width:'100%'}}>
            {/* <div className="detailed-c"></div> */}
            </div>
            <Carousel className="detail-carousel" ref={carouselRef} style={{zIndex:'3', height:'266px'}}>
              {detailed?.problemid ? (
                    <div className="detailed-c"> <img  src={"detailed/" + detailed?.problemtype + ".png"}/> </div>
                  ) : (
                    detailed?.attachments?.length == 0 ? (
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
                      ) : (
                        detailed?.attachments && detailed?.attachments.map((image: string, index: number) => {
                           return <div key={index} className="detailed-c" onClick={()=>{setOpenImage(true);setActive(0)}}>
                             <img width="100%" height="100%" src={image} alt=""/>
                           </div>
                         })
                       )
                    )}
            </Carousel>
            {/* <Carousel className="detail-carousel" ref={carouselRef} style={{zIndex:'3'}}>
              <div className="detailed-c"> <div style={{background:'red'}}/> </div>
            </Carousel> */}
            {type === FILTER_PROJECTS_TRIGGER && <><div className="img-carousel-detail">
              <img src="/picture/map-denver.png" alt="" style={{width:'100%', height:'100%', borderRadius:'10px'}} onClick={()=>{setOpenImage(true);setActive(2)}} />
            </div>
            <div className="detail-left">
              <LeftOutlined className="button-next" onClick={()=>{carouselRef.current.prev()}}/>
            </div>
            <div className="detail-right">
              <RightOutlined className="button-next" onClick={()=>{carouselRef.current.next() }}/>
            </div></>}
            <div className="detailed-info">
              {detailed?.problemtype ?
                <>
                  <DetailInformationProblem />
                  <ProblemParts problemParts={problemPart}/>
                  <ComponentSolucionsByProblems />
                  <Map type={type}/>
                  <br></br>
                  <br></br>
                </>:
                <>
                  <DetailInformationProject />
                  <ProblemsProjects/>
                  <Vendors/>
                  <ComponentSolucions />
                  <Roadmap setOpenPiney={setOpenPiney} openPiney={openPiney}/>
                  <Financials />
                  <Management />
                  <Map type={type}/>
                  <Documents />
                  <History />
                </>
              }
            </div>
          </Col>
          <Col span={7} className="mobile-display" style={{height:'calc(100vh - 200px)', overflowY:'auto', scrollBehavior:'smooth'}}>
            {openPiney? <div className="piney-modal-detail"><PineyView setOpenPiney={setOpenPiney} /></div>
            :<TeamCollaborator />} 
          </Col>
        </Row>
      </div>
    </Modal>
    </>
    
  )
}

export default DetailModal;