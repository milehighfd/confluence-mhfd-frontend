import React, { useState, useEffect } from 'react';
import { Drawer, Select, Popover, InputNumber, Button, Col, Row } from 'antd';
import HorizontalBarChartAnalytics from 'Components/FiltersProject/NewProblemsFilter/HorizontalBarChartAnalytics';
import { formatter, MaintenanceTypes, priceFormatter, priceParser } from 'Components/Work/Request/RequestViewUtil';
import { CHART_CONSTANTS } from 'Components/FiltersProject/NewProblemsFilter/Charts.constants';
import { boardType } from 'Components/Work/Request/RequestTypes';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { WINDOW_WIDTH } from 'constants/constants';

const { Option } = Select;

const Analytics = ({
  type
}: {
  type: boardType
}) => {
  const {
    sumByCounty: data,
    year: initialYear,
    tabKey,
    namespaceId: boardId,
    showAnalytics: visible,
    sumTotal: totals,
    totalCountyBudget,
  } = useRequestState();
  const { setShowAnalytics } = useRequestDispatch();
  const [totalSum, setTotalSum] = useState(0);
  const [tcb, setTcb] = useState(totalCountyBudget);
  const [year, setYear] = useState(tabKey === 'Maintenance' ? 2000 : +initialYear);
  const getLabel = () => {
    if (tabKey === 'Capital' || tabKey === 'Maintenance') {
      return "County"
    } else {
      return "Service Area"
    }
  }
  const clickUpdate = () => {
    datasets.putData(SERVER.UPDATE_BUDGET(boardId), {
      budget: tcb
    }).then((data) => {
      console.log(data);
    })
      .catch((e) => {
        console.log(e);
      });
  };
  const contentCounty = (
    <div className="popver-info">
      This graphic indicates the number of requests within each Jurisdiction {type === 'WORK_REQUEST' ? `broken out by ${getLabel()}` : ''}.
    </div>
  );
  const contentDollars = (
    <div className="popver-info">
      This graphic indicates the dollar amount of requests within each Jurisdiction {type === 'WORK_REQUEST' ? `broken out by ${getLabel()}` : ''}.
    </div>
  );

  useEffect(() => {
    setTcb(totalCountyBudget);
  }, [totalCountyBudget]);

  useEffect(() => {
    let sum = 0;
    for (let i = 1; i <= 5; i++) {
      sum += totals[`req${i}`];
    }
    setTotalSum(sum);
  }, [totals]);

  useEffect(() => {
    setYear(tabKey === 'Maintenance' ? 2000 : +initialYear);
  }, [initialYear, tabKey]);

  const years: any[] = [];
  for (var i = 0; i < 5; i++) {
    years.push(+initialYear + i);
  }
  let maxiQ = 0;
  let quantityData;
  let maxiA = 0;
  let amountData;
  let countiesNames = data.map((d: any) => d.locality).join(',');
  let barsColor = '#261964';
  let groupingType = null;
  if (type === 'WORK_REQUEST') {
    groupingType = 'Local Government'
  } else {
    groupingType = ['Study'].includes(tabKey) ? 'Service Area': 'County';
  }
  // 2000 is default value for all subtypes in maintenance
  if (year === 2000) {
    quantityData = data.map((d: any) => {
      let totalCounter = 0;
      for (let i = 0; i < years.length; ++i) {
        const currYear = +years[i];
        let counter = d[`cnt${currYear - initialYear + 1}`] || 0;
        if (counter !== 0) counter = +counter;
        totalCounter += counter;
        maxiQ = Math.max(maxiQ, counter);
      }
      return {
        value: d.locality,
        counter: totalCounter,
        selected: true
      }
    });
    amountData = data.map((d: any) => {
      let totalCounter = 0;
      for (let i = 0; i < years.length; ++i) {
        const currYear = +years[i];
        let amount = d[`req${currYear - initialYear + 1}`] || 0;
        if (amount !== 0) amount = +amount;
        totalCounter += amount;
        maxiA = Math.max(maxiA, amount);
      }
      return {
        value: d.locality,
        counter: totalCounter,
        selected: true
      }
    });
  } else {
    const cntColumnName = `cnt${year - initialYear + 1}`;
    const reqColumnName = `req${year - initialYear + 1}`;
    quantityData = data.map((d: any) => {
      maxiQ = Math.max(maxiQ, d[cntColumnName] || 0);
      return {
        value: d.locality,
        counter: d[cntColumnName] || 0,
        selected: true
      }
    });
    amountData = data.map((d: any) => {
      maxiA = Math.max(maxiA, d[reqColumnName] || 0);
      return {
        value: d.locality,
        counter: d[reqColumnName] || 0,
        selected: true
      }
    })
  }
  return (
    <Drawer
      title={
        <h5>
          <img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> Analytics
          {tabKey !== 'Maintenance' &&
          <Select
            dropdownClassName='dropdown-menu'
            style={{ marginLeft: '11px' }}
            listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
            defaultValue={year}
            value={year}
            onChange={setYear}>
            {
              years.map((y, i) => (
                <Option key={i} value={y}>{
                  tabKey !== 'Maintenance' ? y : MaintenanceTypes[i]
                }</Option>
              ))
            }
          </Select>}
        </h5>
      }
      placement="right"
      closable={true}
      onClose={() => setShowAnalytics(false)}
      visible={visible}
      className="work-utilities"
      mask={false}
    >
      {type === 'WORK_PLAN' && tabKey === 'Maintenance' &&
        <div>
          <h6>Total County Budget</h6>
          <InputNumber className="rheostat-input" size='large' min={0}
            formatter={priceFormatter}
            parser={priceParser}
            value={tcb} onChange={(e: any) => {
              setTcb(e);
            }}
          />
          <Row style={{ marginTop: '10px' }}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <h6 style={{ marginBottom: '0px' }}>Requests</h6>
              <label style={{ fontSize: '16px' }}>{priceFormatter(totalSum)}</label>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <h6 style={{ marginBottom: '0px' }}>Contingency</h6>
              <label style={{
                color: tcb - totalSum < 0 ? 'red' : 'black', fontSize: '16px'
              }}>{priceFormatter(tcb - totalSum)}</label>
            </Col>
          </Row>
          <div style={{ textAlign: 'end' }}>
            <Button
              className="btn-purple"
              style={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={clickUpdate}
            >
              Save Total County Budget
            </Button>
          </div>
        </div>
      }
      <div className="line-01" style={{ marginLeft: '0px'}}></div>
      {tabKey === 'Maintenance' &&
        <Select
          dropdownClassName='dropdown-menu'
          style={{ marginLeft: '-9px'}}
          listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
          defaultValue={year}
          value={year}
          onChange={setYear}>
          {
            <Option key={2000} value={2000}> All Subtypes</Option>
          }
          {
            years.map((y, i) => (
              <Option key={i} value={y}>{MaintenanceTypes[i]}</Option>
            ))
          }
        </Select>
      }
      <h6 style={{ marginTop: '10px' }}>Requests by {groupingType} <Popover content={contentCounty} placement="top" > <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></h6>
      <div className="graph" >
        {maxiQ > 0 &&
          <HorizontalBarChartAnalytics
            data={quantityData}
            selected={countiesNames}
            onSelect={() => { }}
            defaultValue={[]}
            color={barsColor}
            axisLabel={''}
            scrollClass={'svg-scroll-analytics'}
            showControls={false}
            withClickEvent={false}
            withAnimation={false}
            spaceBetween={40}
            minHeight={40}
            width={220}
            opacityOpaque={CHART_CONSTANTS.opacityFull}
            labelOverflowRight={true}
            minBarSize={0}
          />
        }
      </div>
      <h6 className="graph-title">Dollars Requested by {groupingType} <Popover content={contentDollars} placement="topRight" arrowPointAtCenter> <img src="/Icons/icon-19.svg" alt="" height="10px" /> </Popover></h6>
      <div className="graph" >
        {maxiA > 0 &&
          <HorizontalBarChartAnalytics
            data={amountData}
            selected={countiesNames}
            onSelect={() => { }}
            defaultValue={[]}
            color={barsColor}
            axisLabel={''}
            scrollClass={'svg-scroll-analytics'}
            showControls={false}
            withClickEvent={false}
            withAnimation={false}
            spaceBetween={40}
            minHeight={40}
            width={220}
            barLabelFormatter={(d: any) => {
              return formatter.format(d.counter)
            }}
            opacityOpaque={CHART_CONSTANTS.opacityFull}
            labelOverflowRight={true}
            minBarSize={0}
          />
        }
      </div>
    </Drawer>
  )
}

export default Analytics;
