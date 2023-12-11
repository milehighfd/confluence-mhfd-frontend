import { AutoComplete, Select, Tag } from 'antd';
import React from 'react';

const items = [
  { value: 'jack', label: 'Jack' },
  { value: 'South Watershed', label: 'South Watershed' },
  { value: 'Yiminghe', label: 'yiminghe' },
];
export const UpcomingProjectHeader = () => {
  return (
    <div className="upcoming-header">
      <AutoComplete options={items} bordered={false} defaultValue={'South Watershed'}></AutoComplete>
      <span className="upcoming-tag-label">Year 2023 - Quarter 2</span>
    </div>
  );
};
