import { Button, Input, Popover, Tabs } from 'antd';
import React, { useState } from 'react';
import TableUpcomingProjects from './TableUpcomingProjects';
import { SearchOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

const ALL = 'All';
const CAPITAL = 'Capital';
const MAINTENANCE = 'Maintenance';
const STUDY = 'Study';
const ACQUISITION = 'Acquisition';
const SPECIAL = 'R&D';
const DIP = 'DIP';

// const tabKeyComponentMap = {
//   [ALL]: TableUpcomingProjects(tipe:'ALL'),
//   [CAPITAL]: TableUpcomingProjects(CAPITAL),
//   [MAINTENANCE]: TableUpcomingProjects(MAINTENANCE),
//   [STUDY]: TableUpcomingProjects(STUDY),
//   [ACQUISITION]: TableUpcomingProjects(ACQUISITION),
//   [SPECIAL]: TableUpcomingProjects(SPECIAL),
//   [DIP]: TableUpcomingProjects(DIP),
// };
const actions = (
  <div className="tabs-upcoming-extra">
    <Input id="search-input" allowClear placeholder="Search" className="search-input" prefix={<SearchOutlined />} />
    <Popover
      className="buttons-tab"
      content={
        <div className="popover-text">
          Filter:
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      }
      placement="bottomLeft"
      overlayClassName="popover-work-header"
    >
      <Button className="buttons" type="link">
        <img src="Icons/ic-003.svg" alt="" />
      </Button>
    </Popover>
    <Popover
      className="buttons-tab"
      content={
        <div className="popover-text">
          Export:
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      }
      placement="bottomLeft"
      overlayClassName="popover-work-header"
    >
      <Button className="buttons" type="link">
        <img src="Icons/ic-004.svg" alt="" />
      </Button>
    </Popover>
    <Popover
      className="buttons-tab"
      content={
        <div className="popover-text">
          Share URL:
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      }
      placement="bottomLeft"
      overlayClassName="popover-work-header"
    >
      <Button className="buttons" type="link">
        <img src="Icons/ic-005.svg" alt="" />
      </Button>
    </Popover>
  </div>
);
const tabKeys = [ALL, CAPITAL, MAINTENANCE, STUDY, ACQUISITION, SPECIAL, DIP];
export const UpcomingProjectBody = () => {
  const [tabKey, setTabKey] = useState<any>(ALL);
  let displayedTabKey = tabKeys;
  // const TabComponent = tabKeyComponentMap[tabKey];
  return (
    <div className="upcoming-body">
      <Tabs
        defaultActiveKey={displayedTabKey[1]}
        activeKey={tabKey}
        onChange={key => setTabKey(key as any)}
        className="tabs-upcoming-project"
        tabBarExtraContent={actions}
      >
        {displayedTabKey.map((tk: string) => (
          <TabPane
            key={tk}
            style={{ marginBottom: '0px' }}
            tab={
              <span>
                <Popover placement="rightBottom">{tk}</Popover>
              </span>
            }
          >
            <TableUpcomingProjects tipe={tabKey} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
