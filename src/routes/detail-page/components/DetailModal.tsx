import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import DetailInformationProject from "./DetailInformationProject";
import ComponentSolucions from "./ComponentSolucions";
import Roadmap from "./Roadmap";
import Financials from "./Financials";
import Management from "./Management";
import Map from "./Map";
import Documents from "./Documents";

const DetailModal = ({visible, setVisible}:{visible: boolean, setVisible: Function}) => {
  return (
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
        <Row className="detailed-b">
          <Col xs={{ span: 24 }} lg={{ span: 17 }} style={{ borderRight: '1.5px solid rgba(61, 46, 138, 0.07)' }} className="carouse-detail">
            <Carousel autoplay className="detail-carousel">
              <div key={1} className="detailed-c">
                <img width="100%" height="100%" src={'detailed/capital.png'} alt="" />
              </div>
              <div key={2} className="detailed-c">
                <img width="100%" height="100%" src={'detailed/restoration.png'} alt="" />
              </div>
            </Carousel>
            <div className="detailed-info">
              <DetailInformationProject />
              <ComponentSolucions />
              <Roadmap />
              <Financials />
              <Management />
              <Map />
              <Documents />
            </div>
          </Col>
          <Col span={7} className="mobile-display">
            <TeamCollaborator />
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default DetailModal;