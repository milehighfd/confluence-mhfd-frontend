import React, { useState, useContext } from "react";

const FilterContext = React.createContext({
  setStaffValues: (values: any) => {},
  mhfdmanagers: undefined
});

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FiltersContext({ children }: any) {
  const [mhfdmanagers, setMhfdManagers] = useState<any>(undefined);

  const setMhfdManagersValues = (values: any) => {
    setMhfdManagers(values);
  };

  return (
    <FilterContext.Provider value={{ mhfdmanagers, setStaffValues: setMhfdManagersValues }}>
      {children}
    </FilterContext.Provider>

  );
}
