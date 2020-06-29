import React, { useState } from 'react';
import { Row, Col, Checkbox, Select, Radio, Button,Tooltip, Popover } from 'antd';

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

export const ProblemsFilter = ({ paramProblems }: any) => {
    const [checkBoxComponents, setCheckboxComponents] = useState<Array<string>>([]);
    const [checkBoxStatus, setCheckboxStatus] = useState<Array<string>>([]);
    const [checkBoxCounty, setCheckboxCounty] = useState<Array<string>>([]);
    const [checkBoxSolutionCost, setCheckboxSolutionCost] = useState<Array<string>>([]);
    const [checkBoxPriority, setCheckboxPriority] = useState<Array<string>>([]);
    const firstSegmentComponents = paramProblems.components.slice(0, paramProblems.components.length / 2);
    const secondSegmentComponents = paramProblems.components.slice(paramProblems.components.length / 2, paramProblems.components.length);
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
                <Checkbox.Group value={checkBoxSolutionCost} onChange={(items) => {
                setCheckboxSolutionCost(items as Array<string>);
                }}>
                    <p><Radio>$20M-$25M</Radio></p>
                    <p><Radio>$10M-$15M</Radio></p>
                    <p><Radio>$5M-10M</Radio></p>
                    <p><Radio>$1M-$10M</Radio></p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>Priority <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
                <Checkbox.Group value={checkBoxPriority} onChange={(items) => {
                setCheckboxPriority(items as Array<string>);
                }}>
                    {paramProblems.priority.map((element: string, index: number) => {
                    return <p key={index}><Radio>{element}</Radio></p>
                })}
                </Checkbox.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Element Type <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
        <Row className="filt-00">
            <Checkbox.Group value={checkBoxComponents} onChange={(items) => {
                setCheckboxComponents(items as Array<string>);
            }}>
                <Col span={12}>
                    {firstSegmentComponents.map((element: string, index: number) => {
                        return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                    })}
                </Col>
                <Col span={12}>
                    {secondSegmentComponents.map((element: string, index: number) => {
                            return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                    })}
                </Col>
            </Checkbox.Group>
            
        </Row>

        <Row className="filt-00">
            <h5>Status <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Col span={12}>
                <Checkbox.Group value={checkBoxStatus} onChange={(items) => {
                setCheckboxStatus(items as Array<string>);
                }}>
                    <p><Radio>75%-100%</Radio></p>
                    <p><Radio>50%-75%</Radio></p>
                    <p><Radio>25%-50%</Radio></p>
                    <p><Radio>10%-25%</Radio></p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>County <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
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
                <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                    console.log(e);
                    
                }}>
                    {paramProblems.jurisdiction.map((element: string, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>MHFD Manager</label>
                <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                    console.log(e);
                }}>
                    {paramProblems.mhfdmanager.map((element: string, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Problem Type</label>
                <Select placeholder="- Select -" style={{ width: '100%', marginBottom: '15px' }} onChange={ (e) => {
                    console.log(e);   
                }}>
                    {paramProblems.problemtype.map((element: string, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
            <Col span={12}>
                <label>Source</label>
                <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                    console.log(e);   
                }}>
                    {paramProblems.source.map((element: string, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Row>

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div>
    </div>
    </>
}
    
    

export const ProjectsFilter = ({ paramProjects } : any) => {
    const [checkBoxProjectType, setCheckboxProjectType] = useState<Array<string>>([]);
    const [checkBoxTotalCost, setCheckboxTotalCost] = useState<Array<string>>([]);
    const [checkBoxProjectStatus, setCheckboxProjectStatus] = useState<Array<string>>([]);
    const [checkboxMHFDDollarsAllocated, setCheckboxMHFDDollarsAllocated] = useState<Array<string>>([]);
    console.log(paramProjects);
    
    return <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
    <Row className="filt-00" style={{ marginTop: '10px' }}>
        <Col span={12}>
            <h5>Project type <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Checkbox.Group value={checkBoxProjectType} onChange={(item) => {
                setCheckboxProjectType(item as Array<string>);
            }}>
                <p><Checkbox value='Capital'>Capital</Checkbox></p>
                <p><Checkbox value='Maintenance'>Maintenance</Checkbox></p>
                <p><Checkbox value='Study'>Study</Checkbox></p>
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Total Cost <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Checkbox.Group value={checkBoxTotalCost} onChange={(item) => {
                setCheckboxTotalCost(item as Array<string>);
            }}>
                <p><Checkbox value={'20000000,25000000'}>20M-25M</Checkbox></p>
                <p><Checkbox value={'15000000,20000000'}>15M-20M</Checkbox></p>
                <p><Checkbox value={'5000000,10000000'}>5M-10M</Checkbox></p>
                <p><Checkbox value={'0,5000000'}>0-5M</Checkbox></p>
            </Checkbox.Group>
        </Col>
    </Row>


    <Row className="filt-00">
        <Col span={12}>
            <h5>Project Status <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Checkbox.Group value={checkBoxProjectStatus} onChange={(item) => {
                setCheckboxProjectStatus(item as Array<string>);
            }}>
                {paramProjects.status.map((element: string, index: number) => {
                    return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })}
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Year <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Col span={12}>
            <Select placeholder="- Start -" style={{ width: '100%' }} onChange={ (e) => {
                    console.log(e);   
                }}>
                    {paramProjects.startyear.map((element: number, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
            </Select>
            </Col>
            <Col span={12}>
                <Select placeholder="- Completed -" style={{ width: '100%' }} onChange={ (e) => {
                    console.log(e);   
                }}>
                    {paramProjects.completedyear.map((element: number, index: number) =>{
                        return <Option value={element}>{element}</Option>
                    })}
                </Select>
            </Col>
        </Col>
    </Row>

    <Row className="filt-00">
        <Col span={12}>
            <h5>MHFD Dollars Allocated <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Checkbox.Group value={checkboxMHFDDollarsAllocated} onChange={(item) => {
                setCheckboxMHFDDollarsAllocated(item as Array<string>);
            }}>
                {paramProjects.mhfddollarsallocated.map((element: string, index: number) => {
                    return element !== null && <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })}
            </Checkbox.Group>
        </Col>
        <Col span={12}>
            <h5>Work Plan Year <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
            <Checkbox.Group value={checkBoxProjectType} onChange={(item) => {
                setCheckboxProjectType(item as Array<string>);
            }}>
                {paramProjects.workplanyear.map((element: string, index: number) => {
                    return <p key={index}><Checkbox value={element}>{element}</Checkbox></p>
                })}
            </Checkbox.Group>
        </Col>
    </Row>

    <h5 className="filt-h5">Additional filters <Tooltip title="prompt text"><img src="/Icons/icon-19.svg" alt="" /></Tooltip></h5>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Problem Type</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.problemtype.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>Watershed Manager</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.mhfdmanager.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Jurisdiction</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.jurisdiction.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>County</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.county.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Local Government Manager</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.mhfdmanager.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
        <Col span={12}>
            <label>Stream Name</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.mhfdmanager.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>
    <Row className="filt-00" gutter={[24, 16]}>
        <Col span={12}>
            <label>Stream Name</label>
            <Select placeholder="- Select -" style={{ width: '100%' }} onChange={ (e) => {
                console.log(e);   
            }}>
                {paramProjects.creator.map((element: string, index: number) =>{
                    return <Option value={element}>{element}</Option>
                })}
            </Select>
        </Col>
    </Row>

    <div className="btn-footer" style={{ marginTop: '25px' }}>
        <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
        <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
    </div>
    </div>
</>
}

export const ComponentsFilter = () => (
    <>  <div className="scroll-filters" style={{height: window.innerHeight - 295}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Component Type <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>Grade Control Structure</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Pipe Appurtenances</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Special Item Point</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Special Item Linear</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Special Item Area</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Channel Improvements Linear</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Component Status <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>Approved</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Active</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>None</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Completed</Radio> <span className="filt-s">13%</span></p>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Year Of Study <Popover content={content16}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>1972</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1984</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1996</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2008</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2020</Radio> <span className="filt-s">208</span></p>
            </Col>
            <Col span={12}>
                <h5>Estimated Cost <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>0</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$2M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$4M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$6M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$8M</Radio> <span className="filt-s">208</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters</h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Jurisdiction</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                            </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
            <Col span={12}>
                <label>County</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                          </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>MHFD Watershed Manager</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                            </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
            <Col span={12}>
                <label>Solution Type</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                          </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Stream Name <Popover content={content18}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
                <Select defaultValue="- Select -" style={{ width: '100%', marginBottom: '15px' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                            </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
        </Row>

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div>
    </div>
    </>
);
