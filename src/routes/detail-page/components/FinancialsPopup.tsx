import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const FinancialsPopup = ({ popupData }: { popupData: any }) => {
  let positionTop: any = document.getElementById('stackedBar-chart-container')?.offsetTop;
  let positionLeft: any = document.getElementById('stackedBar-chart-container')?.offsetLeft;
  let divWidth: any = document.getElementById('stackedBar-chart-container')?.offsetWidth;
  let thisPopup = useRef<any>(null);
  const [popupWidth, setPopupWidth] = useState(0);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const [finalLeftPosition, setFinalLeftPosition] = useState(positionLeft + divWidth - 2000);
  useEffect(() => {
    setPopupWidth(thisPopup.current.offsetWidth);
  }, []);
  useEffect(() => {
    setFinalLeftPosition(positionLeft + divWidth - popupWidth);
  }, [popupWidth]);

  return (
    <div
      className="modal-financialsPopup"
      id="popup-financials"
      style={{ left: finalLeftPosition, top: positionTop }}
      ref={thisPopup}
    >
      <p className="title">{popupData.group}</p>
      <Row>
        <Col className="row-financials-popup">
          <Row>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#5D3DC7' }} />
              <span className="labels-financials">Funding</span>
            </span>
          </Row>
          <Row>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#047CD7' }} />
              <span className="labels-financials">Income</span>
            </span>
          </Row>
          <Row>
            <span className="span-dots-roadmap">
              <div className="roadmap-circle" style={{ backgroundColor: '#29C499' }} />
              <span className="labels-financials">Agreement</span>
            </span>
          </Row>
        </Col>
        <Col className="row-financials-popup" style={{ paddingLeft: '35px' }}>
          <Row>
            <span className="labels-financials-numbers">{formatter.format(popupData.funding)}</span>
          </Row>
          <Row>
            <span className="labels-financials-numbers">{formatter.format(popupData.income)}</span>
          </Row>
          <Row>
            <span className="labels-financials-numbers">{formatter.format(popupData.agreement)}</span>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FinancialsPopup;
