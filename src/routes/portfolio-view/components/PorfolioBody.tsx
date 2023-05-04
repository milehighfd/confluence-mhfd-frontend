import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Row, Tabs } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, DownOutlined, HeartFilled, HeartOutlined,  UpOutlined } from "@ant-design/icons";
import TablePortafolio from "./TablePortfolio";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import Filters from "./Filters";
import ModalFields from "routes/list-view/components/ModalFields";
import ModalTollgate from "routes/list-view/components/ModalTollgate";
import ModalGraphic from "./ModalGraphic";
import { DEFAULT_GROUP } from "./ListUtils";
import LoadingViewOverall from "Components/Loading-overall/LoadingViewOverall";
import store from "../../../store";
import { FilterByGroupName } from './FilterByGroupField';
import * as datasets from "../../../Config/datasets";
import { SERVER } from "../../../Config/Server.config";
import PhaseViewPag from "./PhaseViewPag";
import CalendarViewPag from "./CalendarViewPag";

const { TabPane } = Tabs;
let isInit = true;
let previousFilterBy = '';

const PortafolioBody = ({optionSelect, setOptionSelect}:{optionSelect: string, setOptionSelect:React.Dispatch<React.SetStateAction<string>>}) => {
  const {
    setFilterProjectOptions,
    resetFiltercomponentOptions,
    getParamFilterProjectsNoBounds,
    setBoundMap,
    resetFilterProjectOptionsEmpty,
  } = useMapDispatch();
  const {
    filterProjectOptions,
    filterProjectOptionsNoFilter
  } = useMapState();
  const [tabKeys, setTabKeys] = useState<any>(['All','CIP', 'Restoration', 'Planning', 'DIP', 'R&D', 'Acquisition']);
  const [tabKeysIds, setTabKeysIds] = useState<any>([ 0, 5, 7, 1, 6, 15, 13]);
  const [filterby, setFilterby] = useState('');
  const [applyFilter, setApplyFilter] = useState(0);
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
  //const [hoverTable, setHoverTable] = useState<number>()
  const tableRef = useRef([]); 
  const searchRef = useRef([]); 
  const phaseRef = useRef<null | HTMLDivElement>(null);
  const scheduleRef = useRef<null | HTMLDivElement>(null);
  const [zoomTimeline] = useState(0);
  const [openDrop, setOpenDrop] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(DEFAULT_GROUP);
  const [newData, setNewData] = useState<any>([]);
  const [completeData, setCompleteData] = useState<any>([]);
  const [phaseData, setPhaseData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [sortValue, setSortValue] = useState({columnKey: null, order: undefined});
  const appUser = store.getState().profile;
  const [currentUserId, setCurrentUserId] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);
  const [collapsePhase, setCollapsePhase] = useState(false);
  const [dataModal,setDataModal] = useState<any>([]);
  const [openPiney, setOpenPiney] = useState(false);
  const [statusCounter,setStatusCounter] = useState(0);
  const [updateFilter, setUpdateFilter] = useState([]);
  const [filterPagination, setFilterPagination] = useState<any>({});
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
      setNewData(completeData);
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
    if (appUser.userInformation?.user_id) {
      setCurrentUserId(appUser.userInformation?.user_id);      
    }   
  }, [appUser]);

  useEffect(() => {
    if(Object.keys(updateFilter).length > 0){
      getParamFilterProjectsNoBounds(updateFilter);
    }
  }, [updateFilter]);

  useEffect(() => {
    setUpdateFilter(filterProjectOptions);
    console.log('filterProjectOptions',filterProjectOptions);
    const servicearea = filterProjectOptions.servicearea;
    const serviceareaLength = servicearea.length;
    const county = filterProjectOptions.county;
    const countyLength = county.length;
    const jurisdiction = filterProjectOptions.jurisdiction;
    const jurisdictionLength = jurisdiction.length;
    const consultant = filterProjectOptions.consultant;
    const consultantLength = consultant.length;
    const contractor = filterProjectOptions.contractor;
    const contractorLength = contractor.length;
    const mhfdmanager = filterProjectOptions.mhfdmanager;
    const mhfdmanagerLength = mhfdmanager.length;
    const status = filterProjectOptions.status;
    const statusLength = status.length;    
    const cost = filterProjectOptions.totalcost;
    const costLength = cost.length;
    const stream = filterProjectOptions.streamname;
    const streamLength = stream.length;
    if (serviceareaLength > 0 || filterProjectOptions.servicearea !== '') {
      let code = filterProjectOptions.servicearea;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'servicearea', value: code })
    }else if (countyLength > 0 || filterProjectOptions.county !== '') {
      let code = filterProjectOptions.county;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'county', value: code })
    }
    else if (jurisdictionLength > 0 || filterProjectOptions.jurisdiction !== '') {
      let code = filterProjectOptions.jurisdiction;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'jurisdiction', value: code })
    }
    else if (consultantLength > 0 || filterProjectOptions.consultant !== '') {
      let code = filterProjectOptions.consultant;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'consultant', value: code })
    }
    else if (mhfdmanagerLength > 0 || filterProjectOptions.mhfdmanager !== '') {
      let code = filterProjectOptions.mhfdmanager;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'staff', value: code })
    }
    else if (contractorLength > 0 || filterProjectOptions.contractor !== '') {
      let code = filterProjectOptions.contractor;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'contractor', value: code })
    }
    else if (statusLength > 0 ) {
      let code = filterProjectOptions.status;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'status', value: code })
    }
    else if (costLength > 0 ) {
      let code = filterProjectOptions.totalcost;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'cost', value: code })
    }
    else if (streamLength > 0 ) {
      let code = filterProjectOptions.streamname[0];
      code = code.split(',');
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'stream', value: code })
    }
    else if (filterProjectOptions.lgmanager !== '') {
      let code = filterProjectOptions.lgmanager;
      setFilterPagination({ ...filterPagination, search: filterProjectOptions.name, filterby: 'lgmanager', value: code })
    }
    else{
      setFilterPagination({ ...filterPagination, search: '', filterby: '', value: -1 })
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
    'MHFD Lead/PM',
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
    options.servicearea = options.servicearea;
    options.county = options.county;
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
    datasets.getData(SERVER.FAVORITES, datasets.getToken()).then(result => {
      setFavorites(result);    
    })    
  }, [listLoaded,updateFavorites]);
 
  useEffect(() => {
    datasets.postData(`${SERVER.PHASE_TYPE}`, { tabKey: tabKeysIds[tabKeys.indexOf(tabKey)] || 0 })
      .then((rows) => {        
        setStatusCounter(rows.length)      
      })
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
    let filterByP = filterby;
    setFilterPagination({ ...filterPagination, search: searchWord, filterby: filterByP, value: filterValue })
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
      {isLoading && <LoadingViewOverall />}
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
                  {openFilters && <Filters setApplyFilter={setApplyFilter} filtersObject={ {filterby, filterValue, tabKey}}/>}
                      {optionSelect === 'List' && <TablePortafolio
                        searchWord={searchWord}
                        searchRef={searchRef}
                        setOpenTable={setOpenTable}
                        openTable={openTable}
                        rawData={newData}
                        index={idx}
                        groupsBy={groupsBy}
                        setCurrentGroup={setCurrentGroup}
                        currentGroup={currentGroup}
                        setSearchWord={setSearchWord}
                        email={appUser.userInformation?.email}
                        setCollapsePhase={setCollapsePhase}
                        collapsePhase={collapsePhase}
                        divRef={tableRef}
                        tabKey={tabKey}
                        tabKeyId = {tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                        setSortValue={setSortValue}
                        favorites={favorites}
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
                        setCurrentGroup={setCurrentGroup}
                        setSearchWord={setSearchWord}
                        searchWord={searchWord}
                        indexParent={idx}
                        searchRef={searchRef}
                        divRef={tableRef}
                        tableRef={tableRef}
                        tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                        index={idx}
                        currentGroup={currentGroup}
                        collapsePhase={collapsePhase}
                        setCollapsePhase={setCollapsePhase}
                        openTable={openTable}
                        setOpenTable={setOpenTable}
                        email={appUser.userInformation?.email}
                        favorites={favorites}
                        setTollData = {setTollData}
                        setOpenModalTollgate = {setOpenModalTollgate}
                        setGrapphicOpen={setGrapphicOpen}
                        setPositionModalGraphic={setPositionModalGraphic}
                        setDataModal={setDataModal}
                        userName={appUser.userInformation?.name}                        
                        filterPagination={filterPagination}
                        setFilterPagination={setFilterPagination}
                        updateFavorites={updateFavorites}
                        setUpdateFavorites={setUpdateFavorites}
                      />                        
                      }
                    {optionSelect === 'Schedule'  && 
                    <CalendarViewPag
                      rawData={newData}
                      groupsBy={groupsBy}
                      setCurrentGroup={setCurrentGroup}
                      setSearchWord={setSearchWord}
                      searchWord={searchWord}
                      indexParent={idx}
                      phaseRef={phaseRef}
                      searchRef={searchRef}
                      divRef={tableRef}
                      tableRef={tableRef}
                      tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                      index={idx}
                      currentGroup={currentGroup}
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
