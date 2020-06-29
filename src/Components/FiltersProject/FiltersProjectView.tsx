import React, { useState, useEffect } from "react";
import { Button, Tabs, Tag } from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER, DROPDOWN_PROJECT_FILTERS } from '../../constants/constants';
import { FiltersProjectTypes, FilterNamesTypes } from "../../Classes/MapTypes";

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { TabPane } = Tabs;

const FiltersHeader = ({ filterNames, deleteFilter, totalElements, type } : { filterNames: Array<FilterNamesTypes>, deleteFilter: Function, totalElements: number, type: string}) => {
  return (
      <div className="hastag">
          <h6> Showing {totalElements} {type}:</h6>
          <div>
              {filterNames.map((data: FilterNamesTypes, index: number) => {
                  return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                      {data.value}
                  </Tag>
              })}
          </div>
      </div>
  );
}

export default ({tabPosition, setTabPosition, filterNames, setFilterNames, setToggleFilters,
                handleOnSubmit, handleReset, projectsLength, problemsLength, getDropdownFilters,
                dropdowns, userFiltered, getUserFilters, getValuesByGroupColumn, paramFilters } : FiltersProjectTypes) => {

  const [selectedFilters, setSelectedFilters] = useState<{[key: string] : string | Array<string>}>({});

  useEffect(() => {
    getDropdownFilters(DROPDOWN_PROJECT_FILTERS);
  }, [getDropdownFilters]);

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
        return <ProblemsFilter />
      case FILTER_PROJECTS_TRIGGER:
        return <ProjectsFilter
                  dropdowns={dropdowns}
                  getSelectValue={getSelectValue}
                  selectedFilters={selectedFilters}
                  handleRadioGroup={handleRadioGroup}
                  handleCheckbox={handleCheckbox}
                  handleSelect={handleSelect} />
      case FILTER_COMPONENTS_TRIGGER:
        return <ComponentsFilter />
      default:
        return null;
    }
  }

  return <>
    <Tabs activeKey={tabPosition} onChange={(key) => setTabPosition(key)} className="tabs-map over-00">
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
    {/* <div className="btn-footer" style={{ marginTop: '25px' }}>
      <Button style={{ width: '140px' }} onClick={handleAppliedReset} className="btn-00">Reset</Button>
      <Button style={{ width: '140px' }} onClick={handleAppliedChanges} className="btn-01">Apply</Button>
    </div> */}
  </>
}
