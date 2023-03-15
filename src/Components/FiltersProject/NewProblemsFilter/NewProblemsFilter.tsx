import React from 'react';
import { Row, Col, Select, Button, Popover } from 'antd';
import PieChartProblem from './PieChartProblem';
import TreeMapProblem from './TreeMapProblem';
import { useMapDispatch, useMapState } from '../../../hook/mapHook';
import { CheckBoxFilters } from '../CheckboxFiltersProblem';
import { DropdownFilters } from '../DropdownFiltersProblem';
const { Option } = Select;
const content = (<div className="popoveer-00"><b>Solution Cost</b> is the total estimated cost to solve a problem.</div>);
const content01 = (<div className="popoveer-00"><b>Priority</b> is the severity of a problem relative to other problems of the same type.</div>);
const content02 = (<div className="popoveer-00"><b>Status</b> is the percentage (by cost) of elements required to solve a problem that have been completed.</div>);
const content03 = (<div className="popoveer-00"> <p style={{fontWeight:'600'}}>Problem Types</p>
<p><span style={{fontWeight:'600'}}>Flood Hazard </span> Problems related to existing flood or fluvial hazard to life and property.</p>
<p><span style={{fontWeight:'600'}}>Stream Function </span> Problems related to the physical, environmental, and social function or condition of the stream in an urban context.</p>
<p><span style={{fontWeight:'600'}}>Watershed Change </span>  Problems related to flood waters that may pose safety or functional concerns related to people, property, and the environment due to changing watershed conditions (land use, topography, regional detention, etc).</p></div>);
const content04 = (<div className="popoveer-00"><b>Service Area</b> is the MHFD Watershed Service Area where the problem is located.</div>);
const content05 = (<div className="popoveer-00"><b>County</b> is the county where the problem is located.</div>);
const content06 = (<div className="popoveer-00"><b>Jurisdiction</b> is the local government where the problem is located.</div>);
const content07 = (<div className="popoveer-00"><b>MHFD Project Manager</b> is the MHFD PM who is responsible for the service area where the problem is located.</div>);

export const NewProblemsFilter = () => {
    const {
        filterProblemOptions,
        paramFilters: {
            problems: paramProblems
        }
    } = useMapState();
    const {
        getGalleryProblems,
        setFilterProblemOptions,
        getParamFilterProblems,
        getProblemCounter,
    } = useMapDispatch();
    const { boundsMap } = useMapState();

    const apply = (values: any, field: string) => {
        const options = { ...filterProblemOptions };
        if ('priority' === field || 'components' === field || 'solutionstatus' === field || 'county' === field
    || 'mhfdmanager' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = 'solutionstatus' === field ? `${values[index]}`: values[index];
                newValue = (newValue || newValue == '0') ? (newValue + ',' + element) : element;
            }
            options[field] = newValue;
        } else {
            options[field] = values;
        }
        setFilterProblemOptions(options);
        getGalleryProblems();
        getParamFilterProblems(boundsMap, options);
        getProblemCounter(boundsMap, options);
    }

    ['mhfdmanager', 'jurisdiction']
        .forEach((key: string) => {
            if (paramProblems[key]) {
                paramProblems[key].sort((a: any, b: any) => {
                    return a?.value?.localeCompare(b?.value)
                });
            }
        });

    const axisLabel = 'Number of Problems';
    if (paramProblems.problemtype) {
        paramProblems.problemtype.sort((a: any, b: any) => {
            if (a.value === 'Human Connection') {
                return 1;
            } else if (b.value === 'Human Connection') {
                return -1;
            } else {
                return b?.value?.localeCompare(a?.value);
            }
        })
    }

    return (
        <>  <div className="scroll-filters" style={{ height: window.innerHeight - 280 }}>
            <Row className="filt-00">
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">Service Area <Popover content={content04}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.servicearea &&
                        <TreeMapProblem data={paramProblems.servicearea} type={'servicearea'} tab={'problem'}
                            selected={filterProblemOptions.servicearea} defaultValue={''}
                            onSelect={(e: string) => apply(e, 'servicearea')} />
                    }
                </Col>
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">County <Popover content={content05}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.county &&
                        <TreeMapProblem data={paramProblems.county} type={'county'} tab={'problem'}
                            selected={filterProblemOptions.county} defaultValue={''}
                            onSelect={(items: any) => apply(items, 'county')} />
                    }
                </Col>
            </Row>
            <hr className='filters-line'></hr>

            <Row className="filt-00" style={{ marginTop: '10px' }}>
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">Problem Type <Popover content={content03}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.problemtype &&
                        <PieChartProblem type={'problemtype'} defaultValue={''}
                            data={paramProblems.problemtype}
                            selected={filterProblemOptions.problemtype}
                            onSelect={(e: string) => apply(e, 'problemtype')} />
                    }
                </Col>
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">Solution Status <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.solutionstatus &&
                         <CheckBoxFilters 
                         type='solutionstatus'
                         labels={
                             {
                                 '0': '0 - 25%',
                                 '25': '25 - 50%',
                                 '50': '50 - 75%',
                                 '75': '75 - 100%'
                             }
                         }
                         data={paramProblems.solutionstatus}
                         selected={filterProblemOptions.solutionstatus}
                         defaultValue={''}
                         onSelect={(items: any) => {
                             console.log(items);
                             console.log(paramProblems);
                             console.log(paramProblems.solutionstatus);
                             console.log(filterProblemOptions, ' filtered');
                             apply(items, 'solutionstatus');
                         }}
                     />
                    }
                </Col>
            </Row>
            <hr className='filters-line'></hr>
            <Row className="filt-00">
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">Problem Priority <Popover content={content01}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.priority &&
                        <CheckBoxFilters data={paramProblems.priority}
                            defaultValue={''}
                            selected={filterProblemOptions.priority}
                            onSelect={(items: any) => {
                                apply(items, 'priority');
                            }} />
                    }
                </Col>
                <Col span={12}>
                    <h5 className="filter-title">MHFD Project Manager <Popover content={content07}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <>
                        <CheckBoxFilters
                            defaultValue={''}
                            selected={filterProblemOptions.mhfdmanager}
                            data={paramProblems.mhfdmanager}
                            onSelect={(items: any) => {
                                apply(items, 'mhfdmanager');
                            }}
                        />
                    </>
                </Col>
            </Row>

            <hr className='filters-line'></hr>

            <Row className="filt-00" gutter={[24, 16]} style={{paddingBottom: 10}}>
                <Col span={12}>
                    <h5 className="filter-title chart-filter-title">Solution Cost <Popover content={content02}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    {
                        paramProblems.cost &&   
                        <DropdownFilters 
                        defaultValue={[]} axisLabel={axisLabel}
                            data={paramProblems.cost}
                            selected={filterProblemOptions.cost} onSelect={(items: string) => {
                                console.log(paramProblems.cost);
                                console.log(items);
                                apply(items, 'cost');
                            }}
                            />
                    }
                </Col>
            </Row>
            <hr className='filters-line'></hr>
            <Row className="filt-00" gutter={[24, 16]} style={{paddingBottom: 10}}>
                <Col span={11} style={{ paddingRight: '20px'}}>
                <h5 className="filter-title">Jurisdiction <Popover content={content06}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                    <>
                        <div>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                        &nbsp;|&nbsp;
                        <Button className="btn-svg" onClick={() => { apply('', 'jurisdiction') }}>
                            <u>Reset</u>
                        </Button>
                        </div>
                        <Select placeholder="- Select -" value={filterProblemOptions.jurisdiction ? filterProblemOptions.jurisdiction : '- Select -'}
                            style={{ width: '100%', borderRadius: '5px', fontSize: '12px' }} onChange={(e: string) => {
                                apply(e, 'jurisdiction');
                            }}>
                            {(paramProblems.jurisdiction || []).map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value}`}</Option>
                            })}
                        </Select>
                    </>
                </Col>
            </Row>
            <Row className="filt-00" gutter={[24, 16]} style={{height: 50}}>
                <Col span={24} style={{height: 50}}></Col>
            </Row>
        </div>
        </>
    )
}