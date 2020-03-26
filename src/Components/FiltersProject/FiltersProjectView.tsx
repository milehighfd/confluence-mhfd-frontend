import * as React from "react";
import { Collapse, Menu, Button, Tabs, Tag, Card, Input, Select } from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

import { FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER } from '../../constants/constants';

const tabs = [FILTER_PROBLEMS_TRIGGER, FILTER_PROJECTS_TRIGGER, FILTER_COMPONENTS_TRIGGER];

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const menu = (
  <Menu className="js-mm-00">
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const FiltersHeader = ({ filterNames, deleteFilter, totalElements, type } : any) => {
  return (
      <div className="hastag">
          <h6> Showing {totalElements} {type}:</h6>
          <div>
              {filterNames.map((data: String, index: number) => {
                  return <Tag key={index} closable onClose={() => deleteFilter(index)}>
                      {data}
                  </Tag>
              })}
          </div>
      </div>
  );
}

export default ({filterNames, setFilterNames, setToggleFilters, handleOnSubmit} : {filterNames : any, setFilterNames : any, setToggleFilters: Function, handleOnSubmit: Function}) => {
  let selectedFilters: Object = {};

  const handleRadioGroup = (event : any, id : string) => {
    selectedFilters = { ...selectedFilters, [id]: event.target.value };
  }

  const handleAppliedChanges = () => {
    setToggleFilters(false);
    handleOnSubmit(selectedFilters);
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
        return <ProjectsFilter handleRadioGroup={handleRadioGroup} />
      case FILTER_COMPONENTS_TRIGGER:
        return <ComponentsFilter />
      default:
        return null;
    }
  }

  return <>
    <Tabs className="tabs-map">
      {tabs.map((value: string, index: number) => {
        return (
          <TabPane tab={value} key={'' + index}>
            <FiltersHeader
              filterNames={filterNames}
              deleteFilter={deleteFilter}
              totalElements={3}
              type={value} />
            {getFilterBody(value)}
          </TabPane>
        );
      })}
    </Tabs>
    <div className="btn-footer" style={{ marginTop: '25px' }}>
      <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
      <Button style={{ width: '140px' }} onClick={handleAppliedChanges} className="btn-01">Apply</Button>
    </div>
  </>
}