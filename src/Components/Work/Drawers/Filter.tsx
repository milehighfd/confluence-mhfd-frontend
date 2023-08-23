import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";
import { useMapState } from "hook/mapHook";
import { YEAR_LOGIC_2024, WORK_PLAN } from 'constants/constants';

const Filter = () => {
  const {
    showFilters,
    localityType: l,
    filterMap,
    year,
    columns2,
    filterRequest,
    disableFilterServiceArea,
    disableFilterCounty,
    isListView,
    namespaceId,
    filterYear
  } = useRequestState();
  const {
    tabActiveNavbar
  } = useMapState();
  const { 
    setShowFilters, 
    loadColumns, 
    setFilterRequest,
    setFilterYear
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
  const [yearFilter, setYearFilter] = useState<any[]>([]);

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
    const orderForStatus = ['Draft', 'Requested','Under Review', 'Approved', 'Cancelled', 'Inactive'];
    const statusFilter = filterRequest.filter((f: any) => f.type === 'status').sort((a:any, b:any) => {
      return orderForStatus.indexOf(a.name) - orderForStatus.indexOf(b.name);
    });
    const sortedFilterRequest = [...filterRequest].sort((a, b) => a.name.localeCompare(b.name));  
    setServiceAreaFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_service_areas'));
    setCountyFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_counties'));
    setJurisdictionFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_local_governments'));
    setProjectStatusFilter(statusFilter);
    setSponsorFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_partners'));
    setPriorityFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_priorities'));
    const year = +namespaceId.year;
    const years = [];
    for (let i = 0; i <= 2; i++) {
      years.push({ id: year + i, name: year + i, selected: false, type: 'year' });
    }
    if (namespaceId.projecttype !== 'Maintenance') {
      for (let i = 3; i <= 4; i++) {
        years.push({ id: year + i, name: year + i, selected: false, type: 'year' });
      }
    }
    const updatedYears = years.map((yearObj) => {
      if (filterYear.includes(yearObj.name)) {
        return { ...yearObj, selected: true };
      }
      return yearObj;
    });
    setYearFilter(updatedYears);
  }, [filterRequest,resetFilter]);

  const applyFilters = () => {
    loadColumns();
    setFilterYear(yearFilter.filter((f: any) => f.selected).map((f: any) => f.id));
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
      { isListView &&
        <FilterGroup
          label="Funding Year"
          filterList={yearFilter}
          setYearFilter={setYearFilter}
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
