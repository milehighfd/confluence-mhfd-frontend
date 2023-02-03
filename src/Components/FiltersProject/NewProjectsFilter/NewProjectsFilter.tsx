import React from "react";
import { Button, Row, Col, Popover, Select } from 'antd';
import PieChart from "../NewProblemsFilter/PieChart";
import TreeMap from "../NewProblemsFilter/TreeMap";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import { CheckBoxFilters } from '../CheckboxFilters';
import { DropdownFilters } from "../DropdownFilters";
import { DropdownFiltersYears } from "../DropdownFiltersYears";

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Service Area</b> is the MHFD Watershed Service Area where the project is located.</div>);
const content1 = (<div className="popoveer-00"><b>County</b> is the county where the project is located.</div>);
const content2 = (<div className="popoveer-00"><b>Jurisdiction</b> is the local government where the project is located.</div>);
const content3 = (<div className="popoveer-00"><b>MHFD Project Manager</b> is the MHFD PM who is responsible for the service area where the project is located.</div>);
const content4 = (<div className="popoveer-00"><b>Project Type</b> is the MHFD program of which the project is a part.</div>);
const content05 = (<div className="popoveer-00"><b>Estimated Project Cost</b> is the estimated total cost of the project based on the cost of the underlying components.</div>);
const content06 = (<div className="popoveer-00"><b>Project Status</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Year Initiated</b> is the year a Project was initiated (i.e. provided MHFD funding). For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
const content08 = (<div className="popoveer-00"><b>Year Completed</b> is the year a project was closed out by MHFD.</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Consultant</b> is the primary civil engineering design consultant on the project.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager</b> is the local government's project manager assigned to the project.</div>);
const content13 = (<div className="popoveer-00"><b>Contractor</b> is the primary civil engineering construction contractor on the project.</div>);
const content14 = (<div className="popoveer-00"><b>Stream Name</b> is the name or ID of the stream where the project is located.</div>);

export const NewProjectsFilter = ({originpage, setApplyFilter}: {originpage?:string, setApplyFilter?:Function}) => {
    const {
        filterProjectOptions,
        paramFilters: {
            projects: paramProjects
        }
    } = useMapState();
    const {
        getParamFilterProjects,
        setFilterProjectOptions,
        getGalleryProjects,
        getProjectsFilteredIds,
        getProjectCounter,
    } = useMapDispatch();
    const { boundsMap } = useMapState();
    const apply = (values: any, field: string) => {
        const options = { ...filterProjectOptions };
        if ('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field
        || 'consultant' === field || 'contractor' === field || 'jurisdiction' === field 
        || 'mhfdmanager' === field) {
            let newValue = '';
            if ('workplanyear' === field) {
                options['status'] = options['status'] + ',Complete';
            }

            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element) : element;
            }
            options[field] = newValue;
        } else {
            if ('completedyear' === field) {
                let newValue = options['status'] + ',Complete';
                options['status'] = newValue;
                options[field] = values;
            } else {
                options[field] = values;
            }
        }

        setFilterProjectOptions(options);
        if(originpage === 'portfolio' && setApplyFilter) {
          setApplyFilter(Math.random());
        } else {
                               console.log('get gallery'); 
                      getGalleryProjects();;
        }
        options.servicearea = options.servicearea.trim();
        options.county = options.county.replace("County","").trim();
        getParamFilterProjects(boundsMap, options);
        getProjectCounter(boundsMap, options);
    }

    ['startyear', 'completedyear', 'workplanyear'].forEach((key: string) => {
        if (paramProjects[key]) {
            paramProjects.completedyear.sort((a: any, b: any) => {
                return a.value - b.value;
            })
        }
    });

    ['consultant', 'contractor', 'jurisdiction', 'mhfdmanager', 'lgmanager', 'streamname']
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
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.servicearea &&
                    <TreeMap data={paramProjects.servicearea} type={'servicearea'} tab={'project'}
                        selected={filterProjectOptions.servicearea} defaultValue={''}
                        onSelect={(e: string) => apply(e, 'servicearea')} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">County <Popover content={content1}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.county &&
                    <TreeMap data={paramProjects.county} type={'county'} tab={'project'}
                        selected={filterProjectOptions.county} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'county')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Project type <Popover content={content4}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.projecttype &&
                    <PieChart type={'projecttype'} defaultValue={''}
                        data={paramProjects.projecttype}
                        selected={filterProjectOptions.projecttype}
                        onSelect={(e: string) => apply(e, 'projecttype')} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.status &&
                    <CheckBoxFilters defaultValue={'Active'}
                        data={paramProjects.status.sort((a: any, b: any) => {
                            const getValue = (d: string) => {
                                if (d === 'Approved') return 0;
                                if (d === 'Active') return 1;
                                if (d === 'Closed') return 2;
                                if (d === 'Inactive') return 3;
                                if (d === 'Cancelled')return 4;
                                return -1;
                            }
                            return getValue(a.value) - getValue(b.value);
                        })}
                        selected={filterProjectOptions.status}
                        onSelect={(items: any) => apply(items, 'status')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Estimated Project Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.estimatedCost &&
                    <DropdownFilters type={'totalcost'} axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.estimatedCost}
                        selected={filterProjectOptions.totalcost}
                        onSelect={(items: string) => apply(items, 'totalcost')} />
                }
            </Col>
        </Row>
        {/* <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12} >
                <h5 className="filter-title chart-filter-title">MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.mhfddollarsallocated &&
                    <DropdownFilters type={'mhfddollarsallocated'} axisLabel={axisLabel} defaultValue={[]}
                        data={paramProjects.mhfddollarsallocated}
                        selected={filterProjectOptions.mhfddollarsallocated}
                        onSelect={(items: any) => apply(items, 'mhfddollarsallocated')} />
                }
            </Col>
        </Row> */}
        <hr className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12}  style={{ paddingLeft: '0px', paddingRight: '14pxpx' }} className="filter-menu">
                <h5 className="filter-title chart-filter-title">Year Initiated <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.startyear &&
                    <DropdownFiltersYears type={'startyear'} axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.startyear}
                        selected={filterProjectOptions.startyear}
                        onSelect={(e: string) => apply(e, 'startyear')} />
                }
            </Col>
            <Col span={12} style={{ paddingLeft: '14px', paddingRight: '0px' }} >
                <h5 className="filter-title chart-filter-title">Year Completed <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.completedyear &&
                    <DropdownFiltersYears type={'completedyear'} axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.completedyear}
                        selected={filterProjectOptions.completedyear}
                        onSelect={(e: string) => apply(e, 'completedyear')} />
                }
            </Col>
        </Row>

        
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ paddingRight: '0px', paddingLeft:'14px', marginBottom: 25 }} gutter={[24, 16]}>
            <Col span={12} style={{paddingLeft:'0px'}}>
                <h5 className="filter-title">Consultant <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.consultant &&
                    <CheckBoxFilters defaultValue={''}
                    data={paramProjects.consultant.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                    selected={filterProjectOptions.consultant}
                    onSelect={(items: any) => apply(items, 'consultant')} />
                }
            </Col>
            <Col span={12}  style={{paddingLeft:'6px'}}>
                <h5 className="filter-title">Contractor <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.contractor &&
                    <CheckBoxFilters defaultValue={''}
                    data={paramProjects.contractor.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                    selected={filterProjectOptions.contractor}
                    onSelect={(items: any) => apply(items, 'contractor')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}>
                <h5 className="filter-title">Jurisdiction <Popover content={content2}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.jurisdiction &&
                    <CheckBoxFilters defaultValue={''}
                        data={paramProjects.jurisdiction.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterProjectOptions.jurisdiction}
                        onSelect={(items: any) => apply(items, 'jurisdiction')} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title">MHFD Project Manager <Popover content={content3}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.mhfdmanager &&
                    <CheckBoxFilters defaultValue={''}
                        data={paramProjects.mhfdmanager.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterProjectOptions.mhfdmanager}
                        onSelect={(items: any) => apply(items, 'mhfdmanager')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}>
                <h5 className="filter-title">Local Government Mngr <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.lgmanager &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'lgmanager') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -'} style={{ width: '100%', fontSize: '12px' }} onChange={(e: string) => {
                            apply(e, 'lgmanager');
                        }}>
                            {paramProjects.lgmanager.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} `}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title">Stream Name <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.streamname &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'streamname') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -'} style={{ width: '100%', fontSize: '12px' }} onChange={(e: string) => {
                            apply(e, 'streamname');
                        }}>
                            {paramProjects.streamname.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} `}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" gutter={[24, 16]} style={{marginBottom: 25}}>
            <Col span={12}>
                <h5 className="filter-title">Work Plan Year <Popover content={content10}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.workplanyear &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply([], 'workplanyear') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.workplanyear ? filterProjectOptions.workplanyear : '- Select -'} style={{ width: '100%', fontSize: '12px' }} onChange={(e: string) => {
                            apply([`${e}`], 'workplanyear');
                        }}>
                            {paramProjects.workplanyear.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} `}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]} style={{height: 50}}>
            <Col span={24} style={{height: 50}}></Col>
        </Row>
    </div>
    </>
}