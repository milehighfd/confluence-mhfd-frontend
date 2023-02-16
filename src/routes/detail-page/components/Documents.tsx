import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";

const Documents = () => {
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} style={{display:'flex', alignItems:'center'}} className='subtitle-detail'>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="attachments">ATTACHMENTS</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row style={{marginBottom:'40px'}}>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <span style={{color:'#11093C', marginRight:'10px'}}><FileOutlined style={{opacity:'0.35'}}/> Little Dry Creek_report.pdf</span>
          <span style={{color:'#11093C', marginRight:'10px'}}><FileOutlined style={{opacity:'0.35'}} /> Little Dry Creek_report.pdf</span>
          {/* <Button className="btn-purple"><PlusOutlined /> Add Documents</Button> */}
        </Col>
      </Row>
    </>
  )
}

export default Documents;