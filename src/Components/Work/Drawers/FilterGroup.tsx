import { InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useRequestDispatch, useRequestState } from 'hook/requestHook';
import React from 'react';
import { capitalLetter, capitalizeWords } from 'utils/utils';

const FilterGroup = ({
  label,
  filterList,
  disabled = false,
  setYearFilter
}: {
  label: string;
  filterList: any[];
  disabled?: boolean;
  yearFilter?: any[];
  setYearFilter?: any;
}) => {
  const {
    toggleFilter
  } = useRequestDispatch();
  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ paddingBottom: '10px' }}>
        <span className='sub-title-filter'>{label} </span>
        {/* <InfoCircleOutlined style={{opacity:0.3}} /> */}
      </div>
      <div className={label === 'Located in South Platte River'? "body-f-p-filter-river" : "body-f-p-filter"}>
        {
          filterList?.map((cn: any, index: number) => (
            <div key={`filter-ps${index}`} className='filter-00'>
              <Checkbox disabled={disabled || cn.disabled} className='check-filter' checked={cn?.selected} onChange={e => {
                if(label === 'Funding Year' && setYearFilter) {
                  setYearFilter(filterList.map((f: any) => {
                    const selected = f.selected;
                    if(f.id === cn.id) {
                      f.selected = !selected;
                    }
                    return f;
                  }));
                }else{
                  toggleFilter(cn?.type,cn?.id)
                }                
              }} />
              &nbsp;&nbsp;&nbsp;{cn?.name}
              <br />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default FilterGroup;

