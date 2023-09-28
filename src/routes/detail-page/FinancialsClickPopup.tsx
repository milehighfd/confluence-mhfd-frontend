import { Button, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import HorizontalStackedBarChart from './components/HorizontalStackedBarChart';

const FinancialsClickPopup = ({ popupData, setVisible }: { popupData: any, setVisible:any }) => {
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

  const formatDate = (inputDate: string) => {
    const parts = inputDate.split('-');
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[parseInt(parts[0]) - 1];
    const day = parseInt(parts[1]);
    const year = '20' + parts[2];
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }

  useEffect(() => {
    setPopupWidth(thisPopup.current.offsetWidth);
  }, []);
  useEffect(() => {
    setFinalLeftPosition(positionLeft + divWidth - popupWidth);
  }, [popupWidth]);
  const sampleData = [
    { label: 'Test 0 which should not render', value: 0 },
    { label: 'Group-1', value: 55 },
    { label: 'Group-2', value: 233 },
    { label: 'Test 0 AGAIN which should not render', value: 0 },
    { label: 'Group-3', value: 89 }
  ]
  return (
    <div
      className="modal-financialsClickPopup"
      id="popup-financials"
      style={{ left: finalLeftPosition, top: positionTop }}
      ref={thisPopup}
    >
        <Row style={{height:'18px'}}>
            <Col style={{width: '78%'}}>
                <p className="title">{formatDate(popupData.group)}</p>
            </Col>
            <Col
            xs={{ span: 4 }}
            lg={{ span: 4 }}
            style={{textAlign: 'end', width: '5%', paddingLeft: '30px'}}
            >
            <Button
                className="btn-transparent"
                onClick={() => setVisible(false)}>
                <img src="/Icons/icon-62gray.svg" alt="" height="15px" />
            </Button>
            </Col>
        </Row>
      <Row>
      <p className="labels-financials">{`Total Income (LG Funds): ${formatter.format(popupData.availableFund)}`}</p>
      </Row>

      
      <div className="line-financials"></div>
      <div className='labels-financials'>Agreement: </div>
      <div className='labels-financials'>Amendment: </div>
      {/* <HorizontalStackedBarChart bind={'.chart'} data={sampleData} config={''}/> */}
      <div className='labels-financials'>Partner: </div>
      <div className='labels-financials'>Phase: </div>
      <div className='labels-financials'>Projected: </div>
      <div className='labels-financials'>Encumbered: </div>
      <div className='labels-financials'>Tyler Encumbered: </div>
      
    </div>
  );
};

export default FinancialsClickPopup;
