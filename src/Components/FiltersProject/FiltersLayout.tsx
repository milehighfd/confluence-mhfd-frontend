import React from 'react';
import { Row, Col, Button, Tag, Checkbox, Select, Radio} from 'antd';

import { PROJECT_TYPE, 
        ESTIMATED_COST, 
        CAPITAL_STATUS,
        START_YEAR, 
        COMPLETED_YEAR, 
        CAPITAL_GOAL, 
        STUDY_GOAL, 
        MHFD_DOLLAR_REQUEST, 
        WORK_PLAN_YEAR, 
        STUDY_STATUS } from '../../constants/constants';

const { Option } = Select;

export const ProblemsFilter = () => (
    <>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Solution Cost <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>$20M-$25M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$10M-$15M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$5M-10M</Radio> <span className="filt-s">302</span></p>
                <p><Radio>$1M-$10M</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Priority <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>High</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Medium</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Low</Radio> <span className="filt-s">109</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Migration type <img src="/Icons/icon-19.svg" alt="" /></h5>
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
                <h5>Status <img src="/Icons/icon-19.svg" alt="" /></h5>
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

        <h5 className="filt-h5">Additional filters <img src="/Icons/icon-19.svg" alt="" /></h5>
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

        {/* <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div> */}
    </>
);

export const ProjectsFilter = ({ selectedFilters, handleRadioGroup, handleCheckbox } : any) => (
    <>
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
                <h5>Estimated total cost <img src="/Icons/icon-19.svg" alt="" /></h5>
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
                <h5>Capital Status <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Checkbox.Group value={selectedFilters[CAPITAL_STATUS]} onChange={(items) => handleCheckbox(items, CAPITAL_STATUS)}>
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
                <Checkbox.Group value={selectedFilters[STUDY_STATUS]} onChange={(items) => handleCheckbox(items, STUDY_STATUS)}>
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
                <h5>Start year <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[START_YEAR]} onChange={(e) => handleRadioGroup(e, START_YEAR)}>
                    <p><Radio value={'2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2021'}>2021</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Completed year <img src="/Icons/icon-19.svg" alt="" /></h5>
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
                <h5>MHFD Dollars Allocated <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[MHFD_DOLLAR_REQUEST]} onChange={(e) => handleRadioGroup(e, MHFD_DOLLAR_REQUEST)}>
                    <p><Radio value={'[0,5000000]'}>0-5M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[5000000,10000000]'}>5M-10M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[10000000,15000000]'}>10M-15M</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'[15000000,20000000]'}>15M-20M</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
            <Col span={12}>
                <h5>Work Plan Year <img src="/Icons/icon-19.svg" alt="" /></h5>
                <Radio.Group value={selectedFilters[WORK_PLAN_YEAR]} onChange={(e) => handleRadioGroup(e, WORK_PLAN_YEAR)}>
                    <p><Radio value={'2015'}>2015</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2017'}>2017</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2019'}>2019</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2020'}>2020</Radio> <span className="filt-s">8</span></p>
                    <p><Radio value={'2023'}>2023</Radio> <span className="filt-s">8</span></p>
                </Radio.Group>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters <img src="/Icons/icon-19.svg" alt="" /></h5>
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
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5>Component Type <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>Grade Control Structure</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Pipe Appurtenances</Radio> <span className="filt-s">208</span></p>
                <p><Radio>Special Item Point</Radio> <span className="filt-s">302</span></p>
                <p><Radio>Special Item Linear</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Special Item Area</Radio> <span className="filt-s">109</span></p>
                <p><Radio>Channel Improvements Linear</Radio> <span className="filt-s">109</span></p>
            </Col>
            <Col span={12}>
                <h5>Component Status <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>Approved</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Active</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>None</Radio> <span className="filt-s">13%</span></p>
                <p><Radio>Completed</Radio> <span className="filt-s">13%</span></p>
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5>Year Of Study <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>1972</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1984</Radio> <span className="filt-s">208</span></p>
                <p><Radio>1996</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2008</Radio> <span className="filt-s">208</span></p>
                <p><Radio>2020</Radio> <span className="filt-s">208</span></p>
            </Col>
            <Col span={12}>
                <h5>Estimated Cost <img src="/Icons/icon-19.svg" alt="" /></h5>
                <p><Radio>0</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$2M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$4M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$6M</Radio> <span className="filt-s">208</span></p>
                <p><Radio>$8M</Radio> <span className="filt-s">208</span></p>
            </Col>
        </Row>

        <h5 className="filt-h5">Additional filters <img src="/Icons/icon-19.svg" alt="" /></h5>
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

        {/* <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} className="btn-01">Apply</Button>
        </div> */}
    </>
);
