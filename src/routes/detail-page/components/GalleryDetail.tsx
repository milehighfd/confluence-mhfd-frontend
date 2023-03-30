import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";

const GalleryDetail = () => {
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="gallery">GALLERY</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'40px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal" style={{display:'flex', justifyContent: 'space-between'}}>
          <div style={{background: '#f5f7ff', height: '38vh', borderRadius: '10px', width: '49%'}}>

          </div>
          <div style={{width:'49%', height: '38vh'}}>
            <div style={{display:'flex', justifyContent: 'space-between', marginBottom: '2vh'}}>
              <div style={{background: '#f5f7ff', height: '18vh', borderRadius: '10px', width: '48%'}}></div>
              <div style={{background: '#f5f7ff', height: '18vh', borderRadius: '10px', width: '48%'}}></div>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
              <div style={{background: '#f5f7ff', height: '18vh', borderRadius: '10px', width: '48%'}}></div>
              <div style={{background: '#f5f7ff', height: '18vh', borderRadius: '10px', width: '48%'}}></div>
            </div>
          </div>
          {/* <Button className="btn-purple"><PlusOutlined /> Add Documents</Button> */}
          {/* <br/>
          <div className="grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> */}
        </Col>
      </Row>
    </>
  )
}

export default GalleryDetail;