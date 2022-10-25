import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, Layout, Menu, Popover, Row, Select, Tabs } from 'antd';
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
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: <p style={{fontWeight:'700', color:'#11093C', opacity:'0.5', fontSize:'12px'}}>Group By</p>,
          type: 'group',
          children: [
            {
              key: '1-1',
              label: <div className="menu-drop-sub">Status</div>,
            },
            {
              key: '1-2',
              label: <div className="menu-drop-sub">Jurisdiction</div>,
            },
            {
              key: '1-3',
              label: <div className="menu-drop-sub">County</div>,
            },
            {
              key: '1-4',
              label: <div className="menu-drop-sub">Service Area</div>,
            },
            {
              key: '1-5',
              label: <div className="menu-drop-sub">MHFD Staff Lead</div>,
            },
            {
              key: '1-6',
              label: <div className="menu-drop-sub">Consultant</div>,
            },
            {
              key: '1-7',
              label: <div className="menu-drop-sub">Contractor</div>,
            },
          ],
        },
      ]}
    />
  );
  return <>
    <div className="search">
      <div className="search-head">
        <Input placeholder="Search by project name " prefix={<SearchOutlined />} style={{width:'85%'}}/>
        <Dropdown overlay={menu} trigger={['click']} >
          <div className="select-area">
            <a onClick={e => e.preventDefault()} style={{marginLeft:'2%'}}>
              <span className="ic-dots"/>
            </a>
          </div>
        </Dropdown>
      </div>
      <Collapse defaultActiveKey={['1']} style={{marginBottom:'25px'}}>
        <Panel header="Centennial" key="1">
            <div className="text-search">
            <Popover content={content} title="Title" className="popover-porfolio">
              <p>Niver Creek Upstream of Zuni...</p>
            </Popover>
            <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
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