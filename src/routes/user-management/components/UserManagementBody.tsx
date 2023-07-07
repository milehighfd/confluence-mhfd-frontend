import { Popover, Tabs } from 'antd';
import React, { useState } from 'react';
import BoardYear from 'routes/user-management/components/BoardYear';
import UserActivity from 'routes/user-management/components/UserActivity';
import UserList from 'routes/user-management/components/UserList';

const USER_MANAGEMENT = 'Users Management';
const USER_ACTIVITY = 'User Activity';
const BOARD_YEAR = 'Board Year';
  
const tabKeyComponentMap = {
  [USER_MANAGEMENT]: UserList,
  [USER_ACTIVITY]: UserActivity,
  [BOARD_YEAR]: BoardYear,
};

const tabKeys = [USER_MANAGEMENT, USER_ACTIVITY, BOARD_YEAR];
const UserManagementBody = () => {
  const [tabKey, setTabKey] = useState<keyof typeof tabKeyComponentMap>(USER_MANAGEMENT);
  let displayedTabKey = tabKeys;
  const TabComponent = tabKeyComponentMap[tabKey];
  return (
    <div className="work-body user-management">
      <Tabs defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={(key) => setTabKey(key as any)} className="tabs-map"
      >
        {
          displayedTabKey.map((tk: string) => (
            <Tabs.TabPane
              key={tk}
              style={{marginBottom:'0px'}}
              tab={
                <span>
                  <Popover placement="rightBottom">
                    {tk}
                  </Popover>
                </span>
              }
            >
              <div className="user-management-body">
                <TabComponent />
              </div>
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </div>
  );
};

export default UserManagementBody;
