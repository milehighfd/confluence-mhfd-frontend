import React, { useState } from 'react';
import { Collapse, InputNumber, Timeline } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import TotalHeader from 'Components/Work/Request/TotalHeader';
import CostTableBody from 'Components/Work/Request/CostTableBody';
import { useLocation } from 'react-router-dom';
import { compareArrays, priceFormatter, priceParser, formatter } from 'Components/Work/Request/RequestViewUtil';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import { UseDebouncedEffect } from "routes/Utils/useDebouncedEffect";

const { Panel } = Collapse;

const RequestCostRows = () => {
  const location = useLocation();
  const type = location.pathname === '/work-request' ? 'WORK_REQUEST' : 'WORK_PLAN';
  const {
    sumByCounty,
    tabKey,
    diff,
    jurisdictionSelected,
    csaSelected,
    jurisdictionFilterList,
    csaFilterList,
    reqManager,
    board
  } = useRequestState();
  const { setReqManager, updateTargetCost } = useRequestDispatch();
  const [ targetCosts, setTargetCosts ] = useState([]);
  const [openCollaps, setOpenCollaps] = useState(false);
  let notIsFiltered = compareArrays(jurisdictionSelected, jurisdictionFilterList) && compareArrays(csaSelected, csaFilterList);
  const Icon = openCollaps ? UpSquareOutlined : DownSquareOutlined;
  UseDebouncedEffect(() => {
    if (targetCosts.length > 0) {
      const formattedTargetCosts = {
        targetcost1: targetCosts[0],
        targetcost2: targetCosts[1],
        targetcost3: targetCosts[2],
        targetcost4: targetCosts[3],
        targetcost5: targetCosts[4]
      }
      updateTargetCost(board.board_id, formattedTargetCosts);
    }
  }, [targetCosts], 1000);
  return (
    <div className="cost-wr">
      <Collapse
        collapsible="header"
      >
        <Panel
          collapsible={sumByCounty.length === 0 ? 'disabled' : 'header'}
          header={
            tabKey !== 'Maintenance' &&
            <a
              href="#openCost"
              style={{ padding: '10px 0px' }}
              onClick={() => setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)}
            >
              <Icon
                style={{ height: '16px', width: '16px', color: '#251863' }}
                onClick={() => setOpenCollaps(sumByCounty.length === 0 ? openCollaps : !openCollaps)}
              />
            </a>
          }
          key="1"
          style={{ backgroundColor: '#F5F7FF' }}
          extra={<TotalHeader/>}
        >
          <div className="tab-body-project streams" style={{ backgroundColor: '#f9faff' }}>
            <Timeline>
              {
                tabKey !== 'Maintenance' && sumByCounty.map((countySum: any) => (
                  <Timeline.Item color="purple" key={Math.random()}>
                    <CostTableBody type={type} countySum={countySum} isFiltered={!notIsFiltered} tabKey={tabKey} />
                  </Timeline.Item>
                ))
              }
            </Timeline>
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
                  style={{ opacity: !notIsFiltered ? 0.5 : 1 }}
                  readOnly={!notIsFiltered}
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
              <div key={i} style={{ opacity: !notIsFiltered ? 0.5 : 1 }} className="differential">
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
