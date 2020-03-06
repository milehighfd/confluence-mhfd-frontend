import * as React from "react";
import { Layout, Row, Col, Collapse, Dropdown, Icon, Menu, Button, Tabs, Tag, Card, Input, Progress, Timeline,Checkbox, Select, Radio} from 'antd';


import NavbarView from "../Navbar/NavbarView";
import SidebarView from "../Sidebar/SidebarView";
import MapFilterView from '../MapFilter/MapFilterView';
import MapTypesView from "../MapTypes/MapTypesView";

const { Panel } = Collapse;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const menu = (
  <Menu>
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

export default () => {
  return <>
        <Layout>
          <NavbarView></NavbarView>
          <Layout>
            <SidebarView></SidebarView>
            <Layout className="map-00" style={{height: 'calc(100vh - 58px)'}}>
              
            </Layout>
          </Layout>
        </Layout>
        </>
}
