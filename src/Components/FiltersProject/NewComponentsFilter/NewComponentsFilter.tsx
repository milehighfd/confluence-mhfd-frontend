import React from "react";
import { Row, Col, Popover, Select, Button } from 'antd';

import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import HorizontalBarChart from "../NewProblemsFilter/HorizontalBarChart";
import RheoStat from "../NewProblemsFilter/RheoStat";
import TreeMap from "../NewProblemsFilter/TreeMap";
import RheoStatYear from "../NewProblemsFilter/RheoStatYear";

const { Option } = Select;
const content = (<div className="popoveer-00"><b>Service Area:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content1 = (<div className="popoveer-00"><b>County:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content2 = (<div className="popoveer-00"><b>Jurisdiction:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);
const content3 = (<div className="popoveer-00"><b>Watershed Manager:</b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos blanditiis, sit omnis rerum nam, officia tempore sunt pariatur nihil deserunt non enim! Eligendi iure repellendus natus dolore temporibus quidem numquam.</div>);

const content14 = (<div className="popoveer-00"><b>Component Type:</b> is a description of the type of Improvement or Data Point that has been identified at a particular location. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content15 = (<div className="popoveer-00"><b>Component Status:</b> is the status of implementing an improvement. (The term "Component" refers to a "Component of the Solution to a Problem," in the context of Capital Projects, or to a "Component of a Problem," in the context of Maintenance Projects.)</div>);
const content16 = (<div className="popoveer-00"><b>Year of Study:</b> refers to the year of the Study in which the Component was first identified or proposed.</div>);
const content17 = (<div className="popoveer-00"><b>Estimated Cost:</b> is the Estimated Cost of implementing or addressing a Component as part of a Capital or Maintenance project.</div>);

export const NewComponentsFilter = ({ paramComponents, filterComponentOptions, setFilterComponentOptions, getGalleryProblems, getGalleryProjects, setToggleFilters }: any) => {
    const { getParamFilterComponents } = useMapDispatch();
    const { boundsMap } = useMapState();

    const apply = (values: any, field: string) => {
        console.log('value: ' + values + ", field: " + field);
        const options = { ...filterComponentOptions };
        if ('component_type' === field || 'status' === field || 'yearofstudy' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element) : element;
            }
            options[field] = newValue;
        } else {
            options[field] = values;
        }
        //let labelsProjects = [...labelsFiltersProjects];
        setFilterComponentOptions(options);
        getGalleryProjects();
        getGalleryProblems();
        getParamFilterComponents(boundsMap, options);
    }
    const reset = () => {
        const options = { ...filterComponentOptions };
        options.component_type = '';
        options.status = '';
        options.yearofstudy = '';
        options.estimatedcost = [];
        options.jurisdiction = '';
        options.county = '';
        options.mhfdmanager = '';
        options.servicearea = '';
        setFilterComponentOptions(options);
        getGalleryProjects();
        getGalleryProblems();
        getParamFilterComponents(boundsMap, options);
    }

    const filterFunction = (r: any) => {
        return r.value !== null && r.value !== '';
    }


    ['watershed', 'jurisdiction', 'county', 'servicearea', 'status']
        .forEach((key: string) => {
            if (paramComponents[key]) {
                paramComponents[key] = paramComponents[key].filter(filterFunction);
            }
        });
    ['watershed', 'jurisdiction']
        .forEach((key: string) => {
            if (paramComponents[key]) {
                paramComponents[key].sort((a: any, b: any) => {
                    return a.value.localeCompare(b.value)
                });
            }
        });

    const axisLabel = 'Number of Components';

    return <>  <div className="scroll-filters" style={{ height: window.innerHeight - 295 }}>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Component Type <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.component_type &&
                    <HorizontalBarChart type={'component_type'} defaultValue={''} axisLabel={axisLabel}
                        data={paramComponents.component_type} color={'#66d4ff'}
                        selected={filterComponentOptions.component_type}
                        onSelect={(items: any) => apply(items, 'component_type')} />
                }
            </Col>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Estimated Cost <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.estimatedcost &&
                    <RheoStat defaultValue={[]} axisLabel={axisLabel}
                        data={paramComponents.estimatedcost}
                        selected={filterComponentOptions.estimatedcost}
                        onSelect={(items: any) => apply(items, 'estimatedcost')} />
                }
            </Col>
        </Row>

        <Row className="filt-00">
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Component Status <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.status &&
                    <HorizontalBarChart type={'status'} defaultValue={''} axisLabel={axisLabel}
                        data={paramComponents.status} color={'#261964'}
                        selected={filterComponentOptions.status}
                        onSelect={(items: any) => apply(items, 'status')} />
                }
            </Col>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Year Of Study <Popover content={content16}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.yearofstudy &&
                    <RheoStatYear type={'yearofstudy'} defaultValue={''} axisLabel={axisLabel}
                        data={paramComponents.yearofstudy}
                        selected={filterComponentOptions.yearofstudy}
                        onSelect={(e: string) => apply(e, 'yearofstudy')} />
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Watershed Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.servicearea &&
                    <TreeMap data={paramComponents.servicearea} type={'servicearea'} tab={'component'}
                        selected={filterComponentOptions.servicearea} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'servicearea')} />
                }
            </Col>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>County <Popover content={content1}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.county &&
                    <TreeMap data={paramComponents.county} type={'county'} tab={'component'}
                        selected={filterComponentOptions.county} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'county')} />
                }
            </Col>
        </Row>

        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>Jurisdiction <Popover content={content2}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.jurisdiction &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                    &nbsp;|&nbsp;
                    <Button className="btn-svg" onClick={() => { apply('', 'jurisdiction') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterComponentOptions.jurisdiction ? filterComponentOptions.jurisdiction : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'jurisdiction');
                        }}>
                            {paramComponents.jurisdiction.map((element: any, index: number) => {
                                return element && <Option key={index} value={element.value}>{`${element.value} (${element.counter})`}</Option>
                            })}
                        </Select>
                    </>
                }
            </Col>
            <Col span={12}>
                <h5 style={{ marginBottom: -5 }}>MHFD Watershed Manager <Popover content={content3}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents.watershed &&
                    <>
                        <Button className="btn-svg" onClick={() => { }}>
                            <u>Apply</u>
                        </Button>
                    &nbsp;|&nbsp;
                    <Button className="btn-svg" onClick={() => { apply('', 'mhfdmanager') }}>
                            <u>Reset</u>
                        </Button>
                        <Select value={filterComponentOptions.mhfdmanager ? filterComponentOptions.mhfdmanager : '- Select -'} style={{ width: '100%' }} onChange={(e: string) => {
                            apply(e, 'mhfdmanager');
                        }}>
                            {paramComponents.watershed.map((element: any, index: number) => {
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