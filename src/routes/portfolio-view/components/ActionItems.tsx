import React, { useEffect, useState } from "react";
import { Button, Col, Input, Layout, Popover, Row, Select, Tabs, Timeline } from 'antd';
import { DownOutlined, InfoCircleOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Option } from "antd/lib/mentions";
import ButtonGroup from "antd/lib/button/button-group";

const { TabPane } = Tabs;
const tabKeys = ['Capital(67)', 'Study', 'Maintenance', 'Acquisition', 'Special'];
const onChange = (key: string) => {
  console.log(key);
};
const ActionItems = () => {
  const [tabKey, setTabKey] = useState<any>('Capital(67)');
  let displayedTabKey = tabKeys;
  return <>
    <div className="action-items">
      <h3>ACTION ITEMS</h3>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Schedule View " key="1">
          <h1>May</h1>
          <Timeline>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
          </Timeline>
          <h1>June</h1>
          <Timeline>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
            <Timeline.Item>
              <p>
                15: Prepare Resolution (109232)
              </p>
              <p className="title-timeline">
                Jackass Gulch
              </p>
              <p>
                Construction Phase
              </p>
            </Timeline.Item>
          </Timeline>
        </TabPane>
        <TabPane tab="Calendar View" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  </>
};

export default ActionItems;