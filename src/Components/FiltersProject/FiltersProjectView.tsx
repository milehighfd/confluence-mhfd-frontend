import React, { useState, useEffect } from "react";
import { Tabs, Tag, Row, Col, Checkbox, Popover } from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER, COMPONENT_LAYERS } from '../../constants/constants';
import { FiltersProjectTypes } from "../../Classes/MapTypes";
import store from "../../store";
import { elementCost } from "../../utils/utils";
import { useMapDispatch, useMapState } from "../../hook/mapHook";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { TabPane } = Tabs;
let contents: any = [];
contents.push((<div className="popoveer-00">Problems: Problems represent areas where values such as public health, safety, and environmental quality are at risk due to potential flooding, erosion, or other identified threats within MHFD’s purview.</div>));
contents.push((<div className="popoveer-00">Projects: Projects are active efforts (i.e. planned and budgeted or funded and underway) to solve the problems identified in the Problems dataset or brought to MHFD by local governments.</div>));
contents.push((<div className="popoveer-00">Components: Components are specific elements of a problem (i.e. master planned improvements or stream assessment data points) that are the building blocks for projects to solve those problems.</div>));


const FiltersHeader = ({ filterProblemOptions, filterProjectOptions, setFilterProblemOptions, setFilterProjectOptions, filterComponentOptions,
  setFilterComponentOptions, getGalleryProjects, getGalleryProblems, totalElements, type, totalComponents }
  : { filterProblemOptions: any, filterProjectOptions: any, setFilterProblemOptions: Function, setFilterProjectOptions: Function, filterComponentOptions: any,
    setFilterComponentOptions: Function, getGalleryProjects: Function, getGalleryProblems: Function, totalElements: number, type: string, totalComponents: number}) => {
    const params = store.getState().map.paramFilters;

    const deleteFilter = (tag: string, value: string) => {
      const auxFilterComponents = { ...filterComponentOptions };
      const valueTag = tag === 'estimatedcost'?  filterComponentOptions[tag]: filterComponentOptions[tag].split(',');
      const auxValueTag = [] as Array<string>;
      for (let index = 0; index < valueTag.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
              auxValueTag.push(element);
          }
      }
      let newValue = '';
      for (let index = 0; index < auxValueTag.length; index++) {
          const element = auxValueTag[index];
          if (element !== '') {
              newValue = newValue ? (newValue + ',' + element) : element;
          }
      }
      auxFilterComponents[tag] = tag === 'estimatedcost'? auxValueTag: newValue;
      setFilterComponentOptions(auxFilterComponents);
      getGalleryProjects();
      getGalleryProblems();
  }
  const deleteTagProblem = (tag: string, value: string) => {
      const auxFilterProblems = { ...filterProblemOptions };
      const valueTag = tag === 'cost'?  filterProblemOptions[tag]: filterProblemOptions[tag].split(',');
      const auxValueTag = [] as Array<string>;
      for (let index = 0; index < valueTag.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
              auxValueTag.push(element);
          }
      }
      let newValue = '';
      for (let index = 0; index < auxValueTag.length; index++) {
          const element = auxValueTag[index];
          if (element !== '') {
              newValue = newValue ? (newValue + ',' + element) : element;
          }
      }
      auxFilterProblems[tag] = tag === 'cost'? auxValueTag: newValue;
      setFilterProblemOptions(auxFilterProblems);
      getGalleryProblems();
  }
  const deleteTagProject = (tag: string, value: string) => {
      const auxFilterProjects = { ...filterProjectOptions };
      const valueTag = (tag === 'mhfddollarsallocated' || tag === 'totalcost')?  filterProjectOptions[tag]: filterProjectOptions[tag].split(',');
      const auxValueTag = [] as Array<string>;
      for (let index = 0; index < valueTag.length; index++) {
          const element = valueTag[index];
          if (element !== value) {
              auxValueTag.push(element);
          }
      }
      let newValue = '';
      for (let index = 0; index < auxValueTag.length; index++) {
          const element = auxValueTag[index];
          if (element !== '') {
              newValue = newValue ? (newValue + ',' + element) : element;
          }
      }
      auxFilterProjects[tag] = (tag === 'mhfddollarsallocated' || tag === 'totalcost')? auxValueTag: newValue;
      console.log(auxFilterProjects[tag]);

      setFilterProjectOptions(auxFilterProjects);
      getGalleryProjects();
  }
  const tagComponents = [] as any;
    for (const key in filterComponentOptions) {
        const tag = {
            key,
            values: key === 'estimatedcost'?  filterComponentOptions[key]: filterComponentOptions[key].split(',')
        }
        tagComponents.push(tag);
    }

    const tagProblems = [] as any;
    for (const key in filterProblemOptions) {
        const tag = {
            key,
            values: key === 'cost'?  filterProblemOptions[key]: filterProblemOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProblems.push(tag);
        }
    }

    const tagProjects = [] as any;
    for (const key in filterProjectOptions) {
        const tag = {
            key,
            values: (key === 'mhfddollarsallocated' || key === 'totalcost')?  filterProjectOptions[key]: filterProjectOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProjects.push(tag);
        }
    }
  return (
      <div className="hastag">
          {type !== 'Components' ? <h6> Showing {totalElements} {type}:</h6>: <h6> Showing {totalComponents} {type}:</h6>}
          <div style={{ marginBottom: totalElements ? 0 : 5 }}>
                {type === FILTER_PROBLEMS_TRIGGER ? tagProblems.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'cost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                if (tag.key === 'solutionstatus') {
                                    value = element === '10' ? '10% - 25%' : element === '25'? '25% - 50%': element === '50' ? '50% - 75%' : '75% - 100%';
                                } else {
                                  if (tag.key === 'components') {
                                    value = (params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                            params.problems?.components?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                                  } else {
                                      value = element;
                                  }
                                }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProblem(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                }) : tagProjects.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return type !== 'Components' && <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'totalcost' || tag.key === 'mhfddollarsallocated') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                                value = element;
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteTagProject(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                })}
                {tagComponents.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'estimatedcost') {
                                const tagValues = element.split(',');
                                value = elementCost(+tagValues[0], +tagValues[1]);
                            } else {
                              if (tag.key === 'component_type') {
                                value = (params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0] as any) ?
                                          params.components?.component_type?.filter((elementComponent: any) => elementComponent.key === element)[0].value as any : ''
                              } else {
                                  value = element;
                              }
                            }
                            return element && <Tag key={index + element + tag.key} closable onClose={() => deleteFilter(tag.key, element)}>
                                {value}
                            </Tag>
                        })}
                    </>
                })}
            </div>
      </div>
  );
}

export default ({tabPosition, setTabPosition, filterNames, setFilterNames, setToggleFilters,
                handleOnSubmit, handleReset, projectsLength, problemsLength, getDropdownFilters,
                dropdowns, userFiltered, getUserFilters, getValuesByGroupColumn, paramFilters, filterProblemOptions,
                setFilterProblemOptions, getGalleryProblems, filterProjectOptions, setFilterProjectOptions,
                getGalleryProjects, filterComponentOptions, setTabActive, setFilterComponentOptions, componentsTotal, selectedLayers, updateSelectedLayers,  applyFilter,
                setApplyFilter, spinFilter } : FiltersProjectTypes) => {
    const genExtra = () => (
        <Row type="flex" justify="space-around" align="middle" style={{ cursor: 'pointer' }}>
            <Col >
            Apply current map view to filters
            <Checkbox style={{paddingLeft: 6}} checked={applyFilter} onChange={() => {
          setApplyFilter(!applyFilter);
          getGalleryProblems();
          getGalleryProjects();
        }}></Checkbox>
            </Col>
        </Row>
    );
    const { setFilterTabNumber, getParamFilterComponents, 
        getParamFilterProblems, getParamFilterProjects } = useMapDispatch();
    const { boundsMap } = useMapState();
  const getFilterBody = (trigger : string) => {
    switch (trigger) {
      case FILTER_PROBLEMS_TRIGGER:
        return <ProblemsFilter paramProblems={paramFilters.problems}
                  filterProblemOptions={filterProblemOptions}
                  setFilterProblemOptions={setFilterProblemOptions}
                  getGalleryProblems={getGalleryProblems}
                  setToggleFilters={setToggleFilters} />
      case FILTER_PROJECTS_TRIGGER:
        return <ProjectsFilter paramProjects={paramFilters.projects}
                filterProjectOptions={filterProjectOptions}
                setFilterProjectOptions={setFilterProjectOptions}
                getGalleryProjects={getGalleryProjects}
                setToggleFilters={setToggleFilters} />
      case FILTER_COMPONENTS_TRIGGER:
        return <ComponentsFilter paramComponents={paramFilters.components}
                filterComponentOptions={filterComponentOptions}
                setFilterComponentOptions={setFilterComponentOptions}
                getGalleryProblems={getGalleryProblems}
                getGalleryProjects={getGalleryProjects}
                setToggleFilters={setToggleFilters}/>
      default:
        return null;
    }
  }

  return <>
    {!spinFilter && <Tabs activeKey={tabPosition} tabBarExtraContent={genExtra()} onChange={(key) => setTabPosition(key)} className="tabs-map over-00" onTabClick={(e: string) => {
        if( e === '0') {
            setTabActive('0');
            setFilterTabNumber(0);
            //getParamFilterProblems()
        } else {
            if( e === '1') {
                setTabActive('1');
                setFilterTabNumber(1);
            } else {
                setTabActive('2');
                setFilterTabNumber(2);
                const copySelectedLayers = [...selectedLayers];
                if (!copySelectedLayers.includes(COMPONENT_LAYERS)) {
                    copySelectedLayers.push(COMPONENT_LAYERS);
                    updateSelectedLayers(copySelectedLayers);
                }

            }
          }
        }} >
      {tabs.map((value: string, index: number) => {
        return (
          <TabPane key={'' + index} style={{height: window.innerHeight - 240,overflow: 'auto'}} tab={<span><Popover content={contents[index]} placement="rightBottom">{value} </Popover> </span>}>
            <FiltersHeader
              totalElements={value === FILTER_PROJECTS_TRIGGER ? projectsLength : problemsLength}
              totalComponents={componentsTotal}
              type={value}
              filterProblemOptions={filterProblemOptions}
              filterProjectOptions={filterProjectOptions}
              setFilterProblemOptions={setFilterProblemOptions}
              setFilterProjectOptions={setFilterProjectOptions}
              filterComponentOptions={filterComponentOptions}
              setFilterComponentOptions={setFilterComponentOptions}
              getGalleryProblems={getGalleryProblems}
              getGalleryProjects={getGalleryProjects}/>
            {getFilterBody(value)}

          </TabPane>
        );
      })}
    </Tabs>}
  </>
}
