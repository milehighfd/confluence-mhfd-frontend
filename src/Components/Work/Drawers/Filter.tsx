import React, { useEffect, useMemo, useState } from "react";
import { Drawer, Button } from 'antd';
import { useRequestDispatch, useRequestState } from "hook/requestHook";
import FilterGroup from "./FilterGroup";
import { useMapState } from "hook/mapHook";
import { YEAR_LOGIC_2024, WORK_PLAN, UPCOMING_PROJECTS } from 'constants/constants';
import * as datasets from 'Config/datasets';
import { SERVER } from 'Config/Server.config';

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
  const [mhfdLeadFilter, setMhfdLeadFilter] = useState<any[]>([]);
  const [projectStatusFilter, setProjectStatusFilter] = useState<any[]>([]);
  const [sponsorFilter, setSponsorFilter] = useState<any[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<any[]>([]);
  const [resetFilter, setResetFilter] = useState(true);
  const [yearFilter, setYearFilter] = useState<any[]>([]);
  const [completeFilter, setCompleteFilter] = useState<any[]>([]);

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
    datasets.getData(SERVER.GET_FILTER_BOARD).then((res: any) => {
      setCompleteFilter(res);
    });
  }, []);
useEffect(() => {
  console.log('filterRequest: ', filterRequest);
} ,[filterRequest]);
  useEffect(() => {
    const orderForStatus = ['Draft', 'Requested', 'Under Review', 'Approved', 'Cancelled', 'Inactive'];
    const sortedFilterRequest = [...filterRequest].sort((a, b) => a.name.localeCompare(b.name));
    setPriorityFilter(sortedFilterRequest.filter((f: any) => f.type === 'project_priorities').map((f: any) => ({ ...f, disabled: false })));
    const result = completeFilter.map((bObj: any) => {
      const matchingAObj = sortedFilterRequest.find(aObj =>
        aObj.name === bObj.name &&
        aObj.id === bObj.id &&
        aObj.type === bObj.type
      );
      let disabled = false;
      if (matchingAObj) {
        disabled = false;
      } else {
        disabled = true;
      }
      return {
        ...bObj,
        disabled: disabled,
        selected: matchingAObj ? (matchingAObj.selected ? matchingAObj.selected : false) : false
      };
    });
    const statusFilter = result.filter((f: any) => f.type === 'status').sort((a: any, b: any) => {
      return orderForStatus.indexOf(a.name) - orderForStatus.indexOf(b.name);
    });
    setServiceAreaFilter(result.filter((f: any) => f.type === 'project_service_areas'));
    setCountyFilter(result.filter((f: any) => f.type === 'project_counties'));
    setJurisdictionFilter(result.filter((f: any) => f.type === 'project_local_governments'));
    setSponsorFilter(result.filter((f: any) => f.type === 'project_partners'));
    setProjectStatusFilter(statusFilter);
    setMhfdLeadFilter(result.filter((f: any) => f.type === 'mhfd_lead'));
  }, [filterRequest, resetFilter, completeFilter]);

  useEffect(() => {
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
  }, [filterYear,resetFilter]);

  const applyFilters = () => {
    setFilterYear(yearFilter.filter((f: any) => f.selected).map((f: any) => f.id));
    loadColumns();    
  }
  const reset = () => {
    let filterRequestReset = filterRequest.map((f: any) => {
      f.selected = false;
      return f;
    });
    setFilterYear([]);
    setFilterRequest(filterRequestReset);
    loadColumns();
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
      <div className="body-drawer">
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
          tabActiveNavbar === UPCOMING_PROJECTS &&
          <FilterGroup
            label="MHFD Lead"
            filterList={mhfdLeadFilter}
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
          (tabActiveNavbar === 'WORK_PLAN' || tabActiveNavbar === UPCOMING_PROJECTS) &&
          <FilterGroup
            label="Local Government"
            filterList={jurisdictionFilter}
          />
        }
        {
          (tabActiveNavbar === 'WORK_REQUEST' ||  tabActiveNavbar === 'WORK_PLAN' || tabActiveNavbar === UPCOMING_PROJECTS) &&
          <FilterGroup
            label="County"
            filterList={countyFilter}
            disabled = {disableFilterCounty}
          />
        }
        {
          (tabActiveNavbar === 'WORK_REQUEST' ||  tabActiveNavbar === 'WORK_PLAN' || tabActiveNavbar === UPCOMING_PROJECTS) &&
          <FilterGroup
            label="Service Area"
            filterList={serviceAreaFilter}
            disabled = {disableFilterServiceArea}
          />
        }
      </div>
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
