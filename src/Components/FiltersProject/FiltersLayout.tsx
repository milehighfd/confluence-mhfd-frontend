import React, { useState } from 'react';
import { Row, Col, Checkbox, Select, Button, Popover } from 'antd';

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Solution Cost:</b> is the total estimated cost to solve a problem</div>);
const content01 = (<div className="popoveer-00"><b>Priority:</b> is the severity of a problem relative to other problems of the same type.</div>);
const content02 = (<div className="popoveer-00"><b>Element Type:</b> describes the type of improvements needed to solve a Problem.</div>);
const content03 = (<div className="popoveer-00"><b>Status:</b> is the percentage (by cost) of elements required to solve a problem that have been completed.</div>);
const content04 = (<div className="popoveer-00"><b>Source</b> is the document or process through which a Problem was identified.</div>);
const content05 = (<div className="popoveer-00"><b>Total Cost:</b> is the Estimated Cost (for Projects in progress) or Final Cost (for completed Projects).</div>);
const content06 = (<div className="popoveer-00"><b>Project Status:</b> is the current status of the Project. Some statuses are only applicable to certain project types.</div>);
const content07 = (<div className="popoveer-00"><b>Start Year:</b> is the year a Project was initiated. For Projects that have not been initiated, use the "Work Plan Year" filter.</div>);
const content08 = (<div className="popoveer-00"><b>Completed Year:</b> represents the year a Project was finished (monitoring may still be occurring).</div>);
const content09 = (<div className="popoveer-00"><b>MHFD Dollars Allocated:</b> is the amount of funding that MHFD has budgeted or encumbered for a particular Project. For Capital projects and Master Plans, this is the number that must at least be matched by a local government.</div>);
const content10 = (<div className="popoveer-00"><b>Work Plan Year:</b> is the year that a proposed Project is on the approved MHFD Work Plan.</div>);
const content11 = (<div className="popoveer-00"><b>Problem Type:</b> is the type of Problem that a Project is intended to help solve.</div>);
const content12 = (<div className="popoveer-00"><b>Local Government Manager:</b> is the staff person at a local government responsible for planning or implementation of a Project.</div>);
const content13 = (<div className="popoveer-00"><b>Creator:</b> is the Confluence user who first created a Project in the Confluence database.</div>);
const content14 = (<div className="popoveer-00"><b>Component Type:</b> is a description of the type of Improvement or Data Point that has been identified at a particular location. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content15 = (<div className="popoveer-00"><b>Component Status:</b> is the status of implementing an improvement. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content16 = (<div className="popoveer-00"><b>Year of Study:</b> refers to the year of the Study in which the Component was first identified or proposed.</div>);
const content17 = (<div className="popoveer-00"><b>Estimated Cost:</b> is the Estimated Cost of implementing or addressing a Component as part of a Capital or Maintenance project.</div>);
const content18 = (<div className="popoveer-00"><b>Stream Name:</b> is the name of the Major Drainageway or Watershed where the Component is located.</div>);

export const ProblemsFilter = ({ paramProblems, filterProblemOptions, setFilterProblemOptions, getGalleryProblems, setToggleFilters }: any) => {
    const [checkBoxComponents, setCheckboxComponents] = useState<Array<string>>(filterProblemOptions.components.split(','));
    const [checkBoxStatus, setCheckboxStatus] = useState<Array<string>>(filterProblemOptions.solutionstatus.split(','));
    const [checkBoxCounty, setCheckboxCounty] = useState<Array<string>>(filterProblemOptions.county.split(','));
    const [checkBoxSolutionCost, setCheckboxSolutionCost] = useState<Array<string>>(filterProblemOptions.cost.split(','));
    const [checkBoxPriority, setCheckboxPriority] = useState<Array<string>>(filterProblemOptions.priority.split(','));
    const [jurisdiction, setJurisdiction] = useState(filterProblemOptions.jurisdiction ? filterProblemOptions.jurisdiction : '- Select -');
    const [mhfdManager, setMhfdManager] = useState(filterProblemOptions.mhfdmanager ? filterProblemOptions.jurisdiction : '- Select -');
    const [problemType, setProblemType] = useState(filterProblemOptions.problemtype ? filterProblemOptions.jurisdiction : '- Select -');
    const [source, setSource] = useState(filterProblemOptions.source ? filterProblemOptions.source : '- Select -');
    const firstSegmentComponents = paramProblems.components.slice(0, paramProblems.components.length / 2);
    const secondSegmentComponents = paramProblems.components.slice(paramProblems.components.length / 2, paramProblems.components.length);

    const apply = () => {
        let components = '';
        for (let index = 0; index < checkBoxComponents.length; index++) {
            const element = checkBoxComponents[index];
            components = components ? (components + ',' + element): element;
        }
        let status = '';
        for (let index = 0; index < checkBoxStatus.length; index++) {
            const element = checkBoxStatus[index];
            status = status ? (status + ',' + element): element;
        }
        let county = '';
        for (let index = 0; index < checkBoxCounty.length; index++) {
            const element = checkBoxCounty[index];
            county = county ? (county + ',' + element): element;
        }
        let solutionCost = '';
        for (let index = 0; index < checkBoxSolutionCost.length; index++) {
            const element = checkBoxSolutionCost[index];
            solutionCost = solutionCost ? (solutionCost + ',' + element): element;
        }
        let priority = '';
        for (let index = 0; index < checkBoxPriority.length; index++) {
            const element = checkBoxPriority[index];
            priority = priority ? (priority + ',' + element): element;
        }
        const options = {...filterProblemOptions};
        options.components = components;
        options.solutionstatus = status;
        options.county = county;
        options.cost = solutionCost;
        options.priority = priority;
        options.jurisdiction = jurisdiction !== '- Select -'? jurisdiction: '';
        options.mhfdmanager = mhfdManager !== '- Select -'? mhfdManager: '';
        options.problemtype = problemType !== '- Select -'? problemType: '';
        options.source = source !== '- Select -'? source: '';
        setFilterProblemOptions(options);
        setToggleFilters(false);
        getGalleryProblems();
    }
    const reset = () => {
        const options = {...filterProblemOptions};
        options.components = '';
        options.solutionstatus = '';
        options.county = '';
        options.cost = '';
        options.priority = '';
        options.jurisdiction = '';
        options.mhfdmanager =  '';
        options.problemtype = '';
        options.source = '';
        setCheckboxComponents([]);
        setCheckboxStatus([]);
        setCheckboxCounty([]);
        setCheckboxSolutionCost([]);
        setCheckboxPriority([]);
        setJurisdiction('- Select -');
        setMhfdManager('- Select -');
        setProblemType('- Select -');
        setSource('- Select -');
        setFilterProblemOptions(options);
        setToggleFilters(false);
        getGalleryProblems();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={checkBoxSolutionCost} onChange={(items) => {
                    setCheckboxSolutionCost(items as Array<string>);
                }}>
                    <p><Checkbox value='20'>$20M-$25M</Checkbox></p>
                    <p><Checkbox value='10'>$10M-$15M</Checkbox></p>
                    <p><Checkbox value='5'>$5M-10M</Checkbox></p>
                    <p><Checkbox value='1'>$1M-$10M</Checkbox></p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>Priority <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={checkBoxPriority} onChange={(items) => {
                    setCheckboxPriority(items as Array<string>);
                }}>
                    {paramProblems.priority.map((element: string, index: number) => {
                    return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })}
                </Checkbox.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Element Type <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
        <Row className="filt-00">
            <Checkbox.Group value={checkBoxComponents} onChange={(items) => {
                setCheckboxComponents(items as Array<string>);
            }}>
                <Col span={12}>
                 <div className="check-scroll">
                    {firstSegmentComponents.map((element: { key:string, value: string }, index: number) => {
                        return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox></p>
                    })}
                 </div>
                </Col>
                <Col span={12}>
                 <div className="check-scroll">
                    {secondSegmentComponents.map((element:  { key:string, value: string }, index: number) => {
                            return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox></p>
                    })}
                 </div>
                </Col>
            </Checkbox.Group>

        </Row>

        <Row className="filt-00">
            <Col span={12}>
              <h5>Status <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={checkBoxStatus} onChange={(items) => {
                    setCheckboxStatus(items as Array<string>);
                }}>
                    <p><Checkbox value='75'>75%-100%</Checkbox></p>
                    <p><Checkbox value='50'>50%-75%</Checkbox></p>
                    <p><Checkbox value='25'>25%-50%</Checkbox></p>
                    <p><Checkbox value='10'>10%-25%</Checkbox></p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>County <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Checkbox.Group value={checkBoxCounty} onChange={(items) => {
                    setCheckboxCounty(items as Array<string>);
                }}>
                    {paramProblems.county.map((element: string, index: number) => {
                        return <p key={index} ><Checkbox value={element}>{element}</Checkbox></p>
                    })}
                </Checkbox.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters</h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Jurisdiction</label>
                <Select placeholder="- Select -" value={jurisdiction} style={{ width: '100%' }} onChange={ (e: string) => {
                    setJurisdiction(e);
                }}>
                    {paramProblems.jurisdiction.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>MHFD Watershed Manager</label>
                <Select placeholder="- Select -" value={mhfdManager} style={{ width: '100%' }} onChange={ (e: string) => {
                    setMhfdManager(e);
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
                <Select placeholder="- Select -" value={problemType} style={{ width: '100%', marginBottom: '15px' }} onChange={ (e: string) => {
                    setProblemType(e);
                }}>
                    {paramProblems.problemtype.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>Source <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
                <Select placeholder="- Select -" value={source} style={{ width: '100%' }} onChange={ (e: string) => {
                    setSource(e);
                }}>
                    {paramProblems.source.map((element: string, index: number) =>{
                        return <Option key={index} value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button onClick={() => reset()} style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button onClick={() => apply()} style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div>
    </div>
    </>
}



export const ProjectsFilter = ({ paramProjects, filterProjectOptions, setFilterProjectOptions, getGalleryProjects, setToggleFilters } : any) => {
    const [checkBoxProjectType, setCheckboxProjectType] = useState<Array<string>>(filterProjectOptions.projecttype.split(','));
    const [checkBoxTotalCost, setCheckboxTotalCost] = useState<Array<string>>(filterProjectOptions.totalcost.split(','));
    const [checkBoxProjectStatus, setCheckboxProjectStatus] = useState<Array<string>>(filterProjectOptions.status.split(','));
    const [checkboxMHFDDollarsAllocated, setCheckboxMHFDDollarsAllocated] = useState<Array<string>>(filterProjectOptions.mhfddollarsallocated.split(','));
    const [checkboxWorkPlanYear, setCheckboxWorkPlanYear] = useState<Array<string>>(filterProjectOptions.workplanyear.split(','));
    const [start, setStart] = useState(filterProjectOptions.startyear ? filterProjectOptions.startyear : '- Select -');
    const [completed, setCompleted] = useState(filterProjectOptions.completedyear ? filterProjectOptions.completedyear : '- Select -');
    const [problemType, setProblemType] = useState(filterProjectOptions.problemtype ? filterProjectOptions.problemtype : '- Select -');
    const [mhfdmanager, setMhfdmanager] = useState(filterProjectOptions.mhfdmanager ? filterProjectOptions.mhfdmanager : '- Select -');
    const [jurisdiction, setJurisdiction] = useState(filterProjectOptions.jurisdiction ? filterProjectOptions.jurisdiction : '- Select -');
    const [streamname, setStreamname] = useState(filterProjectOptions.streamname ? filterProjectOptions.streamname : '- Select -');
    const [county, setCounty] = useState(filterProjectOptions.county ? filterProjectOptions.county : '- Select -');
    const [lgmanager, setLgmanager] = useState(filterProjectOptions.lgmanager ? filterProjectOptions.lgmanager : '- Select -');
    const [creator, setCreator] = useState(filterProjectOptions.creator ? filterProjectOptions.creator : '- Select -');
    const apply = () => {
        let projecttype = '';
        for (let index = 0; index < checkBoxProjectType.length; index++) {
            const element = checkBoxProjectType[index];
            projecttype = projecttype ? (projecttype + ',' + element): element;
        }
        let totalcost = '';
        for (let index = 0; index < checkBoxTotalCost.length; index++) {
            const element = checkBoxTotalCost[index];
            totalcost = totalcost ? (totalcost + ',' + element): element;
        }
        let status = '';
        for (let index = 0; index < checkBoxProjectStatus.length; index++) {
            const element = checkBoxProjectStatus[index];
            status = status ? (status + ',' + element): element;
        }
        let mhfddollarsallocated = '';
        for (let index = 0; index < checkboxMHFDDollarsAllocated.length; index++) {
            const element = checkboxMHFDDollarsAllocated[index];
            mhfddollarsallocated = mhfddollarsallocated ? (mhfddollarsallocated + ',' + element): element;
        }
        let workplanyear = '';
        for (let index = 0; index < checkboxWorkPlanYear.length; index++) {
            const element = checkboxWorkPlanYear[index];
            workplanyear = workplanyear ? (workplanyear + ',' + element): element;
        }
        const options = {...filterProjectOptions};
        options.projecttype = projecttype;
        options.totalcost = totalcost;
        options.status = status;
        options.mhfddollarsallocated = mhfddollarsallocated;
        options.workplanyear = workplanyear;
        options.startyear = start !== '- Select -'? start: '';
        options.completedyear = completed !== '- Select -'? completed: '';
        options.problemtype = problemType !== '- Select -'? problemType: '';
        options.mhfdmanager = mhfdmanager !== '- Select -'? mhfdmanager: '';
        options.jurisdiction = jurisdiction !== '- Select -'? jurisdiction: '';
        options.streamname = streamname !== '- Select -'? streamname: '';
        options.county = county !== '- Select -'? county: '';
        options.lgmanager = lgmanager !== '- Select -'? lgmanager: '';
        options.creator = creator !== '- Select -'? creator: '';
        setFilterProjectOptions(options);
        setToggleFilters(false);
        getGalleryProjects();
    }
    const reset = () => {
        const options = {...filterProjectOptions};
        options.projecttype = '';
        options.totalcost = '';
        options.status = '';
        options.mhfddollarsallocated = '';
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
        setCheckboxProjectType([]);
        setCheckboxTotalCost([]);
        setCheckboxProjectStatus([]);
        setCheckboxMHFDDollarsAllocated([]);
        setCheckboxWorkPlanYear([]);
        setStart('- Select -');
        setCompleted('- Select -');
        setProblemType('- Select -');
        setMhfdmanager('- Select -');
        setJurisdiction('- Select -');
        setStreamname('- Select -');
        setCounty('- Select -');
        setLgmanager('- Select -');
        setCreator('- Select -');
        setFilterProjectOptions(options);
        setToggleFilters(false);
        getGalleryProjects();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
    <Row className="filt-00" style={{ marginTop: '10px' }}>
        <Col span={12}>
            <h5>Project type <img src="/Icons/icon-19.svg" alt="" /></h5>
            <Checkbox.Group value={checkBoxProjectType} onChange={(item) => {
                setCheckboxProjectType(item as Array<string>);
            }}>
                <p><Checkbox value='Capital'>Capital</Checkbox></p>
                <p><Checkbox value='Maintenance'>Maintenance</Checkbox></p>
                <p><Checkbox value='Study'>Study</Checkbox></p>
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Total Cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
            <Checkbox.Group value={checkBoxTotalCost} onChange={(item) => {
                setCheckboxTotalCost(item as Array<string>);
            }}>
                <p><Checkbox value={'20'}>20M-25M</Checkbox></p>
                <p><Checkbox value={'15'}>15M-20M</Checkbox></p>
                <p><Checkbox value={'10'}>10M-15M</Checkbox></p>
                <p><Checkbox value={'5'}>5M-10M</Checkbox></p>
                <p><Checkbox value={'0'}>0-5M</Checkbox></p>
            </Checkbox.Group>
        </Col>
    </Row>


    <Row className="filt-00">
        <Col span={12}>
            <h5>Project Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
            <Checkbox.Group value={checkBoxProjectStatus} onChange={(item) => {
                setCheckboxProjectStatus(item as Array<string>);
            }}>
                {paramProjects.status.map((element: string, index: number) => {
                    return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })}
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Year <Popover content={content07}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
            <label>Start</label>
            <Select value={start} style={{ width: '100%' }} onChange={ (e: string) => {
                    setStart(e);
                }}>
                    {paramProjects.startyear.map((element: number, index: number) =>{
                        return <Option key={index} value={''+element}>{element}</Option>
                    })}
            </Select>
            <br></br><br></br>
            <label>Completed</label>
            <Select value={completed} style={{ width: '100%' }} onChange={ (e: string) => {
                    setCompleted(e);
                }}>
                    {paramProjects.completedyear.map((element: number, index: number) =>{
                        return <Option key={index} value={''+element}>{element}</Option>
                    })}
             </Select>
        </Col>
    </Row>

    <Row className="filt-00">
        <Col span={12}>
            <h5>MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
            <Checkbox.Group value={checkboxMHFDDollarsAllocated} onChange={(item) => {
                setCheckboxMHFDDollarsAllocated(item as Array<string>);
            }}>
                <p><Checkbox value={'20'}>20M-25M</Checkbox></p>
                <p><Checkbox value={'15'}>15M-20M</Checkbox></p>
                <p><Checkbox value={'10'}>10M-15M</Checkbox></p>
                <p><Checkbox value={'5'}>5M-10M</Checkbox></p>
                <p><Checkbox value={'1'}>1M-5M</Checkbox></p>
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Work Plan Year <Popover content={content10}><img src="/Icons/icon-19.svg" alt=""/></Popover></h5>
            <Checkbox.Group value={checkboxWorkPlanYear} onChange={(item) => {
                setCheckboxWorkPlanYear(item as Array<string>);
            }}>
                <p><Checkbox value={'2019'}>2019</Checkbox></p>
                <p><Checkbox value={'2020'}>2020</Checkbox></p>
                <p><Checkbox value={'2021'}>2021</Checkbox></p>
                <p><Checkbox value={'2022'}>2022</Checkbox></p>
                <p><Checkbox value={'2023'}>2023</Checkbox></p>
                {/* {paramProjects.workplanyear.map((element: string, index: number) => {
                    return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })} */}
            </Checkbox.Group>
        </Col>
    </Row>

    <h5 className="filt-h5">Additional filters</h5>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Problem Type <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
            <Select value={problemType} style={{ width: '100%' }} onChange={ (e: string) => {
                setProblemType(e);
            }}>
                {paramProjects.problemtype.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>MHFD Watershed Manager</label>
            <Select value={mhfdmanager} style={{ width: '100%' }} onChange={ (e: string) => {
                setMhfdmanager(e);
            }}>
                {paramProjects.mhfdmanager.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Jurisdiction</label>
            <Select value={jurisdiction} style={{ width: '100%' }} onChange={ (e: string) => {
                setJurisdiction(e);
            }}>
                {paramProjects.jurisdiction.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>County</label>
            <Select value={county} style={{ width: '100%' }} onChange={ (e: string) => {
                setCounty(e)
            }}>
                {paramProjects.county.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Local Government Manager <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
            <Select value={lgmanager} style={{ width: '100%' }} onChange={ (e: string) => {
                setLgmanager(e);
            }}>
                {paramProjects.lgmanager.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>Stream Name</label>
            <Select value={streamname} style={{ width: '100%' }} onChange={ (e: string) => {
                setStreamname(e);
            }}>
                {paramProjects.streamname.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Creator <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
            <Select value={creator} style={{ width: '100%' }} onChange={ (e: string) => {
                setCreator(e);
            }}>
                {paramProjects.creator.map((element: string, index: number) =>{
                    return <Option key={index} value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>

    <div className="btn-footer" style={{ marginTop: '25px' }}>
        <Button style={{ width: '140px' }} onClick={() => reset()} className="btn-00">Reset</Button>
        <Button style={{ width: '140px' }} onClick={() => apply()} className="btn-01">Apply</Button>
    </div>
    </div>
</>
}

export const ComponentsFilter = ({paramComponents, filterComponentOptions, setFilterComponentOptions, getGalleryProblems, getGalleryProjects, setToggleFilters} : any) => {

    const [checkBoxComponentType, setCheckboxComponentType] = useState<Array<string>>(filterComponentOptions.component_type.split(','));
    const [checkBoxStatus, setCheckboxStatus] = useState<Array<string>>(filterComponentOptions.status.split(','));
    const [checkBoxYearofStudy, setCheckboxYearofStudy] = useState<Array<string>>(filterComponentOptions.yearofstudy.split(','));
    const [checkboxEstimatedcost, setCheckboxEstimatedcost] = useState<Array<string>>(filterComponentOptions.estimatedcost.split(','));
    const [jurisdiction, setJurisdiction] = useState(filterComponentOptions.jurisdiction ? filterComponentOptions.jurisdiction : '- Select -');
    const [county, setCounty] = useState(filterComponentOptions.county ? filterComponentOptions.county : '- Select -');
    const [mhfdmanager, setWatershed] = useState(filterComponentOptions.mhfdmanager ? filterComponentOptions.mhfdmanager : '- Select -');
    const apply = () => {
        let componentType = '';
        for (let index = 0; index < checkBoxComponentType.length; index++) {
            const element = checkBoxComponentType[index];
            componentType = componentType ? (componentType + ',' + element): element;
        }
        let status = '';
        for (let index = 0; index < checkBoxStatus.length; index++) {
            const element = checkBoxStatus[index];
            status = status ? (status + ',' + element): element;
        }
        let yearOfStudy = '';
        for (let index = 0; index < checkBoxYearofStudy.length; index++) {
            const element = checkBoxYearofStudy[index];
            yearOfStudy = yearOfStudy ? (yearOfStudy + ',' + element): ('' + element);
        }
        let estimatedCost = '';
        for (let index = 0; index < checkboxEstimatedcost.length; index++) {
            const element = checkboxEstimatedcost[index];
            estimatedCost = estimatedCost ? (estimatedCost + ',' + element): element;
        }
        const options = {...filterComponentOptions};
        options.component_type = componentType;
        options.status = status;
        options.yearofstudy = yearOfStudy;
        options.estimatedcost = estimatedCost;
        options.jurisdiction = jurisdiction !== '- Select -'? jurisdiction: '';
        options.county = county !== '- Select -'? county: '';
        options.mhfdmanager = mhfdmanager !== '- Select -'? mhfdmanager: '';
        setFilterComponentOptions(options);
        // setToggleFilters(false);
        getGalleryProjects();
        getGalleryProblems();
    }
    const reset = () => {
        const options = {...filterComponentOptions};
        options.component_type = '';
        options.status = '';
        options.yearofstudy = '';
        options.estimatedcost = '';
        options.jurisdiction = '';
        options.county = '';
        options.mhfdmanger = '';
        setCheckboxComponentType([]);
        setCheckboxStatus([]);
        setCheckboxYearofStudy([]);
        setCheckboxEstimatedcost([]);
        setJurisdiction('- Select -');
        setCounty('- Select -');
        setWatershed('- Select -');
        setFilterComponentOptions(options);
        // setToggleFilters(false);
        getGalleryProjects();
        getGalleryProblems();
    }
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 295}}>
            <Row className="filt-00" style={{ marginTop: '10px' }}>
                <Col span={12}>
                    <h5>Component Type <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                      <div className="check-scroll">
                      <Checkbox.Group value={checkBoxComponentType} onChange={(item) => {
                          setCheckboxComponentType(item as Array<string>);
                      }}>
                          {paramComponents.component_type.map((element: { key: string, value: string }, index: number) => {
                              return <p key={index}><Checkbox value={element.key}>{element.value}</Checkbox></p>
                          })}
                      </Checkbox.Group>
                    </div>
                </Col>
                <Col span={12}>
                    <h5>Component Status <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <Checkbox.Group value={checkBoxStatus} onChange={(item) => {
                        setCheckboxStatus(item as Array<string>);
                    }}>
                        {paramComponents.status.map((element: string, index: number) => {
                            return element && <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                        })}
                    </Checkbox.Group>

                </Col>
            </Row>

            <Row className="filt-00">
                <Col span={12}>
                    <h5>Year Of Study <Popover content={content16}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <div className="check-scroll">
                      <Checkbox.Group value={checkBoxYearofStudy} onChange={(item) => {
                          setCheckboxYearofStudy(item as Array<string>);
                      }}>
                          {paramComponents.yearofstudy.map((element: string, index: number) => {
                              return <p key={index}><Checkbox value={''+element}>{element + 's'}</Checkbox></p>
                          })}
                      </Checkbox.Group>
                    </div>
                </Col>
                <Col span={12}>
                    <h5>Estimated Cost <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <Checkbox.Group value={checkboxEstimatedcost} onChange={(item) => {
                        setCheckboxEstimatedcost(item as Array<string>);
                    }}>
                        <p><Checkbox value={'8'}>8M-10M</Checkbox></p>
                        <p><Checkbox value={'6'}>6M-8M</Checkbox></p>
                        <p><Checkbox value={'4'}>4M-6M</Checkbox></p>
                        <p><Checkbox value={'2'}>2M-4M</Checkbox></p>
                        <p><Checkbox value={'0'}>0-2M</Checkbox></p>
                    </Checkbox.Group>
                </Col>
            </Row>

            <h5 className="filt-h5">Additional filters</h5>
            <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>Jurisdiction</label>
                    <Select value={jurisdiction} style={{ width: '100%' }} onChange={ (e: string) => {
                        setJurisdiction(e);
                    }}>
                        {paramComponents.jurisdiction.map((element: string, index: number) =>{
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={12}>
                    <label>County</label>
                    <Select value={county} style={{ width: '100%' }} onChange={ (e: string) => {
                        setCounty(e);
                    }}>
                        {paramComponents.county.map((element: string, index: number) =>{
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <Row className="filt-00" gutter={[24, 16]}>
                <Col span={12}>
                    <label>MHFD Watershed Manager</label>
                    <Select value={mhfdmanager} style={{ width: '100%' }} onChange={ (e: string) => {
                        setWatershed(e);
                    }}>
                        {paramComponents.watershed.map((element: string, index: number) =>{
                            return <Option key={index} value={element}>{element}</Option>
                        })}
                    </Select>
                </Col>
            </Row>
            <div className="btn-footer" style={{ marginTop: '25px' }}>
                <Button style={{ width: '140px' }} onClick={() => reset()} className="btn-00">Reset</Button>
                <Button style={{ width: '140px' }} onClick={() => apply()} className="btn-01">Apply</Button>
            </div>
        </div>
    </>
}
