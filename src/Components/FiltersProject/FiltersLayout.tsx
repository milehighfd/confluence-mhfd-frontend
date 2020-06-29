import React from 'react';
import { Row, Col, Checkbox, Select, Radio, Button, Popover} from 'antd';

import { PROJECT_TYPE,
        ESTIMATED_COST,
        CAPITAL_STATUS,
        START_YEAR,
        COMPLETED_YEAR,
        CAPITAL_GOAL,
        STUDY_GOAL,
        MHFD_DOLLARS_ALLOCATED,
        WORK_PLAN_YEAR,
        STUDY_STATUS,
        CREATOR,
        MHFD_DOLLAR_REQUESTED,
        STREAM_NAME,
        REQUESTED_START_YEAR,
        LG_MANAGER,
        COUNTY,
        JURIDICTION,
        SERVICE_AREA_VALUE,
        PROBLEM_TYPE } from '../../constants/constants';
import { DropdownDefaultTypes, FilterProjectTypes } from '../../Classes/MapTypes';


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

export const ProblemsFilter = () => (
    <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>$20M-$25M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$10M-$15M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$5M-10M</Radio> <span className="filt-s">302</span></p>
                <p><Radio>$1M-$10M</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Priority <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>High</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Medium</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Low</Radio> <span className="filt-s">109</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Migration type <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
        <Row className="filt-00">
            <Col span={12}>
                <p><Checkbox>Increased Conveyance - Crossing</Checkbox> <span className="filt-s">71</span></p>
                <p><Checkbox>Increased Conveyance - Streams</Checkbox> <span className="filt-s">16</span></p>
                <p><Checkbox>Increased Conveyance - Pipe</Checkbox> <span className="filt-s">5</span></p>
                <p><Checkbox>Flow Reduction</Checkbox> <span className="filt-s">4</span></p>
                <p><Checkbox>Stabilization - Vertical</Checkbox> <span className="filt-s">1</span></p>
            </Col>
            <Col span={12}>
                <p><Checkbox>Stabilization - Lateral</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Acquisition</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Municipalities</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Municipalities</Checkbox> <span className="filt-s">1</span></p>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Status <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <p><Radio>75%-100%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>50%-75%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>25%-50%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>10%-25%</Radio> <span className="filt-s">208</span></p>
            </Col>
            <Col span={12}>
                <h5>County <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Checkbox>Adams</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Arapahoe</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Boulder</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Broomfield</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Denver</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Douglas</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Jefferson</Checkbox><span className="filt-s">1</span></p>
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
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Problem Type</label>
                <Select defaultValue="- Select -" style={{ width: '100%', marginBottom: '15px' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                        </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Col>
            <Col span={12}>
                <label>Source <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" width="12px" /></Popover></label>
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

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div>
    </div>
    </>
);

export const ProjectsFilter = ({ dropdowns, getSelectValue, selectedFilters, handleRadioGroup, handleCheckbox, handleSelect } : FilterProjectTypes) => (
    <>  <div className="scroll-filters" style={{height: window.innerHeight - 280}}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Project type <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[PROJECT_TYPE]} onChange={(e) => handleRadioGroup(e, PROJECT_TYPE)}>
                    <p><Radio value={'capital'}>Capital</Radio> <span className="filt-s">13%</span></p>
                    <p><Radio value={'maintenance'}>Maintenance</Radio> <span className="filt-s">8%</span></p>
                    <p><Radio value={'study'}>Study</Radio> <span className="filt-s">19%</span></p>
                    <p><Radio value={'propertyAcquisition'}>Property Acquisition</Radio> <span className="filt-s">25%</span></p>
                    <p><Radio value={'special'}>Special</Radio> <span className="filt-s">35%</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Estimated total cost <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Radio.Group value={selectedFilters[ESTIMATED_COST]} onChange={(e) => handleRadioGroup(e, ESTIMATED_COST)}>
                    <p><Radio value={'[20000000,25000000]'}>20M-25M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'[15000000,20000000]'}>15M-20M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'[5000000,10000000]'}>5M-10M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'[0,5000000]'}>0-5M</Radio> <span className="filt-s">30</span></p>
                </Radio.Group>
            </Col>
        </Row>


        <Row className="filt-00">
            <Col span={12}>
                <h5>Capital Status <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Checkbox.Group value={selectedFilters[CAPITAL_STATUS] as Array<string>} onChange={(items) => handleCheckbox(items, CAPITAL_STATUS)}>
                    <p><Checkbox value={'approved'}>Approved</Checkbox> <span className="filt-s">71</span></p>
                    <p><Checkbox value={'idle'}>Idle</Checkbox> <span className="filt-s">16</span></p>
                    <p><Checkbox value={'initiated'}>Initiated</Checkbox> <span className="filt-s">5</span></p>
                    <p><Checkbox value={'preliminaryDesign'}>Preliminary Design</Checkbox> <span className="filt-s">4</span></p>
                    <p><Checkbox value={'finalDesign'}>Final Design</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'construction'}>Construction</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'monitoring'}>Monitoring</Checkbox> <span className="filt-s">1</span></p>
                </Checkbox.Group>
            </Col>
            <Col span={12}>
                <h5>Study Status <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Checkbox.Group value={selectedFilters[STUDY_STATUS] as Array<string>} onChange={(items) => handleCheckbox(items, STUDY_STATUS)}>
                    <p><Checkbox value={'approved'}>Approved</Checkbox> <span>1</span></p>
                    <p><Checkbox value={'idle'}>Idle</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'initiated'}>Initiated</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'hydrology'}>Hydrology</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'floodplain'}>Floodplain</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'alternatives'}>Alternatives</Checkbox> <span className="filt-s">1</span></p>
                    <p><Checkbox value={'conceptual'}>Conceptual</Checkbox> <span className="filt-s">1</span></p>
                </Checkbox.Group>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Start year <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Radio.Group value={selectedFilters[START_YEAR]} onChange={(e) => handleRadioGroup(e, START_YEAR)}>
                    <p><Radio value={'2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2021'}>2021</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Completed year <Popover content={content08}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Radio.Group value={selectedFilters[COMPLETED_YEAR]} onChange={(e) => handleRadioGroup(e, COMPLETED_YEAR)}>
                    <p><Radio value={'2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2021'}>2021</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Capital Goal <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[CAPITAL_GOAL]} onChange={(e) => handleRadioGroup(e, CAPITAL_GOAL)}>
                    <p><Radio value={'reduceFloodRiskStructures'}>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'createSharedUsePathsRecreation'}>Shared-Use Paths and Recreation</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'includePermanentWaterQualityBMP'}>Include Permanent Water Quality BMP</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'streamBankBedStabilization'}>Stream Bank or Bed Stabilization</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'vegetationEnhancements'}>Vegetation Enhancements</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Study goal - Master plan & Fhad <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[STUDY_GOAL]} onChange={(e) => handleRadioGroup(e, STUDY_GOAL)}>
                    <p><Radio value={'reduceFloodRiskStructures'}>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'stabilization'}>Stabilization</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'eliminateRoadwayOvertopping'}>Eliminate Roadway Overstopping</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'increasedConveyance'}>Increased Conveyance</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'peakFlowReduction'}>Peak Flow Reduction</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'waterQuality'}>Water Quality</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'guideDevelopment'}>Guide Development</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>MHFD Dollars Allocated <Popover content={content09}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Radio.Group value={selectedFilters[MHFD_DOLLARS_ALLOCATED]} onChange={(e) => handleRadioGroup(e, MHFD_DOLLARS_ALLOCATED)}>
                    <p><Radio value={'[0,5000000]'}>0-5M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[5000000,10000000]'}>5M-10M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[10000000,15000000]'}>10M-15M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[15000000,20000000]'}>15M-20M</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Work Plan Year <Popover content={content10}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                <Radio.Group value={selectedFilters[WORK_PLAN_YEAR]} onChange={(e) => handleRadioGroup(e, WORK_PLAN_YEAR)}>
                    <p><Radio value={'2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2020'}>2020</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters</h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Problem Type <Popover content={content11}><img src="/Icons/icon-19.svg" alt="" width="12px"/></Popover></label>
                <Select defaultValue="- Select -" style={{ width: '100%'}} onChange={(value: string) => handleSelect(value, PROBLEM_TYPE)}>
                    {dropdowns[PROBLEM_TYPE]?dropdowns[PROBLEM_TYPE].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
            <Col span={12}>
                <label>Watershed Manager / Service Area</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, SERVICE_AREA_VALUE)}>
                    {dropdowns[SERVICE_AREA_VALUE]?dropdowns[SERVICE_AREA_VALUE].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Jurisdiction</label>
                <Select value={getSelectValue(JURIDICTION)} style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, JURIDICTION)}>
                    {dropdowns[JURIDICTION]?dropdowns[JURIDICTION].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
            <Col span={12}>
                <label>County</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, COUNTY)}>
                    {dropdowns[COUNTY]?dropdowns[COUNTY].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Local Government Manager <Popover content={content12}><img src="/Icons/icon-19.svg" alt="" width="12px"/></Popover></label>
                <Select defaultValue="- Select -" style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, REQUESTED_START_YEAR)}>
                    {dropdowns[LG_MANAGER]?dropdowns[LG_MANAGER].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
            <Col span={12}>
                <label>Requested Start Year</label>
                <Select value={getSelectValue(REQUESTED_START_YEAR)} style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, REQUESTED_START_YEAR)}>
                    {dropdowns[REQUESTED_START_YEAR]?dropdowns[REQUESTED_START_YEAR].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Stream Name</label>
                <Select defaultValue="- Select -" style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, STREAM_NAME)}>
                    {dropdowns[STREAM_NAME]?dropdowns[STREAM_NAME].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
            <Col span={12}>
                <label>Creator <Popover content={content13}><img src="/Icons/icon-19.svg" alt="" width="12px"/></Popover></label>
                <Select value={getSelectValue(CREATOR)} style={{ width: '100%' }} onChange={(value: string) => handleSelect(value, CREATOR)}>
                    {dropdowns[CREATOR]?dropdowns[CREATOR].map((dropdown : DropdownDefaultTypes) => (
                        <Option key={dropdown._id[0]._id} value={dropdown._id[0]._id + '|' + dropdown._id[0].firstName }>
                            {dropdown._id[0].name}
                        </Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option> }
                </Select>
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>MHFD Dollars Requested</label>
                <Select value={getSelectValue(MHFD_DOLLAR_REQUESTED)} style={{ width: '100%', marginBottom: '15px' }} onChange={(value: string) => handleSelect(value, MHFD_DOLLAR_REQUESTED)}>
                    {dropdowns[MHFD_DOLLAR_REQUESTED]?dropdowns[MHFD_DOLLAR_REQUESTED].map((dropdown : any) => (
                        <Option key={dropdown} value={dropdown}>{dropdown}</Option>
                    )) :
                    <Option value="disabled" disabled>
                        No Data Founded
                    </Option>}
                </Select>
            </Col>
        </Row>

        <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div>
        </div>
    </>
)

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
