import React from 'react';
import { NewProjectsFilter } from 'Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const Filters = ({
  filtersObject
}:{
  filtersObject: any
}) => {
  return <div className="filters">
    <div className="filters-body">
      <NewProjectsFilter
        filtersObject={filtersObject}
      />
    </div>
  </div>
};

export default Filters;
