import React from 'react';
import { formatter } from './RequestViewUtil';
import { useRequestState } from 'hook/requestHook';

const TotalHeader = () => {
  const { sumTotal } = useRequestState();

  return (
    <div className="tab-head-project" style={{ backgroundColor: '#F5F7FF' }}>
      <div><label>Total Cost</label></div>
      {
        Object.keys(sumTotal).map((key) => (
          <div key={key}>{sumTotal[key] ? formatter.format(Math.floor(sumTotal[key])) : '$0'}</div>
        ))
      }
    </div>
  )
};

export default TotalHeader;
