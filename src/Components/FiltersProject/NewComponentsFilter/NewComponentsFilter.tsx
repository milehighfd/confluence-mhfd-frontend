import React , {useEffect} from "react";
import { Row, Col, Popover } from 'antd';

import { useMapDispatch, useMapState } from "../../../hook/mapHook";
import TreeMapComponent from "../NewProblemsFilter/TreeMapComponent";
import { CheckBoxFilters } from '../CheckboxFiltersComponent';
import { CheckBoxFilters as CheckBoxFiltersProblem } from "../CheckboxFiltersProblem";
import { DropdownFilters } from "../DropdownFilters";
import { DropdownFiltersYearsMax } from "../DropdownFilterMax";

const content = (<div className="popoveer-00"><b>Service Area</b> is the MHFD Watershed Service Area where the action is located.</div>);
const content1 = (<div className="popoveer-00"><b>County</b> is the county where the action is located.</div>);
const content2 = (<div className="popoveer-00"><b>Jurisdiction</b> is the local government where the action is located.</div>);
const content3 = (<div className="popoveer-00"><b>Watershed Manager</b> is the MHFD Watershed Manager responsible for the service area where the action is located.</div>);

const content14 = (<div className="popoveer-00"><b>Action Type</b> is a description of the type of Improvement or Data Point that has been identified at a particular location. (The term "Action" refers to a "Action of the Solution to a Problem," in the context of Capital Projects, or to a "Action of a Problem," in the context of Maintenance Projects.)</div>);
const content15 = (<div className="popoveer-00"><b>Action Status</b> is the status of implementing an improvement. (The term "Action" refers to a "Action of the Solution to a Problem," in the context of Capital Projects, or to a "Action of a Problem," in the context of Maintenance Projects.)</div>);
const content16 = (<div className="popoveer-00"><b>Year of Study</b> refers to the year of the Study in which the Action was first identified or proposed.</div>);
const content17 = (<div className="popoveer-00"><b>Estimated Cost</b> is the Estimated Cost of implementing or addressing a Action as part of a Capital or Maintenance project.</div>);

export const NewComponentsFilter = () => {
    const {
        getGalleryProblems, 
        getGalleryProjects,
        setFilterComponentOptions,
        getParamFilterComponents,
        getComponentsCounter,
    } = useMapDispatch();
    const {
        boundsMap,
        paramFilters: {
            components: paramComponents
        },
        filterComponentOptions
    } = useMapState();

    const apply = (values: any, field: string) => {
        console.log('value: ' + values + ", field: " + field, 'yearofstudy' == field);
        const options = { ...filterComponentOptions };
        if ('component_type' === field || 'status' === field || 'yearofstudy' === field
        || 'jurisdiction' === field || 'mhfdmanager' === field) {
            let newValue = '';
            for (let index = 0; index < values.length; index++) {
                const element = values[index];
                newValue = newValue ? (newValue + ',' + element) : element;
            }
            options[field] = newValue;
        } else if ('estimatedcost' === field) {
          if(values.length === 0 || values === '') {
              options[field] = []
          } else {
              options[field] = [values[0], values[values.length - 1]];
          }
        } else if ('yearofstudy' == field) {
          if(values.length === 0 || values === '') {
            options[field] = []
          } else {
            options[field] = [values[0], values[values.length - 1]];
          }
        } else {
            options[field] = values;
        }
        setFilterComponentOptions(options);
        getGalleryProjects();;
        getGalleryProblems();
        getParamFilterComponents(boundsMap, options);
        // getComponentsCounter(boundsMap, options);
    }

    useEffect(() => {
      console.log('paramComponents', paramComponents);
    } ,[
      paramComponents
    ]);
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
        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Service Area <Popover content={content}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.servicearea &&
                    <TreeMapComponent data={paramComponents.filtersData.servicearea} type={'servicearea'} tab={'component'}
                        selected={filterComponentOptions.servicearea} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'servicearea')} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">County <Popover content={content1}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.county &&
                    <TreeMapComponent data={paramComponents.filtersData.county} type={'county'} tab={'component'}
                        selected={filterComponentOptions.county} defaultValue={''}
                        onSelect={(items: any) => apply(items, 'county')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00" style={{ marginTop: '10px' }}>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Action Type <Popover content={content14}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.component_type &&
                    <CheckBoxFiltersProblem defaultValue={''}
                        data={paramComponents.filtersData.component_type.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterComponentOptions.component_type}
                        onSelect={(items: any) => apply(items, 'component_type')} />
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Action Status <Popover content={content15}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.status &&
                    <CheckBoxFiltersProblem defaultValue={''}
                        data={paramComponents.filtersData.status}
                        selected={filterComponentOptions.status}
                        onSelect={(items: any) => apply(items, 'status')} />
                }
            </Col>
        </Row>
        <hr className='filters-line'></hr>
        <Row className="filt-00">
        <Col span={12}>
                <h5 className="filter-title chart-filter-title">Estimated Cost <Popover content={content17}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    // paramComponents.estimatedcost &&
                    <DropdownFilters type={'estimatedcost'} axisLabel={axisLabel} defaultValue={''}
                        // data={paramComponents.estimatedcost}
                        selected={filterComponentOptions.estimatedcost}
                        onSelect={(items: any) => apply(items, 'estimatedcost')} />
                }
            </Col>
        </Row>
        <hr style={{marginTop:'24px'}} className='filters-line'></hr>
        <Row className="filt-00">
            <Col span={12}>
                <h5 className="filter-title chart-filter-title">Year Of Study <Popover content={content16}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    // paramComponents.yearofstudy &&
                    <DropdownFiltersYearsMax type={'yearofstudy'} defaultValue={''} axisLabel={axisLabel}
                        // data={paramComponents.yearofstudy}
                        selected={filterComponentOptions.yearofstudy}
                        onSelect={(e: string) => apply(e, 'yearofstudy')} />
                }
            </Col>
        </Row>
        <hr style={{marginTop:'24px'}} className='filters-line'></hr>

        <Row className="filt-00" gutter={[24, 16]}>
            <Col span={12}>
                <h5 className="filter-title ">Jurisdiction <Popover content={content2}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.jurisdiction &&
                    <CheckBoxFiltersProblem defaultValue={''}
                        data={paramComponents.filtersData.jurisdiction}
                        selected={filterComponentOptions.jurisdiction}
                        onSelect={(items: any) => apply(items, 'jurisdiction')}/>
                }
            </Col>
            <Col span={12}>
                <h5 className="filter-title ">MHFD Watershed Manager <Popover content={content3}><img src="/Icons/icon-19.svg" alt="" /></Popover></h5>
                {
                    paramComponents?.filtersData?.mhfdmanager &&
                    <CheckBoxFiltersProblem defaultValue={''}
                        data={paramComponents.filtersData.mhfdmanager.sort((a: any, b: any) => a.value.localeCompare(b.value))}
                        selected={filterComponentOptions.mhfdmanager}
                        onSelect={(items: any) => apply(items, 'mhfdmanager')}/>
                }
            </Col>
        </Row>
        <Row className="filt-00" gutter={[24, 16]} style={{height: 50}}>
            <Col span={24} style={{height: 50}}></Col>
        </Row>
    </div>
    </>
}