import React, { useState } from 'react';
import { Select } from 'antd';
import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import UpOutlined from '@ant-design/icons/lib/icons/UpOutlined';
const { Option } = Select;

const YearDropdown = () => {
  const { year, yearList } = useRequestState();
  const { setYear, setPrioritySelected } = useRequestDispatch();
  const [openYearDropdown, setOpenYearDropdown] = useState(false);
  return (
    <Select
      defaultValue={year}
      value={`Year ${year}`}
      suffixIcon={openYearDropdown ? < DownOutlined /> : <UpOutlined />}
      onClick={() => (setOpenYearDropdown(!openYearDropdown))}
      onChange={(y: any) => {
        setYear(y);
        setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
      }}
      className={'ant-select-2'} >
      {
        yearList.map((y: number, i: number) => (
          <Option key={i} value={y} >Year {y}</Option>
        ))
      }
    </Select>
  )
};

export default YearDropdown;