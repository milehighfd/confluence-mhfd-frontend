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
const Search = (
  {searchRef, tableRef, setOpenTable, openTable, hoverTable}
  :{
    searchRef: React.MutableRefObject<HTMLDivElement | null>,
    tableRef: React.MutableRefObject<HTMLDivElement | null>,
    setOpenTable:React.Dispatch<React.SetStateAction<boolean[]>>,
    openTable: boolean[],
    hoverTable:number[],
  }) => {
  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  let displayedTabKey = tabKeys;
  const content = (
    <div style={{width:'137px'}}>
      <p style={{marginBottom:'0px'}}>This is a sample blurb describing the project. Alternatively we can open the detail page.</p>
    </div>
  );
  const menu = (
    <Menu
      className="menu-drop"
      items={[
        {
          key: '1',
          label: <p style={{fontWeight:'700', color:'#11093C', opacity:'0.5', fontSize:'12px', marginBottom:'2px', marginLeft:'3px'}}>Group By</p>,
          type: 'group',
          children: [
            {
              key: '1-1',
              label: <div className="menu-drop-sub menu-sub-drop">Status</div>,
            },
            {
              key: '1-2',
              label: <div className="menu-drop-sub menu-sub-drop">Jurisdiction</div>,
            },
            {
              key: '1-3',
              label: <div className="menu-drop-sub menu-sub-drop">County</div>,
            },
            {
              key: '1-4',
              label: <div className="menu-drop-sub menu-sub-drop">Service Area</div>,
            },
            {
              key: '1-5',
              label: <div className="menu-drop-sub menu-sub-drop">MHFD Staff Lead</div>,
            },
            {
              key: '1-6',
              label: <div className="menu-drop-sub menu-sub-drop">Consultant</div>,
            },
            {
              key: '1-7',
              label: <div className="menu-drop-sub menu-sub-drop">Contractor</div>,
            },
          ],
        },
      ]}
    />
  );
  return <>
    <div className="search">
      <div className="search-head">
        <Input placeholder="Search" prefix={<SearchOutlined />} style={{width:'85%'}}/>
        <Dropdown overlay={menu} trigger={['click']} >
          <div className="select-area">
            <a onClick={e => e.preventDefault()} style={{marginLeft:'2%'}}>
              <span className="ic-dots"/>
            </a>
          </div>
        </Dropdown>
      </div>
      <div
        className="search-body"
        ref={searchRef}
        onScroll={(e:any) => {
          let dr: any = searchRef.current;
          if(tableRef.current){
            tableRef.current.scrollTo(0, dr.scrollTop);
          }
        }}
      >
        <Collapse defaultActiveKey={['1']} onChange={(e)=>{setOpenTable([e.length > 0 , openTable[1], openTable[2]])}}>
          <Panel header="Centennial" key="1">
            <div className="text-search" style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Niver Creek Upstream of Zuni...</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
            <div className="text-search" style={hoverTable[2] === 1 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>North Outfall - Phase III</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
            <div className="text-search" style={hoverTable[2] === 2 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Niver Detention Dam - EAP...</p>
              </Popover>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
            </div>
            <div className="text-search" style={hoverTable[2] === 3 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Barr Creek - E470 to Quebec</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
            <div className="text-search" style={hoverTable[2] === 4 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Niver Creek Trib M - Thornton</p>
              </Popover>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
            </div>
            <div className="text-search"  style={hoverTable[2] === 5 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Big Dry Creek (ARAPCO)</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
            <div className="text-search" style={hoverTable[2] === 6 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa',marginBottom:'10px'}:{marginBottom:'10px'}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>West Tollgate Creek</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}  onChange={(e)=>{setOpenTable([openTable[0],e.length > 0, openTable[2]])}}>
          <Panel header="Commerce City" key="1"                                                                                                    >
            <div className="text-search"  style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 1 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>North Outfall - Phase IV</p>
              </Popover>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
            </div>
            <div className="text-search" style={hoverTable[2] === 1 && hoverTable[0] && hoverTable[1] === 1 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Snyder Creek - E470 to Quebec</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}  style={{marginBottom:'25px'}}  onChange={(e)=>{setOpenTable([openTable[0], openTable[1],e.length > 0 ])}}>
          <Panel header="Denver" key="1">
            <div className="text-search"  style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>Piney Creek Channel Restore</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
            <div className="text-search"  style={hoverTable[2] === 1 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>No Name Creek Regional </p>
              </Popover>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C'}} />
            </div>
            <div className="text-search" style={hoverTable[2] === 2 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}}>
              <Popover content={content} title="Title" overlayClassName="popover-porfolio" placement="topLeft">
                <p>East Tollgate Creek</p>
              </Popover>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A'}}/>
            </div>
          </Panel>
        </Collapse>
      </div>
      
    </div>
  </>
};

export default Search;