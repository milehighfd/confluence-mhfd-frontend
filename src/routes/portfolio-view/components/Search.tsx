import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Collapse, Dropdown, Input, AutoComplete, Menu, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, HeartFilled, HeartOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import DetailModal from "routes/detail-page/components/DetailModal";
import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER } from "constants/constants";
import * as datasets from "../../../Config/datasets";
import { SERVER } from 'Config/Server.config';

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
  {
    searchRef,
    tableRef,
    setOpenTable,
    openTable,
    hoverTable,
    setHoverTable,
    phaseRef,
    scheduleRef,
    rawData,
    setCompleteData,
    setNewData,
    index,
    groupsBy,
    setCurrentGroup,
    setSearchWord,
    fullData,
    email,
    searchWord
  }
  :{
    searchRef: React.MutableRefObject<any>,
    tableRef: React.MutableRefObject<any>,
    scheduleRef: React.MutableRefObject<HTMLDivElement | null>,
    setOpenTable:React.Dispatch<React.SetStateAction<boolean[]>>,
    openTable: any[],
    hoverTable:number[],
    setHoverTable?:React.Dispatch<React.SetStateAction<number[]>>,
    phaseRef:React.MutableRefObject<HTMLDivElement | null>,
    rawData: any,
    setCompleteData: Function,
    setNewData: Function,
    index: number,
    groupsBy: any[],
    setCurrentGroup: Function,
    setSearchWord: Function,
    fullData: any,
    email: string,
    searchWord: string
  }) => {

  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [likeActive, setLikeActive] = useState([1,0,2]);
  const [keyword, setKeyword] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [activeDrop, setActiveDrop] = useState(0);

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
          children: groupsBy.map((gb, index) => {
            return {
              key: `1-${index + 1}`,
              label: <div className={index === activeDrop ? "menu-drop-sub menu-sub-drop menu-active":"menu-drop-sub menu-sub-drop"} onClick={() => {setCurrentGroup(gb.toLowerCase().replace(' ', '')); setActiveDrop(index); console.log(index, 'JJJJJJ')}}>{gb}</div>,
              className : index === activeDrop ? " menu-active": ""
            }
          })
        },
      ]}
    />
  );
  const sortedData = rawData.filter((elem: any) => elem.id.includes('Title'));
  const completeData = sortedData.map((elem: any) => {
    const filtered = rawData.filter((elemRaw: any) => !elemRaw.id.includes('Title') && elemRaw.headerLabel === elem.headerLabel);
    return {
      ...elem,
      values: filtered.filter((v: any, index: any) => {
        return filtered.findIndex((v2: any) => v.project_id === v2.project_id ) === index;
      })
    }
  });

  const getActiveKeys = () => {
    const indices = openTable.reduce(
      (out, bool, index) => bool ? out.concat(index) : out, 
      []
    );
    return indices;
  }
  const renderOption = (item: any) => {
    return {
      key: `${item.key}`,
      value: `${item.rowLabel}`,
      label: <div className="global-search-item">
      <h6>{item.rowLabel}</h6>
    </div>
    }
  }

  useEffect(() => {
    if (searchWord) {
      setFilteredData(fullData.filter((item: any) => !item.id.includes('Title') && item.rowLabel.toLowerCase().includes(searchWord.toLowerCase())));     
    } else {
      setFilteredData([]);
    }
  }, [searchWord, fullData]);
  const handleSearch = (value: string) => { 
    setSearchWord(value);
    setKeyword(value);
  }
  const deleteFunction = (id: number, email: string, table: string) => {
    datasets.deleteDataWithBody(SERVER.DELETE_FAVORITE, { email: email, id: id, table: table }, datasets.getToken()).then(favorite => {
      const z = [...fullData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? false : x.isFavorite } })
      const z1 = [...rawData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? false : x.isFavorite } })
      setCompleteData(z)
      setNewData(z1)
    });

  }
  const addFunction = (id: number, email: string, table: string) => {
    datasets.getData(SERVER.ADD_FAVORITE + '?table=' + table + '&email=' + email + '&id=' + id, datasets.getToken()).then(favorite => {
      const z = [...fullData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? true : x.isFavorite } })
      const z1 = [...rawData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? true : x.isFavorite } })
      setCompleteData(z)
      setNewData(z1)
    });
  }

  
  return <>
      {detailOpen && <DetailModal
        visible={detailOpen}
        setVisible={setDetailOpen}
        data={dataDetail}
        type={FILTER_PROJECTS_TRIGGER}
      />}
    <div className="search" id='searchPortfolio'>
      <div className="search-head">
        <AutoComplete
          dropdownMatchSelectWidth={true}
          options={filteredData.map(renderOption)}
          onSelect={(word: string) => {
            setSearchWord(word);
          }}
          onSearch={handleSearch}
          value={keyword}
          style={{width:'100%'}}
        >
          <Input allowClear placeholder="Search" prefix={<SearchOutlined />} style={{width:'95%'}}/>
        </AutoComplete>
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
        ref={el => searchRef.current[index] = el}
        onScrollCapture={(e:any) => {
          // TODO
          let dr: any = searchRef.current[index];
          let drTable: any = tableRef.current[index];
          if(tableRef.current[index]){
            tableRef.current[index].scrollTo(drTable.scrollLeft, dr.scrollTop);
          }
          if(phaseRef.current){
            phaseRef.current.scrollTo(0, e.target.scrollTop)
          }
          if(scheduleRef.current){
            scheduleRef.current.scrollTo(0, e.target.scrollTop)
          }
        }}
        // onMouseEnter={()=>{
        //   setHoverTable([0,0,0] );
        // }}
      >
        {/* <div className='line-search'>
          <span><DownOutlined className="icon-line"/></span><span>{titleCollaps[1]}</span>
        </div> */}
        {
          completeData.map((elem: any, index: number) => {
            const id = 'collapse' + index;   
            return (
              <div id={id} key={elem.id}>
                <Collapse
                  activeKey={getActiveKeys()}
                  onChange={
                    ()=>{
                      // setTimeout(()=>{
                        const newOpenTable = [...openTable];
                        newOpenTable[index] = !openTable[index] as any;
                        setOpenTable(newOpenTable);
                      // },70)
                    }
                  } className=''/*{openTable[0] && index === 0? "collapse-first":""}*/>
                  <Panel header={elem.headerLabel} key={index}>
                    {/* {
                      index === 0 && <div className="text-search text-first" id="headerCentennial">
                        <p></p>
                      </div>
                    } */}
                    {
                      elem.values.map((d:any, index_elem: number) => (
                        <div className="text-search" key={d.key} id={d.id} style={hoverTable[1] === index && hoverTable[0] && hoverTable[2] === index_elem ? {background:'#fafafa'}:{}} >
                          {/*onMouseEnter={()=>{setHoverTable([1,index,index_elem]);}}*/}
                          <p onClick={()=>{setDetailOpen(true); setDataDetail(d)}} className="title-project">{d.rowLabel}</p>
                          {d.isFavorite ? <HeartFilled style={{marginLeft:'7px', color:'#F5575C', marginRight:'10px'}} onClick={()=>(deleteFunction( d.project_id ,email, ''))} />:<HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}} onClick={()=> addFunction( d.project_id ,email, '')} />}
                          {/* <HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}} onClick={()=>(setLikeActive([0, index , index_elem]))}/> */}
                        </div>
                      ))
                    }
                  </Panel>
                </Collapse>
              </div>
            )
          })
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