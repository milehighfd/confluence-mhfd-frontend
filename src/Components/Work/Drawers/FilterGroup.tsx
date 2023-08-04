import { InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import React from 'react';
import { capitalLetter, capitalizeWords } from 'utils/utils';

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
    <div style={{ marginTop: '10px' }}>
      <div style={{ paddingBottom: '10px' }}>
        <span className='sub-title-filter'>{capitalizeWords(label)} </span>
        {/* <InfoCircleOutlined style={{opacity:0.3}} /> */}
      </div>
      <div className={label === 'Located in the South Platte River'? "body-f-p-filter-river" : "body-f-p-filter"}>
        {
          filterList?.map((cn: any, index: number) => (
            <div key={`filter-ps${index}`} className='filter-00'>
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

