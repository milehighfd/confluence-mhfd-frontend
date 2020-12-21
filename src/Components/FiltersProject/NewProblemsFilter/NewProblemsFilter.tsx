import React from 'react';
import { Row, Col, Select, Button, Popover } from 'antd';
import PieChart from './PieChart';
import RheoStat from './RheoStat';
import BarChart from './BarChart';
import TreeMap from './TreeMap';
import HorizontalBarChart from './HorizontalBarChart';
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

export const NewProblemsFilter = ({ paramProblems, filterProblemOptions, setFilterProblemOptions, getGalleryProblems }: any) => {

    const apply = (values: any, field: string) => {
        const options = { ...filterProblemOptions };
        if ('priority' === field || 'components' === field || 'solutionstatus' === field || 'county' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element) : element;
            }
            options[field] = newValue;
        } else {
            options[field] = values;
        }
        setFilterProblemOptions(options);
        getGalleryProblems();
    }
    const reset = () => {
        const options = { ...filterProblemOptions };
        options.components = '';
        options.solutionstatus = '';
        options.county = '';
        options.cost = [];
        options.priority = '';
        options.jurisdiction = '';
        options.mhfdmanager = '';
        options.problemtype = '';
        options.source = '';
        options.servicearea = '';
        setFilterProblemOptions(options);
        getGalleryProblems();
    }

    return (
        <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
            <Row className="filt-00" style={{ marginTop: '10px' }}>
                <Col span={12}>
                    <h5>Problem Type <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>

                    {
                        paramProblems.problemtype &&
                        <PieChart data={paramProblems.problemtype} selected={filterProblemOptions.problemtype} onSelect={(e: string) => {
                            apply(e, 'problemtype');
                        }} />
                    }
                </Col>
                <Col span={12}>
                    <h5>Solution Cost <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.cost &&
                        <RheoStat data={paramProblems.cost} selected={filterProblemOptions.cost} onSelect={(items: string) => {
                            apply(items, 'cost');
                        }} />
                    }
                </Col>
            </Row>

            <Row className="filt-00">
                <Col span={12}>
                    <h5>Solution Status <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.solutionstatus &&
                        <HorizontalBarChart data={paramProblems.solutionstatus} selected={filterProblemOptions.solutionstatus} onSelect={(items: any) => {
                            apply(items, 'solutionstatus');
                        }} />
                    }
                </Col>
                <Col span={12}>
                    <h5>Priority <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.priority &&
                        <BarChart data={paramProblems.priority} selected={filterProblemOptions.priority} onSelect={(items: any) => {
                            apply(items, 'priority');
                        }} />
                    }
                </Col>
            </Row>

            <Row className="filt-00">
                <Col span={12}>
                    <h5>Service Area</h5>
                    {
                        paramProblems.servicearea &&
                        <TreeMap data={paramProblems.servicearea} type={'servicearea'}
                            selected={filterProblemOptions.servicearea}
                            onSelect={(e: string) => apply(e, 'servicearea')} />
                    }
                </Col>
                <Col span={12}>
                    <h5>County <img src="/Icons/icon-19.svg" alt="" /></h5>
                    {
                        paramProblems.county &&
                        <TreeMap data={paramProblems.county} type={'county'}
                            selected={filterProblemOptions.county}
                            onSelect={(items: any) => apply(items, 'county')} />
                    }
                </Col>
            </Row>

            <h5 className="filt-h5">Additional filters</h5>
            <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>Jurisdiction </label>
                    <Select placeholder="- Select -" value={filterProblemOptions.jurisdiction ? filterProblemOptions.jurisdiction : '- Select -'}
                        style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'jurisdiction');
                        }}>
                        {(paramProblems.jurisdiction || []).map((element: string, index: number) => {
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={12}>
                    <label>MHFD Watershed Manager</label>
                    <Select placeholder="- Select -" value={filterProblemOptions.mhfdmanager ? filterProblemOptions.mhfdmanager : '- Select -'}
                        style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'mhfdmanager');
                        }}>
                        {(paramProblems.mhfdmanager || []).map((element: string, index: number) => {
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
            {/* <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>Source <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
                    <Select placeholder="- Select -" value={filterProblemOptions.source ? filterProblemOptions.source : '- Select -'}
                        style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'source');
                        }}>
                        {(paramProblems.source || []).map((element: string, index: number) => {
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row> */}

            <div className="btn-footer" style={{ marginTop: '25px' }}>
                <Button onClick={() => reset()} style={{ width: '140px' }} className="btn-borde">Reset</Button>
            </div>
        </div>
        </>
    )
}