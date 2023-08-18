import React from 'react';
import { Button, Row, Col, Popover, Select } from 'antd';
import PieChart from 'Components/FiltersProject/NewProblemsFilter/PieChart';
import TreeMap from 'Components/FiltersProject/NewProblemsFilter/TreeMap';
import { useMapDispatch, useMapState } from 'hook/mapHook';
import { CheckBoxFilters } from 'Components/FiltersProject/CheckboxFilters';
import { DropdownFilters } from 'Components/FiltersProject/DropdownFilters';
import { useProjectDispatch } from 'hook/projectHook';
import { WINDOW_WIDTH } from 'constants/constants';
import { FILTERS } from 'constants/filter';

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Service Area</b> is the MHFD Watershed Service Area where the project is located.</div>);
const content1 = (<div className="popoveer-00"><b>County</b> is the county where the project is located.</div>);
const content2 = (<div className="popoveer-00"><b>Local Government</b> is the local government where the project is located.</div>);
const content3 = (<div className="popoveer-00"><b>MHFD Lead</b> is the MHFD PM who is responsible for the service area where the project is located.</div>);
const content4 = (<div className="popoveer-00"><b>Project Type</b> is the MHFD program of which the project is a part.</div>);
const content05 = (<div className="popoveer-00"><b>Estimated Project Cost</b> is the estimated total cost of the project based on the cost of the underlying components.</div>);
const content06 = (<div className="popoveer-00"><b>Project Status</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content11 = (<div className="popoveer-00"><b>Consultant</b> is the primary civil engineering design consultant on the project.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Lead</b> is the local government's project manager assigned to the project.</div>);
const content13 = (<div className="popoveer-00"><b>Contractor</b> is the primary civil engineering construction contractor on the project.</div>);
const content14 = (<div className="popoveer-00"><b>Stream Name</b> is the name or ID of the stream where the project is located.</div>);

export const NewProjectsFilter = ({ filtersObject }: { filtersObject?: any }) => {
    const {
        filterProjectOptions,
        paramFilters: {
            projects: paramProjects
        },
        applyFilter,
    } = useMapState();
    const { resetNextPageOfCards, resetInfiniteScrollItems, resetInfiniteScrollHasMoreItems } = useProjectDispatch();
    const {
        getParamFilterProjects,
        setFilterProjectOptions,
    } = useMapDispatch();
    const { boundsMap } = useMapState();
    const apply = (values: any, field: string) => {
        const options = { ...filterProjectOptions };
        console.log('Values at new project filter', values, field);
        const filters = [
            FILTERS.PROJECT.PROJECTTYPE,
            FILTERS.PROJECT.STATUS,
            FILTERS.PROJECT.PROBLEMTYPE,
            FILTERS.PROJECT.CONSULTANT,
            FILTERS.PROJECT.CONTRACTOR,
            FILTERS.PROJECT.JURISDICTION,
            FILTERS.PROJECT.MHFDMANAGER,
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
    return <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
        <Row className="filt-00">
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.SERVICEAREA ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
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
            <Col span={12} className={(filtersObject?.tabKey != 'All' && filtersObject) ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Project type <Popover content={content4}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects?.projecttype &&
                    <PieChart type={FILTERS.PROJECT.PROJECTTYPE} defaultValue={''}
                        data={paramProjects.projecttype}
                        selected={filterProjectOptions.projecttype}
                        onSelect={(e: string) => apply(e, FILTERS.PROJECT.PROJECTTYPE)} />
                }
            </Col>
            <Col span={12} className={filtersObject?.filterby === FILTERS.PROJECT.STATUS ? 'disabledchart': ''}>
                <h5 className="filter-title chart-filter-title">Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects?.status &&
                    <CheckBoxFilters defaultValue={5}
                        data={(paramProjects.status.filter((a: any) => {
                            if (a.value === 'Approved') return 1;
                            if (a.value === 'Active') return 1;
                            if (a.value === 'Closeout') return 1;
                            if (a.value === 'Closed') return 1;
                            if (a.value === 'Inactive') return 1;
                            if (a.value === 'Cancelled') return 1;
                            return false;
                            //return a.value.localeCompare(b.value);
                        })).sort((a: any, b: any) => {
                            const getValue = (d: string) => {
                                if (d === 'Approved') return 0;
                                if (d === 'Active') return 1;
                                if (d === 'Closeout') return 2;
                                if (d === 'Closed') return 3;
                                if (d === 'Inactive') return 4;
                                if (d === 'Cancelled')return 5;
                                return -1;
                            }
                            return getValue(a.value) - getValue(b.value);
                        })}
                        selected={filterProjectOptions.status}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.STATUS)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Estimated Project Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects?.estimatedCost &&
                    <DropdownFilters type={FILTERS.PROJECT.TOTALCOST} axisLabel={axisLabel} defaultValue={''}
                        selected={filterProjectOptions.totalcost}
                        onSelect={(items: string) => apply(items, FILTERS.PROJECT.TOTALCOST)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ paddingRight: '0px', paddingLeft:'14px', marginBottom: 25 }} gutter={[24, 16]}>
            <Col span={12} style={{paddingLeft:'0px'}} className={filtersObject?.filterby === FILTERS.PROJECT.CONSULTANT ? 'disabledchart': ''}>
                <h5 className="filter-title">Consultant <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.consultant &&
                    <CheckBoxFilters defaultValue={""}
                    data={paramProjects.consultant.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                    selected={filterProjectOptions.consultant}
                    onSelect={(items: any) => apply(items, FILTERS.PROJECT.CONSULTANT)} />
                }
            </Col>
            <Col span={12}  style={{paddingLeft:'6px'}} className={filtersObject?.filterby === FILTERS.PROJECT.CONTRACTOR ? 'disabledchart': ''}>
                <h5 className="filter-title">Contractor <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.contractor &&
                    <CheckBoxFilters defaultValue={""}
                    data={paramProjects.contractor.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                    selected={filterProjectOptions.contractor}
                    onSelect={(items: any) => apply(items, FILTERS.PROJECT.CONTRACTOR)} />
                }
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
            <Col span={12}>
                <h5 className="filter-title">MHFD Lead <Popover content={content3}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.mhfdmanager &&
                    <CheckBoxFilters defaultValue={''}
                        data={paramProjects.mhfdmanager.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterProjectOptions.mhfdmanager}
                        onSelect={(items: any) => apply(items, FILTERS.PROJECT.MHFDMANAGER)} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}>
                <h5 className="filter-title">Local Government Lead <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.lgmanager &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => apply('', FILTERS.PROJECT.LGMANAGER)}>
                            <u>Reset</u>
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
            <Col span={12}>
                <h5 className="filter-title">Stream Name <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover> </h5>
                {
                    paramProjects?.streamname &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', FILTERS.PROJECT.STREAMNAME) }}>
                            <u>Reset</u>
                        </Button>
                        <Select
                            value={filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -'}
                            style={{ width: '100%', fontSize: '12px' }}
                            listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
                            onChange={(e: string) => {
                            apply(e, FILTERS.PROJECT.STREAMNAME);
                        }}>
                            {paramProjects.streamname.map((element: any, index: number) => {
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