import React from 'react';
import { NewProjectsFilter } from 'Components/FiltersProject/NewProjectsFilter/NewProjectsFilter';

const Filters = ({
  filtersObject,
  origin
}:{
  filtersObject: any,
  origin?: string
}) => {
  return <div className="filters">
    <div className="filters-body">
      <NewProjectsFilter
        filtersObject={filtersObject}
        origin={origin}
      />
    </div>
  </div>
};

export default Filters;
