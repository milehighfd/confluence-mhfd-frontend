import { Select } from 'antd';
import React from 'react';

const items = [
  { value: 'South Park', label: 'South Park' },
  { value: 'South Watershed', label: 'South Watershed' },
  { value: 'North Village', label: 'North Village' },
  { value: 'East Primordial Sea', label: 'East Primordial Sea' },
  { value: 'Wester Ice Land', label: 'Wester Ice Land' },
  { value: 'Easter Fire Land', label: 'Easter Fire Land' },
];
export const UpcomingProjectHeader = () => {
  return (
    <div className="upcoming-header">
      <Select className='upcoming-select' options={items} bordered={false} defaultValue='South Watershed'></Select>
      <span className="upcoming-tag-label">Year 2023</span>
    </div>
  );
};
