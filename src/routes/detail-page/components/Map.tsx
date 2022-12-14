import React from "react";
import { Button, Carousel, Col, Modal, Progress, Row, Table, Tooltip } from "antd";
import TeamCollaborator from "../../../Components/Shared/Modals/TeamCollaborator";
import { DATA_FINANCIALS, DATA_SOLUTIONS } from "../constants";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";

const Map = () => {
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }}  style={{display:'flex', alignItems:'center'}}>
          <h3 style={{marginBottom:'15px', marginTop:'20px', marginRight:'35px'}} id="maps">MAP</h3>
          <div className="line-01" style={{marginBottom:'15px', marginTop:'20px'}}></div>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 24 }} className="table-financials-modal">
          <img src="/picture/map.png" width='100%'/>
        </Col>
      </Row>
    </>
  )
}

export default Map;