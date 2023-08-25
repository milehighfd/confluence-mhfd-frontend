import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Popover, Select, Input, Checkbox } from 'antd';
import PieChart from 'Components/FiltersProject/NewProblemsFilter/PieChart';
import TreeMap from 'Components/FiltersProject/NewProblemsFilter/TreeMap';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { CheckBoxFilters } from 'Components/FiltersProject/CheckboxFilters';
import { DropdownFilters } from 'Components/FiltersProject/DropdownFilters';
import { useProjectDispatch } from 'hook/projectHook';
import { WINDOW_WIDTH } from 'constants/constants';
import { FILTERS } from 'constants/filter';
import store from 'store';

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Service Area</b> is the MHFD Watershed Service Area where the project is located.</div>);
const content0 = (<div className="popoveer-00"><b>Personalized</b> is the name or ID of the stream where the project is located.</div>);
const content1 = (<div className="popoveer-00"><b>County</b> is the county where the project is located.</div>);
const content2 = (<div className="popoveer-00"><b>Local Government</b> is the local government where the project is located.</div>);
const content3 = (<div className="popoveer-00"><b>MHFD Lead</b> is the MHFD PM who is responsible for the service area where the project is located.</div>);
const content4 = (<div className="popoveer-00"><b>Project Type</b> is the MHFD program of which the project is a part.</div>);
const content5 = (<div className="popoveer-00"><b>Project Phase</b> is the MHFD program of which the project is a part.</div>);
const content05 = (<div className="popoveer-00"><b>Estimated Project Cost</b> is the estimated total cost of the project based on the cost of the underlying components.</div>);
const content06 = (<div className="popoveer-00"><b>Project Status</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content11 = (<div className="popoveer-00"><b>Consultant</b> is the primary civil engineering design consultant on the project.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Lead</b> is the local government's project manager assigned to the project.</div>);
const content13 = (<div className="popoveer-00"><b>Contractor</b> is the primary civil engineering construction contractor on the project.</div>);
const content14 = (<div className="popoveer-00"><b>Stream Name</b> is the name or ID of the stream where the project is located.</div>);
const content15 = (<div className="popoveer-00"><b>Work Plan Year</b> is the name or ID of the stream where the project is located.</div>);
const content16 = (<div className="popoveer-00"><b>MHFD Manager</b> is the name or ID of the stream where the project is located.</div>);
const content17 = (<div className="popoveer-00"><b>Local Government Manager</b> is the name or ID of the stream where the project is located.</div>);


export const NewProjectsFilter = ({ filtersObject }: { filtersObject?: any }) => {
    const {
        filterProjectOptions,
        paramFilters: {
            projects: paramProjects
        },
        applyFilter,
    } = useMapState();
    const { resetNextPageOfCards, resetInfiniteScrollItems, resetInfiniteScrollHasMoreItems } = useProjectDispatch();
    const appUser = store.getState().profile;
    const {
        getParamFilterProjects,
        setFilterProjectOptions,
    } = useMapDispatch();
    const { boundsMap } = useMapState();
    const [myTeams, setMyTeams] = useState(filterProjectOptions.teams !== '' && filterProjectOptions.teams !== undefined);
    const [openFavorites, setOpenFavorites] = useState(false);
    const [selectedData, setSelectedData] = useState<any[]>([]);
    const [selectedConsultants, setSelectedConsultants] = useState<string[]>([]);
    const [selectedContractors, setSelectedContractors] = useState<string[]>([]);
    const apply = (values: any, field: string) => {
        const options = { ...filterProjectOptions };
        const filters = [
            FILTERS.PROJECT.PROJECTTYPE,
            FILTERS.PROJECT.STATUS,
            FILTERS.PROJECT.PROBLEMTYPE,
            FILTERS.PROJECT.CONSULTANT,
            FILTERS.PROJECT.CONTRACTOR,
            FILTERS.PROJECT.JURISDICTION,
            FILTERS.PROJECT.MHFDMANAGER,
            FILTERS.PROJECT.FAVORITES,
            FILTERS.PROJECT.PHASE
        ];
        if (filters.includes(field)) {
            let newValue = '';
            newValue = values;
            options[field] = newValue;
        } else {
            if (FILTERS.PROJECT.STREAMNAME === field || FILTERS.PROJECT.LGMANAGER === field) {
              if (values === '') {
                options[field] = values;
              } else {
                options[field] = [values];
              }
            } else if (FILTERS.PROJECT.TOTALCOST === field) {
                if(values.length === 0 || values === ''){
                    options[field] = []
                }else {
                    options[field] = [values[0], values[values.length - 1]];
                }
            } else {
                options[field] = values;
            }
        }
        setFilterProjectOptions(options);
        let defaultBounds = `${-105.3236683149282},${39.274174328991904},${-104.48895750946532},${40.26156304805423}`; 
        getParamFilterProjects(applyFilter ? boundsMap : defaultBounds, options);
        
        resetNextPageOfCards();
        resetInfiniteScrollItems();
        resetInfiniteScrollHasMoreItems();
    }

    const filtersSortByLocaleCompare = [
        FILTERS.PROJECT.CONSULTANT,
        FILTERS.PROJECT.CONTRACTOR,
        FILTERS.PROJECT.JURISDICTION,
        FILTERS.PROJECT.MHFDMANAGER,
        FILTERS.PROJECT.LGMANAGER,
        FILTERS.PROJECT.STREAMNAME,
    ];

    filtersSortByLocaleCompare
        .forEach((key: string) => {
            if (paramProjects[key]) {
                paramProjects[key].sort((a: any, b: any) => {
                    return a?.value?.localeCompare(b?.value)
                });
            }
        });

    const axisLabel = 'Number of Projects';

    useEffect(() => {
        if (openFavorites) {
            const user_id = appUser.userInformation?.user_id;
            apply(user_id,FILTERS.PROJECT.FAVORITES)
        } else {
            apply('',FILTERS.PROJECT.FAVORITES)
        }
    }, [openFavorites]);

    useEffect(() => {
        if (myTeams) {
            const user_contact = appUser.userInformation?.business_associate_contact?.business_associate_contact_id || -1;
            apply(user_contact,FILTERS.PROJECT.TEAMS)
        } else {
            apply('',FILTERS.PROJECT.TEAMS)
        }
    }, [myTeams]);

    useEffect(() => {
        if (filterProjectOptions.consultant.length > 0) {
            setSelectedConsultants(filterProjectOptions.consultant);
        }
    }, [filterProjectOptions.consultant]);

    useEffect(() => {
        if (filterProjectOptions.contractor.length > 0) {
            setSelectedContractors(filterProjectOptions.contractor);
        }
    }, [filterProjectOptions.contractor]);

    useEffect(() => {
        if (filterProjectOptions.favorites === '' || filterProjectOptions.favorites === undefined) {
            setOpenFavorites(false);
        } else {
            setOpenFavorites(true);
        }
    }, [filterProjectOptions.favorites]);

    useEffect(() => {
        if (filterProjectOptions.teams !== '' && filterProjectOptions.teams !== undefined) {
            setMyTeams(true);
        } else {
            setMyTeams(false);
        }
    }, [filterProjectOptions.teams]);

    return <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
        <div className='filt-00'>
            <h5 className="filter-title chart-filter-title">Personalized <Popover content={content0}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
            <div className='body-filt-00'>
                <Button className={`btn-svg-text ${openFavorites ? 'btn-svg-text-active' : ''}`} onClick={() => { setOpenFavorites(!openFavorites)}} style={{borderRadius: '3px 0px 0px 3px'}}>
                    <img src="/Icons/ic-favorites.svg" alt=""/>
                    <br/>
                    My Favorites
                </Button>
                <Button className={`btn-svg-text ${myTeams ? 'btn-svg-text-active' : ''}`} onClick={() => { setMyTeams(!myTeams)}} style={{borderRadius: '0px 3px 3px 0px'}}>
                    <img src="/Icons/ic-team.svg" alt=""/>
                    <br/>
                    My Teams
                </Button>
            </div>
        </div>
        <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.SERVICEAREA ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                {
                    paramProjects?.servicearea &&
                    <TreeMap data={paramProjects.servicearea} type={FILTERS.PROJECT.SERVICEAREA} tab={'project'}
                        selected={filterProjectOptions.servicearea} defaultValue={''}
                        onSelect={(e: string) => apply(e, FILTERS.PROJECT.SERVICEAREA)} />
                }
            </Col>
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.COUNTY ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">County <Popover content={content1}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.county &&
                    <TreeMap data={paramProjects.county} type={FILTERS.PROJECT.COUNTY} tab={'project'}
                        selected={filterProjectOptions.county} defaultValue={''}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.COUNTY)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={24} className={(filtersObject?.tabKey != 'All' && filtersObject) ? 'disabledchart': ''}>
                {/* <div className='sub-title-sec'> */}
                  <h5 className="filter-title chart-filter-title">Project type <Popover content={content4}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                  <div>
                    <Button className="btn-svg" onClick={() => apply(selectedData,FILTERS.PROJECT.PROJECTTYPE)}>
                      Apply
                    </Button>
                    &nbsp;<span style={{color:'##11093c'}}>|</span>&nbsp;
                    <Button className="btn-svg" onClick={() => apply('',FILTERS.PROJECT.PROJECTTYPE)}>
                        Reset
                    </Button>
                  </div>
                {/* </div> */}
                {
                    paramProjects?.projecttype &&
                    <PieChart type={FILTERS.PROJECT.PROJECTTYPE} defaultValue={''}
                        data={paramProjects.projecttype}
                        selected={filterProjectOptions.projecttype}
                        onSelect={(e: string) => apply(e, FILTERS.PROJECT.PROJECTTYPE)}
                        selectedData={selectedData}
                        setSelectedData={setSelectedData}
                    />
                }
            </Col>
            
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.STATUS ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                {
                    paramProjects?.status &&
                    <CheckBoxFilters defaultValue={5}
                        data={(paramProjects.status)}
                        selected={filterProjectOptions.status}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.STATUS)} />
                }
            </Col>
            <Col span={12} className={(filtersObject?.tabKey != 'All' && filtersObject) ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Project Phase <Popover content={content5}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                {
                    paramProjects?.phaseName &&
                    <CheckBoxFilters defaultValue={''}
                        data={(paramProjects.phaseName)}
                        selected={filterProjectOptions.phase}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.PHASE)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12}>
                {/* <div className='sub-title-sec' style={{width:'200%'}}> */}
                  <h5 className="filter-title chart-filter-title">Estimated Project Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                {/* </div> */}
                {
                    paramProjects?.estimatedCost &&
                    <DropdownFilters type={FILTERS.PROJECT.TOTALCOST} axisLabel={axisLabel} defaultValue={''}
                        selected={filterProjectOptions.totalcost}
                        onSelect={(items: string) => apply(items, FILTERS.PROJECT.TOTALCOST)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}  className={filtersObject?.filterby === FILTERS.PROJECT.CONSULTANT ? 'disabledchart': ''}>
                <h5 className="filter-title">Consultant <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                <Button className="btn-svg" onClick={() => apply(selectedConsultants, FILTERS.PROJECT.CONSULTANT)}>
                    Apply
                </Button>
                &nbsp;<span style={{color:'#11093c'}}>|</span>&nbsp;
                <Button className="btn-svg" 
                onClick={() => {
                    apply('', FILTERS.PROJECT.CONSULTANT)
                    setSelectedConsultants([]);
                }}
                >
                    Reset
                </Button>
                <Select
                    mode="multiple"
                    placeholder={"Search here.."}
                    style={{ width: '100%' }}
                    listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                    value={selectedConsultants}
                    onChange={(value: string[]) => {
                        setSelectedConsultants(value);
                      }}
                >
                    {paramProjects?.consultant?.map((element: any, index: number) => {
                        return element && <Option key={index} value={element.id}>{`${element.value} `}</Option>
                    })}
                </Select>

            </Col>
            <Col span={12}  className={filtersObject?.filterby === FILTERS.PROJECT.CONTRACTOR ? 'disabledchart': ''} style={{paddingLeft:'0px'}}>
                <h5 className="filter-title">Contractor <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                 <Button className="btn-svg" onClick={() => apply(selectedContractors, FILTERS.PROJECT.CONTRACTOR)}>
                    Apply
                </Button>
                &nbsp;<span style={{color:'#11093c'}}>|</span>&nbsp;
                <Button className="btn-svg" 
                onClick={() => {
                    apply('', FILTERS.PROJECT.CONTRACTOR)
                    setSelectedContractors([]);
                }}>
                    Reset
                </Button>
                <Select
                    mode="multiple"
                    placeholder={"Search here.."}
                    style={{ width: '100%' }}
                    listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                    value={selectedContractors}
                    onChange={(value: string[]) => {
                        setSelectedContractors(value);
                      }}
                >
                    {paramProjects?.contractor?.map((element: any, index: number) => {
                        return element && <Option key={index} value={element.id}>{`${element.value} `}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.JURISDICTION ? 'disabledchart': ''}>
                <h5 className="filter-title">Local Government <Popover content={content2}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.jurisdiction &&
                    <CheckBoxFilters defaultValue={''}
                        data={paramProjects.jurisdiction.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterProjectOptions.jurisdiction}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.JURISDICTION)} />
                }
            </Col>
            <Col span={12} style={{paddingLeft:'0px'}}>
                <h5 className="filter-title">Work Plan Year <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                <Button className="btn-svg">
                  Apply
                </Button>
                &nbsp;<span style={{color:'#11093c'}}>|</span>&nbsp;
                <Button className="btn-svg" onClick={()=> apply('', FILTERS.PROJECT.WORKPLANYEAR)}>
                  Reset
                </Button>
                <Select
                  placeholder="Select"
                  style={{ width: '100%', fontSize: '12px' }}
                  listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                  value={filterProjectOptions.workplanyear ? filterProjectOptions.workplanyear : '- Select -'}
                  onSelect={(e: string) => apply(e, FILTERS.PROJECT.WORKPLANYEAR)}
                >
                  <Option key={'2022'} value={'2022'}>2022</Option>
                  <Option key={'2023'} value={'2023'}>2023</Option>
                </Select>        
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">MHFD Lead <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></h5>
                {
                    paramProjects?.mhfdmanager &&
                    <CheckBoxFilters defaultValue={''}
                        data={(paramProjects.mhfdmanager)}
                        selected={filterProjectOptions.mhfdmanager}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.MHFDMANAGER)} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title">Local Government Lead <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects?.lgmanager &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            Apply
                        </Button>
                        &nbsp;<span style={{color:'#E9E8EF'}}>|</span>&nbsp;
                        <Button className="btn-svg" onClick={() => apply('', FILTERS.PROJECT.LGMANAGER)}>
                            Reset
                        </Button>
                        <Select
                            value={filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -'}
                            listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                            style={{ width: '100%', fontSize: '12px' }}
                            onChange={(e: string) => {
                            apply(e, FILTERS.PROJECT.LGMANAGER);
                        }}>
                            {paramProjects.lgmanager.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.id}>{`${element.value} `}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{height: 50}}>
            <Col span={24} style={{height: 50}}></Col>
        </Row>
    </div>
    </>
}