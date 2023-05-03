import React from 'react';
import { NewProjectsFilter } from 'Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const Filters = ({
  setApplyFilter,
  filtersObject
}:{
  setApplyFilter: any,
  filtersObject: any
}) => {
  return <div className="filters">
    <div className="filters-body">
      <NewProjectsFilter
        originpage="portfolio"
        setApplyFilter={setApplyFilter}
        filtersObject={filtersObject}
      />
    </div>
  </div>
};

export default Filters;
