import React, { useState } from 'react';
import { Col, Collapse, InputNumber, Row, Timeline } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import TotalHeader from 'Components/Work/Request/TotalHeader';
import CostTableBody from 'Components/Work/Request/CostTableBody';
import { priceFormatter, priceParser, formatter } from 'Components/Work/Request/RequestViewUtil';
import { DownSquareOutlined, UpSquareOutlined } from '@ant-design/icons';
import { UseDebouncedEffect } from "routes/Utils/useDebouncedEffect";

const { Panel } = Collapse;

const RequestCostRows = ({
  type,
}:{
  type: string,
}) => {
  const {
    sumByCounty,
    tabKey,
    diff,
    reqManager,
    board,
    showFilters: isFiltered,
  } = useRequestState();
  const { setReqManager, updateTargetCost } = useRequestDispatch();
  const [ targetCosts, setTargetCosts ] = useState([]);
  const [openCollaps, setOpenCollaps] = useState(false);
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
          header={
            <div style={{position:'absolute', width: '99%', display: 'flex', justifyContent:'space-between'}}>
              <span style={{ paddingLeft: '24px', fontSize: '18px' }}>Total Cost</span>
              <img src="Icons/ic_accordion-close.svg" alt="" style={{ paddingRight: '24px' }} />
            </div>
          }
          key={'1'}
          style={{ backgroundColor: '#F5F7FF',paddingLeft: '21px', borderRadius:'8px', width:'876px', boxShadow:'4px 4px 12px 0px rgba(0, 0, 0, 0.10)', border:'none', marginBottom:'12px' }}
          children={
            <div style={{fontSize:'12px', backgroundColor: '#F5F7FF'}}>
              <div style={{fontWeight:'bold', marginBottom:'12px', letterSpacing:' 0.171429px', paddingLeft:'38px'}}>
                <Row>
                  <Col span={4} ></Col>
                  <Col span={4} >2017</Col>
                  <Col span={4} >2018</Col>
                  <Col span={4} >2019</Col>
                  <Col span={4} >2020</Col>
                  <Col span={4} >2021</Col>
                </Row>
              </div>
              <div style={{paddingLeft:'38px'}}>
                <Row>
                  <Col span={4} style={{textAlign:'left', paddingLeft:'8px' }}><span> Total Cost</span></Col>
                  <Col span={4} >$1,000,000</Col>
                  <Col span={4} >$1,000,000</Col>
                  <Col span={4} >$1,000,000</Col>
                  <Col span={4} >$1,000,000</Col>
                  <Col span={4} >$1,000,000</Col>
                </Row>
              </div>
              <div style={{ marginTop: '23px', backgroundColor: '#F5F7FF', paddingLeft:'21px'}}>
                <Row style={{display:'flex', alignItems:'ceneter'}}>
                  <Col span={4} >
                    <Timeline className='timeline-collapse'>
                      {[
                        {                      
                          children: (<span>Boulder</span>),
                          date: '2015-09-01',
                          key: Math.random(),
                        },
                        {
                          children: (<span>Lousville</span>),
                          date: '2015-09-01',
                          key: Math.random(),
                        },
                        {
                          children: (<span>Superior</span>),
                          date: '2015-09-01',
                          key: Math.random(),
                        },
                      ].map(item => (
                        <Timeline.Item key={Math.random()}>
                          {item.children}
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Col>
                  <Col span={4} style={{paddingLeft:'14px'}}>
                    <div style={{paddingBottom:'10px'}}>$170,000</div>
                    <div style={{paddingBottom:'10px'}}>$100,000</div>
                    <div>$730,000</div>
                  </Col>
                  <Col span={4} style={{paddingLeft:'11px'}}>
                    <div style={{paddingBottom:'10px'}}>$170,000</div>
                    <div style={{paddingBottom:'10px'}}>$100,000</div>
                    <div>$730,000</div>
                  </Col>
                  <Col span={4} style={{paddingLeft:'8px'}}>
                    <div style={{paddingBottom:'10px'}}>$170,000</div>
                    <div style={{paddingBottom:'10px'}}>$100,000</div>
                    <div>$730,000</div>
                  </Col>
                  <Col span={4} style={{paddingLeft:'6px'}}>
                    <div style={{paddingBottom:'10px'}}>$170,000</div>
                    <div style={{paddingBottom:'10px'}}>$100,000</div>
                    <div>$730,000</div>
                  </Col>
                  <Col span={4} style={{paddingLeft:'4px'}}>
                    <div style={{paddingBottom:'10px'}}>$170,000</div>
                    <div style={{paddingBottom:'10px'}}>$100,000</div>
                    <div>$730,000</div>
                  </Col>
                </Row>
              </div>
              <div style={{marginTop:'15px', paddingLeft:'38px'}}>
                <Row>
                  <Col span={4} style={{paddingLeft:'8px'}}>Budget</Col>
                  <Col span={4} style={{ paddingRight: '20px' }}>
                    <InputNumber placeholder="Enter target cost"
                      readOnly={!isFiltered}
                      formatter={priceFormatter}
                      parser={priceParser}
                      value={'0'}
                    /></Col>
                  <Col span={4} style={{ paddingRight: '20px' }}><InputNumber placeholder="Enter target cost"
                    readOnly={!isFiltered}
                    formatter={priceFormatter}
                    parser={priceParser}
                    value={'0'}
                  /></Col>
                  <Col span={4} style={{ paddingRight: '20px' }}><InputNumber placeholder="Enter target cost"
                    readOnly={!isFiltered}
                    formatter={priceFormatter}
                    parser={priceParser}
                    value={'0'}
                  /></Col>
                  <Col span={4} style={{ paddingRight: '20px' }}><InputNumber placeholder="Enter target cost"
                    readOnly={!isFiltered}
                    formatter={priceFormatter}
                    parser={priceParser}
                    value={'0'}
                  /></Col>
                  <Col span={4} style={{ paddingRight: '20px' }}><InputNumber placeholder="Enter target cost"
                    readOnly={!isFiltered}
                    formatter={priceFormatter}
                    parser={priceParser}
                    value={'0'}
                  /></Col>
                </Row>
              </div>
              <div style={{marginTop:'15px', paddingLeft:'38px'}}>
                <Row>
                  <Col span={4} style={{paddingLeft:'8px'}}>Differential</Col>
                  <Col span={4} style={{color:'red'}}>$241,800</Col>
                  <Col span={4} style={{color:'red'}}>$241,800</Col>
                  <Col span={4} style={{color:'red'}}>$241,800</Col>
                  <Col span={4} style={{color:'red'}}>$241,800</Col>
                  <Col span={4} style={{color:'red'}}>$241,800</Col>
                </Row>
              </div>

            </div>
          }
        />
      </Collapse>
      <Collapse
        collapsible="header" style={{ display: 'none' }}
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
                    <CostTableBody type={'WORK_REQUEST'} countySum={undefined} tabKey={undefined} />
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
