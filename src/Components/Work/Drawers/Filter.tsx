import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";

const Filter = () => {
  const {
    showFilters,
    localityType: l,
    filterMap
  } = useRequestState();
  const { setShowFilters } = useRequestDispatch();

  const jurisdictionFilterList = filterMap['project_local_governments'];
  const countiesFilterList = filterMap['project_counties'];
  const serviceAreasFilterList = filterMap['project_service_areas'];
  const priorityFilterList = useMemo(() => [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: 'Over 3', value: 4 },
    { label: 'Work Plan', value: 5 }
  ], []);

  const [jurisdictionSelected, setJurisdictionSelected] = useState<any[]>([]);
  const [countiesSelected, setCountiesSelected] = useState<any[]>([]);
  const [serviceAreasSelected, setServiceAreasSelected] = useState<any[]>([]);
  const [prioritySelected, setPrioritySelected] = useState<any[]>([]);

  useEffect(() => {
    setJurisdictionSelected(jurisdictionFilterList.map((r: any) => true));
    setCountiesSelected(countiesFilterList.map((r: any) => true));
    setPrioritySelected(priorityFilterList.map((r: any) => true));
    setServiceAreasSelected(serviceAreasFilterList.map((r: any) => true));
  }, [jurisdictionFilterList, countiesFilterList, priorityFilterList, serviceAreasFilterList]);

  const applyFilters = () => {
    let js = jurisdictionFilterList.filter((_: any, index: number) => {
      return jurisdictionSelected[index];
    });
    let ps = priorityFilterList.filter((_, index) => {
      return prioritySelected[index];
    });
    let cs = countiesFilterList.filter((_: any, index: number) => {
      return countiesSelected[index];
    });
    let sas = serviceAreasFilterList.filter((_: any, index: number) => {
      return serviceAreasSelected[index];
    });
    console.log(js, ps, cs, sas);
  }
  const reset = (value: boolean) => {
    setJurisdictionSelected(jurisdictionSelected.map(elem => value));
    setCountiesSelected(countiesSelected.map(elem => value));
    setPrioritySelected(prioritySelected.map(elem => value));
    setServiceAreasSelected(serviceAreasSelected.map(elem => value));
  }
  let label;
  if (l === 'CODE_STATE_COUNTY') {
    label = 'COUNTY';
  } else if (l === 'CODE_SERVICE_AREA' || l === 'MHFD_BOUNDARY') {
    label = 'SERVICE AREA';
  }

  return (
    <Drawer
      title={
        <h5><img src="/Icons/work/chat.svg" alt="" className="menu-wr" /> FILTER</h5>
      }
      placement="right"
      closable={true}
      onClose={() => setShowFilters(false)}
      visible={showFilters}
      className="work-utilities"
      mask={false}
    >

      <FilterGroup
        label="WORK REQUEST PRIORITY"
        filterList={priorityFilterList}
        selected={prioritySelected}
        setter={setPrioritySelected}
        labelKey="label"
        valueKey="value"
      />
      <FilterGroup
        label="JURISDICTION"
        filterList={jurisdictionFilterList}
        selected={jurisdictionSelected}
        setter={setJurisdictionSelected}
        labelKey="local_government_name"
        valueKey="code_local_government_id"
      />
      {
        label === 'COUNTY' &&
        <FilterGroup
          label="COUNTY"
          filterList={countiesFilterList}
          selected={countiesSelected}
          setter={setCountiesSelected}
          labelKey="county_name"
          valueKey="code_county_id"
        />
      }
      {
        label === 'SERVICE AREA' &&
        <FilterGroup
          label="SERVICE AREA"
          filterList={serviceAreasFilterList}
          selected={serviceAreasSelected}
          setter={setServiceAreasSelected}
          labelKey="service_area_name"
          valueKey="code_service_area_id"
        />
      }

      <div className="footer-drawer" style={{ position: 'fixed', bottom: '50px', right: '19px', backgroundColor: 'white', 'width': '277px' }}>
        <div>
          <h4 className="resetFilter" style={{ float: 'left', marginTop: '0.8rem' }} onClick={() => reset(true)}>Reset</h4>
          <h4 style={{ float: 'left', marginTop: '0.75rem', marginLeft: '4px' }}>|</h4>
          <h4 className="resetFilter" style={{ float: 'left', marginTop: '0.8rem', marginLeft: '4px' }} onClick={() => reset(false)}>Clear all</h4>
          <Button className="btn-purple" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  )
};

export default Filter;
