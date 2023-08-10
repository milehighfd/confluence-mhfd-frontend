import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button, Checkbox } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";
import { useMapState } from "hook/mapHook";
import { YEAR_LOGIC_2024, WORK_REQUEST, WORK_PLAN, YEAR_LOGIC_2023 } from 'constants/constants';

const Filter = () => {
  const {
    showFilters,
    localityType: l,
    filterMap,
    year,
    namespaceId,
    columns2,
    filterRequest,
    disableFilterServiceArea,
    disableFilterCounty,
  } = useRequestState();
  const {
    tabActiveNavbar
  } = useMapState();
  const { 
    setShowFilters, 
    loadColumns, 
    setFilterRequest
  } = useRequestDispatch();
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
  const [serviceAreaFilter, setServiceAreaFilter] = useState<any[]>([]);
  const [countyFilter, setCountyFilter] = useState<any[]>([]);
  const [jurisdictionFilter, setJurisdictionFilter] = useState<any[]>([]);
  const [projectStatusFilter, setProjectStatusFilter] = useState<any[]>([]);
  const [sponsorFilter, setSponsorFilter] = useState<any[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<any[]>([]);
  const [resetFilter, setResetFilter] = useState(true);

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

  useEffect(() => {
    setServiceAreaFilter(filterRequest.filter((f: any) => f.type === 'project_service_areas'));
    setCountyFilter(filterRequest.filter((f: any) => f.type === 'project_counties'));
    setJurisdictionFilter(filterRequest.filter((f: any) => f.type === 'project_local_governments'));
    setProjectStatusFilter(filterRequest.filter((f: any) => f.type === 'status'));
    setSponsorFilter(filterRequest.filter((f: any) => f.type === 'project_partners'));
    setPriorityFilter(filterRequest.filter((f: any) => f.type === 'project_priorities'));
  }, [filterRequest,resetFilter]);

  const isLocatedInSouthPlateRiverFilter = useMemo(() => [
    { label: 'Yes', value: 1 }
  ], []);

  const applyFilters = () => {
    loadColumns(namespaceId);
  }
  const reset = () => {
    let filterRequestReset = filterRequest.map((f: any) => {
      f.selected = false;
      return f;
    });
    setFilterRequest(filterRequestReset);
    setResetFilter(!resetFilter);
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
        <FilterGroup
          label="Project Status"
          filterList={projectStatusFilter}
        />
      }
      {
        tabActiveNavbar === 'WORK_PLAN' &&
        <FilterGroup
          label="Priority"
          filterList={priorityFilter}
        />
      }
      {
        tabActiveNavbar === 'WORK_PLAN' &&
        <FilterGroup
          label="Sponsor"
          filterList={sponsorFilter}
        />
      }
      {
        tabActiveNavbar === 'WORK_PLAN' &&
        <FilterGroup
          label="Local Government"
          filterList={jurisdictionFilter}
        />
      }
      {
        (tabActiveNavbar === 'WORK_REQUEST' ||  tabActiveNavbar === 'WORK_PLAN') &&
        <FilterGroup
          label="County"
          filterList={countyFilter}
          disabled = {disableFilterCounty}
        />
      }
      {
        (tabActiveNavbar === 'WORK_REQUEST' ||  tabActiveNavbar === 'WORK_PLAN') &&
        <FilterGroup
          label="Service Area"
          filterList={serviceAreaFilter}
          disabled = {disableFilterServiceArea}
        />
      }

      <div className="footer-drawer" style={{ position: 'fixed', bottom: '50px', right: '19px', backgroundColor: 'white', 'width': '277px' }}>
        <div className="buttons-filters" style={{ display: 'flex' }}>
          <Button className="btn-borde" onClick={() => reset()}>
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
