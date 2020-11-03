import React, { useState, useEffect } from 'react';
import { Row, Col, Checkbox, Select, Button, Popover } from 'antd';
import { elementCost, elementCostLastPosition } from '../../utils/utils';

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
// const content18 = (<div className="popoveer-00"><b>Stream Name:</b> is the name of the Major Drainageway or Watershed where the Component is located.</div>);

export const ProblemsFilter = ({ paramProblems, filterProblemOptions, setFilterProblemOptions, getGalleryProblems, setToggleFilters }: any) => {
    const firstSegmentComponents = paramProblems.components.slice(0, paramProblems.components.length / 2);
    const secondSegmentComponents = paramProblems.components.slice(paramProblems.components.length / 2, paramProblems.components.length);

    const apply = (values: any, field: string) => {
        const options = {...filterProblemOptions};
        if('priority' === field || 'components' === field || 'solutionstatus' === field || 'county' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element): element;
            }
            options[field] = newValue;
        } else {
            options[field] = values;
        }
        setFilterProblemOptions(options);
        getGalleryProblems();
    }
    const reset = () => {
        const options = {...filterProblemOptions};
        options.components = '';
        options.solutionstatus = '';
        options.county = '';
        options.cost = [];
        options.priority = '';
        options.jurisdiction = '';
        options.mhfdmanager =  '';
        options.problemtype = '';
        options.source = '';
        setFilterProblemOptions(options);
        getGalleryProblems();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={filterProblemOptions.cost} onChange={(items) => {
                    apply(items, 'cost');
                }}>
                    {paramProblems.cost.map((element: {min: number, max: number, label: string, counter: number, last: boolean}, index: number) => {
                        return <p key={index}><Checkbox value={'' + element.min + ',' + element.max}>
                                {elementCostLastPosition(element.min, element.max, element.last)}</Checkbox>
                                <span className="filt-s">{element.counter}</span>
                            </p>
                    })}
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>Priority <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={filterProblemOptions.priority.split(',')} onChange={(items) => {
                    apply(items, 'priority');
                }}>
                    {paramProblems.priority.map((element: {value:string, count: number}, index: number) => {
                    return <p key={index}><Checkbox value={element.value}>{element.value} </Checkbox>
                        <span className="filt-s">{element.count}</span>
                    </p>
                })}
                </Checkbox.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Element Type <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
        <Row className="filt-00">
            <Checkbox.Group value={filterProblemOptions.components.split(',')} onChange={(items) => {
                apply(items, 'components');
            }}>
                <Col span={12}>
                 <div className="check-scroll">
                    {firstSegmentComponents.map((element: { key:string, value: string, count: number }, index: number) => {
                        return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox>
                            <span className="filt-s">{element.count}</span>
                        </p>
                    })}
                 </div>
                </Col>
                <Col span={12}>
                 <div className="check-scroll">
                    {secondSegmentComponents.map((element:  { key:string, value: string, count: number }, index: number) => {
                            return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox>
                            <span className="filt-s">{element.count}</span>
                        </p>
                    })}
                 </div>
                </Col>
            </Checkbox.Group>

        </Row>

        <Row className="filt-00">
            <Col span={12}>
              <h5>Status <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={filterProblemOptions.solutionstatus.split(',')} onChange={(items) => {
                    apply(items, 'solutionstatus');
                }}>
                    <p><Checkbox value='10'>10%-25%</Checkbox>
                        <span className="filt-s">
                            {paramProblems.solutionstatus.filter((element: any) => element.value === 0).length ? paramProblems.solutionstatus.filter((element: any) => element.value === 0)[0].count : '0'}
                        </span>
                    </p>
                    <p><Checkbox value='25'>25%-50%</Checkbox>
                        <span className="filt-s">
                            {paramProblems.solutionstatus.filter((element: any) => element.value === 25).length ? paramProblems.solutionstatus.filter((element: any) => element.value === 25)[0].count : '0'}
                        </span>
                    </p>
                    <p><Checkbox value='50'>50%-75%</Checkbox>
                        <span className="filt-s">
                            {paramProblems.solutionstatus.filter((element: any) => element.value === 50).length ? paramProblems.solutionstatus.filter((element: any) => element.value === 50)[0].count : '0'}
                        </span>
                    </p>
                    <p><Checkbox value='75'>75%-100%</Checkbox>
                        <span className="filt-s">
                            {paramProblems.solutionstatus.filter((element: any) => element.value === 75).length ? paramProblems.solutionstatus.filter((element: any) => element.value === 75)[0].count : '0'}
                        </span>
                    </p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>County <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Checkbox.Group value={filterProblemOptions.county.split(',')} onChange={(items) => {
                    apply(items, 'county');
                }}>
                    {paramProblems.county.map((element: {value: string, counter: number}, index: number) => {
                        return <p key={index} ><Checkbox value={element.value}>{element.value}</Checkbox>
                            <span className="filt-s">{element.counter}</span>
                        </p>
                    })}
                </Checkbox.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters</h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Jurisdiction</label>
                <Select placeholder="- Select -" value={filterProblemOptions.jurisdiction ? filterProblemOptions.jurisdiction : '- Select -'}
                    style={{ width: '100%' }} onChange={ (e: string) => {
                    apply(e, 'jurisdiction');
                }}>
                    {paramProblems.jurisdiction.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>MHFD Watershed Manager</label>
                <Select placeholder="- Select -" value={filterProblemOptions.mhfdmanager ? filterProblemOptions.mhfdmanager : '- Select -'}
                    style={{ width: '100%' }} onChange={ (e: string) => {
                    apply(e, 'mhfdmanager');
                }}>
                    {paramProblems.mhfdmanager.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Problem Type</label>
                <Select placeholder="- Select -" value={filterProblemOptions.problemtype ? filterProblemOptions.problemtype : '- Select -'}
                    style={{ width: '100%', marginBottom: '15px' }} onChange={ (e: string) => {
                    apply(e, 'problemtype');
                }}>
                    {paramProblems.problemtype.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>Source <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
                <Select placeholder="- Select -" value={filterProblemOptions.source ? filterProblemOptions.source : '- Select -'}
                    style={{ width: '100%' }} onChange={ (e: string) => {
                    apply(e, 'source');
                }}>
                    {paramProblems.source.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button onClick={() => reset()} style={{ width: '140px' }} className="btn-00">Reset</Button>
            {/* <Button onClick={() => apply()} style={{ width: '140px' }} className="btn-01">Apply</Button> */}
        </div>
    </div>
    </>
}



export const ProjectsFilter = ({ paramProjects, filterProjectOptions, setFilterProjectOptions, getGalleryProjects, setToggleFilters } : any) => {
    const apply = (values: any, field: string) => {
        //console.log('filterProjectOptions:::', filterProjectOptions, paramProjects);

        const options = {...filterProjectOptions};
        if('projecttype' === field || 'status' === field || 'workplanyear' === field || 'problemtype' === field) {
            let newValue = '';
            //console.log('STATUS',options['status']);
            if ('workplanyear' === field) {
                options['status'] = options['status'] + ',Complete';
            }
            
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element): element;
            }
            options[field] = newValue;
        } else {
            if('completedyear' === field) {
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
        const options = {...filterProjectOptions};
        options.projecttype = '';
        options.totalcost = [];
        options.status = '';
        options.mhfddollarsallocated = [];
        options.workplanyear = '';
        options.startyear =  '';
        options.completedyear = '';
        options.problemtype = '';
        options.mhfdmanager =  '';
        options.jurisdiction =  '';
        options.streamname = '';
        options.county =  '';
        options.lgmanager = '';
        options.creator = '';
        setFilterProjectOptions(options);
        getGalleryProjects();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
    <Row className="filt-00" style={{ marginTop: '10px' }}>
        <Col span={12}>
            <h5>Project type </h5>
            <Checkbox.Group value={filterProjectOptions.projecttype.split(',')} onChange={(item) => {
                apply(item, 'projecttype');
            }}>
                {paramProjects.projecttype.map((element: {value: string, counter: number}, index: number) => {
                    return <p key={index}><Checkbox value={element.value}>
                        {element.value}</Checkbox>
                        <span className="filt-s">{element.counter}</span>
                    </p>
                })}
                {/* <p><Checkbox value='Capital'>Capital</Checkbox></p>
                <p><Checkbox value='Maintenance'>Maintenance</Checkbox></p>
                <p><Checkbox value='Study'>Study</Checkbox></p> */}
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Total Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
            <Checkbox.Group value={filterProjectOptions.totalcost} onChange={(item) => {
                apply(item, 'totalcost');
            }}>
                {paramProjects.estimatedCost.map((element: {min: number, max: number, label: string, counter: number, last: boolean}, index: number) => {
                    return <p key={index}><Checkbox value={'' + element.min + ',' + element.max}>
                        {elementCostLastPosition(element.min, element.max, element.last)}</Checkbox>
                        <span className="filt-s">{element.counter}</span>
                    </p>
                })}
            </Checkbox.Group>
        </Col>
    </Row>


    <Row className="filt-00">
        <Col span={12}>
            <h5>Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
            <Checkbox.Group value={filterProjectOptions.status.split(',')} onChange={(item) => {
                apply(item, 'status');
            }}>
                <div className="check-scroll">
                {paramProjects.status.map((element: {value:string, counter: number}, index: number) => {
                    return <p key={index}><Checkbox value={element.value}>{element.value}</Checkbox>
                        <span className="filt-s">{element.counter}</span>
                    </p>
                })}
                </div>
            </Checkbox.Group>
        </Col>
        <Col span={12} className="filter-menu">
            <h5>Year <Popover content={content07}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
            <label>Start</label>
            <Select dropdownClassName="filter-menu" value={filterProjectOptions.startyear ? filterProjectOptions.startyear : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                    apply(e, 'startyear');
                }}>
                    {paramProjects.startyear.map((element: {value: number, counter: number}, index: number) =>{
                        return <Option key={index} value={''+element.value}>{element.value}</Option>
                    })}
            </Select>
            <br></br><br></br>
            <label>Completed</label>
            <Select dropdownClassName="filter-menu" value={filterProjectOptions.completedyear ? filterProjectOptions.completedyear : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                    apply(e, 'completedyear');
                }}>
                    {paramProjects.completedyear.map((element: {value: number, counter: number}, index: number) =>{
                        return <Option key={index} value={''+element.value}>{element.value}</Option>
                    })}
             </Select>
        </Col>
    </Row>

    <Row className="filt-00">
        <Col span={12}>
            <h5>MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
            <Checkbox.Group value={filterProjectOptions.mhfddollarsallocated} onChange={(item) => {
                apply(item, 'mhfddollarsallocated');
            }}>
                {paramProjects.mhfddollarsallocated.map((element: {min: number, max: number, label: string, counter: number, last: boolean}, index: number) => {
                    return <p key={index}><Checkbox value={'' + element.min + ',' + element.max}>
                        {elementCostLastPosition(element.min, element.max, element.last)}</Checkbox>
                        <span className="filt-s">{element.counter}</span>
                    </p>
                })}
            </Checkbox.Group>
        </Col>
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

    <h5 className="filt-h5">Additional filters</h5>
    <Row className="filt-00">
        <Col span={12}>
            <label>Problem Type <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" /></Popover></label>
            <Checkbox.Group value={filterProjectOptions.problemtype.split(',')} onChange={(item) => {
                apply(item, 'problemtype');
            }}>
                {paramProjects.problemtype.map((element: {value: string, counter: number}, index: number) =>{
                    return <p key={index}><Checkbox value={element.value}>{element.value}</Checkbox>
                        <span className="filt-s">{element.counter}</span>
                    </p>
                })}
            </Checkbox.Group>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Jurisdiction</label>
            <Select value={filterProjectOptions.jurisdiction ? filterProjectOptions.jurisdiction : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'jurisdiction');
            }}>
                {paramProjects.jurisdiction.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>County</label>
            <Select value={filterProjectOptions.county ? filterProjectOptions.county : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'county');
            }}>
                {paramProjects.county.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Local Government Manager <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
            <Select value={filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'lgmanager');
            }}>
                {paramProjects.lgmanager.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>Stream Name</label>
            <Select value={filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'streamname');
            }}>
                {paramProjects.streamname.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Creator <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
            <Select value={filterProjectOptions.creator ? filterProjectOptions.creator : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'creator');
            }}>
                {paramProjects.creator.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>MHFD Watershed Manager</label>
            <Select value={filterProjectOptions.mhfdmanager ? filterProjectOptions.mhfdmanager : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                apply(e, 'mhfdmanager');
            }}>
                {paramProjects.mhfdmanager.map((element: string, index: number) =>{
                    return element && <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>

    <div className="btn-footer" style={{ marginTop: '25px' }}>
        <Button style={{ width: '140px' }} onClick={() => reset()} className="btn-00">Reset</Button>
        {/* <Button style={{ width: '140px' }} onClick={() => apply()} className="btn-01">Apply</Button> */}
    </div>
    </div>
</>
}

export const ComponentsFilter = ({paramComponents, filterComponentOptions, setFilterComponentOptions, getGalleryProblems, getGalleryProjects, setToggleFilters} : any) => {
    const apply = (values: any, field: string) => {
        const options = {...filterComponentOptions};
        if('component_type' === field || 'status' === field || 'yearofstudy' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element): element;
            }
            options[field] = newValue;
        } else {
            options[field] = values;
        }
        setFilterComponentOptions(options);
        getGalleryProjects();
        getGalleryProblems();
    }
    const reset = () => {
        const options = {...filterComponentOptions};
        options.component_type = '';
        options.status = '';
        options.yearofstudy = '';
        options.estimatedcost = [];
        options.jurisdiction = '';
        options.county = '';
        options.mhfdmanager = '';
        setFilterComponentOptions(options);
        getGalleryProjects();
        getGalleryProblems();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 295}}>
            <Row className="filt-00" style={{ marginTop: '10px' }}>
                <Col span={12}>
                    <h5>Component Type <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                      <div className="check-scroll">
                      <Checkbox.Group value={filterComponentOptions.component_type.split(',')} onChange={(item) => {
                        apply(item, 'component_type');
                      }}>
                          {paramComponents.component_type.map((element: { key: string, value: string, counter: number }, index: number) => {
                              return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox>
                                <span className="filt-s">{element.counter}</span>
                              </p>
                          })}
                      </Checkbox.Group>
                    </div>
                </Col>
                <Col span={12}>
                    <h5>Component Status <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <Checkbox.Group value={filterComponentOptions.status.split(',')} onChange={(item) => {
                        apply(item, 'status');
                    }}>
                        {paramComponents.status.map((element: {value: string, counter: number}, index: number) => {
                            return element.value && <p key={index}><Checkbox value={element.value}>{element.value}</Checkbox>
                                <span className="filt-s">{element.counter}</span>
                            </p>
                        })}
                    </Checkbox.Group>

                </Col>
            </Row>

            <Row className="filt-00">
                <Col span={12}>
                    <h5>Year Of Study <Popover content={content16}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <div className="check-scroll">
                      <Checkbox.Group value={filterComponentOptions.yearofstudy.split(',')} onChange={(item) => {
                        apply(item, 'yearofstudy');
                      }}>
                          {paramComponents.yearofstudy.map((element: {value: number, count: number}, index: number) => {
                              return element.value && <p key={index}><Checkbox value={''+element.value}>{element.value + 's'}</Checkbox>
                                <span className="filt-s">{element.count}</span>
                              </p>
                          })}
                      </Checkbox.Group>
                    </div>
                </Col>
                <Col span={12}>
                    <h5>Estimated Cost <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <Checkbox.Group value={filterComponentOptions.estimatedcost} onChange={(item) => {
                        apply(item, 'estimatedcost');
                    }}>
                        {paramComponents.estimatedcost.map((element: {min: number, max: number, label: string, counter: number}, index: number) => {
                            return <p key={index}><Checkbox value={'' + element.min + ',' + element.max}>
                                {elementCost(element.min, element.max)}</Checkbox>
                                <span className="filt-s">{element.counter}</span>
                            </p>
                        })}
                    </Checkbox.Group>
                </Col>
            </Row>

            <h5 className="filt-h5">Additional filters</h5>
            <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>Jurisdiction</label>
                    <Select value={filterComponentOptions.jurisdiction ? filterComponentOptions.jurisdiction : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                        apply(e, 'jurisdiction');
                    }}>
                        {paramComponents.jurisdiction.map((element: string, index: number) =>{
                            return element && <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={12}>
                    <label>County</label>
                    <Select value={filterComponentOptions.county ? filterComponentOptions.county : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                        apply(e, 'county');
                    }}>
                        {paramComponents.county.map((element: string, index: number) =>{
                            return element && <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>MHFD Watershed Manager</label>
                    <Select value={filterComponentOptions.mhfdmanager ? filterComponentOptions.mhfdmanager : '- Select -'} style={{ width: '100%' }} onChange={ (e: string) => {
                        apply(e, 'mhfdmanager');
                    }}>
                        {paramComponents.watershed.map((element: string, index: number) =>{
                            return element && <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <div className="btn-footer" style={{ marginTop: '25px' }}>
                // <Button style={{ width: '140px' }} onClick={() => reset()} className="btn-00">Reset</Button>
                {/* <Button style={{ width: '140px' }} onClick={() => apply()} className="btn-01">Apply</Button> */}
            </div>
        </div>
    </>
}
