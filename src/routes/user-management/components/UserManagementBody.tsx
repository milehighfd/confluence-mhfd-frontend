import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Tabs } from 'antd';
import { DownOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";
import UserList from "./UserList";
import ProjectsList from "./ProjectsList";

const { TabPane } = Tabs;
const tabKeys = ['Roles Management', 'Users Management', 'Project Management'];
const popovers: any = [
  <div className="popoveer-00"><b>Roles Management:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  <div className="popoveer-00"><b>Users Management:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  <div className="popoveer-00"><b>Project Management:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
]
const UserManagementBody = () => {
  const [tabKey, setTabKey] = useState<any>('Users Management');
  const [openAction, setOpenAction] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  let displayedTabKey = tabKeys;
  const [optionSelect, setOptionSelect] = useState('List View')
  return <>
    <div className="work-body user-management">
      <Tabs defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
          onChange={(key) => setTabKey(key)} className="tabs-map">
          {
            displayedTabKey.map((tk: string) => (
            <TabPane style={{marginBottom:'0px'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
              <div className="user-management-body">
                {tabKey === 'Users Management' &&<UserList/>}
                {tabKey === 'Project Management' && <ProjectsList/>}
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  </>
};

export default UserManagementBody;