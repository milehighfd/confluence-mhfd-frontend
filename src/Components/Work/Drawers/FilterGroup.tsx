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
    <div style={{ marginTop: '32px' }}>
      <div style={{ paddingBottom: '10px' }}>
        <span style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '19.2px', marginRight: '4px' }}>{label}</span><img src="/Icons/icon-19.svg" alt="" />
      </div>
      <div className="body-f-p-filter">
        {
          filterList?.map((cn: any, index: number) => (
            <div key={`filter-ps${index}`}>
              <Checkbox className='check-filter' checked={selected[index]} onChange={e => {
                let v = e.target.checked;
                setter(selected.map((w, i) => {
                  if (i === index) {
                    return v;
                  }
                  return w;
                }))
              }} />
              &nbsp;&nbsp;&nbsp;{cn[labelKey]}
              <br />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default FilterGroup;

