import { InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useRequestDispatch } from 'hook/requestHook';
import React from 'react';
import { capitalLetter, capitalizeWords } from 'utils/utils';

const FilterGroup = ({
  label,
  filterList,
}: {
  label: string;
  filterList: any[];
}) => {
  const {
    toggleFilter
  } = useRequestDispatch();
  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{ paddingBottom: '10px' }}>
        <span className='sub-title-filter'>{capitalizeWords(label)} </span>
        {/* <InfoCircleOutlined style={{opacity:0.3}} /> */}
      </div>
      <div className={label === 'Located in South Platte River'? "body-f-p-filter-river" : "body-f-p-filter"}>
        {
          filterList?.map((cn: any, index: number) => (
            <div key={`filter-ps${index}`} className='filter-00'>
              <Checkbox className='check-filter' checked={cn?.selected} onChange={e => {
                toggleFilter(cn?.type,cn?.id)
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

