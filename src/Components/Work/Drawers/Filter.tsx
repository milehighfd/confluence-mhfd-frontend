import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";
import { useMapState } from "hook/mapHook";
import { YEAR_LOGIC_2024, WORK_REQUEST, WORK_PLAN } from 'constants/constants';
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
    isLocatedInSouthPlateRiverSelected,
    columns2,
  } = useRequestState();
  const {
    tabActiveNavbar
  } = useMapState();
  const { setShowFilters, loadColumns, setPrioritySelected, setJurisdictionSelected, setCountiesSelected, setServiceAreasSelected, setProjectStatusesSelected, setIsLocatedInSouthPlateRiverSelected } = useRequestDispatch();
  let jurisdictionFilterList: any[] = filterMap['project_local_governments'];
  let countiesFilterList: any[] = filterMap['project_counties'];
  let serviceAreasFilterList: any[] = filterMap['project_service_areas'];
  let projectStatusFilterList: any[] = filterMap['currentId'];

  let priorityFilterList = useMemo(() => [
    { label: '1', value: 0 },
    { label: '2', value: 1 },
    { label: '3', value: 2 },
    { label: 'Over 3', value: 3 },
    { label: 'Work Plan', value: 4 }
  ], []);
  const [notFoundProjects, setNotFoundProjects] = useState(true);


  useEffect(() => {
    if (year >= YEAR_LOGIC_2024 ) {
      if(tabActiveNavbar === WORK_PLAN){
        columns2.forEach((value: any) => {
          value.projects.forEach(() => {
              setNotFoundProjects(false);
              return ;
          })
        })
        if (notFoundProjects) {
            serviceAreasFilterList = [];
            countiesFilterList = [];
            projectStatusFilterList = []
            jurisdictionFilterList = []
            priorityFilterList = []
        }
      }
    }
  }, [columns2]);

  const isLocatedInSouthPlateRiverFilter = useMemo(() => [
    { label: 'Yes', value: 1 }
  ], []);

  useEffect(() => {
    if (prioritySelected.length === 0) {
      setJurisdictionSelected(jurisdictionFilterList?.map((r: any) => true));
      setPrioritySelected(priorityFilterList?.map((r: any) => true));
      setProjectStatusesSelected(projectStatusFilterList?.map((r: any) => true));
      setIsLocatedInSouthPlateRiverSelected(isLocatedInSouthPlateRiverFilter?.map((r: any) => false));
      setCountiesSelected(countiesFilterList?.map((r: any) => true));
      setServiceAreasSelected(serviceAreasFilterList?.map((r: any) => true));
    }
  }, [jurisdictionFilterList, countiesFilterList, priorityFilterList, serviceAreasFilterList, projectStatusFilterList, isLocatedInSouthPlateRiverFilter]);

  const applyFilters = () => {
    loadColumns(namespaceId);
  }
  const reset = (value: boolean) => {
    setJurisdictionSelected(jurisdictionSelected.map((_: any) => value));
    setCountiesSelected(countiesSelected.map((_: any) => value));
    setPrioritySelected(prioritySelected.map((_: any) => value));
    setServiceAreasSelected(serviceAreasSelected.map((_: any) => value));
    setProjectStatusesSelected(projectStatusesSelected.map((_: any) => value));
    setIsLocatedInSouthPlateRiverSelected(isLocatedInSouthPlateRiverFilter.map((_: any) => false));

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
          <span><img src="/Icons/icon-73.svg" alt="" style={{ width: '18px' }} className="icons-drawers" /> FILTER</span>
          <img src="/Icons/ic_close.svg" alt=""  className='close-style-drawer' onClick={() => setShowFilters(false)} />
        </h5>
      }
      placement="right"
      closable={false}
      onClose={() => setShowFilters(false)}
      visible={showFilters}
      className="work-utilities drawer-filter"
      mask={false}
    >
      {
        tabActiveNavbar === WORK_PLAN && year >= YEAR_LOGIC_2024 &&
        <FilterGroup
        notFoundProjects={notFoundProjects}
          label="Located in South Platte River"
          filterList={isLocatedInSouthPlateRiverFilter}
          selected={isLocatedInSouthPlateRiverSelected}
          setter={setIsLocatedInSouthPlateRiverSelected}
          labelKey="label"
          valueKey="value"
        />
      }
      {
        tabActiveNavbar === WORK_PLAN &&
        <FilterGroup
        notFoundProjects={notFoundProjects}
          label="Work Request Priority"
          filterList={priorityFilterList}
          selected={prioritySelected}
          setter={setPrioritySelected}
          labelKey="label"
          valueKey="value"
        />
      }
      {
        tabActiveNavbar === WORK_PLAN &&
        <FilterGroup
        notFoundProjects={notFoundProjects}
          label="Local Government"
          filterList={jurisdictionFilterList}
          selected={jurisdictionSelected}
          setter={setJurisdictionSelected}
          labelKey="local_government_name"
          valueKey="code_local_government_id"
        />
      }
      {
        label === 'COUNTY' &&
        <FilterGroup
        notFoundProjects={notFoundProjects}
          label="County"
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
        notFoundProjects={notFoundProjects}
          label="Service Area"
          filterList={serviceAreasFilterList}
          selected={serviceAreasSelected}
          setter={setServiceAreasSelected}
          labelKey="service_area_name"
          valueKey="code_service_area_id"
        />

      }
      {
        year >= YEAR_LOGIC_2024 &&
        <FilterGroup
        notFoundProjects={notFoundProjects}
          label="Project Status"
          filterList={projectStatusFilterList}
          selected={projectStatusesSelected}
          setter={setProjectStatusesSelected}
          labelKey="status_name"
          valueKey="code_status_type_id"
        />
      }

      <div className="footer-drawer" style={{ position: 'fixed', bottom: '50px', right: '19px', backgroundColor: 'white', 'width': '277px' }}>
        <div className="buttons-filters" style={{ display: 'flex' }}>
          <Button className="btn-borde" onClick={() => reset(true)}>
            Reset
          </Button>
          <Button className="btn-purple" style={{ marginLeft: '10px' }} onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  )
};

export default Filter;
