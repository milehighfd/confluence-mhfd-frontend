import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, Layout, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import DetailModal from "routes/detail-page/components/DetailModal";

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
  {searchRef, tableRef, setOpenTable, openTable, hoverTable, setHoverTable, phaseRef, scheduleRef, rawData}
  :{
    searchRef: React.MutableRefObject<HTMLDivElement | null>,
    tableRef: React.MutableRefObject<HTMLDivElement | null>,
    scheduleRef: React.MutableRefObject<HTMLDivElement | null>,
    setOpenTable:React.Dispatch<React.SetStateAction<boolean[]>>,
    openTable: boolean[],
    hoverTable:number[],
    setHoverTable:React.Dispatch<React.SetStateAction<number[]>>,
    phaseRef:React.MutableRefObject<HTMLDivElement | null>,
    rawData: any
  }) => {
  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  const [detailOpen, setDetailOpen] = useState(false);
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
              label: <div className="menu-drop-sub menu-sub-drop">Streams</div>,
            },
            {
              key: '1-6',
              label: <div className="menu-drop-sub menu-sub-drop">MHFD Lead/PM</div>,
            },
            {
              key: '1-7',
              label: <div className="menu-drop-sub menu-sub-drop">Consultant</div>,
            },
            {
              key: '1-8',
              label: <div className="menu-drop-sub menu-sub-drop">Contractor</div>,
            },
          ],
        },
      ]}
    />
  );
  const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
  const completeData = sortedData.map((elem: any) => {
    return {
      ...elem,
      values: rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel)
    }
  });
  console.log('complete Data', completeData);
  return <>
      {detailOpen && <DetailModal visible={detailOpen} setVisible={setDetailOpen}/>}
    <div className="search" id='searchPortfolio'>
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
        onScrollCapture={(e:any) => {
          let dr: any = searchRef.current;
          if(tableRef.current){
            tableRef.current.scrollTo(0, dr.scrollTop);
          }
          if(phaseRef.current){
            phaseRef.current.scrollTo(0, dr.scrollTop)
          }
          if(scheduleRef.current){
            scheduleRef.current.scrollTo(0, dr.scrollTop)
          }
        }}
        onMouseEnter={()=>{
          setHoverTable([0,0,0] );
        }}
      >
        {
          completeData.map((elem: any, index: number) => (
            <Collapse
              defaultActiveKey={['1']}
              onChange={
                (e)=>{
                  setTimeout(()=>{
                    setOpenTable([e.length > 0 , openTable[1], openTable[2]]);
                  },70)
                }
              } className={openTable[0]? "collapse-first":""}>
              <Panel header={elem.headerLabel} key="1" id='testing1'>
                {
                  index === 0 && <div className="text-search text-first" id="headerCentennial">
                    <p></p>
                  </div>
                }
                {
                  elem.values.map((d:any) => (
                    <div className="text-search" id={d.id} style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 0 ? {background:'#fafafa'}:{}} onMouseEnter={()=>{setHoverTable([1,0,0]);}}>
                      <p onClick={()=>{setDetailOpen(true)}}> {d.rowLabel} </p>
                      <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}}/>
                    </div>
                  ))
                }
              </Panel>
            </Collapse>
          ))
        }
        
        {/* <Collapse defaultActiveKey={['1']}  onChange={(e)=>{setOpenTable([openTable[0],e.length > 0, openTable[2]]);console.log(e, 'Dotty')}}>
          <Panel header="Commerce City" key="1" id='testing2'>
            <div className="text-search" id='CommerceCity1'  style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 1 ? {background:'#fafafa'}:{}}  onMouseEnter={()=>{setHoverTable([1,1,0]);}}>
              <p onClick={()=>{setDetailOpen(true)}}>North Outfall - Phase IV</p>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C', marginRight:'10px'}} />
            </div>
            <div className="text-search" id='CommerceCity2' style={hoverTable[2] === 1 && hoverTable[0] && hoverTable[1] === 1 ? {background:'#fafafa', marginRight:'11px'}:{marginRight:'11px'}}  onMouseEnter={()=>{setHoverTable([1,1,1]);}}>
              <p onClick={()=>{setDetailOpen(true)}}>Snyder Creek - E470 to Quebec</p>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}}/>
            </div>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}  style={{marginBottom:'25px'}}  onChange={(e)=>{setOpenTable([openTable[0], openTable[1],e.length > 0 ])}}>
          <Panel header="Denver" key="1" id='testing3'>
            <div className="text-search" id='Denver1'  style={hoverTable[2] === 0 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}} onMouseEnter={()=>{setHoverTable([1,2,0]);}}>
              <p onClick={()=>{setDetailOpen(true)}}>Piney Creek Channel Restore</p>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}}/>
            </div>
            <div className="text-search" id='Denver2'  style={hoverTable[2] === 1 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}} onMouseEnter={()=>{setHoverTable([1,2,1]);}}>
              <p onClick={()=>{setDetailOpen(true)}}>No Name Creek Regional </p>
              <HeartFilled style={{marginLeft:'7px', color:'#F5575C', marginRight:'10px'}} />
            </div>
            <div className="text-search" id='Denver3' style={hoverTable[2] === 2 && hoverTable[0] && hoverTable[1] === 2 ? {background:'#fafafa'}:{}} onMouseEnter={()=>{setHoverTable([1,2,2]);}}>
              <p onClick={()=>{setDetailOpen(true)}}>East Tollgate Creek</p>
              <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}}/>
            </div>
          </Panel>
        </Collapse> */}
      </div>
      
    </div>
  </>
};

export default Search;