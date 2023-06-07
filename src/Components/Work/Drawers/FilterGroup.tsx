import { Checkbox } from 'antd';
import React from 'react';

const FilterGroup = ({
  label,
  filterList,
  selected,
  setter,
  labelKey,
  valueKey
}: {
  label: string;
  filterList: any[];
  selected: boolean[];
  setter: (selected: boolean[]) => void;
  labelKey: string;
  valueKey: string;
}) => {
  return (
    <div className="filter-plan">
      <div className="head-f-p">{label}</div>
      <div className="body-f-p">
        {
          filterList.map((cn: any, index: number) => (
            <p key={`filter-ps${index}`}>
              {cn[labelKey]}
              <span>
                <Checkbox checked={selected[index]} onChange={e => {
                  let v = e.target.checked;
                  setter(selected.map((w, i) => {
                    if (i === index) {
                      return v;
                    }
                    return w;
                  }))
                }} />
              </span>
            </p>
          ))
        }
      </div>
    </div>
  )
};

export default FilterGroup;

