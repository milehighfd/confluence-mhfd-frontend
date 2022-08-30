import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";

const { TabPane } = Tabs;
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
      <Input placeholder="Search by project name " prefix={<SearchOutlined />} />
      <div className="title-search">
        <h3 style={{marginBottom:'0px'}}>Centennial</h3> <MoreOutlined />
      </div>
      <div className="text-search">
        <p>Niver Creek Upstream of Zuni...</p> <InfoCircleOutlined style={{marginLeft:'7px'}}/>
      </div>
      <div className="text-search">
        <p>North Outfall - Phase III</p> <InfoCircleOutlined  style={{marginLeft:'7px'}}/>
      </div>
      <div className="text-search">
        <p>Niver Detention Dam - EAP...</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>Barr Creek - E470 to Quebec</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>Niver Creek Trib M - Thornton</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>Big Dry Creek (ARAPCO)</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>West Tollgate Creek</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="title-search">
        <h3 style={{marginBottom:'0px'}}>Commerce City</h3> <MoreOutlined />
      </div>
      <div className="text-search">
        <p>North Outfall - Phase IV</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>Snyder Creek - E470 to Quebec</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="title-search">
        <h3 style={{marginBottom:'0px'}}>Denver</h3> <MoreOutlined />
      </div>
      <div className="text-search">
        <p>Piney Creek Channel Restore</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>No Name Creek Regional </p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
      <div className="text-search">
        <p>East Tollgate Creek</p> <InfoCircleOutlined style={{marginLeft:'7px'}} />
      </div>
    </div>
  </>
};

export default Search;