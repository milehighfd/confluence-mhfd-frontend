import { Select } from 'antd';
import React, { useState } from 'react';
import { NEW_PROJECT_TYPES } from '../../../constants/constants';

const MaintenanceTypesDropdown = () => {
  const subtypes = Object.values(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES);
  const [value, setValue] = useState(subtypes[0]);
  return (
    <div className="subtype-dropdown">
      <Select
        defaultValue={value}
        value={`${value}`}
        showArrow={false}
        size="large"
        onChange={(change: any) => {
          setValue(change);
        }}
        className={'ant-select-2'}>
        {
          subtypes.map((subtype: string) => (
            <Select.Option key={subtype} value={subtype} className="custom-option-background">
              {subtype}
            </Select.Option>
          ))
        }      
      </Select>
    </div>
  );
};

export default MaintenanceTypesDropdown