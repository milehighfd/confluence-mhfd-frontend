import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Collapse, Dropdown, Input, Menu } from 'antd';
import { FILTER_PROJECTS_TRIGGER } from "constants/constants";
import { useMapDispatch } from "hook/mapHook";
import { usePortfolioDispatch } from "hook/portfolioHook";
import React, { useState } from "react";
import DetailModal from 'routes/detail-page/components/DetailModal';

const { Panel } = Collapse;

const Search = (
  {
    searchRef,
    tableRef,
    setOpenTable,
    openTable,
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
    searchWord,
    setCollapsePhase,
    optionSelect,
    collapsePhase
  }
  :{
    searchRef: React.MutableRefObject<any>,
    tableRef: React.MutableRefObject<any>,
    scheduleRef: React.MutableRefObject<HTMLDivElement | null>,
    setOpenTable:React.Dispatch<React.SetStateAction<boolean[]>>,
    openTable: any[],
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
    searchWord: string,
    setCollapsePhase: Function,
    optionSelect:any,
    collapsePhase: any
  }) => {
  const { deleteFavorite, addFavorite } = usePortfolioDispatch();
  const [detailOpen, setDetailOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState();
  const [keyword, setKeyword] = useState('');
  const [activeDrop, setActiveDrop] = useState(0);
  const [openDrop, setOpenDrop] = useState<boolean>(false)
  const {
    setProjectKeyword
  } = useMapDispatch();

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
              label: <div className={index === activeDrop ? "menu-drop-sub menu-sub-drop menu-active":"menu-drop-sub menu-sub-drop"} onClick={() => {setCurrentGroup(gb.toLowerCase().replace(' ', '')); setActiveDrop(index);setOpenDrop(false)}}>{gb}</div>,
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

  const handleSearch = (value: string) => { 
    setSearchWord(value);
    setKeyword(value);
    setProjectKeyword(value);
  }
  const deleteFunction = (id: number, email: string, table: string) => {
    deleteFavorite(id);
  }
  const deleteUpdate = (id: number) => {
    const z = [...fullData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? false : x.isFavorite } })
    const z1 = [...rawData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? false : x.isFavorite } })
    setCompleteData(z)
    setNewData(z1)
  }
  const addFunction = (email: string, id: number,  table: string) => {
    addFavorite(id);
    const z = [...fullData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? true : x.isFavorite } })
    const z1 = [...rawData].map((x: any) => { return { ...x, isFavorite: (id === x.project_id) ? true : x.isFavorite } })
    setCompleteData(z)
    setNewData(z1)
  }
  
  return <>
      {detailOpen && <DetailModal
        visible={detailOpen}
        setVisible={setDetailOpen}
        data={dataDetail}
        type={FILTER_PROJECTS_TRIGGER}
        deleteCallback={deleteUpdate}
        addFavorite={addFunction}
      />}
    <div className="search" id='searchPortfolio'>
      <div className="search-head">
         <Input.Search
              id="search-input-listview"
              allowClear
              placeholder="Search"
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              onSearch={handleSearch}
              value={keyword}
            />
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft" onVisibleChange={(e:boolean)=>{setOpenDrop(e)}} visible={openDrop}>
          <div className="select-area">
            <a onClick={(e) => {e.preventDefault();setOpenDrop(!openDrop)}} style={{marginLeft:'0.5vw'}} >
              <span className="ic-dots"/>
            </a>
          </div>
        </Dropdown>
      </div>
      <div
        className="search-body"
        ref={el => searchRef.current[index] = el}
        onScrollCapture={(e:any) => {
          let dr: any = searchRef.current[index];
          let drTable: any = tableRef.current[index];
          let listviewElement = document.getElementById(`listView_${index}`)
          if(tableRef.current[index]){
            tableRef.current[index].scrollTo(drTable.scrollLeft, dr.scrollTop);
          }
          if(listviewElement){
            listviewElement.scrollTo(listviewElement.scrollLeft, dr.scrollTop)
          }
          if(phaseRef.current){
            phaseRef.current.scrollTo(phaseRef.current.scrollLeft, e.target.scrollTop)
          }
          if(scheduleRef.current){
            scheduleRef.current.scrollTo(scheduleRef.current.scrollLeft, e.target.scrollTop)
          }
        }}
      >
        {
          completeData.map((elem: any, index: number) => {
            const id = 'collapse' + index;          
            return (
              <div id={elem.id} key={elem.id}>
                <Collapse
                  activeKey={getActiveKeys()}
                  onChange={
                    ()=>{
                      setCollapsePhase(!collapsePhase)
                        const newOpenTable = [...openTable];
                        newOpenTable[index] = !openTable[index] as any;
                        setOpenTable(newOpenTable);
                    }
                  }>
                  <Panel header={<div onMouseEnter={(e:any)=>{
                    }}>{elem?.counter?.includes('NoGroupAvailable')?'No Group Available '+elem?.counter?.split(" ")[1]:elem?.counter}</div>} key={index}>
                    {
                      elem.values.map((d:any, index_elem: number) => (
                        <div className="text-search" key={d.key} id={d.id}>
                          <p onClick={()=>{setDetailOpen(true); setDataDetail(d)}} className="title-project" >{d.rowLabel}</p>
                          {d.isFavorite ? <HeartFilled style={{marginLeft:'7px', color:'#F5575C', marginRight:'10px'}} onClick={()=>(deleteFunction( d.project_id ,email, ''))} />:<HeartOutlined style={{marginLeft:'7px', color:'#706B8A', marginRight:'10px'}} onClick={()=> addFunction(email,d.project_id , '')} />}
                        </div>
                      ))
                    }
                  </Panel>
                </Collapse>
              </div>
            )
          })
        }
      </div>
    </div>
  </>
};

export default Search;
