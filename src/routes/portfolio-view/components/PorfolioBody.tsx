import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, Row, Tabs } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, DownOutlined, HeartFilled, HeartOutlined,  UpOutlined } from '@ant-design/icons';
import TablePortafolio from 'routes/portfolio-view/components/TablePortfolio';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import Filters from 'routes/portfolio-view/components/Filters';
import ModalFields from 'routes/list-view/components/ModalFields';
import ModalTollgate from 'routes/list-view/components/ModalTollgate';
import ModalGraphic from 'routes/portfolio-view/components/ModalGraphic';
import { DEFAULT_GROUP } from 'routes/portfolio-view/components/ListUtils';
import store from 'store';
import { FilterByGroupName } from 'routes/portfolio-view/components/FilterByGroupField';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import PhaseViewPag from 'routes/portfolio-view/components/PhaseViewPag';
import CalendarViewPag from 'routes/portfolio-view/components/CalendarViewPag';
import { usePortflioState, usePortfolioDispatch } from '../../../hook/portfolioHook';

const { TabPane } = Tabs;
let isInit = true;
let previousFilterBy = '';
const tabKeys = ['All','CIP', 'Restoration', 'Planning', 'DIP', 'R&D', 'Acquisition'];
const tabKeysIds = [0, 5, 7, 1, 6, 15, 13];

const PortafolioBody = ({
  optionSelect,
  setOptionSelect
}: {
  optionSelect: string,
  setOptionSelect: React.Dispatch<React.SetStateAction<string>>
}) => {
  const {
    setFilterProjectOptions,
    resetFiltercomponentOptions,
    getParamFilterProjectsNoBounds,
    setBoundMap,
    resetFilterProjectOptionsEmpty,
  } = useMapDispatch();
  /*
  const {

  } = usePortfolioDispatch();
  */
 
  const {
    filterProjectOptions,
    filterProjectOptionsNoFilter
  } = useMapState();
  const {
    searchWord,
  } = usePortflioState();
    
  const [filterby, setFilterby] = useState('');
  const [filterValue, setFilterValue] = useState(-1);
  const [filtername, setFiltername] = useState('Mile High Flood District');
  const [graphicOpen, setGrapphicOpen] = useState(false);
  const [positionModalGraphic, setPositionModalGraphic]= useState({left: 500, top:500})
  const [tabKey, setTabKey] = useState<any>('All');
  const [openModalTollgate, setOpenModalTollgate] = useState(false);
  const [updatedGroup, setUpdatedGroup] = useState(null);
  const [secondaryUpdatedGroup, setSecondaryUpdatedGroup] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [openTable, setOpenTable] = useState<any>([]);
  const tableRef = useRef([]); 
  const searchRef = useRef([]); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [zoomTimeline] = useState(0);
  const [openDrop, setOpenDrop] = useState(false);
  const [newData, setNewData] = useState<any>([]);
  const [sortValue, setSortValue] = useState({columnKey: null, order: undefined});
  const appUser = store.getState().profile;
  const [collapsePhase, setCollapsePhase] = useState(false);
  const [dataModal,setDataModal] = useState<any>([]);
  const [openPiney, setOpenPiney] = useState(false);
  const [updateFilter, setUpdateFilter] = useState([]);
  const [filterPagination, setFilterPagination] = useState<any>({search: '', filterby: [], value: []});
  const [favorites, setFavorites] = useState<any>([]);
  const [updateFavorites, setUpdateFavorites] = useState(false);
  const [tollData,setTollData] = useState<any>([]);

  useEffect(() => {
    getParamFilterProjectsNoBounds();
    if (searchWord) {
      let currentNewData = [...newData].filter((d: any) => d.id.includes('Title') || d.rowLabel.toLowerCase().includes(searchWord.toLowerCase()));
      currentNewData = currentNewData.filter((d: any, idx: number) => (d.id.includes('Title') && (currentNewData[idx + 1] ? currentNewData[idx + 1].id.includes('Title') : true)) ? false : true);
      setNewData(currentNewData);
      const sortedData = currentNewData.filter((elem: any) => elem.id.includes('Title'));
      setOpenTable(new Array(sortedData.length).fill(true));
    } else {
      setNewData([]);
      const sortedData = [...newData].filter((elem: any) => elem.id.includes('Title'));
      setOpenTable(new Array(sortedData.length).fill(true));
    }
    setOpenTable([true, true, true]);
    setTimeout(() => {
      isInit = false;
      resetFilterProjectOptionsEmpty();
    }, 1000);
    return () => {
      resetFiltercomponentOptions();
    }
  }, []);

  useEffect(() => {
    if(Object.keys(updateFilter).length > 0){
      getParamFilterProjectsNoBounds(updateFilter);
    }
  }, [updateFilter]);

  function removeFilterPagination(filterby: string) {
    setFilterPagination((prevState:any) => {
      const filterbyIndex = prevState.filterby.indexOf(filterby);
      const updatedFilterby = prevState.filterby.filter((item:any) => item !== filterby);
      const updatedValue = [...prevState.value];
      if (filterbyIndex !== -1) {
        updatedValue.splice(filterbyIndex, 1);
      }
      return {
        ...prevState,
        filterby: updatedFilterby,
        value: updatedValue,
      };
    });
  }

  function getLength(options: any): number {
    const item = options;
    const itemLength = Array.isArray(item) ? item.length : 0;
    return itemLength;
  }

  function updateFilterPagination(filterby: string, value: any) {
    setFilterPagination((prevState:any) => {
      let newFilterby = [...prevState.filterby];
      let newFilterValue = [...prevState.value];  
      const index = prevState.filterby.indexOf(filterby);  
      if (index !== -1) {
        newFilterValue[index] = value;
      } else {
        newFilterby.push(filterby);
        newFilterValue.push(value);
      }  
      return {
        ...prevState,
        filterby:  Array.isArray(prevState.filterby) ? newFilterby : newFilterby,
        value: Array.isArray(prevState.value) ? newFilterValue : [value],
        search : searchWord
      };
    });
  }

  useEffect(() => {
    if (openProjects) {
      updateFilterPagination('teams', appUser?.userInformation?.user_id);
    }else{
      removeFilterPagination('teams');
    }
  }, [openProjects]);

  useEffect(() => {
    setUpdateFilter(filterProjectOptions);
    let filterExist = false;
    if (getLength(filterPagination.filterby)>0){      
      filterPagination.filterby.forEach((filterby: string) => {
        removeFilterPagination(filterby);
      })      
    }    
    if (getLength(filterProjectOptions.servicearea) > 0 || filterProjectOptions.servicearea !== '') {
      let code = filterProjectOptions.servicearea;     
      updateFilterPagination('servicearea', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.county) > 0 || filterProjectOptions.county !== '') {      
      let code = filterProjectOptions.county;
      updateFilterPagination('county', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.jurisdiction) > 0 || filterProjectOptions.jurisdiction !== '') {
      let code = filterProjectOptions.jurisdiction;
      updateFilterPagination('jurisdiction', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.consultant) > 0 || filterProjectOptions.consultant !== '') {
      let code = filterProjectOptions.consultant;
      updateFilterPagination('consultant', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.mhfdmanager) > 0 || filterProjectOptions.mhfdmanager !== '') {
      let code = filterProjectOptions.mhfdmanager;
      updateFilterPagination('staff', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.contractor) > 0 || filterProjectOptions.contractor !== '') {
      let code = filterProjectOptions.contractor;
      updateFilterPagination('contractor', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.status) > 0  ) {
      let code = filterProjectOptions.status;
      updateFilterPagination('status', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.totalcost) > 0  ) {
      let code = filterProjectOptions.totalcost;
      updateFilterPagination('cost', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.streamname) > 0  ) {
      let code = filterProjectOptions.streamname;
      updateFilterPagination('stream', code);
      filterExist = true;
    }
    if (filterProjectOptions.lgmanager !== '') {
      let code = filterProjectOptions.lgmanager;
      updateFilterPagination('lgmanager', code);
      filterExist = true;
    }
    if (getLength(filterProjectOptions.projecttype) > 0 || filterProjectOptions.contractor !== '') {
      let code = filterProjectOptions.projecttype;
      updateFilterPagination('projecttype', code);
      filterExist = true;
    }
    if (!filterExist){
      setFilterPagination({ ...filterPagination, search: '', filterby: [], value: [] })
    }
  }, [filterProjectOptions]);
  
  useEffect(() => {
    filterProjectOptions.name = searchWord;
    filterProjectOptions.keyword = searchWord
    setFilterProjectOptions(filterProjectOptions)
    setUpdateFilter(filterProjectOptions);    
  }, []);

  const groupsBy = [
    'Status',
    'Jurisdiction',
    'County',
    'Service Area',
    'MHFD Lead',
    'Consultant',
    'Contractor'
  ];

  const menu = (
    <FilterByGroupName 
      setFilterby={setFilterby}
      setFiltervalue={setFilterValue}
      setFiltername={setFiltername}
    />
  );

  useEffect( () => {  
    setBoundMap('-105.96857996935253,38.91703158891448,-103.60676985708743,40.405727514276464');
    return () => {
      resetFiltercomponentOptions();
    }
  }, []);
  
  const apply = useCallback((values: any, field: string, resetFilterBy: string) => {
    let options = isInit ? {...filterProjectOptionsNoFilter} : {...filterProjectOptions};    
    if (!(resetFilterBy === 'projecttype' && tabKey !== 'All') && resetFilterBy !== '') {
      options[resetFilterBy] = '';
    }    
    if ('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field
    || 'consultant' === field || 'contractor' === field || 'jurisdiction' === field 
    || 'staff' === field) {
        let newValue = '';
        if ('workplanyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
        }
        if ('staff' === field) {
          newValue = values;
          options['mhfdmanager'] = newValue;
        }else{
          newValue = values;
          options[field] = newValue;
        }
    } else {
        if ('completedyear' === field) {
            options['status'] = [...options['status'], 'Complete'];
            options[field] = values;
        } else if ('streamname' === field) {
          if (values === '') {
            options[field] = values;
          } else {
            options[field] = [values];
          }
        } else if ('totalcost' === field) {
          options[field] = [values[0], values[values.length - 1]];
        } else if (field) {
            options[field] = values;
        }
    }
    setFilterProjectOptions(options);
    setUpdateFilter(options);
  }, [filterProjectOptions]);

  useEffect(() => {
    if (filterValue != -1) {
      apply([filterValue], filterby, previousFilterBy);
      previousFilterBy = filterby;
    } else {
      apply([], filterby, previousFilterBy);
      previousFilterBy = filterby;
    }
  } ,[filterby, filterValue]);

  useEffect(() => {
    const currentId: number = tabKeysIds[tabKeys.indexOf(tabKey)] || 0;
    if (currentId == 0) {
      apply([], 'projecttype', '');
    } else {
      apply([currentId], 'projecttype', '');
    }
  } ,[ tabKey ]);
  
  useEffect(() => {
    const controller = new AbortController();
    datasets.getData(
      SERVER.FAVORITES,
      datasets.getToken(),
      controller.signal
    ).then(result => {
      setFavorites(result);    
    })
    return () => {
      controller.abort();
    }
  }, [updateFavorites]);
 
  useEffect(() => {
    if (tabKey === 'All') {
      removeFilterPagination('projecttype');
    }
  }, [tabKey])

  function enterPhase() {
    setOptionSelect('Phase')
    setTabKey('CIP');
  }  
  function enterSchedule() {   
    setTabKey('CIP');   
    setSortValue({
      columnKey: null, order: undefined
    });
    setOptionSelect('Schedule')       
  }
  function enterList (){
    setOptionSelect('List')
  }
  function changeTabkey (key : any){   
    setOpenPiney(false)
    setTabKey(key)
  }
  function openFavs (){
    setOpenPiney(false)    
    setOpenFavorites(!openFavorites)   
  }

  useEffect(() => {
    setFilterPagination((prevState:any) => {
      let newFilterby = [...prevState.filterby];
      let newFilterValue = [...prevState.value];  
      const index = prevState.filterby.indexOf(filterby);  
      if (index !== -1) {
        newFilterValue[index] = filterValue;
      } else {
        newFilterby.push(filterby);
        newFilterValue.push(filterValue);
      }
  
      return {
        ...prevState,
        filterby:  Array.isArray(prevState.filterby) ? newFilterby : newFilterby,
        value: Array.isArray(prevState.value) ? newFilterValue : [filterValue],
        search: searchWord,
      };
    });
  }, [searchWord, filterby, filterValue, filtername])

  useEffect(() => {
    if(openFavorites){
      setFilterPagination({ ...filterPagination, favorites: favorites.map((x:any)=>{
        return x.project_id
      }) })
    }else{
      if(filterPagination.favorites){
        const {favorites, ...rest} = filterPagination;
        setFilterPagination(rest)
      }
    }    
  }, [openFavorites])

  return <>
    {graphicOpen && <ModalGraphic positionModalGraphic={positionModalGraphic} dataProject={dataModal}/>}
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate
      visible={openModalTollgate}
      setVisible={setOpenModalTollgate}
      dataProject={tollData}
      saveCB={()=>{}}
      setOpenPiney={setOpenPiney}
      setUpdatedGroup={setUpdatedGroup}
      setSecondaryUpdatedGroup={setSecondaryUpdatedGroup}
    />
    <div>
      <div className="portafolio-head">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }}>
            <h2 style={{maxWidth:'351px'}}>
              <Dropdown overlay={menu} trigger={['click']} overlayClassName="drop-menu-header" placement="bottomRight" onVisibleChange={()=>{setOpenDrop(!openDrop)}}>
                <div className="select-area">
                  <a onClick={e => e.preventDefault()} style={{marginLeft:'2%', display:'flex', alignItems:'baseline'}}>
                    {<h2 style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{filterby === 'county' ? filtername + " County" : (filterby === 'servicearea' ? filtername + " Service Area" : filtername)}</h2>} &nbsp;
                    {openDrop ? <UpOutlined style={{color:'#251863',fontSize:'14px'}} /> : < DownOutlined style={{color:'#251863',fontSize:'14px'}} />}
                  </a>
                </div>
              </Dropdown>
            </h2>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'center'}}>
            <Button className={optionSelect=== 'List' ? "btn-view btn-view-active": "btn-view"} onClick={()=>{enterList()}}>
              List
            </Button>
            <Button className={optionSelect=== 'Phase' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{enterPhase()}}>
              Phase
            </Button>
            <Button className={optionSelect=== 'Schedule' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{enterSchedule()}}>
              Schedule
            </Button>

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'right'}}>
            <Button className={openProjects ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenProjects(!openProjects)}}>
              {openProjects? <CheckCircleFilled style={{color:'#2ac499', fontSize: '16px'}}/>:<CheckCircleOutlined style={{color: '#251863', fontSize: '16px'}} />} My Teams
            </Button>
            <Button className={openFavorites ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{openFavs()}}>
              {openFavorites? <HeartFilled style={{color: '#f5575c', fontSize: '16px'}}/>:<HeartOutlined style={{color: '#251863', fontSize: '16px'}}  />} Favorites
            </Button>
            <Button className={openFilters ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setOpenFilters(!openFilters)}}>
              <img className="icon-bt" src="/Icons/icon-73.svg" alt="filter" />&nbsp;Filter
            </Button>
          </Col>
        </Row>
      </div>
      <div className="work-body portafolio">
        <div className="legends-porfolio">
          {(optionSelect === 'Phase' || optionSelect === 'Schedule') && <div>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#5E5FE2'}}/>
                  <span style={{marginLeft:'1px', marginRight:'12px'}}>Done</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#047CD7'}}/>
                  <span style={{marginLeft:'1px', marginRight:'12px'}}>Current</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#D4D2D9'}}/>
                  <span style={{marginLeft:'1px', marginRight:'12px'}}>Not Started</span>
                </span>
                <span className="span-dots-heder">
                  <div className="circulo" style={{backgroundColor:'#F5575C'}}/>
                  <span style={{marginLeft:'1px', marginRight:'12px'}}>Overdue</span>
                </span>
              </div>}
        </div>
        <Tabs destroyInactiveTabPane={true} defaultActiveKey={displayedTabKey[1]}
          id="tabsPM"
          activeKey={tabKey}
          onChange={(key) => changeTabkey(key)} className="tabs-map">
          {
            displayedTabKey.map((tk: string, idx: number) => { return (
              <TabPane style={{marginBottom:'0px'}} tab={<span>{tk}</span>} key={tk} disabled = {(optionSelect === 'Phase' || optionSelect === 'Schedule') && tk === 'All'?true:false}>
                <div className="protafolio-body">
                  {openFilters && <Filters filtersObject={ {filterby, filterValue, tabKey}}/>}
                      {optionSelect === 'List' && <TablePortafolio
                        searchRef={searchRef}
                        setOpenTable={setOpenTable}
                        openTable={openTable}
                        rawData={newData}
                        index={idx}
                        groupsBy={groupsBy}
                        email={appUser.userInformation?.email}
                        setCollapsePhase={setCollapsePhase}
                        collapsePhase={collapsePhase}
                        tabKey={tabKey}
                        tabKeyId = {tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                        setSortValue={setSortValue}
                        filterPagination={filterPagination}
                        updateFavorites={updateFavorites}
                        setUpdateFavorites={setUpdateFavorites}
                        sortValue={sortValue}
                      />
                      }
                      {optionSelect === 'Phase' && 
                      <PhaseViewPag                        
                        rawData={newData}
                        groupsBy={groupsBy}
                        searchRef={searchRef}
                        tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                        index={idx}
                        collapsePhase={collapsePhase}
                        setCollapsePhase={setCollapsePhase}
                        openTable={openTable}
                        setOpenTable={setOpenTable}
                        email={appUser.userInformation?.email}
                        setTollData = {setTollData}
                        setOpenModalTollgate = {setOpenModalTollgate}
                        setGrapphicOpen={setGrapphicOpen}
                        setPositionModalGraphic={setPositionModalGraphic}
                        setDataModal={setDataModal}
                        userName={appUser.userInformation?.name}                        
                        filterPagination={filterPagination}
                        updateFavorites={updateFavorites}
                        setUpdateFavorites={setUpdateFavorites}
                      />                        
                      }
                    {optionSelect === 'Schedule'  && 
                    <CalendarViewPag
                      rawData={newData}
                      groupsBy={groupsBy}
                      indexParent={idx}
                      phaseRef={phaseRef}
                      searchRef={searchRef}
                      divRef={tableRef}
                      tableRef={tableRef}
                      tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                      index={idx}
                      collapsePhase={collapsePhase}
                      setCollapsePhase={setCollapsePhase}
                      openTable={openTable}
                      setOpenTable={setOpenTable}
                      email={appUser.userInformation?.email}
                      favorites={favorites}
                      setTollData={setTollData}
                      setOpenModalTollgate={setOpenModalTollgate}
                      setOpenPiney={setOpenPiney}
                      openPiney={openPiney}
                      setGrapphicOpen={setGrapphicOpen}
                      setPositionModalGraphic={setPositionModalGraphic}
                      setDataModal={setDataModal}
                      moveSchedule={zoomTimeline}
                      scheduleRef={scheduleRef}
                      userName={appUser.userInformation?.name}
                      filterPagination={filterPagination}
                      setFilterPagination={setFilterPagination}
                      updatedGroup={updatedGroup}
                      secondaryUpdatedGroup={secondaryUpdatedGroup}
                      updateFavorites={updateFavorites}
                      setUpdateFavorites={setUpdateFavorites}
                    />
                    }
                </div>
              </TabPane>
            )})
            }
          </Tabs>
        </div>
    </div>
  </>
};

export default PortafolioBody;
