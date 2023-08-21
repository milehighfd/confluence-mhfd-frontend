import React, { useState } from 'react';
import { Col, Collapse, InputNumber, Row, Timeline } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { priceFormatter, priceParser, formatter } from 'Components/Work/Request/RequestViewUtil';
import { UseDebouncedEffect } from 'routes/Utils/useDebouncedEffect';
import { MAINTENANCE, WORK_SPACE, WORK_REQUEST } from 'constants/constants';
import { useMapState } from 'hook/mapHook';

const { Panel } = Collapse;

const RequestCostRows = () => {
  const {
    sumByCounty,
    sumByLocalGov,
    tabKey,
    diff,
    reqManager,
    board,
    showFilters: isFiltered,
    sumTotal,
    year,
    columns2,
  } = useRequestState();
  const { tabActiveNavbar } = useMapState();

  const { setReqManager, updateTargetCost } = useRequestDispatch();
  const [targetCosts, setTargetCosts] = useState([]);
  const [openCollaps, setOpenCollaps] = useState(false);
  const sumBy = tabActiveNavbar === WORK_REQUEST ? sumByCounty : sumByLocalGov;
  UseDebouncedEffect(
    () => {
      if (targetCosts.length > 0) {
        const formattedTargetCosts = {
          targetcost1: targetCosts[0],
          targetcost2: targetCosts[1],
          targetcost3: targetCosts[2],
          targetcost4: targetCosts[3],
          targetcost5: targetCosts[4],
        };
        updateTargetCost(formattedTargetCosts);
      }
    },
    [targetCosts],
    1000,
  );

  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const handleCollapseChange = (key: string | string[]) => {
    setIsCollapseOpen(!isCollapseOpen);
  };
  return (
    <div className="cost-wr">
      <Collapse collapsible="header" onChange={handleCollapseChange} className="cost-collapse">
        <Panel
          className="cost-panel"
          header={
            <div className="cost-header">
              <span>Total Cost</span>
              <div style={{ flex: 1 }}></div>
              <img className={isCollapseOpen ? 'rotate-img' : ''} src="Icons/ic_accordion-close.svg" alt="" />
            </div>
          }
          key="1"
        >
          <div className="cost-body">
            <div className="body-1">
              <Row>
                <Col span={4}></Col>
                {tabKey !== MAINTENANCE
                  ? [0, 1, 2, 3, 4].map(y => <Col span={4} key={y}>{`${parseInt(year) + y}`}</Col>)
                  : columns2.map(
                      (y: any, index: any) =>
                        y.title !== WORK_SPACE && (
                          <Col span={4} key={index}>
                            {y.title}
                          </Col>
                        ),
                    )}
              </Row>
            </div>
            <div className="body-2">
              <Row>
                <Col span={4} className="body-2-col">
                  <span> Total Cost</span>
                </Col>
                {Object.keys(sumTotal).map(key => (
                  <Col span={4} key={key}>
                    {sumTotal[key] ? formatter.format(Math.floor(sumTotal[key])) : '$0'}
                  </Col>
                ))}
              </Row>
            </div>
            <div className="body-3">
              <Row>
                <Timeline>
                  {sumBy.map((countySum: any) => (
                    <Timeline.Item key={countySum.locality} style={{ opacity: isFiltered ? 0.5 : 1 }}>
                      <Row className="cost-row">
                        <Col>{countySum.locality}</Col>
                        <Col span={4} className="row-col-3">
                            <div className="row-col-1" key={countySum.locality}>
                              {countySum.req1 ? formatter.format(Math.floor(countySum.req1)) : `$0`}
                            </div>
                        </Col>
                        <Col span={4} className="row-col-3">
                            <div className="row-col-1" key={countySum.locality}>
                              {countySum.req2 ? formatter.format(Math.floor(countySum.req2)) : `$0`}
                            </div>
                        </Col>
                        <Col span={4} className="row-col-3">
                            <div className="row-col-1" key={countySum.locality}>
                              {countySum.req3 ? formatter.format(Math.floor(countySum.req3)) : `$0`}
                            </div>
                        </Col>
                        <Col span={4} className="row-col-3">
                            <div className="row-col-1" key={countySum.locality}>
                              {countySum.req4 ? formatter.format(Math.floor(countySum.req4)) : `$0`}
                            </div>
                        </Col>
                        <Col span={4} className="row-col-3">
                            <div className="row-col-1" key={countySum.locality}>
                              {countySum.req5 ? formatter.format(Math.floor(countySum.req5)) : `$0`}
                            </div>
                        </Col>
                      </Row>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Row>
            </div>
            <div className="body-4">
              <Row>
                <Col span={4}>
                  Budget
                </Col>
                {reqManager.map((val: any, index: number) => (
                  <Col span={4} className="row-col-4" key={index}>
                    <InputNumber
                      placeholder="Enter target cost"
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
                        });
                        setReqManager(nv);
                        setTargetCosts(nv);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </div>
            <div className="body-5">
              <Row>
                <Col span={4}>
                  Differential
                </Col>
                {diff.map((d: any, i: number) => (
                  <Col key={i} span={4} style={{ opacity: isFiltered ? 0.5 : 1 }} className="row-col-5">
                    {d ? formatter.format(Math.floor(d)) : '$0'}
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Panel>
      </Collapse>
      {openCollaps && tabKey !== MAINTENANCE && (
        <>
          <div className="col-bg">
            <div>
              <h5>Target Cost</h5>
            </div>
            {reqManager.map((val: any, index: number) => (
              <div key={index}>
                <InputNumber
                  placeholder="Enter target cost"
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
                    });
                    setReqManager(nv);
                    setTargetCosts(nv);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="col-bg">
            <div>
              <h5>Contingency</h5>
            </div>
            {diff.map((d: any, i: number) => (
              <div key={i} style={{ opacity: isFiltered ? 0.5 : 1 }} className="differential">
                {d ? formatter.format(Math.floor(d)) : ''}
              </div>
            ))}
          </div>
          <div style={{ height: '5px' }}></div>
          <div id="openCost"></div>
        </>
      )}
    </div>
  );
};

export default RequestCostRows;
