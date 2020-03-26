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

const FiltersHeader = ({ tags, deleteTag, totalElements, type } : any) => {
  return (
      <div className="hastag">
          <h6> Showing {totalElements} {type}:</h6>
          <div>
              {tags.map((data: String, index: number) => {
                  return <Tag key={index} closable onClose={() => deleteTag(index)}>
                      {data}
                  </Tag>
              })}
          </div>
      </div>
  );
}

export default ({tags, setTags, listFilters, setToggleFilters, handleOnSubmit} : {tags : any, setTags : any, listFilters: any, setToggleFilters: Function, handleOnSubmit: Function}) => {
  const opciones: Array<string> = [];

  const handleRadioGroup = (event : any) => {
    console.log(event.target.value);
    opciones.push(event.target.value);
  }

  const handleAppliedChanges = () => {
    let auxListFilters = {...listFilters};
    for(const opc of opciones) {
      let values = opc.split(',');
      auxListFilters[values[0]] = values[1];
    }
    setToggleFilters(false);
    handleOnSubmit(auxListFilters);
  }

  const deleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
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
    <Tabs defaultActiveKey="1" className="tabs-map">
      {tabs.map((value: string, index: number) => {
        let itemsLength = 0;
        return (
          <TabPane tab={value} key={'' + (index-1)}>
            <FiltersHeader
              tags={tags}
              deleteTag={deleteTag}
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