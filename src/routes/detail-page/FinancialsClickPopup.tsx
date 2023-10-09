import { Button, Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const FinancialsClickPopup = ({
  popupData,
  type,
  setVisible,
}: {
  popupData: any;
  type: string;
  setVisible: any;
}) => {
  const { records, date, value, color } = popupData;
  let adjustPositionTop = 50;
  let positionTop: any = document.getElementById('sidebar-graphics')?.offsetTop;
  let positionLeft: any = document.getElementById('sidebar-graphics')?.offsetLeft;
  let divWidth: any = document.getElementById('sidebar-graphics')?.offsetWidth;
  let thisPopup = useRef<any>(null);
  const [popupWidth, setPopupWidth] = useState(0);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const [finalLeftPosition, setFinalLeftPosition] = useState(positionLeft + divWidth - 2000);
  const subtitleOptions: any = {
    availableFund: 'Available Funds',
    mhfdIncomeSum: 'Funding (MHFD Funds)',
    expenditureSum: 'Vendor Agreements',
    otherIncomeSum: 'Income (LG Funds)',
  };

  const formatDate = (inputDate: string) => {
    const parts = inputDate.split('-');
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[parseInt(parts[0]) - 1];
    const day = parseInt(parts[1]);
    const year = '20' + parts[2];
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  };

  useEffect(() => {
    setPopupWidth(thisPopup.current.offsetWidth);
  }, []);
  useEffect(() => {
    setFinalLeftPosition(positionLeft + divWidth - popupWidth);
  }, [popupWidth]);

  useEffect(() => {
    records.forEach((item: any, index: number) => {
      const chartId = document.getElementById(`HorizontalBar-chart-${index}`);
      removeAllChildNodes(chartId);
      buildHorizontalBar([item], `#HorizontalBar-chart-${index}`);
    });
  }, [records]);

  const removeAllChildNodes = (parent: any) => {
    if (parent !== null && parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  
  const buildHorizontalBar = (dataForBar: any, id: string) => {
    var svg = d3
      .select(id)
      .attr('width', '100%')
      .attr('height', 30)
      .append('g')
      .attr('transform', 'translate(' + -10 + ',' + -3 + ')');

    var scale = d3
      .scaleLinear()
      .domain([0, value])
      .range([0, 240]);

    svg
      .selectAll(null)
      .data(dataForBar)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', function(d, i) {
        return 10 + i * 20;
      })
      .attr('height', 20)
      .attr('width', d => {
        const scaleInside = scale(scale.domain()[1]);
        return scaleInside ? scaleInside : 0;
      })
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', color)
      .attr('opacity', 0.6);

    svg
      .selectAll(null)
      .data(dataForBar)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', function(d, i) {
        return 10 + i * 20;
      })
      .attr('height', 20)
      .attr('width', (d: any) => {
        const costData = scale(d.encumbered.cost);
        return costData ? costData : 0;
      })
      .attr('rx', 5)
      .attr('ry', 5)
      .style('fill', color);

    svg
      .selectAll(null)
      .data(dataForBar)
      .enter()
      .append('text')
      .attr('class', 'text-value')
      .attr('text-anchor', 'middle')
      .attr('x', 45)
      .attr('y', function(d, i) {
        return 25 + i * 20;
      })
      .text((d: any) => {
        return formatter.format(d.encumbered.cost);
      })
      .attr('fill', '#fff')
      // .attr('font-size','12px');
  };

  return (
    <div
    className="modal-financialsClickPopupOuter"
      id="popup-financials"
      style={{ left: finalLeftPosition, top: (positionTop+adjustPositionTop) }}
      ref={thisPopup}
    >
     <Row style={{ height: '18px' }}>
        <Col style={{ width: '78%' }}>
          <p className="title">{formatDate(date)}</p>
        </Col>
      </Row>
      <div style={{ width: '5%', position:'absolute',right: '38px', marginTop: '-28px' }}>
          <Button className="btn-transparent" onClick={() => setVisible(false)}>
            <img src="/Icons/icon-62gray.svg" alt="" height="15px" />
          </Button>
        </div>
        <div className="modal-financialsClickPopupInner">
      <Row>
        <p className="labels-financials" style={{paddingTop: '0px'}}>{`Total ${subtitleOptions[type]}: ${formatter.format(value)}`}</p>
      </Row>
      {records.map((item: any, index: number) => {
        return (
          <>
            <div className="line-financials"></div>
            <div className="labels-financials">
              {`Agreement: ${item?.agreement_number ? item?.agreement_number : '-'}`}{' '}
            </div>
            <div className="labels-financials">
              {`Amendment: ${item?.amendment_number ? item?.amendment_number : '-'}`}{' '}
            </div>
            <svg id={`HorizontalBar-chart-${index}`}></svg>
            <div className="labels-financials">
              {`Partner: ${item?.project_partner_name ? item?.project_partner_name : '-'}`}{' '}
            </div>
            <div className="labels-financials">
              {`Phase: ${item?.code_phase_type_id ? item?.code_phase_type_id : '-'}`}{' '}
            </div>
            <div className="labels-financials">
              {`Projected: ${item?.projected?.cost ? formatter.format(item?.projected?.cost) : '-' }`} 
            </div>
            <div className="labels-financials">
              {`Encumbered: ${item?.encumbered?.cost ? formatter.format(item?.encumbered?.cost) : '-'}`}{' '}
            </div>
            <div className="labels-financials">{`Tyler Encumbered: ${
              item?.tyler_encumbered?.cost ? formatter.format(item?.tyler_encumbered?.cost) : '-'
            }`}</div>
          </>
        );
      })}
              </div>
    </div>
  );
};

export default FinancialsClickPopup;
