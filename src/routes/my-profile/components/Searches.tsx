import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Popover, Row, Select, Tabs } from "antd";
import GenericTabView from "Components/Shared/GenericTab/GenericTabView";
import { useMapDispatch, useMapState } from "hook/mapHook";
import { useProfileState } from "hook/profileHook";
import React, { useEffect, useState } from "react";
import { getUserInformation } from "store/actions/ProfileActions";
import CardSearch from "./CardSearch";
import CardsList from "./CardsList";
import ModalEditSearch from "./ModalEditSearch";

const { TabPane } = Tabs;
const { Option } = Select;

const Searches = ({
  counterProjects,
  getCount
}: {
  counterProjects: number,
  getCount: Function,
}) => {
  const { userInformation: user } = useProfileState();
  const [tabKey, setTabKey] = useState<any>();
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState('');
  const { favoriteProblemCards, favoriteProjectCards, favoritesLoader } = useMapState();
  const { favoriteCards } = useMapDispatch();
  const tabKeys = [`Projects ${counterProjects}`, 'Problems 30', 'Teams', 'Account Settings'];
  let displayedTabKey = tabKeys;
  useEffect(() => {
    favoriteCards(user.email, false, { keyword: "", column: 'projectname', order: "asc" });
  }, [user]);
  useEffect(() => {
    getUserInformation();
  }, []);
  const popovers: any = [
    // <div className="popoveer-00"><b>Projects 12:</b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    // <div className="popoveer-00"><b>Problems 30:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
    // <div className="popoveer-00"><b>Saved Searches:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>,
  ]
  return (
  <>
    {openModal && <ModalEditSearch visible={openModal} setVisible={setOpenModal}/>}
    <div className="searches-myprofile">
      <Tabs defaultActiveKey={displayedTabKey[0]}
        activeKey={tabKey}
          onChange={(key) => setTabKey(key)} className="tabs-map">
            <TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 140px)', overflowX:'hidden'}} tab={<span><Popover content={popovers[tabKeys.indexOf(`Projects ${counterProjects}`)]} placement="rightBottom">{`Projects ${counterProjects}`} </Popover> </span>} key={`Projects ${counterProjects}`}>
              <div className="user-management-body">
                <div className="avatar-group">
                  <h2 style={{marginLeft:'25px'}}>Projects</h2>
                  {/* <Button className="btn-purple"><PlusOutlined />New Search</Button> */}
                </div>
                <div style={{marginTop:'10px',  marginLeft:'25px'}}>
                  <Row gutter={16}>
                    <CardsList type="Projects"/>                    
                  </Row>
                </div>
              </div>
            </TabPane>     
            <TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 140px)', overflowX:'hidden'}} tab={<span><Popover content={popovers[tabKeys.indexOf('Problems 30')]} placement="rightBottom">{'Problems 30'} </Popover> </span>} key={'Problems 30'}>
              <div className="user-management-body">
                <div className="avatar-group">
                  <h2 style={{marginLeft:'25px'}}>Problems</h2>
                  {/* <Button className="btn-purple"><PlusOutlined />New Search</Button> */}
                </div>
                <div style={{marginTop:'10px',  marginLeft:'25px'}}>
                  <Row gutter={16}>
                    <CardsList type="Problems" />                    
                  </Row>
                </div>
              </div>
            </TabPane> 
            {/*<TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 140px)', overflowX:'hidden'}} tab={<span><Popover content={'Teams'} placement="rightBottom">{'Teams'} </Popover> </span>} key={'Teams'}>
              <div className="user-management-body">
                <div className="avatar-group">
                  <h2 style={{marginLeft:'25px'}}>Teams</h2>                  
                </div>
                <div style={{marginTop:'10px',  marginLeft:'25px'}}>
                  <Row gutter={16}>
                    <CardsList type="Projects" data={favoriteProjectCards} filter={filter}/>                    
                  </Row>
                </div>
              </div>
            </TabPane>     
            <TabPane style={{marginBottom:'0px', overflowY:'auto', height:'calc(100vh - 140px)', overflowX:'hidden'}} tab={<span><Popover content={'Account Settings'} placement="rightBottom">{'Account Settings'} </Popover> </span>} key={'Account Settings'}>
              <div className="user-management-body">
                <div className="avatar-group">
                  <h2 style={{marginLeft:'25px'}}>Account Settings</h2>
                </div>
                <div style={{marginTop:'10px',  marginLeft:'25px'}}>
                  <Row gutter={16}>
                    <CardsList type="Projects" data={favoriteProjectCards} filter={filter}/>                   
                  </Row>
                </div>
              </div>
            </TabPane>     */}

      </Tabs>
    </div>
  </>
  )
};

export default Searches;