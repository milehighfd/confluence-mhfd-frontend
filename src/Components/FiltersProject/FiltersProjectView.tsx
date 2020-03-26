import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline,Checkbox, Select, Radio} from 'antd';
import { ProblemsFilter, ProjectsFilter, ComponentsFilter } from "./FiltersLayout";

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
var opciones: Array<string> = [];

const handleRadioGroup = (event : any) => {
  console.log(event.target.value);
  opciones.push(event.target.value);
}

const submitFilters = () => {
  console.log('submit')
}

export default ({listFilters, setListFilters, setToggleFilters, handleOnSubmit} : {listFilters: any, setListFilters: Function, setToggleFilters: Function, handleOnSubmit: Function}) => {

  return <>
      <Tabs defaultActiveKey="1" className="tabs-map">
        <TabPane tab="Problems" key="1">
          <ProblemsFilter />
        </TabPane>

        <TabPane tab="Projects" key="2">
          <ProjectsFilter
              handleRadioGroup={handleRadioGroup} />
          <div className="btn-footer" style={{ marginTop: '25px' }}>
            <Button style={{ width: '140px' }} className="btn-00">Reset</Button>
            <Button style={{ width: '140px' }} onClick={(event) => {
              let auxListFilters = {...listFilters};
              for(const opc of opciones) {
                let values = opc.split(',');
                auxListFilters[values[0]] = values[1];
              }
              setListFilters(auxListFilters);
              setToggleFilters(false);
              handleOnSubmit();
            }} className="btn-01">Apply</Button>
        </div>
        </TabPane>

        <TabPane tab="Components" key="3">
          <ComponentsFilter />
        </TabPane>
      </Tabs>
  </>
}

