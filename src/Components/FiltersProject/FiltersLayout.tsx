import React from 'react';
import { Row, Col, Button, Tag, Checkbox, Select, Radio} from 'antd';

const { Option } = Select;

const FiltersHeader = () => {
    return (
        <div className="hastag">
            <h6>Showing 67 Problems:</h6>
            <div>
                <Tag closable >
                    $600K - $1.2M
                      </Tag>
                <Tag closable >
                    Active
                      </Tag>
                <Tag closable >
                    Stream Restoration
                      </Tag>
                <Tag closable >
                    Maintenance
                      </Tag>
                <Tag closable >
                    Westminster
                      </Tag>
                <Tag closable >
                    Components
                      </Tag>
            </div>
        </div>
    );
}

export const ProblemsFilter = () => (
    <>
        <FiltersHeader />

        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>$20M-$25M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$10M-$15M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$5M-10M</Radio> <span className="filt-s">302</span></p>
                <p><Radio>$1M-$10M</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Priority <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>High</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Medium</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Low</Radio> <span className="filt-s">109</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Migration type <img src="Icons/icon-19.svg" alt="" /></h5>
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
                <h5>Status <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>75%-100%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>50%-75%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>25%-50%</Radio> <span className="filt-s">208</span></p>
                <p><Radio>10%-25%</Radio> <span className="filt-s">208</span></p>
            </Col>
            <Col span={12}>
                <h5>County <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Checkbox>Adams</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Arapahoe</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Boulder</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Broomfield</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Denver</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Douglas</Checkbox><span className="filt-s">1</span></p>
                <p><Checkbox>Jefferson</Checkbox><span className="filt-s">1</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt="" /></h5>
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
                <label>MHFD Manager</label>
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
                <label>Source</label>
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
    </>
);

export const ProjectsFilter = ({ handleRadioGroup } : { handleRadioGroup : Function}) => (
    <>
        <FiltersHeader />

        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Project type <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeProjectType" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'projectType,capital'}>Capital</Radio> <span className="filt-s">13%</span></p>
                    <p><Radio value={'projectType,maintenance'}>Maintenance</Radio> <span className="filt-s">8%</span></p>
                    <p><Radio value={'projectType,study'}>Study</Radio> <span className="filt-s">19%</span></p>
                    <p><Radio value={'projectType,propertyAcquisition'}>Property Acquisition</Radio> <span className="filt-s">25%</span></p>
                    <p><Radio value={'projectType,special'}>Special</Radio> <span className="filt-s">35%</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Estimated total cost <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeEstimatedCost" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'estimatedCost,20'}>20M-25M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'estimatedCost,15'}>15M-20M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'estimatedCost,5'}>5M-10M</Radio> <span className="filt-s">30</span></p>
                    <p><Radio value={'estimatedCost,0'}>0 - 5M</Radio> <span className="filt-s">30</span></p>
                </Radio.Group>
            </Col>
        </Row>


        <Row className="filt-00">
            <Col span={12}>
                <h5>Capital Status <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Checkbox>Approved</Checkbox> <span className="filt-s">71</span></p>
                <p><Checkbox>Idle</Checkbox> <span className="filt-s">16</span></p>
                <p><Checkbox>Initiated</Checkbox> <span className="filt-s">5</span></p>
                <p><Checkbox>Preliminary Design</Checkbox> <span className="filt-s">4</span></p>
                <p><Checkbox>Final Design</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Construction</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Monitoring</Checkbox> <span className="filt-s">1</span></p>
            </Col>
            <Col span={12}>
                <h5>Study Status <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Checkbox>Approved</Checkbox> <span>1</span></p>
                <p><Checkbox>Idle</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Initiated</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Hydrology</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Floodplain</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Alternatives</Checkbox> <span className="filt-s">1</span></p>
                <p><Checkbox>Conceptual</Checkbox> <span className="filt-s">1</span></p>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Start year <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeStartYear" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'startyear,2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'startyear,2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'startyear,2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'startyear,2021'}>2021</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'startyear,2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Completed year <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeCompletedYear" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'completedyear,2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'completedyear,2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'completedyear,2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'completedyear,2021'}>2021</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'completedyear,2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Capital Goal <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeCapitalGoal" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'capitalgoal,reduceFloodRiskStructures'}>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'capitalgoal,createSharedUsePathsRecreation'}>Shared-Use Paths and Recreation</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'capitalgoal,includePermanentWaterQualityBMP'}>Include Permanent Water Quality BMP</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'capitalgoal,streamBankBedStabilization'}>Stream Bank or Bed Stabilization</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'capitalgoal,vegetationEnhancements'}>Vegetation Enhancements</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Study goal - Master plan & Fhad <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeStudyGoal" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'studyGoal,reduceFloodRiskStructures'}>Reduce Flood Risk to Structures</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,stabilization'}>Stabilization</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,eliminateRoadwayOvertopping'}>Eliminate Roadway Overstopping</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,increasedConveyance'}>Increased Conveyance</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,peakFlowReduction'}>Peak Flow Reduction</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,waterQuality'}>Water Quality</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'studyGoal,guideDevelopment'}>Guide Development</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>MHFD Dollars Allocated <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeMhfdDollars" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={'mhfdDollarRequest,0'}>0-5M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'mhfdDollarRequest,5'}>5M-10M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'mhfdDollarRequest,10'}>10M-15M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'mhfdDollarRequest,15'}>15M-20M</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Work Plan Year <img src="Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group id="onChangeWorkPlanYear" onChange={(e) => handleRadioGroup(e)}>
                    <p><Radio value={2015}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={2017}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={2019}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={2020}>2020</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={2023}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt="" /></h5>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <label>Problem Type</label>
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
                <label>Watershed Manager / Service Area</label>
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
                <label>Local Government Manager</label>
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
                <label>Requested Start Year</label>
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
                <label>Stream Name</label>
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
                <label>Creator</label>
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
                <label>MHFD Dollars Requestede</label>
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

        {/* <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div> */}
    </>
)

export const ComponentsFilter = () => (
    <>
        <FiltersHeader />

        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Component Type <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>Grade Control Structure</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Pipe Appurtenances</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Special Item Point</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Special Item Linear</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Special Item Area</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Channel Improvements Linear</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Component Status <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>Approved</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Active</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>None</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Completed</Radio> <span className="filt-s">13%</span></p>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Year Of Study <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>1972</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1984</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1996</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2008</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2020</Radio> <span className="filt-s">208</span></p>
            </Col>
            <Col span={12}>
                <h5>Estimated Cost <img src="Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>0</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$2M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$4M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$6M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$8M</Radio> <span className="filt-s">208</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters <img src="Icons/icon-19.svg" alt="" /></h5>
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
                <label>JMHFD Watershed / Manager</label>
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
                <label>Stream Name</label>
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
    </>
);
