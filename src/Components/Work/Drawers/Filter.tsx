import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";

const Filter = () => {
  const {
    showFilters,
    localityType: l,
    filterMap,
    year,
    namespaceId,
    prioritySelected,
    jurisdictionSelected,
    countiesSelected,
    serviceAreasSelected,
    projectStatusesSelected,
  } = useRequestState();
  const { setShowFilters, loadColumns, setPrioritySelected, setJurisdictionSelected, setCountiesSelected, setServiceAreasSelected, setProjectStatusesSelected } = useRequestDispatch();

  const jurisdictionFilterList: any[] = filterMap['project_local_governments'];
  const countiesFilterList: any[] = filterMap['project_counties'];
  const serviceAreasFilterList: any[] = filterMap['project_service_areas'];
  const projectStatusFilterList: any[] = filterMap['project_statuses'];
  const priorityFilterList = useMemo(() => [
    { label: '1', value: 0 },
    { label: '2', value: 1 },
    { label: '3', value: 2 },
    { label: 'Over 3', value: 3 },
    { label: 'Work Plan', value: 4 }
  ], []);

  // const [jurisdictionSelected, setJurisdictionSelected] = useState<any[]>([]);
  // const [countiesSelected, setCountiesSelected] = useState<any[]>([]);
  // const [serviceAreasSelected, setServiceAreasSelected] = useState<any[]>([]);
  // const [prioritySelected, setPrioritySelected] = useState<any[]>([]);

  useEffect(() => {
    console.log('entraaaaa', jurisdictionFilterList, countiesFilterList, priorityFilterList, serviceAreasFilterList, projectStatusFilterList);
    if (prioritySelected.length === 0) {
      setJurisdictionSelected(jurisdictionFilterList.map((r: any) => true));
      setPrioritySelected(priorityFilterList.map((r: any) => true));
      setProjectStatusesSelected(projectStatusFilterList.map((r: any) => true));
      if(year < 2024){
        setCountiesSelected(countiesFilterList.map((r: any) => true));
        setServiceAreasSelected(serviceAreasFilterList.map((r: any) => true));
      }
    }
  }, [jurisdictionFilterList, countiesFilterList, priorityFilterList, serviceAreasFilterList, projectStatusFilterList]);

  const applyFilters = () => {
    loadColumns(namespaceId);
  }
  const reset = (value: boolean) => {
    setJurisdictionSelected(jurisdictionSelected.map((_: any) => value));
    setCountiesSelected(countiesSelected.map((_: any) => value));
    setPrioritySelected(prioritySelected.map((_: any) => value));
    setServiceAreasSelected(serviceAreasSelected.map((_: any) => value));
    setProjectStatusesSelected(projectStatusesSelected.map((r: any) => value));
  }
  let label;
  if (l === 'CODE_STATE_COUNTY' || l === 'CODE_LOCAL_GOVERNMENT') {
    label = 'COUNTY';
  } else if (l === 'CODE_SERVICE_AREA' || l === 'MHFD_BOUNDARY') {
    label = 'SERVICE AREA';
  }

  return (
    <Drawer
      title={
        <h5 className='title-drawer'>
          <span><img src="/Icons/icon-73.svg" alt="" style={{width:'18px'}} className="icons-drawers" /> FILTER</span>
          <img src="/Icons/ic_close.svg" alt="" style={{ alignItems: 'flex-end', cursor: 'pointer' }} onClick={() => setShowFilters(false)} />
        </h5>
      }
      placement="right"
      closable={false}
      onClose={() => setShowFilters(false)}
      visible={showFilters}
      className="work-utilities"
      mask={false}
    >
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
      {year >= 2024 &&
        <FilterGroup
          label="Project Status"
          filterList={projectStatusFilterList}
          selected={projectStatusesSelected}
          setter={setProjectStatusesSelected}
          labelKey="status_name"
          valueKey="code_status_type_id"
        />
      }

      <div className="footer-drawer" style={{ position: 'fixed', bottom: '50px', right: '19px', backgroundColor: 'white', 'width': '277px' }}>
        <div className="buttons-filters" style={{display:'flex'}}>
          <Button className="btn-borde" onClick={()=> reset(true)}>
            Reset
          </Button>
          <Button className="btn-purple" style={{marginLeft:'10px'}} onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  )
};

export default Filter;
