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
          <div className="grid">
            {/* //Example Use grid  */}
            {/* <div><img src="/picture/img-1.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-2.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-3.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-4.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-5.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-6.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-1.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-2.png" alt="" height="100%" /></div>
            <div><img src="/picture/img-3.png" alt="" height="100%" /></div> */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> 
        </Col>
      </Row>
    </>
  )
}

export default GalleryDetail;