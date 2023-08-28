import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Row, Tabs } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined, DownOutlined, HeartFilled, HeartOutlined,  UpOutlined } from '@ant-design/icons';
import TablePortafolio from 'routes/portfolio-view/components/TablePortfolio';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import Filters from 'routes/portfolio-view/components/Filters';
import ModalFields from 'routes/list-view/components/ModalFields';
import ModalTollgate from 'routes/list-view/components/ModalTollgate';
import ModalGraphic from 'routes/portfolio-view/components/ModalGraphic';
import store from 'store';
import { FilterByGroupName } from 'routes/portfolio-view/components/FilterByGroupField';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';
import PhaseViewPag from 'routes/portfolio-view/components/PhaseViewPag';
import CalendarViewPag from 'routes/portfolio-view/components/CalendarViewPag';
import { usePortflioState, usePortfolioDispatch } from 'hook/portfolioHook';
import { handleAbortError } from 'store/actions/mapActions';

const { TabPane } = Tabs;
let isInit = true;
const tabKeys = ['All','CIP', 'Restoration', 'Study', 'DIP', 'R&D', 'Acquisition'];
// TODO: REVIEW IF MAINTENANCE IDS should be here too
const tabKeysIds = [0, 5, 7, 1, 6, 15, 13];

const PortafolioBody = () => {
  const {
    setFilterProjectOptions,
    resetFiltercomponentOptions,
    getParamFilterProjectsNoBounds,
    setBoundMap,
    resetFilterProjectOptionsEmpty,
    setTabActiveNavbar
  } = useMapDispatch();

  const {
    filterProjectOptions,
    filterProjectOptionsNoFilter,
    tabActiveNavbar
  } = useMapState();
  const {
    searchWord, graphicOpen
  } = usePortflioState();
  const { setFavorites, getListPMTools, setOpenGroups, getActionsDone } = usePortfolioDispatch();

  const [filterby, setFilterby] = useState('');
  const [filterValue, setFilterValue] = useState(-1);
  const [filtername, setFiltername] = useState('Mile High Flood District');
  const [tabKey, setTabKey] = useState<any>('All');
  const [openFilters, setOpenFilters] = useState(false);
  const [myTeams, setMyTeams] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openModalTable, setOpenModalTable] = useState(false);
  let displayedTabKey = tabKeys;
  const [openDrop, setOpenDrop] = useState(false);
  const [newData, setNewData] = useState<any>([]);
  const [sortValue, setSortValue] = useState({columnKey: null, order: undefined});
  const appUser = store.getState().profile;
  const [updateFilter, setUpdateFilter] = useState([]);

  useEffect(() => {
    setTabActiveNavbar('List')
    getParamFilterProjectsNoBounds();
    if (searchWord) {
      let currentNewData = [...newData].filter((d: any) => d.id.includes('Title') || d.rowLabel.toLowerCase().includes(searchWord.toLowerCase()));
      currentNewData = currentNewData.filter((d: any, idx: number) => (d.id.includes('Title') && (currentNewData[idx + 1] ? currentNewData[idx + 1].id.includes('Title') : true)) ? false : true);
      setNewData(currentNewData);
      const sortedData = currentNewData.filter((elem: any) => elem.id.includes('Title'));
      setOpenGroups(new Array(sortedData.length).fill(true));
    } else {
      setNewData([]);
      const sortedData = [...newData].filter((elem: any) => elem.id.includes('Title'));
      setOpenGroups(new Array(sortedData.length).fill(true));
    }
    setOpenGroups([true]);
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
  
  useEffect(() => {
    filterProjectOptions.name = searchWord;
    filterProjectOptions.keyword = searchWord
    setFilterProjectOptions(filterProjectOptions)
    setUpdateFilter(filterProjectOptions);    
  }, []);

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
    isInit=true;
    resetFilterProjectOptionsEmpty();
    if (filterValue != -1) {
      apply([filterValue], filterby, '');     
    } else {
      apply([], filterby, '');
    }
  } ,[filterby, filterValue]);

  useEffect(() => {
    if (openFavorites){
      const auxOptions = { ...filterProjectOptions };
      auxOptions.favorites = appUser.userInformation?.user_id;
      setFilterProjectOptions(auxOptions);
    }else{
      const auxOptions = { ...filterProjectOptions };
      delete auxOptions.favorites;
      setFilterProjectOptions(auxOptions);
    }   
  }, [openFavorites]);

  useEffect(() => {
    if (myTeams){
      const auxOptions = { ...filterProjectOptions };
      auxOptions.teams = appUser.userInformation?.business_associate_contact?.business_associate_contact_id || -1;
      setFilterProjectOptions(auxOptions);
    }else{
      const auxOptions = { ...filterProjectOptions };
      delete auxOptions.teams;
      setFilterProjectOptions(auxOptions);
    }   
  }, [myTeams]);

  useEffect(() => {
    if (sortValue.columnKey === 'project_type' && sortValue.order !== undefined) {
      const auxOptions = { ...filterProjectOptions };
      auxOptions.sortby = 'projecttype';
      auxOptions.sorttype = sortValue.order === 'ascend' ? 'asc' : 'desc';
      setFilterProjectOptions(auxOptions);
    } else if (sortValue.columnKey && sortValue.order !== undefined) {
      const auxOptions = { ...filterProjectOptions };
      auxOptions.sortby = sortValue.columnKey;
      auxOptions.sorttype = sortValue.order === 'ascend' ? 'asc' : 'desc';
      setFilterProjectOptions(auxOptions);
    } else {
      const auxOptions = { ...filterProjectOptions };
      delete auxOptions.sortby;
      delete auxOptions.sorttype;
      setFilterProjectOptions(auxOptions);
    }
  }, [sortValue]);

  useEffect(() => {
    isInit=false;
    const currentId: number = tabKeysIds[tabKeys.indexOf(tabKey)] || 0;
    if (currentId == 0) {
      apply([], 'projecttype', '');
    } else {
      console.log('antes de action')
      getListPMTools(currentId)
      getActionsDone()
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
    }).catch(handleAbortError);
    return () => {
      controller.abort();
    };
  }, [setFavorites]);
 
  function enterPhase() {
    if(tabKey === 'All'){
      setTabKey('CIP');
    }
    setTabActiveNavbar('Phase');    
  }  
  function enterSchedule() {   
    setTabActiveNavbar('Schedule')       
  }
  function enterList (){
    setTabActiveNavbar('List')
  }
  function changeTabkey (key : any){   
    setTabKey(key)
  }
  function openFavs (){
    setOpenFavorites(!openFavorites)   
  }

  return <>
    {graphicOpen && <ModalGraphic/>}
    {openModalTable && <ModalFields visible={openModalTable} setVisible={setOpenModalTable}/>}
    <ModalTollgate />
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
            <Button className={tabActiveNavbar=== 'List' ? "btn-view btn-view-active": "btn-view"} onClick={()=>{enterList()}}>
              List
            </Button>
            <Button className={tabActiveNavbar=== 'Phase' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{enterPhase()}}>
              Phase
            </Button>
            <Button className={tabActiveNavbar=== 'Schedule' ? "btn-view btn-view-active": "btn-view"}  onClick={()=>{enterSchedule()}}>
              Schedule
            </Button>

          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{textAlign:'right'}}>
            <Button className={myTeams ? "btn-filter-k btn-filter-k-active":"btn-filter-k" } onClick={()=>{setMyTeams(!myTeams)}}>
              {myTeams? <CheckCircleFilled style={{color:'#2ac499', fontSize: '16px'}}/>:<CheckCircleOutlined style={{color: '#251863', fontSize: '16px'}} />} My Teams
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
          {(tabActiveNavbar === 'Phase' || tabActiveNavbar === 'Schedule') && <div>
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
          onChange={(key) => changeTabkey(key)} className="tabs-pm-tools">
          {
            displayedTabKey.map((tk: string, idx: number) => {
              return (
                <TabPane style={{ marginBottom: '0px', zIndex: 1 }} tab={<span>{tk}</span>} key={tk} disabled={(tabActiveNavbar === 'Phase') && tk === 'All' ? true : false}>
                  <div className="protafolio-body">
                    {openFilters && <Filters filtersObject={{ filterby, filterValue, tabKey }} />}
                    {tabActiveNavbar === 'List' && <TablePortafolio
                      tabKey={tabKey}
                      tabKeyId={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                      setSortValue={setSortValue}
                    />
                    }
                    {tabActiveNavbar === 'Phase' &&
                      <PhaseViewPag
                        tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
                      />
                    }
                    {tabActiveNavbar === 'Schedule' &&
                      <CalendarViewPag
                        tabKey={tabKeysIds[tabKeys.indexOf(tabKey)] || 0}
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
