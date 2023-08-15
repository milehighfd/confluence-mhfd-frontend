import React, { useState } from 'react';
import { Col, Collapse, InputNumber, Row, Timeline } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { priceFormatter, priceParser, formatter } from 'Components/Work/Request/RequestViewUtil';
import { UseDebouncedEffect } from "routes/Utils/useDebouncedEffect";

const { Panel } = Collapse;

const RequestCostRows = () => {
  const {
    sumByCounty,
    tabKey,
    diff,
    reqManager,
    board,
    showFilters: isFiltered,
    sumTotal,
    year,
  } = useRequestState();
  const { setReqManager, updateTargetCost } = useRequestDispatch();
  const [ targetCosts, setTargetCosts ] = useState([]);
  const [openCollaps, setOpenCollaps] = useState(false);

  UseDebouncedEffect(() => {
    if (targetCosts.length > 0) {
      const formattedTargetCosts = {
        targetcost1: targetCosts[0],
        targetcost2: targetCosts[1],
        targetcost3: targetCosts[2],
        targetcost4: targetCosts[3],
        targetcost5: targetCosts[4]
      }
      updateTargetCost(formattedTargetCosts);
    }
  }, [targetCosts], 1000);

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const handleCollapseChange = (key: string | string[]) => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  return (
    <div className="cost-wr">
      <Collapse
        collapsible="header"
        onChange={handleCollapseChange}
        className='cost-collapse'
      >
        <Panel
          className='cost-panel'
          header={
            <div className='cost-header'>
              <span>Total Cost</span>
              <div style={{flex:1}}></div>
              <img
                  className={isCollapseOpen ? "rotate-img" : ""}
                  src="Icons/ic_accordion-close.svg"
                  alt=""
                />
            </div>
          }
          key="1"
        >
          <div className="cost-body">
            <div className='body-1'>
              <Row>
                <Col span={4} ></Col>
                {
                  [0,1,2,3,4].map(y => (
                    <Col span={4} key={y}>{year+y}</Col>
                  ))
                }
              </Row>
            </div>
            <div className='body-2'>
              <Row>
                <Col span={4} className='body-2-col'><span> Total Cost</span></Col>
                {
                  Object.keys(sumTotal).map((key) => (
                    <Col span={4} key={key}>{sumTotal[key] ? formatter.format(Math.floor(sumTotal[key])) : '$0'}</Col>
                  ))
                }
              </Row>
            </div>
            <div className='body-3'>
              <Row className='cost-row'>
                <Col span={4} >
                  <Timeline>
                    {
                      sumByCounty.map((countySum: any) => (
                        <Timeline.Item key={countySum.locality} style={{ opacity: isFiltered ? 0.5 : 1 }}>
                          {countySum.locality}
                        </Timeline.Item>
                      ))
                    }
                  </Timeline>
                </Col>
                <Col span={4} className='row-col-3' style={{paddingLeft:'14px'}}>
                  {
                    sumByCounty.map((countySum: any) => (
                      <div className='row-col-1' key={countySum.locality}>
                        {countySum.req1 ? formatter.format(Math.floor(countySum.req1)) : `$0`}
                      </div>
                    ))
                  }
                </Col>
                <Col span={4} className='row-col-3' style={{paddingLeft:'11px'}}>
                  {
                    sumByCounty.map((countySum: any) => (
                      <div className='row-col-1' key={countySum.locality}>
                        {countySum.req2 ? formatter.format(Math.floor(countySum.req2)) : `$0`}
                      </div>
                    ))
                  }
                </Col>
                <Col span={4} className='row-col-3' style={{paddingLeft:'8px'}}>
                 {
                    sumByCounty.map((countySum: any) => (
                      <div className='row-col-1' key={countySum.locality}>
                        {countySum.req3 ? formatter.format(Math.floor(countySum.req3)) : `$0`}
                      </div>
                    ))
                  }
                </Col>
                <Col span={4} className='row-col-3' style={{paddingLeft:'6px'}}>
                 {
                    sumByCounty.map((countySum: any) => (
                      <div className='row-col-1' key={countySum.locality}>
                        {countySum.req4 ? formatter.format(Math.floor(countySum.req4)) : `$0`}
                      </div>
                    ))
                  }
                </Col>
                <Col span={4} className='row-col-3' style={{paddingLeft:'4px'}}>
                  {
                    sumByCounty.map((countySum: any) => (
                      <div className='row-col-1' key={countySum.locality}>
                        {countySum.req5 ? formatter.format(Math.floor(countySum.req5)) : `$0`}
                      </div>
                    ))
                  }
                </Col>
              </Row>
            </div>
            <div className='body-4'>
              <Row>
                <Col span={4} style={{paddingLeft:'8px'}}>Budget</Col>
                {
                  reqManager.map((val: any, index: number) => (
                    <Col span={4} className='row-col-4' key={index}>
                      <InputNumber placeholder="Enter target cost"
                        style={{ opacity: isFiltered ? 0.5 : 1 }}
                        readOnly={isFiltered}
                        formatter={priceFormatter}
                        parser={priceParser}
                        value={val}
                        onChange={(e: any) => {
                          let v = e;
                          let nv = reqManager.map((vl: any, i: number) => {
                            if (i === index) {
                              return v;
                            }
                            return vl;
                          })
                          setReqManager(nv);
                          setTargetCosts(nv);
                        }} />
                    </Col>
                  ))
                }
              </Row>
            </div>
            <div className='body-5'>
              <Row>
                <Col span={4} style={{paddingLeft:'8px'}}>Differential</Col>
                {
                  diff.map((d: any, i: number) => (
                    <Col key={i} span={4} style={{ opacity: isFiltered ? 0.5 : 1 }} className="row-col-5">
                      {d ? formatter.format(Math.floor(d)) : '$0'}
                    </Col>
                  ))
                }
              </Row>
            </div>
          </div>
        </Panel>
      </Collapse>
      {openCollaps && tabKey !== 'Maintenance' && <>
        <div className="col-bg">
          <div><h5>Target Cost</h5></div>
          {
            reqManager.map((val: any, index: number) => (
              <div key={index}>
                <InputNumber placeholder="Enter target cost"
                  style={{ opacity: isFiltered ? 0.5 : 1 }}
                  readOnly={isFiltered}
                  formatter={priceFormatter}
                  parser={priceParser}
                  value={val}
                  onChange={(e: any) => {
                    let v = e;
                    let nv = reqManager.map((vl: any, i: number) => {
                      if (i === index) {
                        return v;
                      }
                      return vl;
                    })
                    setReqManager(nv);
                    setTargetCosts(nv);
                  }} />
              </div>
            ))
          }
        </div>
        <div className="col-bg">
          <div><h5>Contingency</h5></div>
          {
            diff.map((d: any, i: number) => (
              <div key={i} style={{ opacity: isFiltered ? 0.5 : 1 }} className="differential">
                {d ? formatter.format(Math.floor(d)) : ''}
              </div>
            ))
          }
        </div>
        <div style={{ height: '5px' }}></div>
        <div id="openCost"></div>
      </>}
    </div>
  )
};

export default RequestCostRows;
