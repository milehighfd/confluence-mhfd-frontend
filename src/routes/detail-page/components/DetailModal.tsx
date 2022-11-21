import React, { useRef, useState } from "react";
import { Button, Carousel, Col, Modal, Popover, Progress, Row, Tabs, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import DetailInformationProject from "./DetailInformationProject";
import ComponentSolucions from "./ComponentSolucions";
import Roadmap from "./Roadmap";
import Financials from "./Financials";
import Management from "./Management";
import Map from "./Map";
import Documents from "./Documents";
import { LeftCircleFilled, LeftOutlined, RightCircleFilled, RightOutlined } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";
import ImageModal from "Components/Shared/Modals/ImageModal";
import History from "./History";

const { TabPane } = Tabs;
const tabKeys = ['Project Basics','Problem', 'Vendors', 'Component & Solutions', 'Project Roadmap', 'Graphical View', 'Project Financials', 'Project Management', 'Maps', 'Attachments'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const DetailModal = ({visible, setVisible}:{visible: boolean, setVisible: Function}) => {
  const [tabKey, setTabKey] = useState<any>('Project Basics');
  const [openSecction, setOpenSecction] = useState(0)
  const [openImage, setOpenImage] = useState(false);
  let divRef = useRef<null | HTMLDivElement>(null); 
  let carouselRef = useRef<undefined | any>(undefined);
  let displayedTabKey = tabKeys;
  return (
    <>
    <ImageModal visible={openImage} setVisible={setOpenImage}/>
    <Modal
      className="detailed-modal"
      style={{ top: 30 }}
      visible={visible}
      onCancel={() => setVisible(false)}
      forceRender={false}
      destroyOnClose>
      <div className="detailed">
        <Row className="detailed-h" gutter={[16, 8]} style={{background:'#f8f8fa'}}>
          <Col xs={{ span: 24 }} lg={{ span: 17 }}>
            <div className="header-detail">
              <div>
                <h1> Big Dry Creek @ SSPRD Golf Course</h1>
                <p><span>Capital Project</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span>SEMSWA</span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> Arapahoe County </span>&nbsp;&nbsp;•&nbsp;&nbsp;
                <span> South Service Area</span></p>
              </div>
              <div className="status-d" style={{display:'flex'}}>
                <p>Status:<span className="status-active">Active</span></p>
                <p style={{marginLeft:'10px'}}>Phase:<span className="status-final">Final Design</span></p>
              </div>
            </div>
          </Col>
          <Col xs={{ span: 10 }} lg={{ span: 6 }}>
            <div className="header-button">
              <div className="detailed-mmm">
                <b>$5,262,129</b>
              </div>
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
        <div
          style={{display:'flex', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)', zIndex:'10000', paddingLeft:'20px', scrollBehavior: 'smooth', marginBottom:'1.5px'}}
        >
          <a href="#project-basics" className={openSecction === 0 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(0)}}>Project Basics</a>
          <a href="#problem" className={openSecction === 1 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(1)}}>Problem</a>
          <a href="#vendors" className={openSecction === 2 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(2)}}>Vendors</a>
          <a href="#component-solutions" className={openSecction === 3 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(3)}}>Component & Solutions</a>
          <a href="#project-roadmap" className={openSecction === 4 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(4)}}>Project Roadmap</a>
          <a href="#graphical-view" className={openSecction === 5 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(5)}}>Graphical View</a>
          <a href="#project-financials" className={openSecction === 6 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(6)}}>Project Financials</a>
          <a href="#project-management" className={openSecction === 7 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(7)}}>Project Management</a>
          <a href="#maps" className={openSecction === 8 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(8)}}>Maps</a>
          <a href="#attachments" className={openSecction === 9 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(9)}}>Attachments</a>

          <a href="#history" className={openSecction === 10 ? "header-body-modal header-body-modal-active" : "header-body-modal"} onClick={()=>{setOpenSecction(10)}}>History</a>
        </div>
        <Row
          className="detailed-b"
          style={{height:'calc(100vh - 200px)', overflowY:'auto', scrollBehavior:'smooth'}}
          onScrollCapture={(e)=>{
            let numberSecction = 0;
            if(divRef.current &&  divRef.current?.scrollTop > 450){
              numberSecction= 1;
            }
            if(divRef.current &&  divRef.current?.scrollTop > 500){
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
            setOpenSecction(numberSecction);
          }}
          ref={divRef}
        >
          <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }} className="carouse-detail">
            <Carousel className="detail-carousel" ref={carouselRef}>
              <div key={1} className="detailed-c" onClick={()=>{setOpenImage(true)}}>
                <img width="100%" height="100%" src={'detailed/capital.png'} alt="" />
              </div>
              <div key={2} className="detailed-c" onClick={()=>{setOpenImage(true)}}>
                <img width="100%" height="100%" src={'detailed/restoration.png'} alt="" />
              </div>
            </Carousel>
            <div style={{position:'absolute', right: '15px', top: '180px'}}>
              <img src="/picture/map-denver.png" alt="" height="70px" />
            </div>
            <div style={{position:'absolute', left: '15px', top: '118px'}}>
              <LeftOutlined className="button-next" onClick={()=>{carouselRef.current.prev()}}/>
            </div>
            <div style={{position:'absolute', right: '15px', top: '118px'}}>
              <RightOutlined className="button-next" onClick={()=>{carouselRef.current.next() }}/>
            </div>
            <div className="detailed-info">
              <DetailInformationProject />
              <ComponentSolucions />
              <Roadmap />
              <Financials />
              <Management />
              <Map />
              <Documents />
              <History />
            </div>
          </Col>
          <Col span={7} className="mobile-display">
            <TeamCollaborator />
          </Col>
        </Row>
      </div>
    </Modal>
    </>
    
  )
}

export default DetailModal;