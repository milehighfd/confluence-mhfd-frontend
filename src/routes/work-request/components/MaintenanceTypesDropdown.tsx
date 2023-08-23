import { Select } from 'antd';
import React, { useState } from 'react';
import { NEW_PROJECT_TYPES } from '../../../constants/constants';

const MaintenanceTypesDropdown = ({
  setMaintenanceSubType,
  maintenanceSubType
}:{
  setMaintenanceSubType:Function,
  maintenanceSubType:string
}) => {
  const subtypes = Object.values(NEW_PROJECT_TYPES.MAINTENANCE_SUBTYPES);
  return (
    <div className="subtype-dropdown">
      <Select
        defaultValue={maintenanceSubType}
        value={`${maintenanceSubType}`}
        showArrow={false}
        size="large"
        onChange={(change: any) => {
          setMaintenanceSubType(change);
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