import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";

const Filter = () => {
  const {
    showFilters,
    localityType: l,
    filterMap,
    namespaceId,
  } = useRequestState();
  const { setShowFilters, loadColumns } = useRequestDispatch();

  const jurisdictionFilterList: any[] = filterMap['project_local_governments'];
  const countiesFilterList: any[] = filterMap['project_counties'];
  const serviceAreasFilterList: any[] = filterMap['project_service_areas'];
  const priorityFilterList = useMemo(() => [
    { label: '1', value: 0 },
    { label: '2', value: 1 },
    { label: '3', value: 2 },
    { label: 'Over 3', value: 3 },
    { label: 'Work Plan', value: 4 }
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
    const filter = {
      project_counties: countiesSelected.every((r: any) => r) ? undefined : countiesFilterList.filter((_: any, index: number) => {
        return countiesSelected[index];
      }).map((r: any) => r.state_county_id),
      project_local_governments: jurisdictionSelected.every((r: any) => r) ? undefined : jurisdictionFilterList.filter((_: any, index: number) => {
        return jurisdictionSelected[index];
      }).map((r: any) => r.code_local_government_id),
      project_service_areas: serviceAreasSelected.every((r: any) => r) ? undefined :  serviceAreasFilterList.filter((_: any, index: number) => {
        return serviceAreasSelected[index];
      }).map((r: any) => r.code_service_area_id),
      project_priorities: prioritySelected.every((r: any) => r) ? undefined : priorityFilterList.filter((_: any, index: number) => {
        return prioritySelected[index];
      }).map((r: any) => r.value),
    }
    loadColumns(namespaceId, filter);
  }
  const reset = (value: boolean) => {
    setJurisdictionSelected(jurisdictionSelected.map(_ => value));
    setCountiesSelected(countiesSelected.map(_ => value));
    setPrioritySelected(prioritySelected.map(_ => value));
    setServiceAreasSelected(serviceAreasSelected.map(_ => value));
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
