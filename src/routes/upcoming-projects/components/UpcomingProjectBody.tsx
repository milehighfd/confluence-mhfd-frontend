import { Popover, Table, Tabs } from 'antd'
import React, { useState } from 'react'
import BoardYear from 'routes/user-management/components/BoardYear';
import UserActivity from 'routes/user-management/components/UserActivity';
import UserList from 'routes/user-management/components/UserList';
import TableUpcomingProjects from './TableUpcomingProjects';
const { TabPane } = Tabs;

const ALL = 'All';
const CAPITAL = 'Capital';
const MAINTENANCE = 'Maintenance';
const STUDY = 'Study';
const ACQUISITION = 'Acquisition';
const SPECIAL = 'Special';
const DIP = 'DIP';
  
const tabKeyComponentMap = {
  [ALL]: UserList,
  [CAPITAL]: UserActivity,
  [MAINTENANCE]: BoardYear,
  [STUDY]: BoardYear,
  [ACQUISITION]: BoardYear,
  [SPECIAL]: BoardYear,
  [DIP]: BoardYear,
};

const tabKeys = [ALL, CAPITAL, MAINTENANCE, STUDY, ACQUISITION, SPECIAL, DIP];
export const UpcomingProjectBody = () => {
    const [tabKey, setTabKey] = useState<keyof typeof tabKeyComponentMap>(ALL);
    let displayedTabKey = tabKeys;
    const TabComponent = tabKeyComponentMap[tabKey];
  return (
    <div className='upcoming-body'>
      <Tabs defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={(key) => setTabKey(key as any)} 
        className="tabs-upcoming-project"
      >
        {
          displayedTabKey.map((tk: string) => (
            <TabPane
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
                <TableUpcomingProjects />
              </div>
            </TabPane>
          ))
        }
      </Tabs>
    </div>
  )
}
