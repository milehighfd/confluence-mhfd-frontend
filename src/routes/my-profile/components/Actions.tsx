import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Dropdown, Popover, Row, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import CardSearch from "./CardSearch";

const { TabPane } = Tabs;
const { Option } = Select;
const tabKeys = ['Schedule ', 'Calendar'];
const Actions = () => {
  const [tabKey, setTabKey] = useState<any>('Calendar');
  let displayedTabKey = tabKeys;
  const popovers: any = [
    // <div className="popoveer-00"><b>Projects 12:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    // <div className="popoveer-00"><b>Problems 30:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    // <div className="popoveer-00"><b>Saved Searches:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  ]
  return (
    <div className="searches-myprofile">
      <h2 style={{marginTop:'12px', marginBottom:'0px'}} className='title-action'>ACTION ITEMS</h2>
      <Tabs defaultActiveKey={displayedTabKey[0]}
        activeKey={tabKey}
          onChange={(key) => setTabKey(key)} className="tabs-map">
          {
            displayedTabKey.map((tk: string) => (
            <TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 184px)'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
              <div className="user-management-body body-action">
                <h1>May</h1>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>15: Prepare Resolution (109232)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>18: Contact Forest Veg (109123)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>23: Inbox Zero</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>27: Suchedule Site Visit (107721)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>31: aFinish CASFM Presentation</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <h1>June</h1>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>15: Prepare Resolution (109232)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>18: Contact Forest Veg (109123)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>23: Inbox Zero</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>27: Suchedule Site Visit (107721)</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
                <Checkbox style={{marginLeft:'0px'}}>
                  <p style={{ marginBottom:'-2px'}}>31: aFinish CASFM Presentation</p>
                  <p style={{fontWeight:'700', marginBottom:'-2px'}}>Jackass Gulch</p>
                  <p style={{ marginBottom:'10px'}}>Construction Phase</p>
                </Checkbox>
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  )
};

export default Actions;