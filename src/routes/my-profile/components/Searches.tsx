import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Popover, Row, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import CardSearch from "./CardSearch";
import ModalEditSearch from "./ModalEditSearch";

const { TabPane } = Tabs;
const { Option } = Select;
const tabKeys = ['Projects 12', 'Problems 30', 'Saved Searches', 'Teams', 'Account Settings'];
const Searches = () => {
  const [tabKey, setTabKey] = useState<any>('Saved Searches');
  const [openModal, setOpenModal] = useState(false);
  let displayedTabKey = tabKeys;
  const popovers: any = [
    <div className="popoveer-00"><b>Projects 12:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    <div className="popoveer-00"><b>Problems 30:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    <div className="popoveer-00"><b>Saved Searches:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  ]
  return (
  <>
    {openModal && <ModalEditSearch visible={openModal} setVisible={setOpenModal}/>}
    <div className="searches-myprofile">
      <Tabs defaultActiveKey={displayedTabKey[2]}
        activeKey={tabKey}
          onChange={(key) => setTabKey(key)} className="tabs-map">
          {
            displayedTabKey.map((tk: string) => (
            <TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 140px)', overflowX:'hidden'}} tab={<span><Popover content={popovers[tabKeys.indexOf(tk)]} placement="rightBottom">{tk} </Popover> </span>} key={tk}>
              <div className="user-management-body">
                <div className="avatar-group">
                  <h2 style={{marginLeft:'25px'}}>My Saved Searches</h2>
                  <Button className="btn-purple"><PlusOutlined />New Search</Button>
                </div>
                <div style={{marginTop:'15px', marginLeft:'25px'}}>
                  <Row gutter={16}>
                    <CardSearch name="Cherry Creek Service Area > $200K" subName="23 Projects Selected" setEdit={setOpenModal}/>
                    <CardSearch name="Recent Projects" subName="8 Projects Selected" setEdit={setOpenModal}/>
                    <CardSearch name="Studies in Lonetree" subName="45 Projects Selected" setEdit={setOpenModal}/>
                  </Row>
                </div>
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  </>
  )
};

export default Searches;