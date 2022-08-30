import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import Search from "./Search";
import TablePortafolio from "./TablePortfolio";
import PhaseView from "./PhaseView";
import ActionItems from "./ActionItems";
import CalendarView from "./CalendarView";

const { TabPane } = Tabs;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const PortafolioBody = () => {
  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List View')
  return <>
    <div>
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <h2>
              <Input
                style={{ width: 250 }}
                placeholder="South Watershed"
                suffix={<DownOutlined />}
              />
            </h2>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{textAlign:'right', paddingRight:'3%'}}>
            <Select placeholder="List View" placement="bottomLeft" style={{marginRight:'20px'}} value={optionSelect?? optionSelect} onChange={(e)=>{console.log(e);setOptionSelect(e)}}>
                <Option value="List View">List View</Option>
                <Option value="Phase View">Phase View</Option>
                <Option value="Calendar View">Calendar View</Option>
            </Select>
            <Button className="btn-filter-k">
              <img className="icon-bt" style={{ WebkitMask: "url('/Icons/icon-73.svg') no-repeat center" }} src=""/>&nbsp;
              Filters - 22
            </Button>

          </Col>
        </Row>
      </div>
      <div className="work-body portafolio">
        <Tabs defaultActiveKey={displayedTabKey[1]}
          activeKey={tabKey}
            onChange={(key) => setTabKey(key)} className="tabs-map">
            {
              displayedTabKey.map((tk: string) => (
                <TabPane tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
                  <div className="protafolio-body" >
                  <Row>
                    <Col xs={{ span: 10 }} lg={{ span: 4 }}>
                      <Search />
                    </Col>
                    <Col xs={{ span: 23 }} lg={{ span: 15 }}>
                      {optionSelect === 'List View' && <TablePortafolio/>}
                      {optionSelect === 'Phase View'  && <PhaseView/>}
                      {optionSelect === 'Calendar View'  && <CalendarView/>}
                    </Col>
                    <Col xs={{ span: 11 }} lg={{ span: 5 }}>
                      <ActionItems />
                    </Col>
                  </Row>
                  </div>
                </TabPane>
              ))
            }
          </Tabs>
        </div>
    </div>
  </>
};

export default PortafolioBody;