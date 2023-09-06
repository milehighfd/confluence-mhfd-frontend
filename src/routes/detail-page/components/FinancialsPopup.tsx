import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";

const FinancialsPopup = ({popupData}:{popupData:any}) => {
    let positionTop: any = document.getElementById('stackedBar-chart-container')?.offsetTop
    let positionLeft: any = document.getElementById('stackedBar-chart-container')?.offsetLeft
    let divWidth: any = document.getElementById('stackedBar-chart-container')?.offsetWidth
    let popupWidth: any = document.getElementById('popup-financials')?.offsetWidth
    let finalLeftPosition: any = positionLeft + divWidth - popupWidth; 
  return(
    <div className='modal-financialsPopup' id='popup-financials' style={{left:finalLeftPosition, top:positionTop}}>
      <p className="title">Work Request</p>
      <Row>
        <Col>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
          <span className='labels-financials'>Funding</span>
        </span>
        </Col>
        <Col>
        <span>1000</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
          <span className='labels-financials'>Income</span>
        </span>
        </Col>
        <Col>
        <span>1000</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span className="span-dots-roadmap">
          <div className="roadmap-circle" style={{ backgroundColor: '#29C499' }} />
          <span className='labels-financials'>Agreement</span>
        </span>
        </Col>
        <Col>
        <span>1000</span>
        </Col>
      </Row>
    </div>
  )
}

export default FinancialsPopup;