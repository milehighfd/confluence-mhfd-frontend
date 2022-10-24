import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Input, Layout, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const popovers: any = [
  <div className="popoveer-00"><b>Capital:</b> Master planned improvements that increase conveyance or reduce flow.</div>,
  <div className="popoveer-00"><b>Study:</b> Master plans that identify problems and recommend improvements.</div>,
  <div className="popoveer-00"><b>Maintenance:</b> Restore existing infrastructure eligible for MHFD participation.</div>,
  <div className="popoveer-00"><b>Acquisition:</b> Property with high flood risk or needed for improvements.</div>,
  <div className="popoveer-00"><b>Special:</b> Any other effort for which MHFD funds or staff time is requested.</div>
]
const Search = () => {
  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  let displayedTabKey = tabKeys;
  return <>
    <div className="search">
      <div className="search-head">
        <Input placeholder="Search by project name " prefix={<SearchOutlined />} style={{width:'85%'}}/>
        <span className="ic-dots"/>
      </div>
      <Collapse defaultActiveKey={['1']} style={{marginBottom:'25px'}}>
        <Panel header="Centennial" key="1">
          <div className="text-search">
            <p>Niver Creek Upstream of Zuni...</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
          <div className="text-search">
            <p>North Outfall - Phase III</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
          <div className="text-search">
            <p>Niver Detention Dam - EAP...</p> <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
          </div>
          <div className="text-search">
            <p>Barr Creek - E470 to Quebec</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
          <div className="text-search">
            <p>Niver Creek Trib M - Thornton</p> <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
          </div>
          <div className="text-search">
            <p>Big Dry Creek (ARAPCO)</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
          <div className="text-search">
            <p>West Tollgate Creek</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={['1']}  style={{marginBottom:'19px'}}>
        <Panel header="Commerce City" key="1">
        <div className="text-search">
          <p>North Outfall - Phase IV</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
        </div>
        <div className="text-search">
          <p>Snyder Creek - E470 to Quebec</p> <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
        </div>
        </Panel>
      </Collapse>
      <Collapse defaultActiveKey={['1']}  style={{marginBottom:'25px'}}>
        <Panel header="Denver" key="1">
          <div className="text-search">
            <p>Piney Creek Channel Restore</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
          <div className="text-search">
            <p>No Name Creek Regional </p> <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
          </div>
          <div className="text-search">
            <p>East Tollgate Creek</p> <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
          </div>
        </Panel>
      </Collapse>
    </div>
  </>
};

export default Search;