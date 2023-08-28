import React, { useState } from 'react';
import { Select } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { GOVERNMENT_STAFF, WINDOW_WIDTH, WORK_PLAN } from 'constants/constants';
import { setIsLocatedInSouthPlateRiverSelected } from 'store/actions/requestActions';
import { useProfileState } from 'hook/profileHook';
import { useMapState } from 'hook/mapHook';

const YearDropdown = () => {
  const { year, yearList } = useRequestState();
  const { setYear, setPrioritySelected } = useRequestDispatch();
  const [openYearDropdown, setOpenYearDropdown] = useState(false);
  const {
    isLocalGovernment,
    userInformation: {
      designation
    }
  } = useProfileState();
  const { tabActiveNavbar } = useMapState();

  const shouldHideCurrentYear = (isLocalGovernment || designation === GOVERNMENT_STAFF) && tabActiveNavbar === WORK_PLAN;

  return (
    <Select
      defaultValue={year}
      value={`Year ${year}`}
      showArrow={false}
      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
      onClick={() => (setOpenYearDropdown(!openYearDropdown))}
      onChange={(y: any) => {
        setYear(y);
        setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
        setIsLocatedInSouthPlateRiverSelected([false]);
      }}
      className={'ant-select-2'}>
      {
        yearList
          .filter((_: number, i: number) => {
            if (shouldHideCurrentYear) {
              return i !== 0;
            }
            return true;
          })
          .map((y: number, i: number) => (
          <Select.Option key={i} value={y} className="custom-option-background">
          {y}
        </Select.Option>
        ))
      }      
    </Select>
  )
};

export default YearDropdown;
