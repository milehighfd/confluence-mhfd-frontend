import React, { useState } from 'react';
import { Select } from 'antd';
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import UpOutlined from '@ant-design/icons/lib/icons/UpOutlined';
import { WINDOW_WIDTH } from 'constants/constants';
import { setIsLocatedInSouthPlateRiverSelected } from 'store/actions/requestActions';
const { Option } = Select;

const YearDropdown = () => {
  const { year, yearList } = useRequestState();
  const { setYear, setPrioritySelected } = useRequestDispatch();
  const [openYearDropdown, setOpenYearDropdown] = useState(false);
  return (
    <Select
      defaultValue={year}
      value={`Year ${year}`}
      showArrow={false}
      //suffixIcon={openYearDropdown ? < DownOutlined /> : <UpOutlined />}
      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
      onClick={() => (setOpenYearDropdown(!openYearDropdown))}
      onChange={(y: any) => {
        setYear(y);
        setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
        setIsLocatedInSouthPlateRiverSelected([false]);
      }}
      className={'ant-select-2'}>
      {
        yearList.map((y: number, i: number) => (
          <Select.Option key={i} value={y} className="custom-option-background">
          {y}
        </Select.Option>
        ))
      }      
    </Select>
  )
};

export default YearDropdown;
