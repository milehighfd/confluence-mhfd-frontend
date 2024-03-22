import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import { WINDOW_WIDTH, WORK_PLAN } from 'constants/constants';
import { setIsLocatedInSouthPlateRiverSelected } from 'store/actions/requestActions';
import { useProfileState } from 'hook/profileHook';
import { useProjectState } from 'hook/projectHook';
import { useMapState } from 'hook/mapHook';

const YearDropdown = () => {
  const { year, yearList, namespaceId } = useRequestState();
  const { setYear, setPrioritySelected, setNamespaceId } = useRequestDispatch();
  const { globalSearch } = useProjectState();
  const { tabActiveNavbar } = useMapState();
  const [openYearDropdown, setOpenYearDropdown] = useState(false);
  const { workRequestYear, workPlanYear } = useProfileState();
  const [defaultYear, setDefaultYear] = useState(namespaceId.type === WORK_PLAN ? workPlanYear.default : workRequestYear.default);
  const [yearListDropdown, setYearListDropdown] = useState<any>([]);

  useEffect(() => {
    if (!namespaceId.type){
      const defaultValue = tabActiveNavbar === WORK_PLAN ? workPlanYear.default : workRequestYear.default;
      setDefaultYear(defaultValue);
      setYear(defaultValue);
      setNamespaceId({ ...namespaceId, year: defaultValue });
    }    
    const maxYear = namespaceId.type === WORK_PLAN ? workPlanYear.max : workRequestYear.max;
    const yearList = [];
    for (let year = maxYear; year >= 2022; year--) {
      yearList.push(year);
    }
    setYearListDropdown(yearList);
  }, []);

  useEffect(() => {
    if (globalSearch) {
      setDefaultYear(year);
    }
  }, [globalSearch]);

  return (
    <Select
      defaultValue={defaultYear}
      value={`Year ${defaultYear}`}
      showArrow={false}
      listHeight={WINDOW_WIDTH > 2554 ? (WINDOW_WIDTH > 3799 ? 500 : 320) : 256}
      onClick={() => (setOpenYearDropdown(!openYearDropdown))}
      onChange={(y: any) => {
        setDefaultYear(y);
        setYear(y);
        setPrioritySelected(['1', '2', '3', 'Over 3', 'Work Plan']);
        setIsLocatedInSouthPlateRiverSelected([false]);
      }}
      className={'ant-select-2'}>
      {
        yearListDropdown
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
