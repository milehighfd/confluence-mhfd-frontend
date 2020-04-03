import React, { useState, useEffect } from "react";
import { Button, Tabs, Tag } from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER } from '../../constants/constants';

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { TabPane } = Tabs;

const FiltersHeader = ({ filterNames, deleteFilter, totalElements, type } : any) => {
  return (
      <div className="hastag">
          <h6> Showing {totalElements} {type}:</h6>
          <div>
              {filterNames.map((data: any, index: number) => {
                  return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                      {data.value}
                  </Tag>
              })}
          </div>
      </div>
  );
}

export default ({tabPosition, setTabPosition, filterNames, setFilterNames, setToggleFilters, handleOnSubmit, handleReset, projectsLength, problemsLength} : {tabPosition: string, setTabPosition: Function, filterNames : any, setFilterNames : any, setToggleFilters: Function, handleOnSubmit: Function, handleReset: Function, projectsLength: number, problemsLength: number}) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    let selected : any = {};
    filterNames.forEach((filter : any) => {
      const checkboxValue = filterNames.filter((value : any) => value.key === filter.key).length;
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

  const handleRadioGroup = (event : any, id : string) => {
    setSelectedFilters({...selectedFilters, [id]: event.target.value });
  }

  const handleCheckbox = (checkedValues : Array<string>, id : string) => {
    setSelectedFilters({...selectedFilters, [id]: checkedValues });
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

  const getFilterBody = (trigger : string) => {
    switch (trigger) {
      case FILTER_PROBLEMS_TRIGGER:
        return <ProblemsFilter />
      case FILTER_PROJECTS_TRIGGER:
        return <ProjectsFilter
                  selectedFilters={selectedFilters}
                  handleRadioGroup={handleRadioGroup} 
                  handleCheckbox={handleCheckbox} />
      case FILTER_COMPONENTS_TRIGGER:
        return <ComponentsFilter />
      default:
        return null;
    }
  }

  return <>
    <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map">
      {tabs.map((value: string, index: number) => {
        return (
          <TabPane tab={value} key={'' + index}>
            <FiltersHeader
              filterNames={filterNames}
              deleteFilter={deleteFilter}
              totalElements={value === FILTER_PROJECTS_TRIGGER ? projectsLength : problemsLength}
              type={value} />
            {getFilterBody(value)}
          </TabPane>
        );
      })}
    </Tabs>
    <div className="btn-footer" style={{ marginTop: '25px' }}>
      <Button style={{ width: '140px' }} onClick={handleAppliedReset} className="btn-00">Reset</Button>
      <Button style={{ width: '140px' }} onClick={handleAppliedChanges} className="btn-01">Apply</Button>
    </div>
  </>
}