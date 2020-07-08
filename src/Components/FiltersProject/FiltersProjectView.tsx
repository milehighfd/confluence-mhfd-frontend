import React, { useState, useEffect } from "react";
import { Button, Tabs, Tag } from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER, DROPDOWN_PROJECT_FILTERS } from '../../constants/constants';
import { FiltersProjectTypes, FilterNamesTypes } from "../../Classes/MapTypes";
import store from "../../store";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { TabPane } = Tabs;

const FiltersHeader = ({ filterProblemOptions, filterProjectOptions, setFilterProblemOptions, setFilterProjectOptions, filterComponentOptions,
  setFilterComponentOptions, getGalleryProjects, getGalleryProblems, totalElements, type } 
  : { filterProblemOptions: any, filterProjectOptions: any, setFilterProblemOptions: Function, setFilterProjectOptions: Function, filterComponentOptions: any,
    setFilterComponentOptions: Function, getGalleryProjects: Function, getGalleryProblems: Function, totalElements: number, type: string}) => {
    const params = store.getState().map.paramFilters;
    const deleteFilter = (tag: string, value: string) => {
      const auxFilterComponents = { ...filterComponentOptions };
      const valueTag = filterComponentOptions[tag].split(',') as Array<string>;
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
      auxFilterComponents[tag] = newValue;
      setFilterComponentOptions(auxFilterComponents);
      getGalleryProjects();
      getGalleryProblems();
  }
  const deleteTagProblem = (tag: string, value: string) => {
      const auxFilterProblems = { ...filterProblemOptions };
      const valueTag = filterProblemOptions[tag].split(',') as Array<string>;
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
      auxFilterProblems[tag] = newValue;
      setFilterProblemOptions(auxFilterProblems);
      getGalleryProblems();
  }
  const deleteTagProject = (tag: string, value: string) => {
      const auxFilterProjects = { ...filterProjectOptions };
      const valueTag = filterProjectOptions[tag].split(',') as Array<string>;
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
      auxFilterProjects[tag] = newValue;
      setFilterProjectOptions(auxFilterProjects);
      getGalleryProjects();
  }
  const tagComponents = [] as any;
    for (const key in filterComponentOptions) {
        const tag = {
            key,
            values: filterComponentOptions[key].split(',')
        }
        tagComponents.push(tag);
    }

    const tagProblems = [] as any;
    for (const key in filterProblemOptions) {
        const tag = {
            key,
            values: filterProblemOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProblems.push(tag);
        }
    }

    const tagProjects = [] as any;
    for (const key in filterProjectOptions) {
        const tag = {
            key,
            values: filterProjectOptions[key].split(',')
        }
        if (key !== 'keyword' && key !== 'column' && key !== 'order') {
            tagProjects.push(tag);
        }
    }
  return (
      <div className="hastag">
          {type !== 'Components' ? <h6> Showing {totalElements} {type}:</h6>: <h6> Showing  {type}:</h6>}
          <div style={{ marginBottom: totalElements ? 0 : 5 }}>
                {type === FILTER_PROBLEMS_TRIGGER ? tagProblems.map((tag: { key: string, values: Array<string> }, index: number) => {
                    return <>
                        {tag.values.map((element: string) => {
                            let value = '';
                            if (tag.key === 'cost') {
                                value = element === '1' ? '1M - 10M' : ((element === '5')? '5M - 10M': ((element === '10') ? '10M - 15M' : '20 - 25M'));
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
                            if (tag.key === 'totalcost') {
                                value = element === '0' ? '0 - 5M' : ((element === '5')? '5M- 1M': ((element === '10') ? '1M - 15M' : (element === '15') ? '15M - 20M' :'20M - 25M'));
                            } else {
                                if (tag.key === 'mhfddollarsallocated') {
                                    value = element === '1' ? '1M - 5M' : ((element === '5')? '5M - 10M': ((element === '10') ? '10M - 15M' : (element === '15') ? '15M - 20M' :'20M - 25M'));
                                } else {
                                    value = element;
                                }
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
                                value = element === '0' ? '0 - 2M' : ((element === '2') ? '2M - 4M' : ((element === '4') ? '4M - 6M' : (element === '6') ? '6M - 8M' : '8M - 10M'));
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
                getGalleryProjects, filterComponentOptions, setFilterComponentOptions } : FiltersProjectTypes) => {
                  

  const [selectedFilters, setSelectedFilters] = useState<{[key: string] : string | Array<string>}>({});
  
  // useEffect(() => {
  //   getDropdownFilters(DROPDOWN_PROJECT_FILTERS);
  // }, [getDropdownFilters]);

  useEffect(() => {
    let selected : any = {};
    filterNames.forEach((filter : FilterNamesTypes) => {
      const checkboxValue = filterNames.filter((value : FilterNamesTypes) => value.key === filter.key).length;
      if (checkboxValue > 1) {
        const checkboxArray = selected[filter.key]?selected[filter.key]:[];
        checkboxArray.push(filter.type);
        selected = { ...selected, [filter.key]: checkboxArray };
      } else {
        selected = { ...selected, [filter.key]: filter.type };
      }
    });
    setSelectedFilters(selected);
  }, [filterNames]);

  const handleRadioGroup = (event : React.SyntheticEvent<EventTarget>, id : string) => {
    setSelectedFilters({...selectedFilters, [id]: (event.target as HTMLButtonElement).value });
  }

  const handleCheckbox = (checkedValues : Array<string>, id : string) => {
    setSelectedFilters({...selectedFilters, [id]: checkedValues });
  }

  const handleSelect = (value: string, id : string) => {
    if (typeof value === 'string' && value.includes("|")) {
      /* To store the user id at the position 0, and the user fistName to filter it*/
      const userData = value.split("|");
      const [userId, userName] = userData;
      getUserFilters(userId, userName);
      setSelectedFilters({...selectedFilters, [id]: userId});
    } else {
      setSelectedFilters({...selectedFilters, [id]: value});
    }
  }

  const handleAppliedChanges = () => {
    setToggleFilters(false);
    handleOnSubmit(selectedFilters);
  }

  const handleAppliedReset = () => {
    setToggleFilters(false);
    handleReset();
  }

  const deleteFilter = (index: number) => {
    const newFilters = [...filterNames];
    newFilters.splice(index, 1);
    setFilterNames(newFilters);
  }

  const getSelectValue = (selectValue : string) => {
    const selectId = selectedFilters[selectValue];
    const markedValue = userFiltered[selectId as string] || selectedFilters[selectValue] || '- Select -';
    return markedValue;
  }

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
    <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map over-00">
      {tabs.map((value: string, index: number) => {
        return (
          <TabPane tab={value} key={'' + index} style={{height: window.innerHeight - 280,overflow: 'auto'}}>
            <FiltersHeader 
              totalElements={value === FILTER_PROJECTS_TRIGGER ? projectsLength : problemsLength}
              type={value}
              filterProblemOptions={filterProblemOptions}
              filterProjectOptions={filterProjectOptions}
              setFilterProblemOptions={setFilterProblemOptions}
              setFilterProjectOptions={setFilterProjectOptions}
              filterComponentOptions={filterComponentOptions}
              setFilterComponentOptions={setFilterComponentOptions}
              getGalleryProblems={getGalleryProblems}
              getGalleryProjects={getGalleryProjects} />
            {getFilterBody(value)}
          </TabPane>
        );
      })}
    </Tabs>
  </>
}
