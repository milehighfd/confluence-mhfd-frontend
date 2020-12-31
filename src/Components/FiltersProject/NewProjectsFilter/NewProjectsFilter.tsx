import React from "react";
import { Button, Row, Col, Popover, Select } from 'antd';
import PieChart from "../NewProblemsFilter/PieChart";
import RheoStat from "../NewProblemsFilter/RheoStat";
import HorizontalBarChart from "../NewProblemsFilter/HorizontalBarChart";
import TreeMap from "../NewProblemsFilter/TreeMap";
import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import RheoStatYear from "../NewProblemsFilter/RheoStatYear";

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Service Area:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content1 = (<div className="popoveer-00"><b>County:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content2 = (<div className="popoveer-00"><b>Jurisdiction:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content3 = (<div className="popoveer-00"><b>Watershed Manager:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content4 = (<div className="popoveer-00"><b>Project Type:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content05 = (<div className="popoveer-00"><b>Estimated Project Cost:</b> is the Estimated Cost (for Projects in progress) or Final Cost (for completed Projects).</div>);
const content06 = (<div className="popoveer-00"><b>Project Status:</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Year Initiated:</b> is the year a Project was initiated. For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
const content08 = (<div className="popoveer-00"><b>Year Completed:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated:</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year:</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Consultant:</b>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager:</b> is the staff person at a local government responsible for planning or implementation of a Project.</div>);
const content13 = (<div className="popoveer-00"><b>Contractor:</b>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content14 = (<div className="popoveer-00"><b>Stream Name:</b>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);

export const NewProjectsFilter = ({ paramProjects, filterProjectOptions, setFilterProjectOptions, getGalleryProjects, setToggleFilters }: any) => {
    const { getParamFilterProjects } = useMapDispatch();
    const { boundsMap } = useMapState();
    const apply = (values: any, field: string) => {
        console.log('values', values, 'field', field);
        //console.log('filterProjectOptions:::', filterProjectOptions, paramProjects);

        const options = { ...filterProjectOptions };
        if ('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field) {
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
        getGalleryProjects();
        getParamFilterProjects(boundsMap, options)
    }
    const reset = () => {
        const options = { ...filterProjectOptions };
        options.projecttype = 'Maintenance,Capital';
        options.status = 'Initiated,Preliminary Design,Construction,Final Design,Hydrology,Floodplain,Alternatives,Conceptual';
        options.mhfddollarsallocated = [];
        options.workplanyear = '';
        options.startyear = '';
        options.completedyear = '';
        options.problemtype = '';
        options.mhfdmanager = '';
        options.jurisdiction = '';
        options.totalcost = [];
        options.streamname = '';
        options.county = '';
        options.lgmanager = '';
        options.creator = '';
        options.problemtype = '';
        options.consultant = '';
        options.contractor = '';
        options.servicearea = '';
        setFilterProjectOptions(options);
        getGalleryProjects();
        getParamFilterProjects(boundsMap, options)
    }
    if (paramProjects.startyear) {
        paramProjects.startyear.sort((a: any, b: any) => {
            return a.value - b.value;
        })
    }

    if (paramProjects.completedyear) {
        paramProjects.completedyear.sort((a: any, b: any) => {
            return a.value - b.value;
        })
    }

    const axisLabel = 'Number of Projects';

    return <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Project type <Popover content={content4}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.projecttype &&
                    <PieChart type={'projecttype'} defaultValue={''}
                        data={paramProjects.projecttype}
                        selected={filterProjectOptions.projecttype}
                        onSelect={(e: string) => apply(e, 'projecttype')} />
                }
            </Col>
            <Col span={12}>
                <h5>Estimated Project Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.estimatedCost &&
                    <RheoStat axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.estimatedCost}
                        selected={filterProjectOptions.totalcost}
                        onSelect={(items: string) => apply(items, 'totalcost')} />
                }
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12}>
                <h5>Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.status &&
                    <HorizontalBarChart type={'status'} defaultValue={''} axisLabel={axisLabel}
                        data={paramProjects.status} color={'#261964'}
                        selected={filterProjectOptions.status}
                        onSelect={(items: any) => apply(items, 'status')} />
                }
            </Col>
            <Col span={12}>
                <h5>MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.mhfddollarsallocated &&
                    <RheoStat axisLabel={axisLabel} defaultValue={[]}
                        data={paramProjects.mhfddollarsallocated}
                        selected={filterProjectOptions.mhfddollarsallocated}
                        onSelect={(items: any) => apply(items, 'mhfddollarsallocated')} />
                }
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12} className="filter-menu">
                <h5>Year Initiated <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.startyear &&
                    <RheoStatYear type={'startyear'} axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.startyear}
                        selected={filterProjectOptions.startyear}
                        onSelect={(e: string) => apply(e, 'startyear')} />
                }
            </Col>
            <Col span={12}>
                <h5>Year Completed <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.completedyear &&
                    <RheoStatYear type={'completedyear'} axisLabel={axisLabel} defaultValue={''}
                        data={paramProjects.completedyear}
                        selected={filterProjectOptions.completedyear}
                        onSelect={(e: string) => apply(e, 'completedyear')} />
                }
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12}>
                <h5>Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramProjects.servicearea &&
                    <TreeMap data={paramProjects.servicearea} type={'servicearea'} tab={'project'}
                        selected={filterProjectOptions.servicearea} defaultValue={''}
                        onSelect={(e: string) => apply(e, 'servicearea')} />
                }
            </Col>
            <Col span={12}>
                <h5>County <Popover content={content1}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.county &&
                    <TreeMap data={paramProjects.county} type={'county'} tab={'project'}
                        selected={filterProjectOptions.county} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'county')} />
                }
            </Col>
        </Row>

        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5>Consultant <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.consultant &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'consultant') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.consultant ? filterProjectOptions.consultant : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'consultant');
                        }}>
                            {paramProjects.consultant.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
            <Col span={12}>
                <h5>Contractor <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.contractor &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'contractor') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.contractor ? filterProjectOptions.contractor : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'contractor');
                        }}>
                            {paramProjects.contractor.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5>Jurisdiction <Popover content={content2}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.jurisdiction &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'jurisdiction') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.jurisdiction ? filterProjectOptions.jurisdiction : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'jurisdiction');
                        }}>
                            {paramProjects.jurisdiction.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
            <Col span={12}>
                <h5>MHFD Watershed Manager <Popover content={content3}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
                {
                    paramProjects.mhfdmanager &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'mhfdmanager') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterProjectOptions.mhfdmanager ? filterProjectOptions.mhfdmanager : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'mhfdmanager');
                        }}>
                            {paramProjects.mhfdmanager.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5>Local Government Mngr <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
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
                        <Select value={filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'lgmanager');
                        }}>
                            {paramProjects.lgmanager.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
            <Col span={12}>
                <h5>Stream Name <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover> </h5>
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
                        <Select value={filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'streamname');
                        }}>
                            {paramProjects.streamname.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5>Work Plan Year <Popover content={content10}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
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
                        <Select value={filterProjectOptions.workplanyear ? filterProjectOptions.workplanyear : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply([`${e}`], 'workplanyear');
                        }}>
                            {paramProjects.workplanyear.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
        </Row>
    </div>
    </>
}