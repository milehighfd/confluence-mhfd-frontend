import React from "react";
import { Button, Row, Col, Checkbox, Popover, Select } from 'antd';
import PieChart from "../NewProblemsFilter/PieChart";
import RheoStat from "../NewProblemsFilter/RheoStat";
import HorizontalBarChart from "../NewProblemsFilter/HorizontalBarChart";
import TreeMap from "../NewProblemsFilter/TreeMap";

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Solution Cost:</b> is the total estimated cost to solve a problem</div>);
const content01 = (<div className="popoveer-00"><b>Priority:</b> is the severity of a problem relative to other problems of the same type.</div>);
const content02 = (<div className="popoveer-00"><b>Element Type:</b> describes the type of improvements needed to solve a Problem.</div>);
const content03 = (<div className="popoveer-00"><b>Status:</b> is the percentage (by cost) of elements required to solve a problem that have been completed.</div>);
const content04 = (<div className="popoveer-00"><b>Source</b> is the document or process through which a Problem was identified.</div>);
const content05 = (<div className="popoveer-00"><b>Total Cost:</b> is the Estimated Cost (for Projects in progress) or Final Cost (for completed Projects).</div>);
const content06 = (<div className="popoveer-00"><b>Project Status:</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Start Year:</b> is the year a Project was initiated. For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
// const content08 = (<div className="popoveer-00"><b>Completed Year:</b> represents the year a Project was finished (monitoring may still be occurring).</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated:</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year:</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Problem Type:</b> is the type of Problem that a Project is intended to help solve.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager:</b> is the staff person at a local government responsible for planning or implementation of a Project.</div>);
const content13 = (<div className="popoveer-00"><b>Creator:</b> is the Confluence user who first created a Project in the Confluence database.</div>);
const content14 = (<div className="popoveer-00"><b>Component Type:</b> is a description of the type of Improvement or Data Point that has been identified at a particular location. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content15 = (<div className="popoveer-00"><b>Component Status:</b> is the status of implementing an improvement. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content16 = (<div className="popoveer-00"><b>Year of Study:</b> refers to the year of the Study in which the Component was first identified or proposed.</div>);
const content17 = (<div className="popoveer-00"><b>Estimated Cost:</b> is the Estimated Cost of implementing or addressing a Component as part of a Capital or Maintenance project.</div>);

export const NewProjectsFilter = ({ paramProjects, filterProjectOptions, setFilterProjectOptions, getGalleryProjects, setToggleFilters }: any) => {
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
    }
    return <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Project type </h5>
                <PieChart type={'projecttype'}
                    data={paramProjects.projecttype}
                    selected={filterProjectOptions.projecttype}
                    onSelect={(e: string) => apply(e, 'projecttype')} />
            </Col>
            <Col span={12}>
                <h5>Total Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <RheoStat
                    data={paramProjects.estimatedCost}
                    selected={filterProjectOptions.totalcost}
                    onSelect={(items: string) => apply(items, 'totalcost')} />
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12}>
                <h5>Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <div className="check-scroll">
                    <HorizontalBarChart type={'status'}
                        data={paramProjects.status}
                        selected={filterProjectOptions.status}
                        onSelect={(items: any) => apply(items, 'status')} />
                </div>
            </Col>
            <Col span={12}>
                <h5>MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <RheoStat
                    data={paramProjects.mhfddollarsallocated}
                    selected={filterProjectOptions.mhfddollarsallocated}
                    onSelect={(items: any) => apply(items, 'mhfddollarsallocated')} />
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12} className="filter-menu">
                <h5>Year Initiated <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <RheoStat type={'year'}
                    data={paramProjects.startyear}
                    selected={filterProjectOptions.startyear}
                    onSelect={(e: string) => apply(e, 'startyear')} />
            </Col>
            <Col span={12}>
                <h5>Year Completed <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <RheoStat type={'year'}
                    data={paramProjects.completedyear}
                    selected={filterProjectOptions.completedyear}
                    onSelect={(e: string) => apply(e, 'completedyear')} />
            </Col>
        </Row>
        <Row className="filt-00">
            <Col span={12}>
                <h5>Service Area</h5>
                <TreeMap data={paramProjects.servicearea} type={'servicearea'} tab={'project'}
                    selected={filterProjectOptions.servicearea}
                    onSelect={(e: string) => apply(e, 'servicearea')} />
            </Col>
            <Col span={12}>
                <h5>County <img src="/Icons/icon-19.svg" alt="" /></h5>
                <TreeMap data={paramProjects.county} type={'county'} tab={'project'}
                    selected={filterProjectOptions.county}
                    onSelect={(items: any) => apply(items, 'county')} />
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters</h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Consultant</label>
                <Select value={filterProjectOptions.consultant ? filterProjectOptions.consultant : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'consultant');
                }}>
                    {paramProjects.consultant.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>Contractor</label>
                <Select value={filterProjectOptions.contractor ? filterProjectOptions.contractor : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'contractor');
                }}>
                    {paramProjects.contractor.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Jurisdiction</label>
                <Select value={filterProjectOptions.jurisdiction ? filterProjectOptions.jurisdiction : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'jurisdiction');
                }}>
                    {paramProjects.jurisdiction.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>MHFD Watershed Manager</label>
                <Select value={filterProjectOptions.mhfdmanager ? filterProjectOptions.mhfdmanager : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'mhfdmanager');
                }}>
                    {paramProjects.mhfdmanager.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Local Government Manager <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
                <Select value={filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'lgmanager');
                }}>
                    {paramProjects.lgmanager.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>Stream Name</label>
                <Select value={filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                    apply(e, 'streamname');
                }}>
                    {paramProjects.streamname.map((element: string, index: number) => {
                        return element && <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5>Work Plan Year <Popover content={content10}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
                <Checkbox.Group value={filterProjectOptions.workplanyear.split(',')} onChange={(item) => {
                    apply(item, 'workplanyear');
                }}>
                    {paramProjects.workplanyear.map((element: {value: number, counter: number}, index: number) => {
                        return <p key={index}><Checkbox value={'' +element.value}>
                            {element.value}</Checkbox>
                            <span className="filt-s">{element.counter}</span>
                        </p>
                    })}
                </Checkbox.Group>
            </Col>
        </Row>
        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} onClick={() => reset()} className="btn-borde">Reset</Button>
        </div>
    </div>
    </>
}