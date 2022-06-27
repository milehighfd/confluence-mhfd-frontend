import React, { useEffect } from "react";
import { Tabs, Row, Col, Checkbox, Popover } from 'antd';

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER, COMPONENT_LAYERS, PROBLEMS_TRIGGER, PROJECTS_TRIGGER, COMPONENTS_TRIGGER } from '../../constants/constants';
import { FiltersProjectTypes } from "../../Classes/MapTypes";
import { useMapDispatch, useMapState } from "../../hook/mapHook";
import { NewProblemsFilter } from "./NewProblemsFilter/NewProblemsFilter";
import { NewProjectsFilter } from "./NewProjectsFilter/NewProjectsFilter";
import { NewComponentsFilter } from "./NewComponentsFilter/NewComponentsFilter";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { TabPane } = Tabs;
let contents: any = [];
contents.push((<div className="popoveer-00"><b>Problems:</b> Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00"><b>Projects:</b> Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));
contents.push((<div className="popoveer-00"><b>Components:</b> Components are specific elements of a problem (i.e. master planned improvements or stream assessment data points) that are the building blocks for projects to solve those problems.</div>));

export default ({
    tabActive,
    tabPosition,
    setTabPosition,
    setTabActive
}: FiltersProjectTypes) => {
    const {
        getGalleryProblems, 
        getGalleryProjects,
        updateSelectedLayers,
        setApplyFilter
    } = useMapDispatch();
    const {
        boundsMap,
        spinCardProblems,
        spinCardProjects,
        totals,
        spinMapLoaded
    } = useMapState();
    const {
        selectedLayers,
        filterProblemOptions,
        filterProjectOptions,
        filterComponentOptions,
        applyFilter,
        spinFilters: spinFilter
      } = useMapState();
    const genExtra = () => (
        <Row justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
            <Col>
            <div className={(spinFilter || spinCardProblems || spinCardProjects || spinMapLoaded ) ? "apply-filter" : 'apply-filter-no-effect' } style={{ borderColor:'transparent', fontSize: '12px', marginTop: '-6px', color: 'rgba(17, 9, 60, 0.5)' }}>
                Apply map view to filters
              <Checkbox style={{ paddingLeft: 6 }} checked={applyFilter} onChange={() => {
                      setApplyFilter(!applyFilter);
                      getGalleryProblems();
                      getGalleryProjects();
                  }}></Checkbox>
                <div className="progress">
                    <div className="progress-value"></div>
              </div>
            </div>
            </Col>
        </Row>
    );

    const { setFilterTabNumber, getParamFilterComponents,
        getParamFilterProblems, getParamFilterProjects, getTabCounters } = useMapDispatch();
    const getFilterBody = (trigger: string) => {
        switch (trigger) {
            case FILTER_PROBLEMS_TRIGGER:
                return <NewProblemsFilter />
            case FILTER_PROJECTS_TRIGGER:
                return <NewProjectsFilter />
            case FILTER_COMPONENTS_TRIGGER:
                return <NewComponentsFilter />
            default:
                return null;
        }
    }
    useEffect(() => {
        getTabCounters(boundsMap, filterProblemOptions, filterProjectOptions, filterComponentOptions);
    }, [])
    return <>
        { <Tabs activeKey={tabPosition} tabBarExtraContent={genExtra()} onChange={(key) => setTabPosition(key)} className="tabs-map over-00" onTabClick={(e: string) => {
            if (e === '0') {
                setTabActive('0');
                setFilterTabNumber(PROBLEMS_TRIGGER);
                getParamFilterProblems(boundsMap, filterProblemOptions);
            } else {
                if (e === '1') {
                    setTabActive('1');
                    setFilterTabNumber(PROJECTS_TRIGGER);
                    getParamFilterProjects(boundsMap, filterProjectOptions);
                } else {
                    setTabActive('2');
                    setFilterTabNumber(COMPONENTS_TRIGGER);
                    getParamFilterComponents(boundsMap, filterComponentOptions);
                    const copySelectedLayers = [...selectedLayers];
                    if (!copySelectedLayers.includes(COMPONENT_LAYERS)) {
                        copySelectedLayers.push(COMPONENT_LAYERS);
                        updateSelectedLayers(copySelectedLayers);
                    }

                }
            }
        }} >
            {tabs.map((value: string, index: number) => {
                let tabLabel;
                if (`${index}` === tabActive) {
                    let total = (index === 0) ? totals.problems : (index === 1 ? totals.projects : totals.components);
                    let totalLabel = `${total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    tabLabel = `${value} (${totalLabel})`;
                } else {
                    tabLabel = `${value}`;
                }
                return (
                    <TabPane key={'' + index} style={{ height: window.innerHeight - 240, overflow: 'auto' }} tab={<span><Popover content={contents[index]} placement="rightBottom">{tabLabel} </Popover> </span>}>
                        {!spinFilter && getFilterBody(value)}
                    </TabPane>
                );
            })}
        </Tabs>}
    </>
}
